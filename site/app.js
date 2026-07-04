const airports = {
  TLV: { city: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem" },
  LCA: { city: "Larnaca", country: "Cyprus", timezone: "Asia/Nicosia" },
  LHR: { city: "London", country: "United Kingdom", timezone: "Europe/London" },
  JFK: { city: "New York", country: "United States", timezone: "America/New_York" },
  CDG: { city: "Paris", country: "France", timezone: "Europe/Paris" },
  FCO: { city: "Rome", country: "Italy", timezone: "Europe/Rome" },
  MXP: { city: "Milan", country: "Italy", timezone: "Europe/Rome" },
  VCE: { city: "Venice", country: "Italy", timezone: "Europe/Rome" },
  ATH: { city: "Athens", country: "Greece", timezone: "Europe/Athens" },
  DXB: { city: "Dubai", country: "United Arab Emirates", timezone: "Asia/Dubai" },
};

const monthMap = {
  JAN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAY: "05",
  JUN: "06",
  JUL: "07",
  AUG: "08",
  SEP: "09",
  OCT: "10",
  NOV: "11",
  DEC: "12",
};

const displayColumns = [
  ["Passenger", "full_name"],
  ["Airline", "airline_code"],
  ["Flight", "flight_number"],
  ["PNR", "pnr"],
  ["Ticket", "ticket_number"],
  ["From", "departure_airport"],
  ["To", "arrival_airport"],
  ["Departure", "departure_datetime_local"],
  ["Arrival", "arrival_datetime_local"],
  ["Duration", "duration"],
];

const ticketText = document.querySelector("#ticketText");
const ticketFile = document.querySelector("#ticketFile");
const analyzeBtn = document.querySelector("#analyzeBtn");
const clearBtn = document.querySelector("#clearBtn");
const emptyState = document.querySelector("#emptyState");
const results = document.querySelector("#results");
const summaryGrid = document.querySelector("#summaryGrid");
const itineraryTab = document.querySelector("#itineraryTab");
const tableTab = document.querySelector("#tableTab");
const dataTab = document.querySelector("#dataTab");
const jsonOutput = document.querySelector("#jsonOutput");
const downloadBtn = document.querySelector("#downloadBtn");

let currentTrip = null;

document.querySelectorAll("input[name='mode']").forEach((input) => {
  input.addEventListener("change", () => {
    const fileMode = input.value === "file" && input.checked;
    ticketFile.classList.toggle("hidden", !fileMode);
    ticketText.classList.toggle("hidden", fileMode);
  });
});

ticketFile.addEventListener("change", async () => {
  const file = ticketFile.files[0];
  if (!file) return;
  ticketText.value = await file.text();
});

clearBtn.addEventListener("click", () => {
  ticketText.value = "";
  ticketFile.value = "";
  currentTrip = null;
  results.classList.add("hidden");
  emptyState.classList.remove("hidden");
});

analyzeBtn.addEventListener("click", () => {
  const rawText = ticketText.value.trim();
  if (!rawText) return;
  currentTrip = parseTicket(rawText);
  renderTrip(currentTrip);
});

downloadBtn.addEventListener("click", () => {
  if (!currentTrip) return;
  const blob = new Blob([JSON.stringify(currentTrip, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "flight_trip.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    const active = button.dataset.tab;
    itineraryTab.classList.toggle("hidden", active !== "itinerary");
    tableTab.classList.toggle("hidden", active !== "table");
    dataTab.classList.toggle("hidden", active !== "data");
  });
});

function parseTicket(rawText) {
  const pnr = matchFirst(rawText, [
    /(?:booking\s+code|booking\s+reference|pnr)\s*[:\-]?\s*([A-Z0-9]{5,7})/i,
  ]);
  const ticket = matchFirst(rawText, [
    /(?:ticket\s+number|ticket|etkt|tkt)\s*[:\-]?\s*(\d{10,14})/i,
  ]);
  const passenger = cleanPassenger(
    matchFirst(rawText, [/^\s*passenger\s*[:\-]\s*([A-Za-z\s]+?)(?:\(|$)/im])
  );
  const flightMatch = rawText.match(/\b([A-Z]{2,3})\s?(\d{2,4})\b/);
  const routeMatch = rawText.match(/\b([A-Z]{3})\s*[-/]\s*([A-Z]{3})\b/);
  const routeFromText = routeMatch ? [routeMatch[1], routeMatch[2]] : guessRoute(rawText);
  const dateTimes = parseDateTimes(rawText);

  const segment = enrichSegment({
    airline_code: flightMatch ? flightMatch[1] : "",
    flight_number: flightMatch ? flightMatch[2] : "",
    pnr,
    ticket_number: ticket,
    departure_airport: routeFromText[0] || "",
    arrival_airport: routeFromText[1] || "",
    departure_datetime_local: dateTimes.departure,
    arrival_datetime_local: dateTimes.arrival,
    duration: matchFirst(rawText, [/duration\s*[:\n\r\s]+(\d{1,2}:\d{2})/i]),
    booking_class: matchFirst(rawText, [/economy\s*\(([A-Z])\)/i]),
    baggage_allowance: matchFirst(rawText, [/baggage\s*[:\n\r\s]+([0-9A-Z ]{2,12})/i]),
    seat: matchFirst(rawText, [/seat\s*[:\-]\s*([0-9]{1,2}[A-Z])/i]),
    gate: matchFirst(rawText, [/gate\s*[:\-]\s*([A-Z0-9]+)/i]),
  });

  return {
    trip_id: `TRIP-${Date.now()}`,
    passengers: [{ full_name: passenger || "" }],
    segments: [segment],
    meta: {
      raw_source_type: "browser",
      parser: "github_pages_static",
    },
  };
}

function guessRoute(rawText) {
  const knownCodes = Object.keys(airports);
  const positions = knownCodes
    .map((code) => ({ code, index: rawText.toUpperCase().indexOf(code) }))
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index);

  if (positions.length >= 2) {
    return [positions[0].code, positions[1].code];
  }

  const upper = rawText.toUpperCase();
  if (upper.includes("LARNACA") && upper.includes("TEL AVIV")) return ["LCA", "TLV"];
  if (upper.includes("TEL AVIV") && upper.includes("LONDON")) return ["TLV", "LHR"];
  return ["", ""];
}

function parseDateTimes(rawText) {
  const blockMatch = rawText.match(
    /(\d{2}:\d{2})\s*\n\s*(\d{1,2}[A-Za-z]{3}\d{2,4})\s+(\d{2}:\d{2})\s*\n\s*(\d{1,2}[A-Za-z]{3}\d{2,4})/
  );

  if (blockMatch) {
    return {
      departure: parseMixedDate(blockMatch[2], blockMatch[1]),
      arrival: parseMixedDate(blockMatch[4], blockMatch[3]),
    };
  }

  const inlineMatch = rawText.match(/(\d{1,2})\s*([A-Z]{3})\s*(\d{2,4})\s+(\d{1,2}:\d{2})/i);
  if (inlineMatch) {
    return {
      departure: parseMixedDate(`${inlineMatch[1]}${inlineMatch[2]}${inlineMatch[3]}`, inlineMatch[4]),
      arrival: "",
    };
  }

  return { departure: "", arrival: "" };
}

function parseMixedDate(dateText, timeText) {
  const match = dateText.match(/(\d{1,2})([A-Za-z]{3})(\d{2,4})/);
  if (!match) return "";
  const day = match[1].padStart(2, "0");
  const month = monthMap[match[2].toUpperCase()];
  let year = match[3];
  if (!month) return "";
  if (year.length === 2) year = `20${year}`;
  return `${year}-${month}-${day} ${timeText}`;
}

function enrichSegment(segment) {
  const departure = airports[segment.departure_airport] || {};
  const arrival = airports[segment.arrival_airport] || {};
  return {
    ...segment,
    departure_city: departure.city || "",
    arrival_city: arrival.city || "",
    departure_country_name: departure.country || "",
    arrival_country_name: arrival.country || "",
    departure_timezone: departure.timezone || "",
    arrival_timezone: arrival.timezone || "",
  };
}

function renderTrip(trip) {
  emptyState.classList.add("hidden");
  results.classList.remove("hidden");

  const segment = trip.segments[0] || {};
  const passenger = trip.passengers[0]?.full_name || "-";
  const route = `${segment.departure_airport || "-"} to ${segment.arrival_airport || "-"}`;
  const flight = `${segment.airline_code || ""} ${segment.flight_number || ""}`.trim() || "-";

  summaryGrid.innerHTML = [
    ["Passenger", passenger],
    ["Route", route],
    ["Segments", String(trip.segments.length)],
    ["First flight", flight],
  ]
    .map(
      ([label, value]) => `
        <article class="summary-tile">
          <div class="summary-label">${escapeHtml(label)}</div>
          <div class="summary-value">${escapeHtml(value)}</div>
        </article>
      `
    )
    .join("");

  itineraryTab.innerHTML = trip.segments.map(renderSegment).join("");
  tableTab.innerHTML = renderTable(trip);
  jsonOutput.textContent = JSON.stringify(trip, null, 2);
}

function renderSegment(segment, index) {
  const flight = `${segment.airline_code || ""} ${segment.flight_number || ""}`.trim() || "-";
  return `
    <article class="segment-card">
      <div class="segment-label">Segment ${index + 1}</div>
      <div class="segment-route">
        <div>
          <div class="airport-code">${escapeHtml(segment.departure_airport || "-")}</div>
          <div class="airport-city">${escapeHtml(segment.departure_city || "-")}</div>
        </div>
        <div class="route-line" aria-hidden="true"></div>
        <div class="align-right">
          <div class="airport-code">${escapeHtml(segment.arrival_airport || "-")}</div>
          <div class="airport-city">${escapeHtml(segment.arrival_city || "-")}</div>
        </div>
      </div>
      <div class="detail-grid">
        ${renderDetail("Flight", flight)}
        ${renderDetail("Departure", segment.departure_datetime_local || "-")}
        ${renderDetail("Arrival", segment.arrival_datetime_local || "-")}
        ${renderDetail("PNR", segment.pnr || "-")}
      </div>
    </article>
  `;
}

function renderDetail(label, value) {
  return `
    <div>
      <div class="detail-label">${escapeHtml(label)}</div>
      <div class="detail-value">${escapeHtml(value)}</div>
    </div>
  `;
}

function renderTable(trip) {
  const rows = trip.segments
    .map((segment) => {
      const row = Object.fromEntries(displayColumns.map(([label, key]) => [label, segment[key] || ""]));
      row.Passenger = trip.passengers[0]?.full_name || "";
      return row;
    })
    .map(
      (row) => `
        <tr>
          ${displayColumns.map(([label]) => `<td>${escapeHtml(row[label] || "-")}</td>`).join("")}
        </tr>
      `
    )
    .join("");

  return `
    <table>
      <thead>
        <tr>${displayColumns.map(([label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function matchFirst(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  return "";
}

function cleanPassenger(name) {
  return name
    .replace(/\b(MR|MRS|MS|MISS|MSTR|ADT|CHD|INF)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

