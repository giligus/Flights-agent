# Flight Booking MVP Plan

This document captures the initial GitHub-ready plan for the flight-ticket parser.

## Goal

Build a single flight page from a PDF, screenshot, or printed email itinerary. The page should show who is flying, route details, dates, connections, and key travel context.

## Input

- Flight ticket PDF or booking confirmation.
- Screenshot from an airline app or travel agency.
- Email itinerary exported or printed to PDF.

## Output

- Structured trip data: passengers, airline, PNR, ticket number, flight number, route, dates, and connection segments.
- Flight context: status, terminal, gate, estimated departure, delays, and connection risk when external APIs are available.
- Destination context: city, country, timezone, currency, weather, and basic arrival guidance.
- Travel requirements: visa/ETA/ESTA, passport validity, health declarations, customs forms, and destination-specific rules.

## Initial Schema

```json
{
  "trip_id": "TRIP-2025-0001",
  "passengers": [
    {
      "full_name": "John Doe",
      "type": "ADT"
    }
  ],
  "segments": [
    {
      "airline_code": "LY",
      "flight_number": "315",
      "departure_airport": "TLV",
      "departure_city": "Tel Aviv",
      "departure_country": "IL",
      "departure_datetime_local": "2025-03-10T10:00",
      "arrival_airport": "LHR",
      "arrival_city": "London",
      "arrival_country": "GB",
      "arrival_datetime_local": "2025-03-10T13:10",
      "booking_class": "Y",
      "pnr": "ABC123",
      "ticket_number": "LY1234567890"
    }
  ],
  "meta": {
    "raw_source_type": "pdf",
    "raw_source_filename": "eticket_ly315.pdf"
  }
}
```

## Architecture

1. Document ingestion service
   - Accepts the file, stores it temporarily, and runs OCR only when needed.
2. Flight ticket parser
   - Converts raw text into a normalized `Trip` and `segments` structure.
   - Uses rules, regex, LLM extraction, and future QR/BCBP support.
3. Enrichment service
   - Adds airport names, countries, IATA data, and timezones.
   - Can later add flight status from an external API.
4. Travel rules engine
   - Uses destination country, citizenship, and travel date to return entry requirements.
5. Presentation layer
   - Shows a short flight summary, TODO list, structured table, and export options.

## MVP Tasks

1. Finalize the `flight_booking` field list and required/optional fields.
2. Add a `domains/flight_booking.yaml` config for extraction fields and examples.
3. Keep the existing Streamlit flow for upload and table display.
4. Add a clear top-of-page trip summary.
5. Add deterministic post-processing patches:
   - Convert known airport names to IATA codes.
   - Split values like `LY 315` into `airline_code=LY` and `flight_number=315`.
   - Copy single PNR/ticket number across all segments when safe.
6. Add sanitized fixture text files for regression tests.
7. Add export paths for JSON first, then PDF/Excel/calendar later.

## Safety

- Do not commit `.env` or real passenger documents.
- Use sanitized fixture files for tests.
- Treat visa, health, and entry-rule output as advisory until backed by a maintained external source.

