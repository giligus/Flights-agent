# Minimal airports & city keyword data for enrichment.
# אפשר להרחיב בהמשך כמה שרוצים.

AIRPORTS_BY_IATA = {
    "TLV": {
        "iata": "TLV",
        "name": "Ben Gurion Intl",
        "city": "Tel Aviv",
        "country_name": "Israel",
        "country_code": "IL",
        "timezone": "Asia/Jerusalem",
    },
    "LCA": {
        "iata": "LCA",
        "name": "Larnaca Intl",
        "city": "Larnaca",
        "country_name": "Cyprus",
        "country_code": "CY",
        "timezone": "Asia/Nicosia",
    },
    "LHR": {
        "iata": "LHR",
        "name": "Heathrow",
        "city": "London",
        "country_name": "United Kingdom",
        "country_code": "GB",
        "timezone": "Europe/London",
    },
    "VCE": {
        "iata": "VCE",
        "name": "Venice Marco Polo",
        "city": "Venice",
        "country_name": "Italy",
        "country_code": "IT",
        "timezone": "Europe/Rome",
    },
    "MXP": {
        "iata": "MXP",
        "name": "Milan Malpensa",
        "city": "Milan",
        "country_name": "Italy",
        "country_code": "IT",
        "timezone": "Europe/Rome",
    },
    "DXB": {
        "iata": "DXB",
        "name": "Dubai International",
        "city": "Dubai",
        "country_name": "United Arab Emirates",
        "country_code": "AE",
        "timezone": "Asia/Dubai",
    },
    "HKT": {
        "iata": "HKT",
        "name": "Phuket International",
        "city": "Phuket",
        "country_name": "Thailand",
        "country_code": "TH",
        "timezone": "Asia/Bangkok",
    },
    # אפשר להוסיף כאן שדות נוספים בעתיד
}

# התאמה לפי טקסט של עיר/שדה למזהה IATA
CITY_KEYWORDS_TO_IATA = [
    ("LARNACA", "LCA"),
    ("LARNACA LARNACA", "LCA"),
    ("BEN GURION", "TLV"),
    ("TEL AVIV YAFO BEN GURION INTL", "TLV"),
    ("TEL AVIV", "TLV"),
    ("VENICE MARCO POLO", "VCE"),
    ("VENICE", "VCE"),
    ("MILAN MALPENSA", "MXP"),
    ("MALPENSA", "MXP"),
    ("DUBAI INTL", "DXB"),
    ("DUBAI", "DXB"),
    ("PHUKET", "HKT"),
]
