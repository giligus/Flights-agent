const airports = {
  TLV: {
    city: "Tel Aviv",
    country: "Israel",
    timezone: "Asia/Jerusalem",
    lat: 32.0853,
    lon: 34.7818,
    currency: "ILS",
    countryCode: "IL",
  },
  LCA: {
    city: "Larnaca",
    country: "Cyprus",
    timezone: "Asia/Nicosia",
    lat: 34.9003,
    lon: 33.6232,
    currency: "EUR",
    countryCode: "CY",
  },
  LHR: {
    city: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    lat: 51.4700,
    lon: -0.4543,
    currency: "GBP",
    countryCode: "GB",
  },
  JFK: {
    city: "New York",
    country: "United States",
    timezone: "America/New_York",
    lat: 40.6413,
    lon: -73.7781,
    currency: "USD",
    countryCode: "US",
  },
  CDG: {
    city: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    lat: 49.0097,
    lon: 2.5479,
    currency: "EUR",
    countryCode: "FR",
  },
  FCO: {
    city: "Rome",
    country: "Italy",
    timezone: "Europe/Rome",
    lat: 41.8003,
    lon: 12.2389,
    currency: "EUR",
    countryCode: "IT",
  },
  MXP: {
    city: "Milan",
    country: "Italy",
    timezone: "Europe/Rome",
    lat: 45.6306,
    lon: 8.7281,
    currency: "EUR",
    countryCode: "IT",
  },
  VCE: {
    city: "Venice",
    country: "Italy",
    timezone: "Europe/Rome",
    lat: 45.5053,
    lon: 12.3519,
    currency: "EUR",
    countryCode: "IT",
  },
  ATH: {
    city: "Athens",
    country: "Greece",
    timezone: "Europe/Athens",
    lat: 37.9364,
    lon: 23.9445,
    currency: "EUR",
    countryCode: "GR",
  },
  DXB: {
    city: "Dubai",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
    lat: 25.2532,
    lon: 55.3657,
    currency: "AED",
    countryCode: "AE",
  },
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

const pdfJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const pdfWorkerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const tesseractUrl = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
const scriptLoads = new Map();
const countryOptions = [
  ["", "Select country"],
  ["IL", "Israel"],
  ["CY", "Cyprus"],
  ["IT", "Italy"],
  ["GB", "United Kingdom"],
  ["AE", "United Arab Emirates"],
  ["TH", "Thailand"],
  ["US", "United States"],
  ["CA", "Canada"],
  ["FR", "France"],
  ["DE", "Germany"],
  ["ES", "Spain"],
  ["NL", "Netherlands"],
];
const passportTypeOptions = [
  ["", "Select type"],
  ["ordinary", "Ordinary / tourist"],
  ["diplomatic", "Diplomatic"],
  ["service", "Service / official"],
  ["emergency", "Emergency travel document"],
];
const transitOptions = [
  ["unknown", "Unknown / not sure"],
  ["none", "No transit"],
  ["airside", "Transit airside only"],
  ["landside", "Transit and enter country"],
];
const requirementsState = {};

const ticketText = document.querySelector("#ticketText");
const ticketFile = document.querySelector("#ticketFile");
const dropZone = document.querySelector("#dropZone");
const fileMeta = document.querySelector("#fileMeta");
const extractStatus = document.querySelector("#extractStatus");
const statusText = document.querySelector("#statusText");
const statusPercent = document.querySelector("#statusPercent");
const progressBar = document.querySelector("#progressBar");
const analyzeBtn = document.querySelector("#analyzeBtn");
const clearBtn = document.querySelector("#clearBtn");
const emptyState = document.querySelector("#emptyState");
const results = document.querySelector("#results");
const resultNotice = document.querySelector("#resultNotice");
const summaryGrid = document.querySelector("#summaryGrid");
const importantPanel = document.querySelector("#importantPanel");
const itineraryTab = document.querySelector("#itineraryTab");
const destinationTab = document.querySelector("#destinationTab");
const requirementsTab = document.querySelector("#requirementsTab");
const tableTab = document.querySelector("#tableTab");
const dataTab = document.querySelector("#dataTab");
const jsonOutput = document.querySelector("#jsonOutput");
const downloadBtn = document.querySelector("#downloadBtn");

let currentTrip = null;
let currentSourceType = "pasted_text";

document.querySelectorAll("input[name='mode']").forEach((input) => {
  input.addEventListener("change", () => {
    const fileMode = input.value === "file" && input.checked;
    dropZone.classList.toggle("hidden", !fileMode);
    ticketText.classList.toggle("text-from-file", fileMode);
  });
});

ticketFile.addEventListener("change", async () => {
  const file = ticketFile.files[0];
  if (!file) return;
  await extractUploadedFile(file);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", async (event) => {
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  await extractUploadedFile(file);
});

clearBtn.addEventListener("click", () => {
  ticketText.value = "";
  ticketFile.value = "";
  fileMeta.classList.add("hidden");
  setStatus("", 0, false);
  currentTrip = null;
  currentSourceType = "pasted_text";
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
    destinationTab.classList.toggle("hidden", active !== "destination");
    requirementsTab.classList.toggle("hidden", active !== "requirements");
    tableTab.classList.toggle("hidden", active !== "table");
    dataTab.classList.toggle("hidden", active !== "data");
  });
});

function parseTicket(rawText) {
  const pnr = matchFirst(rawText, [
    /(?:booking\s+code|booking\s+reference|pnr)\s*[:\-]?\s*([A-Z0-9]{5,7})/i,
  ]);
  const ticket = matchFirst(rawText, [
    /(?:ticket\s+number|etkt|tkt)\s*[:\-]?\s*(\d{10,14})/i,
    /(\d{10,14})\s*(?:ticket\s+number|ticket\s+receipt)/i,
  ]);
  const passenger = cleanPassenger(
    matchFirst(rawText, [
      /passenger\s*[:\-]\s*([A-Za-z][A-Za-z\s'.-]{1,80}?)(?:\s*\(|\s+(?:LY|EK|Ticket|Booking|Date|Issuing)\b|$)/i,
    ])
  );
  const flightMatch = rawText.match(/\b([A-Z]{2,3})\s?(\d{2,4})\b/);
  const routeMatch = rawText.match(/\b([A-Z]{3})\s*[-/]\s*([A-Z]{3})\b/);
  const routeFromText = routeMatch ? [routeMatch[1], routeMatch[2]] : guessRoute(rawText);
  const dateTimes = parseDateTimes(rawText, flightMatch ? flightMatch[0] : "");

  const segment = enrichSegment({
    airline_code: flightMatch ? flightMatch[1] : "",
    flight_number: flightMatch ? flightMatch[2] : "",
    pnr,
    ticket_number: ticket,
    departure_airport: routeFromText[0] || "",
    arrival_airport: routeFromText[1] || "",
    departure_datetime_local: dateTimes.departure,
    arrival_datetime_local: dateTimes.arrival,
    duration: matchFirst(rawText, [/duration\s*:?\s*(\d{1,2}:\d{2})/i]),
    booking_class: matchFirst(rawText, [/economy\s*\(([A-Z])\)/i]),
    baggage_allowance: matchFirst(rawText, [
      /baggage\s*:?\s*([0-9]\s*PC(?:\s*\(\d+\))?)/i,
      /\b([0-9]\s*PC(?:\s*\(\d+\))?)\b/i,
      /baggage\s*:?\s*([0-9]{1,2}\s*(?:KG|KGS|LB|LBS))/i,
    ]),
    seat: matchFirst(rawText, [/seat\s*[:\-]\s*([0-9]{1,2}[A-Z])/i]),
    gate: matchFirst(rawText, [/gate\s*[:\-]\s*([A-Z0-9]+)/i]),
  });

  return {
    trip_id: `TRIP-${Date.now()}`,
    passengers: [{ full_name: passenger || "" }],
    segments: [segment],
    meta: {
      raw_source_type: currentSourceType,
      parser: "github_pages_static",
    },
  };
}

async function extractUploadedFile(file) {
  currentSourceType = sourceTypeForFile(file);
  fileMeta.innerHTML = `
    <strong>${escapeHtml(file.name)}</strong>
    <span>${escapeHtml(formatFileSize(file.size))} / ${escapeHtml(file.type || "unknown type")}</span>
  `;
  fileMeta.classList.remove("hidden");
  ticketText.value = "";
  results.classList.add("hidden");
  emptyState.classList.remove("hidden");
  analyzeBtn.disabled = true;

  try {
    setStatus("Reading file...", 5, true);
    const extracted = await extractTextFromFile(file);
    ticketText.value = extracted.trim();

    if (!ticketText.value) {
      setStatus("No readable text found. Try a clearer image or the full Streamlit app.", 100, true);
      return;
    }

    setStatus(`Extracted ${ticketText.value.length.toLocaleString()} characters. Ready to analyze.`, 100, true);
  } catch (error) {
    ticketText.value = "";
    setStatus(error.message || "Could not extract this file.", 100, true, true);
  } finally {
    analyzeBtn.disabled = false;
  }
}

async function extractTextFromFile(file) {
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    return extractPdfText(file);
  }

  if (file.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(file.name)) {
    return ocrImage(file);
  }

  return file.text();
}

async function extractPdfText(file) {
  setStatus("Loading PDF reader...", 8, true);
  await ensureScript("pdfjsLib", pdfJsUrl, "PDF reader did not load. Check your internet connection and refresh.");
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

  const bytes = await file.arrayBuffer();
  setStatus("Opening PDF...", 12, true);
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const pageTexts = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    pageTexts.push(text);
    setStatus(`Reading PDF text layer ${pageNumber}/${pdf.numPages}...`, 12 + (pageNumber / pdf.numPages) * 48, true);
  }

  const nativeText = pageTexts.join("\n").trim();
  if (nativeText.length >= 80 && !looksLikeGarbledText(nativeText)) {
    return nativeText;
  }

  const maxPages = Math.min(pdf.numPages, 4);
  const ocrTexts = [];
  for (let pageNumber = 1; pageNumber <= maxPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: context, viewport }).promise;
    const imageUrl = canvas.toDataURL("image/png");
    ocrTexts.push(await ocrImage(imageUrl, `OCR PDF page ${pageNumber}/${maxPages}`));
  }

  return ocrTexts.join("\n").trim() || nativeText;
}

async function ocrImage(imageSource, label = "OCR image") {
  setStatus(`${label}: loading OCR engine...`, 12, true);
  await ensureScript("Tesseract", tesseractUrl, "OCR engine did not load. Check your internet connection and refresh.");
  setStatus(`${label}: loading OCR...`, 20, true);
  const result = await window.Tesseract.recognize(imageSource, "eng+heb", {
    logger: (message) => {
      if (message.status) {
        const progress = message.progress ? Math.round(message.progress * 100) : 0;
        setStatus(`${label}: ${message.status}`, Math.min(95, Math.max(20, progress)), true);
      }
    },
  });
  return result.data.text || "";
}

async function ensureScript(globalName, url, errorMessage) {
  if (window[globalName]) return window[globalName];

  if (!scriptLoads.has(url)) {
    scriptLoads.set(
      url,
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(errorMessage));
        document.head.appendChild(script);
      })
    );
  }

  await scriptLoads.get(url);
  return waitForGlobal(globalName, errorMessage);
}

function waitForGlobal(name, errorMessage) {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (window[name]) {
        window.clearInterval(timer);
        resolve(window[name]);
        return;
      }

      if (Date.now() - started > 12000) {
        window.clearInterval(timer);
        reject(new Error(errorMessage));
      }
    }, 80);
  });
}

function looksLikeGarbledText(text) {
  const sample = text.slice(0, 1200);
  const letters = (sample.match(/[A-Za-z\u0590-\u05ff]/g) || []).length;
  const symbols = (sample.match(/[^\sA-Za-z0-9\u0590-\u05ff:.,/()\-]/g) || []).length;
  return sample.length > 120 && letters / sample.length < 0.12 && symbols / sample.length > 0.22;
}

function setStatus(message, percent = 0, visible = true, isError = false) {
  extractStatus.classList.toggle("hidden", !visible);
  extractStatus.classList.toggle("status-error", isError);
  statusText.textContent = message;
  statusPercent.textContent = `${Math.round(percent)}%`;
  progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function sourceTypeForFile(file) {
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return "browser_pdf";
  if (file.type.startsWith("image/")) return "browser_image_ocr";
  return "browser_text_file";
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

function parseDateTimes(rawText, flightToken = "") {
  if (flightToken) {
    const flightIndex = rawText.toUpperCase().indexOf(flightToken.replace(/\s+/g, "").toUpperCase());
    const compactIndex =
      flightIndex >= 0 ? flightIndex : rawText.toUpperCase().indexOf(flightToken.toUpperCase());
    if (compactIndex >= 0) {
      const tableTail = rawText.slice(compactIndex, compactIndex + 260);
      const tableMatch = tableTail.match(
        /\b\d{1,2}:\d{2}\b[\s\S]{0,30}?\b\d{1,2}[A-Za-z]{3}\d{2,4}\b[\s\S]{0,30}?\b\d{1,2}:\d{2}\b[\s\S]{0,30}?\b\d{1,2}[A-Za-z]{3}\d{2,4}\b/
      );
      if (tableMatch) {
        const values = [...tableMatch[0].matchAll(/(\d{1,2}:\d{2})|(\d{1,2}[A-Za-z]{3}\d{2,4})/g)].map(
          (match) => match[0]
        );
        if (values.length >= 4) {
          return {
            departure: parseMixedDate(values[1], values[0]),
            arrival: parseMixedDate(values[3], values[2]),
          };
        }
      }
    }
  }

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
  resultNotice.textContent =
    currentSourceType === "browser_image_ocr" || currentSourceType === "browser_pdf"
      ? "Extracted in the browser, then parsed locally. Review OCR text before travel use."
      : "Running in the browser with the local parser.";

  const segment = trip.segments[0] || {};
  const passenger = trip.passengers[0]?.full_name || "-";
  const route = `${segment.departure_airport || "-"} to ${segment.arrival_airport || "-"}`;
  const flight = `${segment.airline_code || ""} ${segment.flight_number || ""}`.trim() || "-";
  const firstDeparture = segment.departure_datetime_local || "-";
  const firstPnr = segment.pnr || "-";

  summaryGrid.innerHTML = [
    ["Route", route, "summary-tile route-tile"],
    ["Passenger", passenger, "summary-tile"],
    ["First flight", flight, "summary-tile"],
    ["Departure", firstDeparture, "summary-tile attention-tile"],
    ["PNR", firstPnr, "summary-tile"],
  ]
    .map(
      ([label, value, className]) => `
        <article class="${className}">
          <div class="summary-label">${escapeHtml(label)}</div>
          <div class="summary-value">${escapeHtml(value)}</div>
        </article>
      `
    )
    .join("");

  importantPanel.innerHTML = renderImportantPanel(trip);
  itineraryTab.innerHTML = trip.segments.map(renderSegment).join("");
  destinationTab.innerHTML = renderDestinationBriefing(trip);
  loadDestinationBriefing(trip);
  requirementsTab.innerHTML = renderRequirements(trip);
  bindRequirementComponents(trip);
  tableTab.innerHTML = renderTable(trip);
  jsonOutput.textContent = JSON.stringify(trip, null, 2);
}

function renderImportantPanel(trip) {
  const firstSegment = trip.segments[0] || {};
  const lastSegment = trip.segments[trip.segments.length - 1] || firstSegment;
  const facts = [
    ["Final destination", destinationLabel(lastSegment)],
    ["Departure", firstSegment.departure_datetime_local || "-"],
    ["Arrival", lastSegment.arrival_datetime_local || "-"],
    ["Baggage", firstSegment.baggage_allowance || "-"],
  ];

  return `
    <div class="priority-heading">
      <span class="priority-kicker">Important</span>
      <strong>${escapeHtml(firstSegment.pnr || "Review ticket details")}</strong>
    </div>
    <div class="priority-facts">
      ${facts
        .map(
          ([label, value]) => `
            <div>
              <span>${escapeHtml(label)}</span>
              <b>${escapeHtml(value)}</b>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSegment(segment, index) {
  const flight = `${segment.airline_code || ""} ${segment.flight_number || ""}`.trim() || "-";
  const departureLabel = airportLabel(segment.departure_airport, segment.departure_city, segment.departure_country_name);
  const arrivalLabel = airportLabel(segment.arrival_airport, segment.arrival_city, segment.arrival_country_name);
  return `
    <article class="segment-card">
      <div class="segment-topline">
        <div>
          <div class="segment-label">Segment ${index + 1}</div>
          <strong>${escapeHtml(flight)}</strong>
        </div>
        <span>${escapeHtml(segment.duration || "Duration pending")}</span>
      </div>
      <div class="segment-route">
        <div>
          <div class="airport-code">${escapeHtml(segment.departure_airport || "-")}</div>
          <div class="airport-city">${escapeHtml(departureLabel)}</div>
        </div>
        <div class="route-line" aria-hidden="true"></div>
        <div class="align-right">
          <div class="airport-code">${escapeHtml(segment.arrival_airport || "-")}</div>
          <div class="airport-city">${escapeHtml(arrivalLabel)}</div>
        </div>
      </div>
      <div class="detail-grid">
        ${renderDetail("Departure", segment.departure_datetime_local || "-")}
        ${renderDetail("Arrival", segment.arrival_datetime_local || "-")}
        ${renderDetail("PNR", segment.pnr || "-")}
        ${renderDetail("Baggage", segment.baggage_allowance || "-")}
        ${renderDetail("Class", segment.booking_class || "-")}
        ${renderDetail("Ticket", segment.ticket_number || "-")}
      </div>
    </article>
  `;
}

function airportLabel(code, city, country) {
  const parts = [city, country].filter(Boolean);
  return parts.length ? parts.join(", ") : code || "-";
}

function destinationLabel(segment) {
  return airportLabel(segment.arrival_airport, segment.arrival_city, segment.arrival_country_name);
}

function renderDestinationBriefing(trip) {
  const profile = buildDestinationProfile(trip);
  return `
    <div class="destination-briefing">
      <article class="destination-hero">
        <div>
          <div class="summary-label">Destination briefing</div>
          <h3>${escapeHtml(profile.city || profile.airport || "Destination")}</h3>
          <p>${escapeHtml(profile.country || "Country pending")} / ${escapeHtml(profile.airport || "-")} / ${escapeHtml(
            profile.timezone || "timezone pending"
          )}</p>
        </div>
        <div class="destination-badges">
          <span>${escapeHtml(profile.currency || "Currency")}</span>
          <span>${escapeHtml(profile.travelDate || "Travel date pending")}</span>
        </div>
      </article>

      <div class="destination-grid">
        <article class="destination-card">
          <div class="destination-card-head">
            <div>
              <h3>Weather</h3>
              <p>Forecast near the arrival city or airport.</p>
            </div>
            <span class="provider-badge">Open-Meteo</span>
          </div>
          <div id="weatherPanel" class="live-panel">${renderLoading("Loading weather...")}</div>
        </article>

        <article class="destination-card">
          <div class="destination-card-head">
            <div>
              <h3>Currency</h3>
              <p>Simple reference rate for arrival currency.</p>
            </div>
            <span class="provider-badge">${escapeHtml(profile.currency || "Currency")}</span>
          </div>
          <div id="currencyPanel" class="live-panel">${renderLoading("Loading currency...")}</div>
        </article>

        <article class="destination-card warning-card">
          <div class="destination-card-head">
            <div>
              <h3>Warnings</h3>
              <p>Security, disaster, and weather-warning channels.</p>
            </div>
            <span class="provider-badge">Official links</span>
          </div>
          <div class="warning-list">
            ${profile.warningLinks.map(renderDestinationLink).join("")}
          </div>
        </article>

        <article class="destination-card">
          <div class="destination-card-head">
            <div>
              <h3>Upcoming events</h3>
              <p>Official tourism and city event calendars.</p>
            </div>
            <span class="provider-badge">Calendar links</span>
          </div>
          <div class="warning-list">
            ${profile.eventLinks.map(renderDestinationLink).join("")}
          </div>
        </article>
      </div>
    </div>
  `;
}

async function loadDestinationBriefing(trip) {
  const profile = buildDestinationProfile(trip);
  await Promise.allSettled([loadWeatherPanel(profile), loadCurrencyPanel(profile)]);
}

async function loadWeatherPanel(profile) {
  const panel = document.querySelector("#weatherPanel");
  if (!panel) return;
  if (profile.lat == null || profile.lon == null) {
    panel.innerHTML = renderPanelError("No coordinates mapped for this airport yet.");
    return;
  }

  try {
    const params = new URLSearchParams({
      latitude: String(profile.lat),
      longitude: String(profile.lon),
      current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code",
      timezone: profile.timezone || "auto",
      forecast_days: "4",
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
    const data = await response.json();
    panel.innerHTML = renderWeatherData(data);
  } catch (error) {
    panel.innerHTML = renderPanelError(error.message || "Could not load weather.");
  }
}

async function loadCurrencyPanel(profile) {
  const panel = document.querySelector("#currencyPanel");
  if (!panel) return;
  if (!profile.currency || profile.currency === "USD") {
    panel.innerHTML = renderCurrencyData({ base: "USD", target: profile.currency || "USD", rate: 1 });
    return;
  }

  try {
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${encodeURIComponent(profile.currency)}`);
    if (!response.ok) throw new Error(`Currency request failed (${response.status})`);
    const data = await response.json();
    panel.innerHTML = renderCurrencyData({ base: "USD", target: profile.currency, rate: data.rates?.[profile.currency], date: data.date });
  } catch (error) {
    panel.innerHTML = renderPanelError(error.message || "Could not load currency.");
  }
}

function renderWeatherData(data) {
  const current = data.current || {};
  const daily = data.daily || {};
  const today = {
    min: daily.temperature_2m_min?.[0],
    max: daily.temperature_2m_max?.[0],
    rain: daily.precipitation_probability_max?.[0],
    code: current.weather_code ?? daily.weather_code?.[0],
  };
  return `
    <div class="weather-current">
      <div>
        <span>Now</span>
        <b>${escapeHtml(formatTemperature(current.temperature_2m))}</b>
        <small>${escapeHtml(weatherCodeLabel(today.code))}</small>
      </div>
      <div>
        <span>Wind</span>
        <b>${escapeHtml(formatSpeed(current.wind_speed_10m))}</b>
        <small>${escapeHtml(formatHumidity(current.relative_humidity_2m))}</small>
      </div>
    </div>
    <div class="forecast-row">
      ${daily.time
        ?.map(
          (day, index) => `
            <div>
              <span>${escapeHtml(shortDate(day))}</span>
              <b>${escapeHtml(formatTemperatureRange(daily.temperature_2m_min?.[index], daily.temperature_2m_max?.[index]))}</b>
              <small>${escapeHtml(formatRain(daily.precipitation_probability_max?.[index]))}</small>
            </div>
          `
        )
        .join("") || ""}
    </div>
  `;
}

function renderCurrencyData({ base, target, rate, date }) {
  if (!rate) return renderPanelError("No exchange rate returned.");
  const inverse = rate ? 1 / rate : 0;
  return `
    <div class="currency-rate">
      <span>${escapeHtml(base)} to ${escapeHtml(target)}</span>
      <b>1 ${escapeHtml(base)} = ${escapeHtml(rate.toFixed(3))} ${escapeHtml(target)}</b>
      <small>${escapeHtml(inverse ? `1 ${target} = ${inverse.toFixed(3)} ${base}` : "")}</small>
      <small>${escapeHtml(date ? `Rate date: ${date}` : "Reference rate")}</small>
    </div>
  `;
}

function buildDestinationProfile(trip) {
  const firstSegment = trip.segments[0] || {};
  const finalSegment = trip.segments[trip.segments.length - 1] || firstSegment;
  const airport = airports[finalSegment.arrival_airport] || {};
  const countryCode = airport.countryCode || countryCodeForAirport(finalSegment.arrival_airport);
  const country = finalSegment.arrival_country_name || airport.country || "";
  return {
    airport: finalSegment.arrival_airport || "",
    city: finalSegment.arrival_city || airport.city || "",
    country,
    countryCode,
    timezone: finalSegment.arrival_timezone || airport.timezone || "",
    currency: airport.currency || currencyForCountry(countryCode),
    lat: airport.lat,
    lon: airport.lon,
    travelDate: (firstSegment.departure_datetime_local || "").split(" ")[0] || "",
    warningLinks: buildWarningLinks(countryCode, country),
    eventLinks: buildEventLinks(countryCode, airport.city || finalSegment.arrival_city, country),
  };
}

function buildWarningLinks(countryCode, countryName) {
  const stateSlug = {
    CY: "Cyprus",
    IL: "IsraeltheWestBankandGaza",
    IT: "Italy",
    GB: "UnitedKingdom",
    AE: "UnitedArabEmirates",
    TH: "Thailand",
    US: "UnitedStates",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
  }[countryCode];
  const links = [
    {
      label: "U.S. travel advisory",
      url: stateSlug
        ? `https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/${stateSlug}.html`
        : "https://travel.state.gov/content/travel/en/international-travel.html",
      note: countryName ? `Security and safety advisory for ${countryName}.` : "Security and safety advisories by country.",
    },
    {
      label: "UK foreign travel advice",
      url: "https://www.gov.uk/foreign-travel-advice",
      note: "Official UK country-specific safety, entry, health, and crisis guidance.",
    },
    {
      label: "GDACS disaster alerts",
      url: "https://www.gdacs.org/",
      note: "Global disaster alerts for earthquakes, floods, tropical cyclones, volcanoes, and related hazards.",
    },
    {
      label: "WHO outbreak news",
      url: "https://www.who.int/emergencies/disease-outbreak-news",
      note: "Official global disease outbreak updates from the World Health Organization.",
    },
  ];
  const weatherLink = officialWeatherLink(countryCode);
  if (weatherLink) links.push(weatherLink);
  return links;
}

function buildEventLinks(countryCode, city, countryName) {
  const byCountry = {
    CY: [
      {
        label: "Visit Cyprus events",
        url: "https://www.visitcyprus.com/index.php/en/discovercyprus/events",
        note: "Official Cyprus tourism event listings.",
      },
    ],
    IL: [
      {
        label: "Tel Aviv events",
        url: "https://www.visit-tel-aviv.com/",
        note: "Official Tel Aviv visitor information and event discovery.",
      },
    ],
    IT: [
      {
        label: "Italia.it events",
        url: "https://www.italia.it/en/events",
        note: "Official Italian tourism events.",
      },
    ],
    GB: [
      {
        label: "VisitBritain events",
        url: "https://www.visitbritain.com/en/things-to-do/events",
        note: "Official UK visitor event inspiration.",
      },
    ],
    AE: [
      {
        label: "Visit Dubai events",
        url: "https://www.visitdubai.com/en/whats-on",
        note: "Official Dubai event calendar.",
      },
    ],
    TH: [
      {
        label: "Tourism Thailand events",
        url: "https://www.tourismthailand.org/Events-and-Festivals",
        note: "Official Tourism Authority of Thailand event listings.",
      },
    ],
    US: [
      {
        label: "Visit The USA events",
        url: "https://www.visittheusa.com/events",
        note: "Official U.S. tourism event listings.",
      },
    ],
    FR: [
      {
        label: "Explore France events",
        url: "https://www.france.fr/en/events/",
        note: "Official French tourism event listings.",
      },
    ],
    GR: [
      {
        label: "Visit Greece events",
        url: "https://www.visitgreece.gr/events/",
        note: "Official Greek tourism event listings.",
      },
    ],
    DE: [
      {
        label: "Germany tourism events",
        url: "https://www.germany.travel/en/events/events.html",
        note: "Official German tourism event listings.",
      },
    ],
  };
  return (
    byCountry[countryCode] || [
      {
        label: `${city || countryName || "Destination"} events`,
        url: "",
        note: "No official event calendar is mapped yet for this destination.",
      },
    ]
  );
}

function officialWeatherLink(countryCode) {
  const links = {
    CY: { label: "Cyprus weather service", url: "https://www.dom.org.cy/", note: "Official Cyprus Department of Meteorology." },
    IL: { label: "Israel weather service", url: "https://ims.gov.il/", note: "Official Israel Meteorological Service." },
    IT: { label: "Italy weather service", url: "https://www.meteoam.it/", note: "Official Italian Air Force weather service." },
    GB: { label: "UK Met Office warnings", url: "https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings", note: "Official UK weather warnings." },
    AE: { label: "UAE weather service", url: "https://www.ncm.ae/", note: "Official UAE National Center of Meteorology." },
    US: { label: "U.S. weather alerts", url: "https://www.weather.gov/alerts", note: "Official National Weather Service alerts." },
    FR: { label: "France weather alerts", url: "https://vigilance.meteofrance.fr/", note: "Official Meteo-France weather warnings." },
    GR: { label: "Greece weather service", url: "https://www.emy.gr/", note: "Official Hellenic National Meteorological Service." },
    DE: { label: "Germany weather warnings", url: "https://www.dwd.de/EN/weather/warnings/warnings_node.html", note: "Official German Weather Service warnings." },
  };
  return links[countryCode] || null;
}

function renderDestinationLink(source) {
  if (!source.url) {
    return `
      <div class="destination-link destination-link-muted">
        <b>${escapeHtml(source.label)}</b>
        <span>${escapeHtml(source.note)}</span>
      </div>
    `;
  }
  return `
    <a class="destination-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
      <b>${escapeHtml(source.label)}</b>
      <span>${escapeHtml(source.note)}</span>
    </a>
  `;
}

function renderLoading(message) {
  return `<div class="panel-loading">${escapeHtml(message)}</div>`;
}

function renderPanelError(message) {
  return `<div class="panel-error">${escapeHtml(message)}</div>`;
}

function currencyForCountry(countryCode) {
  return {
    CY: "EUR",
    IL: "ILS",
    IT: "EUR",
    GB: "GBP",
    AE: "AED",
    TH: "THB",
    US: "USD",
    FR: "EUR",
    DE: "EUR",
    GR: "EUR",
  }[countryCode] || "";
}

function weatherCodeLabel(code) {
  const labels = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with hail",
  };
  return labels[code] || "Forecast";
}

function formatTemperature(value) {
  return value == null ? "-" : `${Math.round(value)} C`;
}

function formatTemperatureRange(min, max) {
  if (min == null || max == null) return "-";
  return `${Math.round(min)}-${Math.round(max)} C`;
}

function formatSpeed(value) {
  return value == null ? "-" : `${Math.round(value)} km/h`;
}

function formatHumidity(value) {
  return value == null ? "" : `${Math.round(value)}% humidity`;
}

function formatRain(value) {
  return value == null ? "Rain -%" : `Rain ${Math.round(value)}%`;
}

function shortDate(value) {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
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

function renderRequirements(trip) {
  const sources = buildRequirementSources(trip);
  const route = sources.routeSegments
    .map((segment) => `${segment.departure_airport || "-"} to ${segment.arrival_airport || "-"}`)
    .join(" / ");
  const travelDate = firstTravelDate(trip);

  return `
    <div class="notice">
      Travel requirements depend on citizenship, passport type, residence permits, transit,
      stay length, and current rules. The query below is ready for a licensed Railway/API backend.
    </div>
    <div class="requirements-workspace">
      <section class="requirements-main" aria-label="Travel document query">
        <article class="requirement-card requirement-hero">
          <div>
            <div class="summary-label">Route basis</div>
            <div class="summary-value">${escapeHtml(route || "-")}</div>
            <div class="requirement-note">${escapeHtml(sources.destinationName)} / travel date ${escapeHtml(travelDate || "-")}</div>
          </div>
          <span class="provider-badge">Provider pending</span>
        </article>

        <article class="requirement-card">
          <div class="requirement-card-head">
            <div>
              <h3>Passenger inputs</h3>
              <p>These fields are required before TravelDoc/IATA can return a reliable answer.</p>
            </div>
          </div>
          <div class="requirements-form">
            ${renderSelectField("Citizenship / nationality", "nationality", countryOptions)}
            ${renderSelectField("Passport issuing country", "passportCountry", countryOptions)}
            ${renderSelectField("Passport type", "passportType", passportTypeOptions)}
            ${renderInputField("Passport expiry", "passportExpiry", "date")}
            ${renderSelectField("Residence country", "residenceCountry", countryOptions)}
            ${renderInputField("Stay length", "stayLengthDays", "number", "Days")}
            ${renderSelectField("Transit", "transitMode", transitOptions)}
            ${renderInputField("Travel date", "travelDate", "date", "", travelDate)}
          </div>
          <div class="requirement-actions">
            <button class="primary" id="prepareRequirementsBtn" type="button">Prepare query</button>
            <button class="secondary" id="copyRequirementsBtn" type="button">Copy query JSON</button>
          </div>
        </article>

        <article class="requirement-card">
          <div class="requirement-card-head">
            <div>
              <h3>Query packet</h3>
              <p>Backend-ready payload for Railway, TravelDoc, or IATA Timatic AutoCheck.</p>
            </div>
            <span id="requirementsStatus" class="provider-badge">Draft</span>
          </div>
          <div id="requirementsPreview" class="requirements-preview"></div>
        </article>
      </section>

      <aside class="requirements-side" aria-label="Travel requirement results">
        <article class="requirement-card result-card">
          <div class="summary-label">Result status</div>
          <div id="requirementsResult" class="result-status"></div>
        </article>

        <article class="requirement-card">
          <h3>Official checkers</h3>
          ${sources.globalCheckers.map(renderRequirementSource).join("")}
        </article>

        <article class="requirement-card">
          <h3>Destination sources</h3>
          ${
            sources.destinationSources.length
              ? sources.destinationSources.map(renderRequirementSource).join("")
              : `<div class="requirement-note">No destination government source mapped yet.</div>`
          }
        </article>
      </aside>
    </div>
  `;
}

function bindRequirementComponents(trip) {
  const fields = requirementsTab.querySelectorAll("[data-req-field]");
  fields.forEach((field) => {
    if (requirementsState[field.dataset.reqField] == null && field.value) {
      requirementsState[field.dataset.reqField] = field.value;
    }
    field.addEventListener("input", () => {
      requirementsState[field.dataset.reqField] = field.value;
      updateRequirementsPreview(trip);
    });
    field.addEventListener("change", () => {
      requirementsState[field.dataset.reqField] = field.value;
      updateRequirementsPreview(trip);
    });
  });

  const prepareButton = requirementsTab.querySelector("#prepareRequirementsBtn");
  const copyButton = requirementsTab.querySelector("#copyRequirementsBtn");
  if (prepareButton) prepareButton.addEventListener("click", () => updateRequirementsPreview(trip, true));
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const payload = buildRequirementsQuery(trip);
      await copyText(JSON.stringify(payload, null, 2));
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy query JSON";
      }, 1400);
    });
  }
  updateRequirementsPreview(trip);
}

function updateRequirementsPreview(trip, markPrepared = false) {
  const payload = buildRequirementsQuery(trip);
  const status = requirementsTab.querySelector("#requirementsStatus");
  const preview = requirementsTab.querySelector("#requirementsPreview");
  const result = requirementsTab.querySelector("#requirementsResult");
  if (!status || !preview || !result) return;

  const missing = payload.missing_inputs;
  status.textContent = missing.length ? `${missing.length} missing` : "Ready";
  status.classList.toggle("provider-ready", missing.length === 0);

  preview.innerHTML = `
    <div class="query-grid">
      ${renderQueryFact("Origin", payload.route.origin_airport || "-")}
      ${renderQueryFact("Destination", payload.route.destination_airport || "-")}
      ${renderQueryFact("Travel date", payload.travel.travel_date || "-")}
      ${renderQueryFact("Nationality", labelForCountry(payload.passenger.nationality) || "-")}
      ${renderQueryFact("Passport", labelForCountry(payload.passenger.passport_issuing_country) || "-")}
      ${renderQueryFact("Stay", payload.travel.stay_length_days ? `${payload.travel.stay_length_days} days` : "-")}
    </div>
    <pre class="query-json">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
  `;

  const resultText = missing.length
    ? `Missing: ${missing.join(", ")}`
    : "Ready to send to a licensed provider backend.";
  result.innerHTML = `
    <div class="${missing.length ? "result-waiting" : "result-ready"}">${escapeHtml(resultText)}</div>
    <div class="requirement-note">
      ${
        markPrepared && !missing.length
          ? "Next step: connect Railway to TravelDoc/IATA and replace this pending card with live provider results."
          : "Provider API is not connected in the static GitHub Pages app, so no visa decision is shown here."
      }
    </div>
    <div class="provider-result-list">
      <div><b>TravelDoc</b><span>Awaiting licensed API/proxy</span></div>
      <div><b>IATA Timatic</b><span>Awaiting API credentials</span></div>
      <div><b>Government sources</b><span>Open official links below</span></div>
    </div>
  `;
}

function buildRequirementsQuery(trip) {
  const firstSegment = trip.segments[0] || {};
  const lastSegment = trip.segments[trip.segments.length - 1] || firstSegment;
  const travelDate = fieldValue("travelDate") || firstTravelDate(trip);
  const stayLength = fieldValue("stayLengthDays");
  const payload = {
    provider_target: "traveldoc_or_iata_timatic_backend",
    generated_at: new Date().toISOString(),
    passenger: {
      full_name: trip.passengers[0]?.full_name || "",
      nationality: fieldValue("nationality"),
      passport_issuing_country: fieldValue("passportCountry"),
      passport_type: fieldValue("passportType"),
      passport_expiry: fieldValue("passportExpiry"),
      residence_country: fieldValue("residenceCountry"),
    },
    route: {
      origin_airport: firstSegment.departure_airport || "",
      destination_airport: lastSegment.arrival_airport || "",
      origin_country: firstSegment.departure_country_name || "",
      destination_country: lastSegment.arrival_country_name || "",
      segments: trip.segments.map((segment) => ({
        from: segment.departure_airport || "",
        to: segment.arrival_airport || "",
        departure: segment.departure_datetime_local || "",
        arrival: segment.arrival_datetime_local || "",
      })),
    },
    travel: {
      travel_date: travelDate,
      stay_length_days: stayLength,
      transit_mode: fieldValue("transitMode") || "unknown",
    },
    missing_inputs: [],
  };

  payload.missing_inputs = missingRequirementInputs(payload);
  return payload;
}

function missingRequirementInputs(payload) {
  const checks = [
    ["Citizenship / nationality", payload.passenger.nationality],
    ["Passport issuing country", payload.passenger.passport_issuing_country],
    ["Passport type", payload.passenger.passport_type],
    ["Passport expiry", payload.passenger.passport_expiry],
    ["Travel date", payload.travel.travel_date],
    ["Stay length", payload.travel.stay_length_days],
  ];
  return checks.filter(([, value]) => !value).map(([label]) => label);
}

function renderSelectField(label, key, options) {
  const selectedValue = requirementsState[key] || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <select data-req-field="${escapeHtml(key)}">
        ${options
          .map(
            ([value, optionLabel]) =>
              `<option value="${escapeHtml(value)}"${value === selectedValue ? " selected" : ""}>${escapeHtml(optionLabel)}</option>`
          )
          .join("")}
      </select>
    </label>
  `;
}

function renderInputField(label, key, type, suffix = "", fallbackValue = "") {
  const value = requirementsState[key] || fallbackValue || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input data-req-field="${escapeHtml(key)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}" ${
        suffix ? `placeholder="${escapeHtml(suffix)}"` : ""
      }>
    </label>
  `;
}

function renderQueryFact(label, value) {
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(value)}</b>
    </div>
  `;
}

function fieldValue(key) {
  const field = requirementsTab.querySelector(`[data-req-field="${key}"]`);
  return field ? field.value.trim() : requirementsState[key] || "";
}

function firstTravelDate(trip) {
  const firstSegment = trip.segments[0] || {};
  return (firstSegment.departure_datetime_local || "").split(" ")[0] || "";
}

function labelForCountry(code) {
  return (countryOptions.find(([value]) => value === code) || [null, ""])[1];
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const copyArea = document.createElement("textarea");
  copyArea.value = text;
  copyArea.setAttribute("readonly", "");
  copyArea.style.position = "fixed";
  copyArea.style.left = "-9999px";
  document.body.appendChild(copyArea);
  copyArea.select();
  document.execCommand("copy");
  document.body.removeChild(copyArea);
}

function renderRequirementSource(source) {
  return `
    <article class="requirement-card">
      <a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>
      <div class="requirement-note">${escapeHtml(source.note)}</div>
    </article>
  `;
}

function buildRequirementSources(trip) {
  const globalCheckers = [
    {
      label: "TravelDoc.aero",
      url: "https://www.traveldoc.aero/",
      note: "Airline-style document, visa, passport, and health checker.",
    },
    {
      label: "IATA Travel Centre",
      url: "https://www.iatatravelcentre.com/",
      note: "IATA passenger travel-document checker.",
    },
  ];

  const byCountry = {
    CY: [{ label: "Gov.cy visa information", url: "https://www.gov.cy/en/information/visas/", note: "Official Cyprus government visa information." }],
    IT: [{ label: "Visa for Italy", url: "https://vistoperitalia.esteri.it/", note: "Official Italian Ministry of Foreign Affairs visa checker." }],
    GB: [{ label: "GOV.UK visa checker", url: "https://www.gov.uk/check-uk-visa", note: "Official UK visa and ETA checker." }],
    AE: [{ label: "UAE government tourist visa", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/tourist-visa", note: "Official UAE government tourist visa guidance." }],
    TH: [{ label: "Thailand e-Visa", url: "https://www.thaievisa.go.th/", note: "Official Thailand Ministry of Foreign Affairs e-Visa portal." }],
    IL: [{ label: "ETA-IL official authority", url: "https://israel-entry.piba.gov.il/learn-about", note: "Official Israel Population and Immigration Authority ETA-IL portal." }],
  };

  const routeSegments = trip.segments.map((segment) => ({
    departure_airport: segment.departure_airport,
    arrival_airport: segment.arrival_airport,
    arrival_country_code: countryCodeForAirport(segment.arrival_airport),
    arrival_country_name: segment.arrival_country_name,
  }));

  const destinationNames = [...new Set(routeSegments.map((segment) => segment.arrival_country_name).filter(Boolean))];
  const seen = new Set();
  const destinationSources = [];
  for (const segment of routeSegments) {
    for (const source of byCountry[segment.arrival_country_code] || []) {
      if (!seen.has(source.url)) {
        destinationSources.push(source);
        seen.add(source.url);
      }
    }
  }

  return {
    routeSegments,
    destinationName: destinationNames.join(", ") || "the destination",
    globalCheckers,
    destinationSources,
    requiredInputs: [
      "Passenger citizenship/nationality",
      "Passport type and expiry date",
      "Residence country or visa/residence permits held",
      "Transit airports and whether the passenger leaves airside transit",
      "Final travel date and length of stay",
    ],
  };
}

function countryCodeForAirport(iata) {
  const airport = airports[iata] || {};
  const byCountryName = {
    Israel: "IL",
    Cyprus: "CY",
    Italy: "IT",
    "United Kingdom": "GB",
    "United Arab Emirates": "AE",
    Thailand: "TH",
  };
  return byCountryName[airport.country] || "";
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
