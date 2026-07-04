import io
from typing import BinaryIO

from PyPDF2 import PdfReader
from pdf2image import convert_from_bytes
from PIL import Image
import pytesseract

def looks_like_garbled_pdf_text(text: str) -> bool:
    """
    Heuristic to detect 'garbled' text from PDFs (wrong font encoding),
    e.g. '3DVVHQJHU' instead of 'Passenger'.

    Returns True if the text looks broken and we should prefer OCR.
    """
    if not text:
        return True

    printable_chars = [c for c in text if c.isprintable() and not c.isspace()]
    if not printable_chars:
        return True

    letters = sum(c.isalpha() for c in printable_chars)
    digits = sum(c.isdigit() for c in printable_chars)
    total = len(printable_chars)

    letter_ratio = letters / total

    # מעט מדי אותיות → כנראה זבל
    if letter_ratio < 0.3:
        return True

    weird = sum(
        1 for c in printable_chars
        if not (c.isalpha() or c.isdigit() or c in ".,:/-()[]")
    )
    weird_ratio = weird / total
    if weird_ratio > 0.4:
        return True

    return False


def extract_text_from_pdf(file_obj: BinaryIO) -> str:
    """
    Extracts text from a PDF file-like object.

    1. First tries normal text extraction (digital PDFs) with PyPDF2.
    2. If text is too short OR looks garbled (wrong font encoding),
       falls back to OCR on each page using pdf2image + pytesseract.
    """
    # נקרא את הבייטים פעם אחת – גם ל-PyPDF2 וגם ל-OCR
    file_bytes = file_obj.read()

    # ---------- 1) ניסיון ראשון: טקסט רגיל ----------
    all_text = []
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            page_text = page.extract_text() or ""
            all_text.append(page_text)
    except Exception:
        # אם PyPDF2 נופל – נעבור ישר ל-OCR
        pass

    text = "\n\n".join(all_text).strip()

    # אם הטקסט נראה “נורמלי” – משתמשים בו
    if len(text) > 50 and not looks_like_garbled_pdf_text(text):
        return text

    # ---------- 2) Fallback: OCR ----------
    try:
        # ממירים כל עמוד לתמונה ברזולוציה גבוהה
        images = convert_from_bytes(file_bytes, dpi=300)
    except Exception:
        # אם OCR נפל – לפחות נחזיר את מה שיש
        return text or ""

    ocr_texts = []
    for img in images:
        page_ocr = pytesseract.image_to_string(
            img,
            lang="eng",          # אפשר "eng+heb" אם מותקנת עברית ב-Tesseract
            config="--psm 6"     # מצב: בלוק טקסט רגיל
        )
        ocr_texts.append(page_ocr)

    ocr_result = "\n\n".join(ocr_texts).strip()

    return ocr_result or text or ""



def extract_text_from_image(file_obj: BinaryIO) -> str:
    """
    Extracts text from an image (JPG/PNG) using Tesseract OCR.
    """
    image = Image.open(file_obj)
    # שוב – language ניתן להרחבה: "eng+heb" אם מותקנות חבילות מתאימות
    text = pytesseract.image_to_string(image, lang="eng")
    return text.strip()
