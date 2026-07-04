import re
from typing import Any, Dict, List, Optional


MONTHS = (
    "JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC"
)


def normalize_text(text: str) -> str:
    """
    Normalizes raw extracted text:
    - Uppercase
    - Normalizes whitespace
    """
    # Uppercase everything to simplify regexes
    text = text.upper()

    # Replace non-breaking spaces and weird whitespace with regular space
    text = text.replace("\xa0", " ")

    # Normalize multiple spaces/tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Normalize multiple blank lines
    lines = [ln.strip() for ln in text.splitlines()]
    text = "\n".join([ln for ln in lines if ln])

    return text


def extract_pnr(text: str) -> Optional[str]:
    """
    Extracts booking code / PNR (6-7 alphanumeric chars).
    Common patterns:
    - LY BOOKING CODE  Q7TL1N
    - BOOKING CODE: ABC123
    - PNR: ABCDEF
    """
    patterns = [
        r"\b(?:LY\s*)?BOOKING\s*CODE[:\s\-]*([A-Z0-9]{5,7})\b",
        r"\bPNR[:\s\-]*([A-Z0-9]{5,7})\b",
        r"\bRESERVATION\s*CODE[:\s\-]*([A-Z0-9]{5,7})\b",
    ]

    for pat in patterns:
        m = re.search(pat, text)
        if m:
            return m.group(1)

    # Fallback heuristic: line containing "BOOKING" with a 6-char token
    for line in text.splitlines():
        if "BOOKING" in line:
            tokens = line.split()
            for token in tokens:
                if re.fullmatch(r"[A-Z0-9]{5,7}", token):
                    return token

    return None


def extract_passenger_name(text: str) -> Optional[str]:
    """
    Extracts passenger name from patterns like:
    - PASSENGER  GEAN ARIEL MR
    - PASSENGER: LAST/FIRST
    Returns a cleaned "First Last" or "LAST FIRST" depending on data.
    """
    # Try to find explicit "PASSENGER" line
    for line in text.splitlines():
        if "PASSENGER" in line:
            # Remove keyword
            line_clean = re.sub(r"^.*?PASSENGER[:,]?\s*", "", line).strip()
            # Strip titles
            line_clean = re.sub(r"\b(MR|MRS|MS|MISS|DR|PROF)\b\.?", "", line_clean).strip()
            if line_clean:
                return line_clean

    # Fallback: look for pattern '*NAME*' with slashes, e.g. GEAN/ARIEL
    m = re.search(r"\b([A-Z]{2,})/([A-Z]{2,})\b", text)
    if m:
        last, first = m.group(1), m.group(2)
        return f"{first} {last}"

    return None


def extract_total_amount(text: str) -> Optional[float]:
    """
    Extracts total amount in USD (or any currency with 'TOTAL AMOUNT').
    Example lines:
    - TOTAL AMOUNT  USD  492.33
    - TOTAL AMOUNT: USD 492.33
    """
    m = re.search(r"TOTAL\s+AMOUNT\s+([A-Z]{3})\s+(\d+[.,]\d+)", text)
    if not m:
        return None

    currency = m.group(1)
    amount_str = m.group(2).replace(",", ".")
    try:
        amount = float(amount_str)
    except ValueError:
        return None

    return amount


def extract_taxes(text: str) -> List[Dict[str, Any]]:
    """
    Extracts tax/fee lines like:
    - USD 25.00 AP
    - USD 18.50 IL
    Returns list of {currency, amount, code}.
    """
    taxes: List[Dict[str, Any]] = []

    # Look for a section that contains 'TAXES FEES CHARGES' and parse following lines
    section_pat = re.compile(r"TAXES\s+FEES\s+CHARGES(.*)", re.DOTALL)
    m = section_pat.search(text)
    if not m:
        return taxes

    section = m.group(1)

    # Typical pattern: CURRENCY AMOUNT CODE
    for line in section.splitlines():
        m_line = re.search(r"\b([A-Z]{3})\s+(\d+[.,]\d+)\s+([A-Z0-9]{2,4})\b", line)
        if m_line:
            currency = m_line.group(1)
            amount = float(m_line.group(2).replace(",", "."))
            code = m_line.group(3)
            taxes.append(
                {
                    "currency": currency,
                    "amount": amount,
                    "code": code,
                }
            )

    return taxes


def extract_fare(text: str) -> Optional[Dict[str, Any]]:
    """
    Extracts base fare and currency from lines like:
    - FARE  USD  400.00
    And fare basis like:
    - FARE BASIS  YID33R
    """
    # Base fare
    m_fare = re.search(r"\bFARE\s+([A-Z]{3})\s+(\d+[.,]\d+)\b", text)
    fare_currency = None
    fare_amount = None
    if m_fare:
        fare_currency = m_fare.group(1)
        try:
            fare_amount = float(m_fare.group(2).replace(",", "."))
        except ValueError:
            fare_amount = None

    # Fare basis
    m_basis = re.search(r"\bFARE\s*BASIS[:\s]*([A-Z0-9]+)\b", text)
    fare_basis = m_basis.group(1) if m_basis else None

    if fare_currency or fare_amount or fare_basis:
        return {
            "currency": fare_currency,
            "amount": fare_amount,
            "fare_basis": fare_basis,
        }

    return None


def extract_segments(text: str) -> List[Dict[str, Any]]:
    """
    Extracts flight segments using heuristics:
    - Flight number (e.g., LY 383, LY315)
    - From/To cities (FROM ... TO ...)
    - Dates (DD MMM YY)
    - Times (HH:MM or HHMM)

    Note: OCR משובש יכול להפריע – הפונקציה בנויה להיות סלחנית
    ולהוציא לפחות מספרי טיסה ותאריכים כשניתן.
    """
    segments: List[Dict[str, Any]] = []
    lines = text.splitlines()

    # Regex for flight number: 2 letters + 2-4 digits (e.g., LY315, LY 315)
    flight_pat = re.compile(r"\b([A-Z0-9]{2})\s*([0-9]{2,4})\b")

    # Date pattern like "13 APR 25" or "1 MAR 2025"
    date_pat = re.compile(
        rf"\b(\d{{1,2}})\s+({MONTHS})\s+(\d{{2,4}})\b"
    )

    # Time pattern HH:MM or HHMM (simple heuristic)
    time_pat = re.compile(r"\b([01]?\d|2[0-3])[: ]?([0-5]\d)\b")

    used_lines = set()

    for i, line in enumerate(lines):
        m_flight = flight_pat.search(line)
        if not m_flight:
            continue

        carrier = m_flight.group(1)
        number = m_flight.group(2)
        flight_number = f"{carrier}{number}"

        # Build context around this line
        context_lines = lines[max(0, i - 3): i + 4]
        context = "\n".join(context_lines)

        # Try to extract FROM / TO (cities/airports)
        from_city = None
        to_city = None

        m_from = re.search(r"\bFROM\s+([A-Z '\-/]+)", context)
        if m_from:
            from_city = m_from.group(1).strip()
            # Cut at ' TO ' or ' TERMINAL ' if exists
            from_city = re.split(r"\s+TO\s+|\s+TERMINAL\b", from_city)[0].strip()

        m_to = re.search(r"\bTO\s+([A-Z '\-/]+)", context)
        if m_to:
            to_city = m_to.group(1).strip()
            to_city = re.split(r"\s+TERMINAL\b|\s+CLASS\b", to_city)[0].strip()

        # Dates
        depart_date = None
        arrive_date = None
        dates = date_pat.findall(context)
        if dates:
            # Take first as departure date
            d, m, y = dates[0]
            depart_date = f"{d} {m} {y}"
            if len(dates) > 1:
                d2, m2, y2 = dates[1]
                arrive_date = f"{d2} {m2} {y2}"

        # Times (first two times considered departure/arrival)
        depart_time = None
        arrive_time = None
        times = time_pat.findall(context)
        if times:
            hh, mm = times[0]
            depart_time = f"{hh.zfill(2)}:{mm}"
            if len(times) > 1:
                hh2, mm2 = times[1]
                arrive_time = f"{hh2.zfill(2)}:{mm2}"

        # Booking status (e.g., "BOOKING STATUS SA PC")
        booking_status = None
        m_stat = re.search(
            r"\bBOOKING\s+STATUS\s+([A-Z0-9 ]{2,})\b",
            context,
        )
        if m_stat:
            booking_status = m_stat.group(1).strip()

        # Cabin class (e.g., CLASS ECONOMY Y)
        cabin_class = None
        m_class = re.search(r"\bCLASS\s+([A-Z ]{2,})\b", context)
        if m_class:
            cabin_class = m_class.group(1).strip()

        # Baggage (e.g., BAGGAGE 1PC or 23KG)
        baggage = None
        m_bag = re.search(r"\bBAGGAGE\s+([A-Z0-9 /]+)\b", context)
        if m_bag:
            baggage = m_bag.group(1).strip()

        segment = {
            "flight_number": flight_number,
            "carrier": carrier,
            "from": from_city,
            "to": to_city,
            "departure_date": depart_date,
            "departure_time": depart_time,
            "arrival_date": arrive_date,
            "arrival_time": arrive_time,
            "booking_status": booking_status,
            "cabin_class": cabin_class,
            "baggage": baggage,
        }

        segments.append(segment)
        used_lines.add(i)

    return segments


def parse_flight_ticket(text: str) -> Dict[str, Any]:
    """
    Main entry point:
    Receives raw/cleaned text from OCR/PDF, returns structured ticket info.
    """
    norm = normalize_text(text)

    pnr = extract_pnr(norm)
    passenger_name = extract_passenger_name(norm)
    segments = extract_segments(norm)
    fare = extract_fare(norm)
    taxes = extract_taxes(norm)
    total_amount = extract_total_amount(norm)

    return {
        "pnr": pnr,
        "passenger_name": passenger_name,
        "segments": segments,
        "fare": fare,
        "taxes": taxes,
        "total_amount": total_amount,
        "raw_text": norm,  # ניתן להוריד אם לא רוצים לשמור
    }


if __name__ == "__main__":
    # Simple manual test (for local debugging)
    import sys
    if len(sys.argv) != 2:
        print("Usage: python flight_ticket_parser.py <text_file>")
        sys.exit(1)

    with open(sys.argv[1], "r", encoding="utf-8") as f:
        raw = f.read()

    result = parse_flight_ticket(raw)
    import json
    print(json.dumps(result, indent=2, ensure_ascii=False))
