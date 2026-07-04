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

On Windows, scanned PDFs and image uploads require Tesseract OCR. If it is installed outside `PATH`, set:

```powershell
$env:TESSERACT_CMD = "C:\Program Files\Tesseract-OCR\tesseract.exe"
```

Digital PDFs with a usable text layer are parsed without OCR. Garbled airline PDFs and photos need OCR.

## Run

```powershell
streamlit run streamlit_flights.py
```

## Deploy From GitHub

This repo supports two public deployment paths:

1. GitHub Pages static app
   - URL after Pages is enabled: `https://giligus.github.io/Flights-agent/`
   - Source folder: `site/`
   - Workflow: `.github/workflows/deploy-pages.yml`
   - Runs directly in the browser with a local client-side parser.

2. Streamlit server app
   - Main file path: `streamlit_flights.py`
   - Supports the full Python flow and the optional Gemini-backed extraction path.

GitHub Pages cannot run the Python/Streamlit server directly, so the Pages version is a static browser app. Use Streamlit Community Cloud or another Python host for the full Streamlit runtime.

### GitHub Pages

The repo includes a GitHub Actions workflow that deploys the `site/` folder to GitHub Pages.

If the Pages URL is not live yet, open the repository settings:

1. Go to `Settings` -> `Pages`.
2. Set `Build and deployment` source to `GitHub Actions`.
3. Run or wait for the `Deploy GitHub Pages` workflow.

Public URL:

```text
https://giligus.github.io/Flights-agent/
```

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

## Travel Requirements

The app derives route legs from the parsed itinerary and shows passenger requirement checkers from TravelDoc/IATA plus official destination-government sources where known. Requirements are not finalized inside the app because visa and entry rules depend on citizenship, passport type, residence permits, transit details, travel date, and stay length.

## Notes For GitHub

The repository intentionally ignores local secrets, uploaded tickets, screenshots, PDFs, backups, and Python cache files. Keep real passenger data out of git unless it is fully sanitized.

