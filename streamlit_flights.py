import json
import os
import tempfile
from html import escape
from pathlib import Path

import pandas as pd
import streamlit as st

from enrichment_flights import enrich_trip_with_airport_data
from extract_raw_text import OcrUnavailableError
from flight_text_extractor import extract_text_any
from parser_flights import parse_flight_ticket_text
from query_flight_ticket import call_llm
from travel_requirements import build_requirement_sources


DISPLAY_COLUMNS = {
    "full_name": "Passenger",
    "airline_code": "Airline",
    "flight_number": "Flight",
    "pnr": "PNR",
    "ticket_number": "Ticket",
    "departure_city": "From city",
    "arrival_city": "To city",
    "departure_airport": "From",
    "arrival_airport": "To",
    "departure_country_name": "Origin country",
    "arrival_country_name": "Destination country",
    "departure_country_code": "Origin code",
    "arrival_country_code": "Destination code",
    "departure_timezone": "Origin timezone",
    "arrival_timezone": "Destination timezone",
    "departure_datetime_local": "Departure",
    "arrival_datetime_local": "Arrival",
    "booking_class": "Class",
    "baggage_allowance": "Baggage",
    "duration": "Duration",
    "seat": "Seat",
    "gate": "Gate",
}


SAMPLE_TEXT = """Passenger : Reuven Anat Ms (ADT)
LY Booking code : YYLXCH
Ticket number : 1142491403549

From        To        Flight        Departure        Arrival
LARNACA LARNACA        TEL AVIV YAFO BEN GURION INTL
Terminal: 3        LY5136        00:50
01Jul2025        01:55
01Jul2025
Class :
Economy (Y)
Baggage :
2PC
Duration :
01:05
"""


def apply_theme() -> None:
    st.markdown(
        """
        <style>
        :root {
            --ink: #17202a;
            --muted: #5f6b7a;
            --line: #dde5ec;
            --surface: #ffffff;
            --soft: #f5f8fa;
            --teal: #167d7f;
            --coral: #d9674e;
            --gold: #b0822b;
        }

        .stApp {
            background:
                linear-gradient(180deg, #f7faf9 0%, #eef4f1 42%, #f9faf8 100%);
            color: var(--ink);
        }

        .block-container {
            max-width: 1180px;
            padding-top: 2rem;
            padding-bottom: 3rem;
        }

        h1, h2, h3 {
            letter-spacing: 0;
        }

        .app-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            border-bottom: 1px solid var(--line);
            padding-bottom: 1rem;
            margin-bottom: 1.25rem;
        }

        .app-title h1 {
            font-size: 2rem;
            line-height: 1.1;
            margin: 0;
            color: var(--ink);
        }

        .status-pill {
            border: 1px solid rgba(22, 125, 127, 0.28);
            color: var(--teal);
            background: rgba(22, 125, 127, 0.08);
            border-radius: 999px;
            padding: 0.35rem 0.75rem;
            font-size: 0.82rem;
            white-space: nowrap;
        }

        .panel {
            background: var(--surface);
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 14px 36px rgba(23, 32, 42, 0.07);
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.75rem;
            margin: 1rem 0;
        }

        .summary-tile {
            min-height: 94px;
            background: var(--surface);
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 0.85rem;
        }

        .summary-label {
            color: var(--muted);
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            margin-bottom: 0.4rem;
        }

        .summary-value {
            color: var(--ink);
            font-size: 1.15rem;
            font-weight: 700;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .segment-card {
            background: var(--surface);
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.75rem;
        }

        .requirement-card {
            background: var(--surface);
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.75rem;
        }

        .requirement-card a {
            color: var(--teal);
            font-weight: 700;
            text-decoration: none;
        }

        .requirement-note {
            color: var(--muted);
            font-size: 0.9rem;
            margin-top: 0.35rem;
        }

        .segment-route {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 0.85rem;
        }

        .airport-code {
            font-size: 1.55rem;
            line-height: 1;
            font-weight: 800;
            color: var(--ink);
        }

        .airport-city {
            color: var(--muted);
            font-size: 0.9rem;
            margin-top: 0.25rem;
            overflow-wrap: anywhere;
        }

        .route-line {
            flex: 1;
            min-width: 48px;
            border-top: 2px solid rgba(217, 103, 78, 0.52);
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.75rem;
        }

        .detail-label {
            color: var(--muted);
            font-size: 0.78rem;
        }

        .detail-value {
            color: var(--ink);
            font-weight: 650;
            overflow-wrap: anywhere;
        }

        div.stButton > button:first-child {
            width: 100%;
            border-radius: 8px;
            border: 1px solid #126a6c;
            background: #167d7f;
            color: white;
            font-weight: 700;
            min-height: 2.85rem;
        }

        div.stButton > button:first-child:focus,
        div.stButton > button:first-child:hover {
            border-color: #126a6c;
            box-shadow: 0 0 0 0.16rem rgba(22, 125, 127, 0.18);
            color: white;
        }

        div.stDownloadButton > button:first-child {
            border-radius: 8px;
            border: 1px solid var(--line);
            background: white;
            color: var(--ink);
            min-height: 2.5rem;
        }

        div[data-baseweb="tab-list"] {
            gap: 0.5rem;
        }

        div[data-baseweb="tab"] {
            border-radius: 8px 8px 0 0;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        @media (max-width: 900px) {
            .app-title {
                align-items: flex-start;
                flex-direction: column;
            }

            .summary-grid,
            .detail-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 620px) {
            .summary-grid,
            .detail-grid {
                grid-template-columns: 1fr;
            }

            .segment-route {
                align-items: flex-start;
            }

            .airport-code {
                font-size: 1.25rem;
            }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )


def display_value(value, fallback: str = "-") -> str:
    if value is None:
        return fallback
    text = str(value).strip()
    return text if text else fallback


def html_value(value, fallback: str = "-") -> str:
    return escape(display_value(value, fallback))


def format_datetime(value) -> str:
    text = display_value(value)
    if text == "-":
        return text
    text = text.replace("T", " ")
    if text.endswith(":00"):
        text = text[:-3]
    return text


def convert_headers(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [DISPLAY_COLUMNS.get(col, col) for col in df.columns]
    return df


def trip_to_dataframe(trip: dict) -> pd.DataFrame:
    passengers = trip.get("passengers", [])
    segments = trip.get("segments", [])
    full_name = ""

    if passengers:
        full_name = passengers[0].get("full_name", "")

    rows = []
    for seg in segments:
        rows.append(
            {
                "full_name": full_name,
                "airline_code": seg.get("airline_code", ""),
                "flight_number": seg.get("flight_number", ""),
                "pnr": seg.get("pnr", ""),
                "ticket_number": seg.get("ticket_number", ""),
                "departure_city": seg.get("departure_city", ""),
                "arrival_city": seg.get("arrival_city", ""),
                "departure_airport": seg.get("departure_airport", ""),
                "arrival_airport": seg.get("arrival_airport", ""),
                "departure_country_name": seg.get("departure_country_name", ""),
                "arrival_country_name": seg.get("arrival_country_name", ""),
                "departure_country_code": seg.get("departure_country_code", ""),
                "arrival_country_code": seg.get("arrival_country_code", ""),
                "departure_timezone": seg.get("departure_timezone", ""),
                "arrival_timezone": seg.get("arrival_timezone", ""),
                "departure_datetime_local": seg.get("departure_datetime_local", ""),
                "arrival_datetime_local": seg.get("arrival_datetime_local", ""),
                "booking_class": seg.get("booking_class", ""),
                "baggage_allowance": seg.get("baggage_allowance", ""),
                "duration": seg.get("duration", ""),
                "seat": seg.get("seat", ""),
                "gate": seg.get("gate", ""),
            }
        )

    return pd.DataFrame(rows, columns=list(DISPLAY_COLUMNS.keys()))


def build_summary(trip: dict) -> dict:
    passengers = trip.get("passengers", [])
    segments = trip.get("segments", [])
    first_segment = segments[0] if segments else {}
    last_segment = segments[-1] if segments else {}

    passenger = "-"
    if passengers:
        passenger = display_value(passengers[0].get("full_name"))

    route = "-"
    if first_segment or last_segment:
        start = display_value(first_segment.get("departure_airport"))
        end = display_value(last_segment.get("arrival_airport"))
        route = f"{start} to {end}" if start != "-" or end != "-" else "-"

    flight = "-"
    airline = display_value(first_segment.get("airline_code"), "")
    number = display_value(first_segment.get("flight_number"), "")
    if airline or number:
        flight = f"{airline} {number}".strip()

    return {
        "Passenger": passenger,
        "Route": route,
        "Segments": str(len(segments)),
        "First flight": flight,
    }


def render_header() -> None:
    st.markdown(
        """
        <div class="app-title">
            <div>
                <h1>Flights Agent</h1>
            </div>
            <div class="status-pill">Flight booking parser</div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_summary(summary: dict) -> None:
    columns = st.columns(len(summary))
    for column, (label, value) in zip(columns, summary.items()):
        with column:
            st.markdown(
                f"""
                <div class="summary-tile">
                    <div class="summary-label">{escape(label)}</div>
                    <div class="summary-value">{escape(value)}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )


def render_segment_cards(trip: dict) -> None:
    segments = trip.get("segments", [])
    if not segments:
        st.info("No flight segments were detected.")
        return

    for index, seg in enumerate(segments, start=1):
        dep_code = html_value(seg.get("departure_airport"))
        arr_code = html_value(seg.get("arrival_airport"))
        dep_city = html_value(seg.get("departure_city"))
        arr_city = html_value(seg.get("arrival_city"))
        flight = " ".join(
            part
            for part in [
                display_value(seg.get("airline_code"), ""),
                display_value(seg.get("flight_number"), ""),
            ]
            if part
        )

        st.markdown(
            f"""
            <div class="segment-card">
                <div class="summary-label">Segment {index}</div>
                <div class="segment-route">
                    <div>
                        <div class="airport-code">{dep_code}</div>
                        <div class="airport-city">{dep_city}</div>
                    </div>
                    <div class="route-line"></div>
                    <div style="text-align: right;">
                        <div class="airport-code">{arr_code}</div>
                        <div class="airport-city">{arr_city}</div>
                    </div>
                </div>
                <div class="detail-grid">
                    <div>
                        <div class="detail-label">Flight</div>
                        <div class="detail-value">{html_value(flight)}</div>
                    </div>
                    <div>
                        <div class="detail-label">Departure</div>
                        <div class="detail-value">{html_value(format_datetime(seg.get("departure_datetime_local")))}</div>
                    </div>
                    <div>
                        <div class="detail-label">Arrival</div>
                        <div class="detail-value">{html_value(format_datetime(seg.get("arrival_datetime_local")))}</div>
                    </div>
                    <div>
                        <div class="detail-label">PNR</div>
                        <div class="detail-value">{html_value(seg.get("pnr"))}</div>
                    </div>
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )


def render_requirements(trip: dict) -> None:
    sources = build_requirement_sources(trip)
    route = " / ".join(
        f"{segment['departure_airport'] or '-'} to {segment['arrival_airport'] or '-'}"
        for segment in sources["route_segments"]
    ) or "-"
    destination = sources["destination_name"]

    st.info(
        "Travel requirements depend on citizenship, passport type, residence permits, transit, "
        "stay length, and current rules. Use the official checkers below before travel."
    )

    st.markdown(
        f"""
        <div class="requirement-card">
            <div class="summary-label">Route basis</div>
            <div class="summary-value">{html_value(route)} / {html_value(destination)}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown("#### Official checkers")
    for source in sources["global_checkers"]:
        st.markdown(
            f"""
            <div class="requirement-card">
                <a href="{source['url']}" target="_blank" rel="noopener noreferrer">{html_value(source['label'])}</a>
                <div class="requirement-note">{html_value(source['note'])}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    if sources["destination_sources"]:
        st.markdown("#### Destination government sources")
        for source in sources["destination_sources"]:
            st.markdown(
                f"""
                <div class="requirement-card">
                    <a href="{source['url']}" target="_blank" rel="noopener noreferrer">{html_value(source['label'])}</a>
                    <div class="requirement-note">{html_value(source['note'])}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown("#### Needed passenger inputs")
    st.markdown("\n".join(f"- {item}" for item in sources["required_inputs"]))


def extract_from_upload(uploaded_file) -> str:
    suffix = Path(uploaded_file.name).suffix
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(uploaded_file.read())
        tmp_path = tmp.name

    try:
        return extract_text_any(tmp_path, lang="heb+eng", ocr_only=False)
    finally:
        Path(tmp_path).unlink(missing_ok=True)


def parse_trip(raw_text: str) -> dict:
    if not (os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")):
        fallback_trip = parse_flight_ticket_text(raw_text)
        fallback_trip["warning"] = "Using local parser fallback."
        return enrich_trip_with_airport_data(fallback_trip)

    trip = call_llm(raw_text)
    if not isinstance(trip, dict):
        return {"passengers": [], "segments": [], "error": "Parser returned an invalid response."}

    if trip.get("error"):
        fallback_trip = parse_flight_ticket_text(raw_text)
        fallback_trip["warning"] = "Using local parser fallback."
        return enrich_trip_with_airport_data(fallback_trip)

    return enrich_trip_with_airport_data(trip)


def render_results(trip: dict, raw_text: str) -> None:
    error = trip.get("error")
    if error:
        st.error(error)

    warning = trip.get("warning")
    if warning:
        st.warning(warning)

    render_summary(build_summary(trip))

    tab_itinerary, tab_requirements, tab_table, tab_data = st.tabs(
        ["Itinerary", "Requirements", "Table", "Data"]
    )

    with tab_itinerary:
        render_segment_cards(trip)

    with tab_requirements:
        render_requirements(trip)

    with tab_table:
        df = convert_headers(trip_to_dataframe(trip))
        st.dataframe(df, use_container_width=True, hide_index=True)

    with tab_data:
        json_text = json.dumps(trip, ensure_ascii=False, indent=2)
        st.download_button(
            "Download JSON",
            data=json_text,
            file_name="flight_trip.json",
            mime="application/json",
        )
        st.json(trip)
        with st.expander("Raw extracted text"):
            st.text_area("Raw text", raw_text, height=220, label_visibility="collapsed")


def main() -> None:
    st.set_page_config(page_title="Flights Agent", layout="wide")
    apply_theme()
    render_header()

    if "trip" not in st.session_state:
        st.session_state.trip = None
    if "raw_text" not in st.session_state:
        st.session_state.raw_text = ""

    left, right = st.columns([0.9, 1.35], gap="large")

    with left:
        st.subheader("Source")

        input_mode = st.radio(
            "Input mode",
            options=["Paste text", "Upload file"],
            index=0,
            horizontal=True,
        )

        uploaded_file = None
        raw_text_input = ""

        if input_mode == "Paste text":
            raw_text_input = st.text_area(
                "Ticket text",
                value=SAMPLE_TEXT,
                height=280,
            )
        else:
            uploaded_file = st.file_uploader(
                "Ticket file",
                type=["pdf", "txt", "jpg", "jpeg", "png"],
            )

        parse_clicked = st.button("Analyze ticket", type="primary")

    with right:
        st.subheader("Flight page")

        if parse_clicked:
            if input_mode == "Upload file":
                if uploaded_file is None:
                    st.warning("Upload a ticket file first.")
                    return
                with st.spinner("Extracting ticket text..."):
                    try:
                        raw_text = extract_from_upload(uploaded_file)
                    except OcrUnavailableError as ex:
                        st.error(str(ex))
                        st.info(
                            "For Windows local runs, install Tesseract OCR and make sure "
                            "`tesseract.exe` is on PATH, or set `TESSERACT_CMD` to its full path. "
                            "The GitHub/Streamlit deployment uses `packages.txt` to install OCR."
                        )
                        return
            else:
                raw_text = raw_text_input.strip()
                if not raw_text:
                    st.warning("Paste ticket text first.")
                    return

            with st.spinner("Building the flight page..."):
                st.session_state.raw_text = raw_text
                st.session_state.trip = parse_trip(raw_text)

        if st.session_state.trip:
            render_results(st.session_state.trip, st.session_state.raw_text)
        else:
            st.markdown(
                """
                <div class="panel">
                    <div class="summary-label">Ready</div>
                    <div class="summary-value">Add a ticket source to generate the flight page.</div>
                </div>
                """,
                unsafe_allow_html=True,
            )


if __name__ == "__main__":
    main()
