#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import sys
import os
import re
import shutil
from typing import Optional

# PDF text (native) extraction
from pypdf import PdfReader

# PDF rasterization for OCR and general fast PDF ops
import fitz  # PyMuPDF

# Images & OCR
from PIL import Image
import pytesseract

# DOCX
try:
    from docx import Document
except Exception:
    Document = None

# RTL display helpers (optional)
try:
    from bidi.algorithm import get_display as bidi_get_display
except Exception:
    bidi_get_display = None

RLM = "\u200f"  # Right-to-Left Mark (U+200F)


class OcrUnavailableError(RuntimeError):
    """Raised when an input needs OCR but Tesseract is not installed."""


def discover_tesseract_cmd() -> Optional[str]:
    configured = os.getenv("TESSERACT_CMD")
    if configured and os.path.exists(configured):
        return configured

    on_path = shutil.which("tesseract")
    if on_path:
        return on_path

    common_paths = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
    ]
    for path in common_paths:
        if os.path.exists(path):
            return path
    return None


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def read_txt(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def read_docx(path: str) -> str:
    if Document is None:
        raise RuntimeError("python-docx is not installed. Run: pip install python-docx")
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs])


def pdf_text_native(path: str) -> str:
    """Extract text from PDF text layer using pypdf (fast, no OCR)."""
    try:
        reader = PdfReader(path)
        chunks = []
        for page in reader.pages:
            chunks.append(page.extract_text() or "")
        return "\n".join(chunks).strip()
    except Exception as ex:
        eprint(f"[warn] Native PDF text extraction failed: {ex}")
        return ""


def looks_like_garbled_pdf_text(text: str) -> bool:
    if not text:
        return True

    compact = "".join(c for c in text if c.isprintable() and not c.isspace())
    if not compact:
        return True

    markers = ("Passenger", "Ticket", "Booking", "Flight", "From", "To", "Departure", "Arrival")
    if any(marker.lower() in text.lower() for marker in markers):
        return False

    weird = sum(1 for c in compact if not (c.isalpha() or c.isdigit() or c in ".,:/-()[]"))
    weird_ratio = weird / len(compact)
    encoded_runs = len(re.findall(r"[A-Z][a-z]?[0-9]|[0-9][A-Z]{2,}", compact))
    return weird_ratio > 0.35 or encoded_runs > 10


def pdf_to_images_for_ocr(path: str, dpi: int = 300):
    """Yield PIL images for every page (rendered) to feed OCR."""
    with fitz.open(path) as doc:
        for page_index in range(len(doc)):
            page = doc[page_index]
            mat = fitz.Matrix(dpi / 72.0, dpi / 72.0)  # scale to target DPI
            pix = page.get_pixmap(matrix=mat, alpha=False)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            yield img


def ocr_image(img: Image.Image, lang: str) -> str:
    if not discover_tesseract_cmd():
        raise OcrUnavailableError(
            "OCR is required for this file, but Tesseract is not installed or is not on PATH. "
            "Install Tesseract OCR or set TESSERACT_CMD to the full tesseract.exe path."
        )
    try:
        return pytesseract.image_to_string(img, lang=lang)
    except pytesseract.TesseractNotFoundError as ex:
        raise OcrUnavailableError(
            "OCR is required for this file, but Tesseract is not installed or is not on PATH. "
            "Install Tesseract OCR or set TESSERACT_CMD to the full tesseract.exe path."
        ) from ex


def read_image(path: str, lang: str) -> str:
    img = Image.open(path)
    return ocr_image(img, lang)


def read_pdf(path: str, lang: str, ocr_only: bool = False, min_native_chars: int = 50) -> str:
    """
    If not ocr_only: try native text first; if it's too short, fall back to OCR.
    """
    if not ocr_only:
        native = pdf_text_native(path)
        if len(native) >= min_native_chars and not looks_like_garbled_pdf_text(native):
            return native

    # OCR path
    texts = []
    for img in pdf_to_images_for_ocr(path):
        texts.append(ocr_image(img, lang))
    return "\n".join(texts).strip()


def detect_type(path: str) -> str:
    ext = os.path.splitext(path)[1].lower()
    if ext in [".txt", ".log", ".md", ".csv"]:
        return "txt"
    if ext in [".docx"]:
        return "docx"
    if ext in [".pdf"]:
        return "pdf"
    if ext in [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp", ".webp"]:
        return "image"
    return "unknown"


def ensure_tesseract_path(tesseract_cmd: Optional[str]):
    discovered = tesseract_cmd or discover_tesseract_cmd()
    if discovered:
        pytesseract.pytesseract.tesseract_cmd = discovered


# ---------- RTL helpers ----------
def fix_rtl_for_display(text: str) -> str:
    """
    Reorders text using the BiDi algorithm for correct RTL display in LTR terminals.
    Preserves line breaks. No effect if python-bidi isn't installed.
    """
    if not bidi_get_display:
        return text
    lines = text.splitlines()
    fixed = []
    for ln in lines:
        fixed.append(bidi_get_display(ln))
    return "\n".join(fixed)


def add_rtl_marks(text: str) -> str:
    """
    Prepends a Right-to-Left mark to each non-empty line.
    Useful when viewing in editors that mis-handle bidi.
    """
    out_lines = []
    for ln in text.splitlines():
        out_lines.append((RLM + ln) if ln.strip() else ln)
    return "\n".join(out_lines)
# ---------------------------------


def main():
    parser = argparse.ArgumentParser(
        description="Read a document and print RAW text only (no UI, no post-processing)."
    )
    parser.add_argument("path", help="Path to input file (PDF/IMG/DOCX/TXT).")
    parser.add_argument(
        "--lang",
        default="heb+eng",
        help="Tesseract languages (default: heb+eng). Examples: 'eng', 'heb', 'heb+eng'.",
    )
    parser.add_argument(
        "--ocr-only",
        action="store_true",
        help="Force OCR even for PDFs with native text."
    )
    parser.add_argument(
        "--no-ocr",
        action="store_true",
        help="Disable OCR fallback. For PDFs, only native text will be extracted."
    )
    parser.add_argument(
        "--tesseract-cmd",
        default=None,
        help="Full path to tesseract executable if not on PATH."
    )
    parser.add_argument(
        "--min-native-chars",
        type=int,
        default=50,
        help="If native PDF text has fewer than this many characters, fall back to OCR (unless --no-ocr)."
    )
    parser.add_argument(
        "--rtl-display",
        action="store_true",
        help="Reorder output with the BiDi algorithm for correct RTL display in terminals."
    )
    parser.add_argument(
        "--rtl-mark",
        action="store_true",
        help="Prepend a Right-to-Left mark to each non-empty line (useful for editors)."
    )

    args = parser.parse_args()

    path = args.path
    if not os.path.exists(path):
        eprint(f"[error] File not found: {path}")
        sys.exit(1)

    ensure_tesseract_path(args.tesseract_cmd)

    ftype = detect_type(path)
    try:
        if ftype == "txt":
            text = read_txt(path)
        elif ftype == "docx":
            text = read_docx(path)
        elif ftype == "pdf":
            if args.no_ocr:
                text = pdf_text_native(path)
            else:
                text = read_pdf(path, lang=args.lang, ocr_only=args.ocr_only, min_native_chars=args.min_native_chars)
        elif ftype == "image":
            if args.no_ocr:
                eprint("[error] --no-ocr specified but input is an image; OCR is required for images.")
                sys.exit(2)
            text = read_image(path, args.lang)
        else:
            # Try reading as UTF-8 text; if fails, inform user.
            try:
                text = read_txt(path)
            except Exception:
                eprint("[error] Unsupported file type and not a plain text file.")
                sys.exit(3)

        if text is None:
            text = ""

        # Optional RTL post-processing
        if args.rtl_display:
            text = fix_rtl_for_display(text)
        if args.rtl_mark:
            text = add_rtl_marks(text)

        # Print RAW (possibly RTL-adjusted) text to stdout only
        print(text)

    except Exception as ex:
        eprint(f"[error] Failed to extract text: {ex}")
        sys.exit(4)


if __name__ == "__main__":
    main()
