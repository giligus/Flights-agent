import unittest
from pathlib import Path

from enrichment_flights import enrich_trip_with_airport_data
from parser_flights import parse_flight_ticket_text
from travel_requirements import build_requirement_sources


FIXTURES = Path(__file__).parent / "fixtures"


class ParserRegressionTests(unittest.TestCase):
    def parse_fixture(self, name):
        text = (FIXTURES / name).read_text(encoding="utf-8")
        return enrich_trip_with_airport_data(parse_flight_ticket_text(text))

    def test_elal_one_segment(self):
        trip = self.parse_fixture("elal_one_segment.txt")
        self.assertEqual(trip["passengers"][0]["full_name"], "Example Traveler")
        self.assertEqual(len(trip["segments"]), 1)

        segment = trip["segments"][0]
        self.assertEqual(segment["airline_code"], "LY")
        self.assertEqual(segment["flight_number"], "5136")
        self.assertEqual(segment["pnr"], "YYLXCH")
        self.assertEqual(segment["departure_airport"], "LCA")
        self.assertEqual(segment["arrival_airport"], "TLV")
        self.assertEqual(segment["duration"], "01:05")
        self.assertEqual(segment["arrival_country_code"], "IL")

    def test_elal_two_segments(self):
        trip = self.parse_fixture("elal_two_segments.txt")
        self.assertEqual(trip["passengers"][0]["full_name"], "Example Passenger")
        self.assertEqual(len(trip["segments"]), 2)

        first, second = trip["segments"]
        self.assertEqual((first["departure_airport"], first["arrival_airport"]), ("TLV", "VCE"))
        self.assertEqual(first["flight_number"], "289")
        self.assertEqual(first["duration"], "03:55")
        self.assertEqual(first["arrival_country_code"], "IT")

        self.assertEqual((second["departure_airport"], second["arrival_airport"]), ("MXP", "TLV"))
        self.assertEqual(second["flight_number"], "388")
        self.assertEqual(second["duration"], "03:45")
        self.assertEqual(second["departure_country_code"], "IT")

    def test_requirement_sources_follow_final_destination(self):
        trip = self.parse_fixture("elal_two_segments.txt")
        sources = build_requirement_sources(trip)
        self.assertEqual(sources["origin_airport"], "TLV")
        self.assertEqual(len(sources["route_segments"]), 2)
        self.assertEqual(sources["route_segments"][0]["arrival_country_code"], "IT")
        self.assertTrue(sources["global_checkers"])
        self.assertTrue(any(source["label"] == "Visa for Italy" for source in sources["destination_sources"]))
        self.assertTrue(sources["required_inputs"])


if __name__ == "__main__":
    unittest.main()
