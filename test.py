if __name__ == "__main__":
    sample_text = """
    EL AL ISRAEL AIRLINES
    PASSENGER: COHEN/ISRAEL
    BOOKING REF: ABC123
    FLIGHT: LY315
    TLV  LHR
    DEPARTURE: 10MAR25 10:00
    """
    trip = parse_flight_ticket_text(sample_text)
    print(trip)
