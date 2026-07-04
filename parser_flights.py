import re
from typing import Dict, Any, List, Optional, Tuple
from uuid import uuid4
from datetime import datetime

from airports_data import AIRPORTS_BY_IATA, CITY_KEYWORDS_TO_IATA

# Codes that should NOT be treated as airports
IATA_BLACKLIST = {
    "REF", "AIR", "INT", "INTL",
    "SUN", "DOR",  # SUN DOR airline – not airports
}


def clean_passenger_name(name: str) -> str:
    """
    Remove titles / extra tokens from passenger name, e.g. Ms, Mr, ADT, CHD, INF.
    """
    tokens_to_strip = {"MR", "MRS", "MS", "MISS", "MSTR", "MSS", "ADT", "CHD", "INF"}
    parts = [p for p in name.replace("  ", " ").split() if p.upper() not in tokens_to_strip]
    return " ".join(parts)


def parse_mixed_date(date_str: str, time_str: str) -> str | None:
    """
    Parse dates like 01Jul25 or 01Jul2025 with given time (HH:MM).
    Returns ISO string or None.
    """
    for fmt in ("%d%b%Y %H:%M", "%d%b%y %H:%M"):
        try:
            dt = datetime.strptime(f"{date_str} {time_str}", fmt)
            return dt.isoformat()
        except ValueError:
            continue
    return None

MONTHS = {
    "JAN": 1, "FEB": 2, "MAR": 3, "APR": 4,
    "MAY": 5, "JUN": 6, "JUL": 7, "AUG": 8,
    "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12,
}

def _parse_ddmmmyyyy_hhmm(s: str) -> str | None:
    m = re.match(r"(\d{2})([A-Z]{3})(\d{4})\s+(\d{2}):(\d{2})", s.strip(), flags=re.IGNORECASE)
    if not m:
        return None
    day = int(m.group(1))
    mon = MONTHS.get(m.group(2).upper())
    year = int(m.group(3))
    hour = int(m.group(4))
    minute = int(m.group(5))
    if not mon:
        return None
    dt = datetime(year, mon, day, hour, minute)
    return dt.isoformat(timespec="seconds")


def _normalize_iata(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    value = value.upper().strip()
    if value in IATA_BLACKLIST:
        return None
    return value if value in AIRPORTS_BY_IATA else None


def _ordered_iata_mentions(text: str) -> List[str]:
    upper = text.upper()
    mentions: List[Tuple[int, str]] = []

    for match in re.finditer(r"\(([A-Z]{3})\)", upper):
        iata = _normalize_iata(match.group(1))
        if iata:
            mentions.append((match.start(), iata))

    for keyword, iata in CITY_KEYWORDS_TO_IATA:
        start = upper.find(keyword)
        if start >= 0:
            mentions.append((start, iata))

    seen = set()
    ordered = []
    for _, iata in sorted(mentions, key=lambda item: item[0]):
        if iata not in seen:
            ordered.append(iata)
            seen.add(iata)
    return ordered


def _city_from_iata(iata: Optional[str]) -> Optional[str]:
    if not iata:
        return None
    meta = AIRPORTS_BY_IATA.get(iata)
    return meta["city"] if meta else None


def _clean_route_context(lines: List[str]) -> str:
    noise = re.compile(
        r"^(FROM|TO|FLIGHT|CLASS|OPERATED|MARKETED|BAGGAGE|BOOKING|FARE|DURATION|"
        r"SPECIAL|REQUEST|DOCS|TERMINAL\s*:?\s*\d*\s*)$",
        re.IGNORECASE,
    )
    cleaned = []
    for line in lines:
        line = re.sub(r"Terminal\s*:\s*\d+", " ", line, flags=re.IGNORECASE).strip()
        if line and not noise.match(line):
            cleaned.append(line)
    return "\n".join(cleaned)


def _parse_segment_datetimes(context: str) -> Tuple[Optional[str], Optional[str]]:
    date_matches = re.findall(r"\b(\d{1,2}[A-Za-z]{3}\d{2,4})\b", context)
    time_matches = re.findall(r"\b(\d{1,2}:\d{2})\b", context)

    if date_matches and time_matches:
        dep_date = date_matches[0]
        arr_date = date_matches[1] if len(date_matches) > 1 else dep_date
        dep_time = time_matches[0]
        arr_time = time_matches[1] if len(time_matches) > 1 else None
        return (
            parse_mixed_date(dep_date, dep_time),
            parse_mixed_date(arr_date, arr_time) if arr_time else None,
        )

    return None, None


def _extract_ticket_table_segments(text: str, pnr: Optional[str], ticket_number: Optional[str]) -> List[Dict[str, Any]]:
    lines = [line.strip() for line in text.replace("\t", "  ").splitlines() if line.strip()]
    segments: List[Dict[str, Any]] = []

    for index, line in enumerate(lines):
        flight_match = re.search(r"\b([A-Z]{2})\s?(\d{2,4})\b", line)
        if not flight_match:
            continue

        airline_code, flight_number = flight_match.groups()
        if airline_code in {"ID", "AP"}:
            continue

        before_lines = lines[max(0, index - 3):index]
        route_prefix = line[:flight_match.start()].strip()
        route_context = _clean_route_context(before_lines + [route_prefix])
        ordered_iatas = _ordered_iata_mentions(route_context)

        if len(ordered_iatas) < 2:
            wider_context = _clean_route_context(lines[max(0, index - 5):index + 2])
            ordered_iatas = _ordered_iata_mentions(wider_context)

        dep_iata = ordered_iatas[0] if ordered_iatas else None
        arr_iata = ordered_iatas[1] if len(ordered_iatas) > 1 else None

        after_context = "\n".join(lines[index:index + 20])
        dep_dt, arr_dt = _parse_segment_datetimes(after_context)

        duration_match = re.search(r"Duration\s*:\s*(\d{1,2}:\d{2})", after_context, flags=re.IGNORECASE)
        baggage_match = re.search(r"Baggage\s*:\s*([0-9A-Z ()]+)", after_context, flags=re.IGNORECASE)
        class_match = re.search(r"Economy\s*\(([A-Z])\)", after_context, flags=re.IGNORECASE)

        segments.append(
            {
                "airline_code": airline_code,
                "flight_number": flight_number,
                "pnr": pnr,
                "ticket_number": ticket_number,
                "departure_city": _city_from_iata(dep_iata),
                "arrival_city": _city_from_iata(arr_iata),
                "departure_airport": dep_iata,
                "arrival_airport": arr_iata,
                "departure_datetime_local": dep_dt,
                "arrival_datetime_local": arr_dt,
                "booking_class": class_match.group(1) if class_match else None,
                "baggage_allowance": baggage_match.group(1).strip() if baggage_match else None,
                "duration": duration_match.group(1) if duration_match else None,
                "seat": None,
                "gate": None,
            }
        )

    return segments


def parse_flight_ticket_text(raw_text: str) -> Dict[str, Any]:
    """
    Parser for flight ticket text.
    Extracts PNR, passenger name, airline, flight number, cities/airports,
    datetime, ticket number and more.
    """

    text = raw_text.replace("\r", "").strip()
    
    # אתחול ברירת מחדל – כדי שלא נקבל NameError גם אם הזיהוי נכשל
    departure_airport = None
    arrival_airport = None
    departure_city = None
    arrival_city = None
    departure_datetime_local = None
    arrival_datetime_local = None
    booking_class = None
    baggage_allowance = None
    duration = None
    seat = None
    gate = None
    ticket_number = None

    # ---------------------------
    # 1. Passengers (one or more)
    # ---------------------------
    passengers = []

    # נתחיל בלחפש שורות עם "Passenger"
    # לדוגמה: "Passenger : Reuven Anat Ms (ADT)"
    passengers = []

    # קודם נחפש את השורה הראשית של הנוסע:
    # לדוגמה: "Passenger: Gean Ariel Mr (ADT)"
    for line in text.splitlines():
        # עיגון לתחילת השורה – שלא נתפוס טקסטים משפטיים
        m = re.search(r"(?i)^\s*Passenger\s*[:\-]\s*([A-Za-z\s]+?)(?:\(|$)", line)
        if m:
            raw_name = m.group(1).strip()
            cleaned = clean_passenger_name(raw_name)
            if cleaned:
                passengers.append({"full_name": cleaned})
            # ברוב הכרטיסים יש נוסע אחד – נעצור אחרי הראשון
            break

    # Fallback: פורמט LAST/FIRST (למשל COHEN/ISRAEL) שמופיע בכרטיסים מסוימים
    if not passengers:
        for m in re.finditer(r"\b([A-Z]+\/[A-Z]+)\b", text):
            raw = m.group(1).replace("/", " ")
            cleaned = clean_passenger_name(raw)
            if cleaned and cleaned not in [p["full_name"] for p in passengers]:
                passengers.append({"full_name": cleaned})

    if not passengers:
        passengers.append({"full_name": None})


    # ---------------------------
    # 2. PNR (Booking reference)
    # ---------------------------
    pnr = None

    pnr_patterns = [
        r"BOOKING\s+REF(?:ERENCE)?\s*[:\-]\s*([A-Z0-9]{5,7})",
        r"BOOKING\s+CODE\s*[:\-]\s*([A-Z0-9]{5,7})",
        r"PNR\s*[:\-]\s*([A-Z0-9]{5,7})",
    ]

    for p in pnr_patterns:
        m = re.search(p, text, flags=re.IGNORECASE)
        if m:
            pnr = m.group(1)
            break

    # Fallback זהיר
    if not pnr:
        candidates = re.findall(r"\b([A-Z0-9]{6})\b", text)
        stopwords = {"ISRAEL", "AIRLINE", "AIRLINES", "PASSENGER", "TICKET", "BOARDING"}
        for c in candidates:
            if c not in stopwords:
                pnr = c
                break

    # ---------------------------
    # 3. Flight airline & number
    # ---------------------------
    airline_code = None
    flight_number = None

    # ניקח את כל המקטע בין "From  To  Flight" לבין "TICKET REMARKS" / "PAYMENT DETAILS"
    route_section = None
    m_route = re.search(
        r"From\s+To\s+Flight.*?(?=TICKET REMARKS|PAYMENT DETAILS|FARE DETAILS|LEGAL AND PASSENGER NOTICES|$)",
        text,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if m_route:
        route_section = m_route.group(0)
    else:
        route_section = text

    # נחפש דפוסים של שתי אותיות + 2–4 ספרות (למשל LY289, LY 388)
    flights = re.findall(r"\b([A-Z]{2})\s?(\d{2,4})\b", route_section)
    if flights:
        airline_code, flight_number = flights[0]  # כרגע רק הקטע הראשון
    else:
        # fallback – אם משום מה לא מצאנו בבלוק, נחפש בכל הטקסט
        m_any = re.search(r"\b([A-Z]{2})\s?(\d{2,4})\b", text)
        if m_any:
            airline_code, flight_number = m_any.groups()

    # ---------------------------
    # 4. Cities & Airports
    # ---------------------------
   
   

    # נאתר את שורת הכותרת "From   To   Flight", וניקח את השורה שאחריה
    m_header = re.search(r"From\s+To\s+Flight[^\n]*\n(.+)", text, flags=re.IGNORECASE)
    if m_header:
        cities_line = m_header.group(1).strip()
        tokens = cities_line.split()

        # תבנית כמו:
        # "LARNACA LARNACA TEL AVIV YAFO BEN GURION INTL"
        # כלומר מילה ראשונה מופיעה פעמיים (עיר + שדה)
        if len(tokens) >= 4 and tokens[1] == tokens[0]:
            departure_city = " ".join(tokens[:2])     # "LARNACA LARNACA"
            arrival_city = " ".join(tokens[2:])       # "TEL AVIV YAFO BEN GURION INTL"

        else:
            # ניסיון 1: אם יש 2+ רווחים ברצף – מפרידים לפיהם
            parts = re.split(r"\s{2,}", cities_line)
            if len(parts) >= 2:
                departure_city = parts[0].strip()
                arrival_city = parts[1].strip()
            else:
                # ניסיון 2: אם גם קוד הטיסה באותה שורה (פורמטים אחרים)
                m_inline = re.search(r"(.+?)\s+([A-Z]{2})\s?(\d{2,4})\b", cities_line)
                if m_inline:
                    cities_part = m_inline.group(1).strip()
                    city_tokens = cities_part.split()
                    # ננקה זנבות חשודים (מספרים, "Terminal", וכו')
                    while city_tokens and (
                        re.search(r"\d", city_tokens[-1])
                        or city_tokens[-1].upper().startswith("TERMINAL")
                    ):
                        city_tokens.pop()

                    if len(city_tokens) >= 2:
                        # בעיר יעד – ניקח את המילה האחרונה,
                        # כל מה שלפניה = עיר יציאה
                        arrival_city = city_tokens[-1]
                        departure_city = " ".join(city_tokens[:-1])
                    elif city_tokens:
                        departure_city = cities_part


    # כרגע אנחנו עדיין לא מזהים IATA מתוך השורה הזו
    # ולכן נשאיר departure_airport / arrival_airport = None
    # והעשרת השדות (enrichment_flights) תנסה להשלים אותם לפי עיר.


    # ---------------------------
    # 5. Dates / times
    # ---------------------------
    departure_datetime_local = None
    arrival_datetime_local = None

    # פורמט 1: כמו במייל – שעה ואז תאריך בשורה נפרדת
    # 00:50
    # 01Jul2025        01:55
    # 01Jul2025
    dt_block = re.search(
        r"(\d{2}:\d{2})\s*\n\s*([0-9]{2}[A-Za-z]{3}[0-9]{2,4})\s+(\d{2}:\d{2})\s*\n\s*([0-9]{2}[A-Za-z]{3}[0-9]{2,4})",
        text,
    )
    if dt_block:
        dep_time, dep_date, arr_time, arr_date = dt_block.groups()
        departure_datetime_local = parse_mixed_date(dep_date, dep_time)
        arrival_datetime_local = parse_mixed_date(arr_date, arr_time)
    else:
        # פורמט 2: 10MAR25 10:00
        datetime_match = re.search(r"(\d{1,2}[A-Z]{3}\d{2,4})\s+(\d{2}:\d{2})", text)
        if datetime_match:
            date_str = datetime_match.group(1)
            time_str = datetime_match.group(2)
            departure_datetime_local = parse_mixed_date(date_str, time_str)

        # ARRIVAL time (optional), e.g. "ARRIVAL 13:10"
        arrival_match = re.search(r"ARRIVAL[:\s]+(\d{2}:\d{2})", text, flags=re.IGNORECASE)
        if arrival_match and date_str:
            arr_time = arrival_match.group(1)
            arrival_datetime_local = parse_mixed_date(date_str, arr_time)

    # ---------------------------
    # 6. Ticket number
    # ---------------------------
    
    # מכסה וריאנטים כמו:
    # "Ticket number : 1142..."
    # "TICKET: 1142..."
    # "ETKT 1142..."
    ticket_match = re.search(
        r"(ETKT|TICKET(?:\s+NUMBER)?|TKT)\s*[:\-]?\s*(\d{10,14})",
        text,
        flags=re.IGNORECASE,
    )
    ticket_number = ticket_match.group(2) if ticket_match else None
    
    # ---------------------------
    # 7. Class (Economy (Y))
    # ---------------------------
    if booking_class is None:
        # לדוגמה "Economy (Y)" → ניקח את האות שבתוך הסוגריים
        m_class = re.search(r"Economy\s*\(([A-Z])\)", text, flags=re.IGNORECASE)
        if m_class:
            booking_class = m_class.group(1)

    # ---------------------------
    # 8. Baggage allowance
    # ---------------------------
    if baggage_allowance is None:
        # "Baggage: Booking status:\n2PC (4) SA (1)" → ניקח את "2PC (4)"
        m_bag = re.search(
            r"Baggage\s*:\s*Booking status:.*?\n\s*([0-9A-Z ()]+)",
            text,
            flags=re.IGNORECASE,
        )
        if m_bag:
            baggage_allowance = m_bag.group(1).strip()

    # ---------------------------
    # 9. Duration
    # ---------------------------
    if duration is None:
        # ניקח את ה-HH:MM הראשון אחרי "Duration:"
        m_dur = re.search(
            r"Duration\s*:\s*([0-9]{1,2}:[0-9]{2})",
            text,
            flags=re.IGNORECASE,
        )
        if m_dur:
            duration = m_dur.group(1)

    # ---------------------------
    # 10. Seat & Gate (אם קיימים)
    # ---------------------------
    seat = None
    gate = None

    seat_match = re.search(r"SEAT\s*[:\-]\s*([0-9]{1,2}[A-Z])", text, flags=re.IGNORECASE)
    if seat_match:
        seat = seat_match.group(1)

    gate_match = re.search(r"GATE\s*[:\-]\s*([A-Z0-9]+)", text, flags=re.IGNORECASE)
    if gate_match:
        gate = gate_match.group(1)

    table_segments = _extract_ticket_table_segments(text, pnr, ticket_number)
    if not table_segments:
        table_segments = [
            {
                "airline_code": airline_code,
                "flight_number": flight_number,
                "pnr": pnr,
                "ticket_number": ticket_number,
                "departure_city": departure_city,
                "arrival_city": arrival_city,
                "departure_airport": departure_airport,
                "arrival_airport": arrival_airport,
                "departure_datetime_local": departure_datetime_local,
                "arrival_datetime_local": arrival_datetime_local,
                "booking_class": booking_class,
                "baggage_allowance": baggage_allowance,
                "duration": duration,
                "seat": seat,
                "gate": gate,
            }
        ]

    # ---------------------------
    # Final structure
    # ---------------------------
    trip = {
        "trip_id": f"TRIP-{uuid4()}",
        "passengers": passengers,
        "segments": table_segments,
        "meta": {"raw_source_type": "text"},
    }

    return trip


if __name__ == "__main__":
    # quick test with your example snippet
    sample_text = """
Passenger : Reuven Anat Ms (ADT)
LY Booking code : YYLXCH
Ticket number : 1142491403549

From        To        Flight        Departure        Arrival        Last check-in
LARNACA LARNACA        TEL AVIV YAFO BEN GURION INTL
Terminal: 3        LY5136        00:50
01Jul2025        01:55
01Jul2025
Class :
Economy (Y)
Baggage :
2PC (4)
Duration :
01:05
"""
    trip = parse_flight_ticket_text(sample_text)
    print(trip)
