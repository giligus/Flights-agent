const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { parseSegments } = require("../site/ticket-parser.js");

const airports = {
  TLV: { city: "Tel Aviv" },
  VCE: { city: "Venice" },
  MXP: { city: "Milan" },
  LCA: { city: "Larnaca" },
  BER: { city: "Berlin" },
  HER: { city: "Heraklion" },
};

const fixture = fs.readFileSync(path.join(__dirname, "fixtures", "elal_two_segments.txt"), "utf8");

for (const text of [fixture, fixture.replace(/\s+/g, " ")]) {
  const segments = parseSegments(text, airports);
  assert.equal(segments.length, 2);

  assert.deepEqual(
    [segments[0].departure_airport, segments[0].arrival_airport, segments[0].airline_code, segments[0].flight_number],
    ["TLV", "VCE", "LY", "289"]
  );
  assert.equal(segments[0].departure_datetime_local, "2025-04-01 18:00");
  assert.equal(segments[0].arrival_datetime_local, "2025-04-01 20:55");

  assert.deepEqual(
    [segments[1].departure_airport, segments[1].arrival_airport, segments[1].airline_code, segments[1].flight_number],
    ["MXP", "TLV", "LY", "388"]
  );
  assert.equal(segments[1].departure_datetime_local, "2025-04-06 22:55");
  assert.equal(segments[1].arrival_datetime_local, "2025-04-07 03:40");
}

assert.deepEqual(parseSegments("Ticket number 1142490557883. Read the other terms.", airports), []);

const oneSegmentFixture = fs.readFileSync(path.join(__dirname, "fixtures", "elal_one_segment.txt"), "utf8");
const oneSegment = parseSegments(oneSegmentFixture, airports);
assert.equal(oneSegment.length, 1);
assert.deepEqual(
  [oneSegment[0].departure_airport, oneSegment[0].arrival_airport, oneSegment[0].flight_number],
  ["LCA", "TLV", "5136"]
);
assert.equal(oneSegment[0].departure_datetime_local, "2025-07-01 00:50");
assert.equal(oneSegment[0].arrival_datetime_local, "2025-07-01 01:55");

console.log("browser ticket parser regression: OK");
