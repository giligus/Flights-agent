import re
from typing import Optional

# 💡 ייבוא רגיל, בלי הנקודה
from extract_raw_text import (
    OcrUnavailableError,
    detect_type,
    read_pdf,
    read_image,
    read_txt,
    read_docx,
)


def clean_for_flight_tickets(text: str) -> str:
    """
    ניקוי טקסט לכרטיסי טיסה:
    - הסרת תווי control מוזרים
    - שמירה על רווחים כפולים (לטבלאות From / To / Flight)
    - הסרת שורות ריקות לחלוטין
    """
    # להשאיר רק ASCII בסיסי + טאב/שורה חדשה (לזרוק לכלוך של OCR / כיווניות)
    text = re.sub(r"[^\x09\x0A\x0D\x20-\x7E]", " ", text)

    # נרמל סיומות שורה, אבל *לא* נאחד כמה רווחים לרווח אחד
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    lines = []
    for ln in text.splitlines():
        # נוריד רווחים מימין ושמאל, אבל נשאיר רווחים באמצע כמו שהם
        stripped = ln.rstrip()  # לא להשתמש ב-strip() כדי לא למחוק רווחים בתחילת הקו אם יש טבלה
        if stripped.strip():    # רק לוודא שהשורה לא ריקה לגמרי
            lines.append(stripped)

    return "\n".join(lines)



def extract_text_any(path: str, lang: str = "heb+eng", ocr_only: bool = False) -> str:
    """
    עטיפה על extract_raw_text.py לשימוש בכרטיסי טיסה.
    ברירת מחדל:
    - lang="heb+eng"  → כדי לזהות גם עברית וגם אנגלית
    - ocr_only=True   → כי טקסט native של PDFים של אלעל משובש
    """
    ftype = detect_type(path)

    if ftype == "txt":
        raw = read_txt(path)
    elif ftype == "docx":
        raw = read_docx(path)
    elif ftype == "pdf":
        raw = read_pdf(
            path,
            lang=lang,          # ← עברית + אנגלית
            ocr_only=ocr_only,
            min_native_chars=50,
        )
    elif ftype == "image":
        raw = read_image(path, lang)
    else:
        try:
            raw = read_txt(path)
        except Exception:
            raw = ""

    if raw is None:
        raw = ""

    return clean_for_flight_tickets(raw)
