from copy import deepcopy
from typing import Dict, Any, Optional

from airports_data import AIRPORTS_BY_IATA, CITY_KEYWORDS_TO_IATA


def guess_iata_from_city(city: Optional[str]) -> Optional[str]:
    """
    Try to guess IATA code from a free-text city/airport line,
    using CITY_KEYWORDS_TO_IATA mapping.
    """
    if not city:
        return None

    upper = city.upper()
    for keyword, iata in CITY_KEYWORDS_TO_IATA:
        if keyword in upper:
            return iata
    return None


def enrich_trip_with_airport_data(trip: Dict[str, Any]) -> Dict[str, Any]:
    """
    Enriches a trip dict (as returned by parse_flight_ticket_text)
    with airport / country / timezone info.

    - If departure_airport / arrival_airport are missing but there
      are city names, tries to guess IATA from city text.
    - Adds fields like departure_country_name, departure_timezone, etc.
    """

    trip_enriched = deepcopy(trip)
    segments = trip_enriched.get("segments", [])

    for seg in segments:
        dep_city = seg.get("departure_city")
        arr_city = seg.get("arrival_city")
        dep_iata = seg.get("departure_airport")
        arr_iata = seg.get("arrival_airport")

        # 1) אם אין IATA אבל יש עיר → ננסה לנחש
        if not dep_iata:
            dep_iata = guess_iata_from_city(dep_city)
            seg["departure_airport"] = dep_iata

        if not arr_iata:
            arr_iata = guess_iata_from_city(arr_city)
            seg["arrival_airport"] = arr_iata

        # 2) הוספת נתונים מתוך AIRPORTS_BY_IATA
        if dep_iata and dep_iata in AIRPORTS_BY_IATA:
            dep_meta = AIRPORTS_BY_IATA[dep_iata]
            seg["departure_country_name"] = dep_meta["country_name"]
            seg["departure_country_code"] = dep_meta["country_code"]
            seg["departure_timezone"] = dep_meta["timezone"]
            # אם אין לנו departure_city – ניקח מהדאטה
            if not dep_city:
                seg["departure_city"] = dep_meta["city"]

        if arr_iata and arr_iata in AIRPORTS_BY_IATA:
            arr_meta = AIRPORTS_BY_IATA[arr_iata]
            seg["arrival_country_name"] = arr_meta["country_name"]
            seg["arrival_country_code"] = arr_meta["country_code"]
            seg["arrival_timezone"] = arr_meta["timezone"]
            if not arr_city:
                seg["arrival_city"] = arr_meta["city"]

    return trip_enriched
