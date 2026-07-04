from typing import Any, Dict, List
from urllib.parse import quote_plus


GLOBAL_CHECKERS = [
    {
        "label": "TravelDoc.aero",
        "url": "https://www.traveldoc.aero/",
        "note": "Airline-style document, visa, passport, and health checker.",
    },
    {
        "label": "IATA Travel Centre",
        "url": "https://www.iatatravelcentre.com/",
        "note": "IATA passenger travel-document checker.",
    },
]


DESTINATION_SOURCES = {
    "CY": [
        {
            "label": "Gov.cy visa information",
            "url": "https://www.gov.cy/en/information/visas/",
            "note": "Official Cyprus government visa information.",
        }
    ],
    "IT": [
        {
            "label": "Visa for Italy",
            "url": "https://vistoperitalia.esteri.it/",
            "note": "Official Italian Ministry of Foreign Affairs visa checker.",
        }
    ],
    "GB": [
        {
            "label": "GOV.UK visa checker",
            "url": "https://www.gov.uk/check-uk-visa",
            "note": "Official UK visa and ETA checker.",
        }
    ],
    "AE": [
        {
            "label": "UAE government tourist visa",
            "url": "https://u.ae/en/information-and-services/visa-and-emirates-id/tourist-visa",
            "note": "Official UAE government tourist visa guidance.",
        }
    ],
    "TH": [
        {
            "label": "Thailand e-Visa",
            "url": "https://www.thaievisa.go.th/",
            "note": "Official Thailand Ministry of Foreign Affairs e-Visa portal.",
        }
    ],
    "US": [
        {
            "label": "U.S. Department of State travel information",
            "url": "https://travel.state.gov/content/travel/en/international-travel.html",
            "note": "Official U.S. destination and entry-information portal.",
        }
    ],
    "IL": [
        {
            "label": "ETA-IL official authority",
            "url": "https://israel-entry.piba.gov.il/learn-about",
            "note": "Official Israel Population and Immigration Authority ETA-IL portal.",
        }
    ],
}


def build_requirement_sources(trip: Dict[str, Any]) -> Dict[str, Any]:
    segments = trip.get("segments", [])
    first_segment = segments[0] if segments else {}
    last_segment = segments[-1] if segments else {}

    origin_code = first_segment.get("departure_country_code") or ""
    origin_airport = first_segment.get("departure_airport") or ""

    route_segments = []
    destination_sources: List[Dict[str, str]] = []
    seen_source_urls = set()
    destination_names = []

    for segment in segments:
        route_segments.append(
            {
                "departure_airport": segment.get("departure_airport") or "",
                "arrival_airport": segment.get("arrival_airport") or "",
                "departure_country_code": segment.get("departure_country_code") or "",
                "arrival_country_code": segment.get("arrival_country_code") or "",
                "arrival_country_name": segment.get("arrival_country_name") or "",
            }
        )

        destination_code = segment.get("arrival_country_code") or ""
        destination_name = segment.get("arrival_country_name") or ""
        if destination_name and destination_name not in destination_names:
            destination_names.append(destination_name)

        sources = DESTINATION_SOURCES.get(destination_code, [])
        if not sources and destination_name:
            sources = [
                {
                    "label": f"Search official {destination_name} entry requirements",
                    "url": "https://www.google.com/search?q="
                    + quote_plus(f"{destination_name} official visa entry requirements government"),
                    "note": "Fallback search. Prefer a government or embassy domain.",
                }
            ]

        for source in sources:
            if source["url"] not in seen_source_urls:
                destination_sources.append(source)
                seen_source_urls.add(source["url"])

    return {
        "origin_country_code": origin_code,
        "origin_airport": origin_airport,
        "destination_name": ", ".join(destination_names) or "the destination",
        "route_segments": route_segments,
        "global_checkers": GLOBAL_CHECKERS,
        "destination_sources": destination_sources,
        "required_inputs": [
            "Passenger citizenship/nationality",
            "Passport type and expiry date",
            "Residence country or visa/residence permits held",
            "Transit airports and whether the passenger leaves airside transit",
            "Final travel date and length of stay",
        ],
    }
