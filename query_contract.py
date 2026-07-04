#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import argparse, json, os, re, subprocess, sys, time, random
from dateutil import parser as dtparse
import requests

# ====================== extraction helpers ======================
def run_extract(path):
    cmd = ["python", "extract_raw_text.py", path, "--lang", "heb+eng"]
    try:
        out = subprocess.check_output(cmd, text=True, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError as ex:
        print(f"ERROR: text extraction failed: {ex}", file=sys.stderr)
        sys.exit(11)
    return out.strip()

def to_iso(s):
    if not s: return None
    try: return dtparse.parse(s, dayfirst=True).date().isoformat()
    except: return None

def clean_money(x):
    if x is None: return None
    if isinstance(x, (int, float)): return float(x)
    s = str(x).replace(",", "").replace("₪", "").replace(" ש\"ח", "").replace(" NIS", "").strip()
    try: return float(s)
    except: return None

def ensure_list(v):
    if v is None: return []
    return v if isinstance(v, list) else [v]

# ====================== RTL display helpers ======================
HEB_RANGE = r'\u0590-\u05FF'
RLE, PDF = "\u202B", "\u202C"
DIR_MARKS_RE = re.compile(r'[\u200E\u200F\u202A-\u202E]')

def _strip_dir_marks(s: str) -> str: return DIR_MARKS_RE.sub('', s)
def _looks_hebrew(s: str) -> bool:
    if not isinstance(s, str): return False
    s2 = _strip_dir_marks(s)
    heb = len(re.findall(f'[{HEB_RANGE}]', s2))
    total = len(re.findall(r'[A-Za-z0-9' + HEB_RANGE + r']', s2))
    return heb >= 2 and heb >= 0.6 * max(1, total)

def _maybe_flip_words(s: str) -> str:
    if not _looks_hebrew(s): return s
    s0 = _strip_dir_marks(s).strip()
    segments = [seg.strip() for seg in re.split(r'\s*,\s*', s0)]
    fixed = []
    for seg in segments:
        if len(re.findall(r'\d', seg)) >= 2:
            fixed.append(seg); continue
        tokens = re.split(r'\s+', seg)
        heb_tokens = sum(1 for t in tokens if re.search(f'[{HEB_RANGE}]', t))
        if 2 <= heb_tokens <= 6: tokens.reverse()
        fixed.append(' '.join(tokens))
    return ', '.join(fixed)

def _rtl_wrap(s: str) -> str: return RLE + s + PDF if isinstance(s, str) else s

def rtl_json(obj, smart=False):
    if isinstance(obj, str): return _rtl_wrap(_maybe_flip_words(obj) if smart else obj)
    if isinstance(obj, list): return [rtl_json(x, smart) for x in obj]
    if isinstance(obj, dict): return {k: rtl_json(v, smart) for k, v in obj.items()}
    return obj

def rtl_text(s: str, smart=False) -> str:
    return _rtl_wrap(_maybe_flip_words(s) if smart else s) if isinstance(s, str) else s

# ====================== Gemini REST (יציב + retries) ======================
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
GEMINI_FALLBACK = os.getenv("GEMINI_MODEL_FALLBACK", "gemini-2.0-flash-lite")
GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta"

def _gemini_generate(prompt: str, model: str, temperature: float = 0.2) -> str:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("ERROR: GEMINI_API_KEY missing.", file=sys.stderr)
        sys.exit(12)

    def call(model_name):
        url = f"{GEMINI_BASE}/models/{model_name}:generateContent?key={api_key}"
        body = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": temperature}
        }
        return requests.post(url, json=body, timeout=60)

    models_to_try = [model, GEMINI_FALLBACK]
    for model_name in models_to_try:
        for attempt in range(1, 7):
            try:
                r = call(model_name)
                if r.status_code == 200:
                    data = r.json()
                    return data["candidates"][0]["content"]["parts"][0]["text"]
                if r.status_code in (429, 500, 502, 503, 504):
                    sleep = min(1.5 * (2 ** (attempt - 1)) + random.uniform(0, 0.6), 30)
                    time.sleep(sleep)
                    continue
                break  # שגיאה אחרת – אין טעם להמשיך
            except requests.RequestException:
                time.sleep(min(1.5 * (2 ** (attempt - 1)), 30))
    raise RuntimeError(f"Gemini failed after retries. Last model: {model_name}")

def ask_gemini(prompt: str, temperature: float = 0.2) -> str:
    return _gemini_generate(prompt, GEMINI_MODEL, temperature)

def gemini_json(prompt: str) -> dict:
    txt = _gemini_generate(prompt, GEMINI_MODEL, temperature=0.0)
    try: return json.loads(txt)
    except: pass
    m = re.search(r"\{[\s\S]*\}", txt)
    if m: return json.loads(m.group(0))
    raise RuntimeError(f"Gemini JSON parse failed:\n{txt[:800]}")

# ====================== prompts ======================
SYSTEM_QA = "ענה בעברית בקצרה ובדיוק. אם אין תשובה ודאית – אמור שאין נתון."
SYSTEM_JSON = (
    "אתה מחלץ שדות מחוזה שכירות בעברית לפי הקשר. "
    "החזר JSON תקני בלבד, ללא טקסט נוסף."
)

# ====================== LLM ops ======================
def llm_qa(raw_text: str, question: str) -> str:
    prompt = f"{SYSTEM_QA}\n\nטקסט:\n{raw_text}\n\nשאלה: {question}"
    return ask_gemini(prompt)

def llm_extract_json(raw_text: str, fields: list) -> dict:
    schema = ", ".join(fields)
    user_prompt = (
        f"חלץ: {schema}\n"
        f"תאריכים: YYYY-MM-DD, סכומים: מספרים, לא בטוח: null\n\n"
        f"טקסט:\n{raw_text}"
    )
    data = gemini_json(f"{SYSTEM_JSON}\n\n{user_prompt}")
    if "lease_start_date" in data: data["lease_start_date"] = to_iso(data.get("lease_start_date"))
    if "lease_end_date" in data: data["lease_end_date"] = to_iso(data.get("lease_end_date"))
    if "monthly_rent" in data: data["monthly_rent"] = clean_money(data.get("monthly_rent"))
    for k in ("tenant_names", "landlord_names"):
        if k in data: data[k] = ensure_list(data.get(k))
    return {k: data.get(k, None) for k in fields}

# ====================== CLI ======================
def main():
    p = argparse.ArgumentParser()
    p.add_argument("--file", required=True)
    p.add_argument("--ask")
    p.add_argument("--fields")
    p.add_argument("--json", action="store_true")
    p.add_argument("--rtl-display", action="store_true")
    p.add_argument("--rtl-smart", action="store_true")
    args = p.parse_args()

    raw = run_extract(args.file)

    if args.ask:
        ans = llm_qa(raw, args.ask)
        print(rtl_text(ans, args.rtl_smart) if args.rtl_display else ans)
        return

    if args.fields:
        fields = [f.strip() for f in args.fields.split(",") if f.strip()]
        data = llm_extract_json(raw, fields)
        out = rtl_json(data, args.rtl_smart) if args.rtl_display else data
        print(json.dumps(out, ensure_ascii=False, indent=2) if args.json else out)
        return

    print("Use --ask or --fields.", file=sys.stderr)
    sys.exit(2)

if __name__ == "__main__":
    main()