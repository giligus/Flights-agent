import os
import tempfile
import streamlit as st
import pandas as pd
import subprocess
import json

from flight_text_extractor import extract_text_any          # OCR חדש
from parser_flights import parse_flight_ticket_text         # Parser המקורי
from enrichment_flights import enrich_trip_with_airport_data  # העשרה


HEBREW_HEADERS = {
    "full_name": "שם נוסע",
    "airline_code": "קוד חברת תעופה",
    "flight_number": "מספר טיסה",
    "pnr": "קוד הזמנה (PNR)",
    "ticket_number": "מספר כרטיס טיסה",
    "departure_city": "עיר יציאה",
    "arrival_city": "עיר יעד",
    "departure_airport": "שדה יציאה (IATA)",
    "arrival_airport": "שדה נחיתה (IATA)",
    "departure_country_name": "מדינת יציאה",
    "arrival_country_name": "מדינת יעד",
    "departure_country_code": "קוד מדינת יציאה",
    "arrival_country_code": "קוד מדינת יעד",
    "departure_timezone": "אזור זמן יציאה",
    "arrival_timezone": "אזור זמן יעד",
    "departure_datetime_local": "זמן המראה",
    "arrival_datetime_local": "זמן נחיתה",
    "booking_class": "מחלקה",
    "baggage_allowance": "כבודה",
    "duration": "משך טיסה",
    "seat": "מושב",
    "gate": "שער עלייה למטוס",
}


def convert_headers(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [HEBREW_HEADERS.get(col, col) for col in df.columns]
    return df


def trip_to_dataframe(trip: dict) -> pd.DataFrame:
    """
    מקבל אובייקט trip מ-parse_flight_ticket_text + enrich_trip_with_airport_data
    ומחזיר DataFrame עם שורה לכל קטע טיסה (segment).
    """
    passengers = trip.get("passengers", [])
    segments = trip.get("segments", [])
     # הערכים נמצאים ברמת ה-segment, לא ברמת ה-trip
    # נמשוך מה-segment עצמו בתוך הלולאה

    # כרגע נניח נוסע אחד עיקרי – אם תרצה נתמוך בריבוי נוסעים אחר כך
    full_name = None
    if passengers:
        full_name = passengers[0].get("full_name")

    rows = []
    for seg in segments:
        row = {
            "full_name": full_name,
            "airline_code": seg.get("airline_code"),
            "flight_number": seg.get("flight_number"),
            "pnr": seg.get("pnr"),
            "ticket_number": seg.get("ticket_number"),
            "departure_city": seg.get("departure_city"),
            "arrival_city": seg.get("arrival_city"),
            "departure_airport": seg.get("departure_airport"),
            "arrival_airport": seg.get("arrival_airport"),
            "departure_country_name": seg.get("departure_country_name"),
            "arrival_country_name": seg.get("arrival_country_name"),
            "departure_country_code": seg.get("departure_country_code"),
            "arrival_country_code": seg.get("arrival_country_code"),
            "departure_timezone": seg.get("departure_timezone"),
            "arrival_timezone": seg.get("arrival_timezone"),
            "departure_datetime_local": seg.get("departure_datetime_local"),
            "arrival_datetime_local": seg.get("arrival_datetime_local"),
            "booking_class": seg.get("booking_class"),
            "baggage_allowance": seg.get("baggage_allowance"),
            "duration": seg.get("duration"),
            "seat": seg.get("seat"),
            "gate": seg.get("gate"),
        }
        rows.append(row)


    if not rows:
        return pd.DataFrame(columns=list(HEBREW_HEADERS.keys()))

    return pd.DataFrame(rows)


def main():
    st.set_page_config(page_title="Flight Ticket Parser", layout="wide")
    st.title("✈️ סוכן טיסות – חילוץ וניתוח כרטיסי טיסה")

    col_input, col_output = st.columns(2)

    with col_input:
        st.markdown("### מקור הנתונים")

        mode = st.radio(
            "איך תרצה לספק את הכרטיס?",
            options=["הדבקת טקסט", "העלאת קובץ (PDF / תמונה / TXT)"],
            index=0,
            horizontal=True,
        )

        sample_text = """
Passenger : Reuven Anat Ms (ADT)
LY Booking code : YYLXCH
Ticket LY315  TLV  LHR 10 MAR 25 10:00
"""

        uploaded_file = None
        raw_text_input = ""

        if mode == "הדבקת טקסט":
            raw_text_input = st.text_area(
                "טקסט של כרטיס טיסה / אישור הזמנה",
                value=sample_text,
                height=260,
            )
        else:
            uploaded_file = st.file_uploader(
                "העלה קובץ כרטיס (PDF / TXT / תמונה)",
                type=["pdf", "txt", "jpg", "jpeg", "png"],
            )

        parse_button = st.button("🔍 ניתוח הכרטיס")

    with col_output:
        if parse_button:
            extracted_text = None

            # מצב העלאת קובץ – משתמשים ב-OCR החדש
            if mode == "העלאת קובץ (PDF / תמונה / TXT)":
                if uploaded_file is None:
                    st.warning("נא להעלות קובץ קודם.")
                    return

                suffix = ""
                if "." in uploaded_file.name:
                    suffix = "." + uploaded_file.name.split(".")[-1]

                with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                    tmp.write(uploaded_file.read())
                    tmp_path = tmp.name

                extracted_text = extract_text_any(tmp_path, lang="eng", ocr_only=True)

            # מצב הדבקת טקסט – אין צורך ב-OCR
            else:
                if not raw_text_input.strip():
                    st.warning("נא להדביק טקסט קודם.")
                    return
                extracted_text = raw_text_input

            # הצגת הטקסט לאחר ניקוי
            st.subheader("טקסט לאחר חילוץ / ניקוי")
            st.text_area("Raw text", extracted_text, height=200)
            st.write("DEBUG: GEMINI_API_KEY inside app:", bool(os.environ.get("GEMINI_API_KEY")))

            # שלב 2: Parser מקורי
            # 2 שלב: קריאה ל-LLM דרך query_flight_ticket.py
            cmd = [
                "python",
                "query_flight_ticket.py",
                "--text",
                extracted_text,
            ]

            try:
                output = subprocess.check_output(
                    cmd,
                    text=True,
                    stderr=subprocess.STDOUT,  # אם יש הודעת שגיאה – נקבל אותה ב-output
                )
            except subprocess.CalledProcessError as e:
                st.error("שגיאה בהרצת query_flight_ticket.py")
                st.code(e.output)
                return

            # כאן output הוא JSON של Trip (מהקובץ query_flight_ticket.py)
            trip = json.loads(output)

            # שלב 3: העשרה עם נתוני שדות תעופה
            trip_enriched = enrich_trip_with_airport_data(trip)


            st.subheader("אובייקט Trip (JSON לאחר העשרה)")
            st.json(trip_enriched)

            # שלב 4: הפיכה לטבלה + כותרות בעברית
            df = trip_to_dataframe(trip_enriched)
            if df.empty:
                st.warning("לא זוהו קטעי טיסה מהטקסט.")
            else:
                st.subheader("טבלת קטעי טיסה")
                df_he = convert_headers(df)
                st.dataframe(df_he, use_container_width=True)


if __name__ == "__main__":
    main()
