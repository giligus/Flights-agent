# Flight Ticket Parser

MVP for extracting structured trip data from flight tickets, booking confirmations, PDFs, and screenshots.

The current app accepts pasted text or uploaded files, extracts/OCRs the raw content, calls a flight-ticket parser, enriches airport metadata, and displays the result in Streamlit.

## Current Flow

1. Ingest a flight ticket source: PDF, image, TXT, or pasted text.
2. Extract raw text with native PDF extraction or OCR.
3. Parse the ticket into a normalized `Trip` object with passengers and flight segments.
4. Enrich segments with airport/country/timezone metadata.
5. Present JSON and a table in the Streamlit UI.

## Core Files

- `streamlit_flights.py` - Streamlit UI for upload/paste and result display.
- `flight_text_extractor.py` - text extraction wrapper for flight tickets.
- `extract_raw_text.py` - PDF, image, TXT, and DOCX text extraction utilities.
- `query_flight_ticket.py` - Gemini-backed extraction and post-processing.
- `parser_flights.py` - local rule-based parsing helpers.
- `enrichment_flights.py` - airport metadata enrichment.
- `airports_data.py` - local airport lookup data.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Set `GEMINI_API_KEY` in `.env` or in the process environment before using the LLM-backed parser.

For OCR, install Tesseract locally and make sure it is available on `PATH`, or configure the Tesseract path in the extraction layer.

## Run

```powershell
streamlit run streamlit_flights.py
```

## Deploy From GitHub

GitHub stores the app code, but GitHub Pages cannot run this app because it is a Python/Streamlit server. To make it public, deploy the GitHub repo through Streamlit Community Cloud or another Python app host.

### Streamlit Community Cloud

Use these settings:

- Repository: `giligus/Flights-agent`
- Branch: `main`
- Main file path: `streamlit_flights.py`
- Python runtime: `python-3.11` from `runtime.txt`
- System packages: `packages.txt` installs Tesseract for OCR

Optional app secret:

```toml
GEMINI_API_KEY = "your-key-here"
```

The app still runs without `GEMINI_API_KEY` by using the local parser fallback. Add the secret only when you want the Gemini-backed extraction path in the deployed app.

## Notes For GitHub

The repository intentionally ignores local secrets, uploaded tickets, screenshots, PDFs, backups, and Python cache files. Keep real passenger data out of git unless it is fully sanitized.

