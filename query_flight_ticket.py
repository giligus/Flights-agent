#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import json
import re
from datetime import datetime

from query_contract import ask_gemini

ROUTE_RE = re.compile(r"\b([A-Z]{3})\s*[-–]\s*([A-Z]{3})\b")
TIME_RANGE_RE = re.compile(r"(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})")
DATE_RE = re.compile(r"(\d{1,2})[./\-](\d{1,2})[./\-](\d{2,4})")



SYSTEM_PROMPT = """
You are an assistant that extracts structured data from airline tickets and flight confirmations.
The input is messy text (PDF extraction / OCR, may contain Hebrew + English).

You MUST return a SINGLE valid JSON object with this exact structure:

{
  "passengers": [
    { "full_name": "" }
  ],
  "segments": [
    {
      "airline_code": "",
      "flight_number": "",
      "pnr": "",
      "ticket_number": "",
      "departure_city": "",
      "arrival_city": "",
      "departure_airport": "",
      "arrival_airport": "",
      "departure_datetime_local": "",
      "arrival_datetime_local": "",
      "booking_class": "",
      "baggage_allowance": "",
      "duration": "",
      "seat": "",
      "gate": ""
    }
  ]
}

STRICT rules:

- If a field is not present, use empty string "" (NOT null).
- passenger_name must come from the "Passenger:" or similar line.
- pnr must come from booking code / PNR like "Booking code: QOTL3N" (6 alphanumeric characters).
  If there is only one booking code, you may apply it to all segments.
- ticket_number should be the e-ticket number (13 digits). If there is only one such number in the document, apply it to all segments.
- airline_code should be 2–3 letter code like LY, BA, TK, etc.
- flight_number should be the numeric part after the airline code (e.g. "LY 259" => airline_code="LY", flight_number="259").
- departure_airport / arrival_airport: use IATA codes (TLV, LCA, VCE, MXP...).
- departure_city / arrival_city: use English city names if available ("TEL AVIV", "VENICE", "MILAN"...).
- Dates and times:
  * Use local time.
  * Format MUST be exactly 'YYYY-MM-DDTHH:MM' (no seconds, no timezone suffix).
  * Example: 2025-07-01T00:50
- If the ticket shows duration explicitly, copy it as HH:MM.
- If duration is not written, you may leave it empty "" (our post-processing code may compute it).
- Do NOT invent cities or times that are clearly not in the text.
- DO NOT add extra keys.
- DO NOT output any text before or after the JSON.
"""


def build_prompt(raw_text: str) -> str:
    return f"""{SYSTEM_PROMPT}

RAW TICKET TEXT (OCR / PDF extract):
------------------------------------
{raw_text}

Return ONLY the JSON object. No explanations.
"""


# ============== post-processing helpers (our "smart" layer) ==============

PNR_RE = re.compile(
    r"(?:Booking code|Booking\s+code|PNR)\s*[:\-]?\s*([A-Z0-9]{6})",
    re.IGNORECASE,
)

TICKET_RE = re.compile(
    r"\b(\d{13})\b"  # 13-digit ticket number (common in e-tickets)
)

def _normalize_trip(trip: dict) -> dict:
    """Ensure basic structure & empty strings instead of None."""
    if not isinstance(trip, dict):
        trip = {}

    passengers = trip.get("passengers") or []
    segments = trip.get("segments") or []

    # normalize passengers
    norm_passengers = []
    for p in passengers:
        name = ""
        if isinstance(p, dict):
            name = str(p.get("full_name", "") or "").strip()
        elif isinstance(p, str):
            name = p.strip()
        norm_passengers.append({"full_name": name})

    # normalize segments
    norm_segments = []
    for s in segments:
        if not isinstance(s, dict):
            continue
        seg = {
            "airline_code": str(s.get("airline_code", "") or "").strip(),
            "flight_number": str(s.get("flight_number", "") or "").strip(),
            "pnr": str(s.get("pnr", "") or "").strip(),
            "ticket_number": str(s.get("ticket_number", "") or "").strip(),
            "departure_city": str(s.get("departure_city", "") or "").strip(),
            "arrival_city": str(s.get("arrival_city", "") or "").strip(),
            "departure_airport": str(s.get("departure_airport", "") or "").strip(),
            "arrival_airport": str(s.get("arrival_airport", "") or "").strip(),
            "departure_datetime_local": str(s.get("departure_datetime_local", "") or "").strip(),
            "arrival_datetime_local": str(s.get("arrival_datetime_local", "") or "").strip(),
            "booking_class": str(s.get("booking_class", "") or "").strip(),
            "baggage_allowance": str(s.get("baggage_allowance", "") or "").strip(),
            "duration": str(s.get("duration", "") or "").strip(),
            "seat": str(s.get("seat", "") or "").strip(),
            "gate": str(s.get("gate", "") or "").strip(),
        }
        norm_segments.append(seg)

    return {
        "trip_id": trip.get("trip_id"),
        "passengers": norm_passengers,
        "segments": norm_segments,
        "meta": {"raw_source_type": "text"},
    }


def _infer_pnr_from_text(raw_text: str, trip: dict) -> None:
    """אם לקטעים אין PNR – ננסה לחלץ אותו מהטקסט הגולמי."""
    m = PNR_RE.search(raw_text)
    if not m:
        return
    pnr = m.group(1).upper()
    for seg in trip["segments"]:
        if not seg.get("pnr"):
            seg["pnr"] = pnr


def _propagate_single_ticket_number(trip: dict) -> None:
    """אם יש רק מספר כרטיס אחד – נפיץ אותו לכל הסגמנטים החסרים."""
    numbers = {s.get("ticket_number") for s in trip["segments"] if s.get("ticket_number")}
    numbers = {n.strip() for n in numbers if n and n.strip()}
    if len(numbers) != 1:
        return
    ticket = next(iter(numbers))
    for seg in trip["segments"]:
        if not seg.get("ticket_number"):
            seg["ticket_number"] = ticket


def _infer_ticket_from_text_if_missing(raw_text: str, trip: dict) -> None:
    """אם אין בכלל מספרי כרטיס – ננסה לחפש במסמך."""
    has_any = any(s.get("ticket_number") for s in trip["segments"])
    if has_any:
        return
    m = TICKET_RE.search(raw_text)
    if not m:
        return
    ticket = m.group(1)
    for seg in trip["segments"]:
        seg["ticket_number"] = ticket


def _compute_duration_from_datetimes(trip: dict) -> None:
    """חישוב משך טיסה אם יש departure/arrival בפורמט ISO."""
    for seg in trip["segments"]:
        if seg.get("duration"):
            continue
        dep = seg.get("departure_datetime_local")
        arr = seg.get("arrival_datetime_local")
        if not dep or not arr:
            continue
        try:
            d1 = datetime.fromisoformat(dep)
            d2 = datetime.fromisoformat(arr)
            delta = d2 - d1
            minutes = int(delta.total_seconds() // 60)
            if minutes <= 0:
                continue
            h, m = divmod(minutes, 60)
            seg["duration"] = f"{h:02d}:{m:02d}"
        except Exception:
            # אם הפורמט לא תקין – מדלגים
            continue

def extract_basic_segments_from_text(raw_text: str):
    """
    ניסיון חילוץ בסיסי של סגמנטים ממסמכים לא-סטנדרטיים (כמו מסמך של סוכן נסיעות):
    - מחפש TLV-LCA, LCA-TLV וכו'
    - מחפש טווחי שעות בסמוך
    - מחפש תאריך בסביבה
    """
    segments = []
    lines = raw_text.splitlines()

    for i, line in enumerate(lines):
        m_route = ROUTE_RE.search(line)
        if not m_route:
            continue

        dep_code, arr_code = m_route.groups()

        # נבנה "קונטקסט" – השורה הנוכחית + שתי השורות אחריה
        context_forward = " ".join(lines[i:i+3])
        context_window = " ".join(lines[max(0, i-3):i+3])

        # שעות
        dep_time = arr_time = None
        m_time = TIME_RANGE_RE.search(context_forward)
        if m_time:
            dep_time, arr_time = m_time.groups()

        # תאריך (ננסה קודם קדימה, ואז בחלון רחב יותר)
        date_iso = None
        m_date = DATE_RE.search(context_forward) or DATE_RE.search(context_window)
        if m_date:
            d, mo, y = m_date.groups()
            d = int(d)
            mo = int(mo)
            if len(y) == 2:
                y = "20" + y  # 24 -> 2024
            y = int(y)
            date_iso = f"{y:04d}-{mo:02d}-{d:02d}"

        dep_dt = arr_dt = ""
        if date_iso and dep_time and arr_time:
            dep_dt = f"{date_iso}T{dep_time}"
            arr_dt = f"{date_iso}T{arr_time}"

        seg = {
            "airline_code": "",
            "flight_number": "",
            "pnr": "",
            "ticket_number": "",
            "departure_city": "",
            "arrival_city": "",
            "departure_airport": dep_code,
            "arrival_airport": arr_code,
            "departure_datetime_local": dep_dt,
            "arrival_datetime_local": arr_dt,
            "booking_class": "",
            "baggage_allowance": "",
            "duration": "",
            "seat": "",
            "gate": "",
        }
        segments.append(seg)

    return segments


def post_process_trip(raw_text: str, trip: dict) -> dict:
    """שכבת ה-V2.5: מנרמלת, משלימה שדות חסרים, ואם צריך – בונה סגמנטים בסיסיים מהטקסט."""
    trip = _normalize_trip(trip)
    _infer_pnr_from_text(raw_text, trip)
    _infer_ticket_from_text_if_missing(raw_text, trip)
    _propagate_single_ticket_number(trip)
    _compute_duration_from_datetimes(trip)

    # אם אין בכלל סגמנטים, או שהסגמנט היחיד ריק כמעט לחלוטין – ננסה לחלץ בצורה בסיסית
    if not trip["segments"] or all(
        not any(
            seg.get(k)
            for k in [
                "departure_airport",
                "arrival_airport",
                "departure_datetime_local",
                "arrival_datetime_local",
                "airline_code",
                "flight_number",
            ]
        )
        for seg in trip["segments"]
    ):
        basic_segments = extract_basic_segments_from_text(raw_text)
        if basic_segments:
            trip["segments"] = basic_segments
            # אחרי שבנינו סגמנטים – אפשר שוב לנסות לחשב משכים
            _compute_duration_from_datetimes(trip)

    return trip



# ============== main LLM call ==============

def call_llm(raw_text: str) -> dict:
    """קורא ל-Gemini דרך ask_gemini ומחזיר Trip מעובד.
       לעולם לא זורק חריגה – תמיד מחזיר JSON.
    """
    prompt = build_prompt(raw_text)

    try:
        response = ask_gemini(prompt)
    except Exception as e:
        return {
            "error": f"LLM call failed: {e!r}",
            "passengers": [],
            "segments": [],
            "meta": {"raw_source_type": "text"},
        }

    # ננסה לחלץ בלוק JSON מתוך התשובה
    try:
        text = response.strip()
        m = re.search(r"\{[\s\S]*\}", text)
        if not m:
            raise ValueError("No JSON object found in model response")
        json_str = m.group(0)
        data = json.loads(json_str)
    except Exception as e:
        return {
            "error": f"Failed to parse JSON: {e!r}",
            "raw_response": response,
            "passengers": [],
            "segments": [],
            "meta": {"raw_source_type": "text"},
        }

    trip = post_process_trip(raw_text, data)
    return trip


def main():
    parser = argparse.ArgumentParser(description="Extract flight ticket data via Gemini LLM (V2)")
    parser.add_argument(
        "--text",
        required=True,
        help="Raw text of the ticket (already extracted from PDF/IMG)",
    )
    args = parser.parse_args()

    trip = call_llm(args.text)

    # חשוב: רק JSON, בלי טקסט נוסף
    print(json.dumps(trip, ensure_ascii=False))


if __name__ == "__main__":
    main()
