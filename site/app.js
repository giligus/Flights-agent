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

const pdfJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const pdfWorkerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const tesseractUrl = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
const scriptLoads = new Map();

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
  requirementsTab.innerHTML = renderRequirements(trip);
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

  return `
    <div class="notice">
      Travel requirements depend on citizenship, passport type, residence permits, transit,
      stay length, and current rules. Use official checkers before travel.
    </div>
    <article class="requirement-card">
      <div class="summary-label">Route basis</div>
      <div class="summary-value">${escapeHtml(route || "-")} / ${escapeHtml(sources.destinationName)}</div>
    </article>
    <h3>Official checkers</h3>
    ${sources.globalCheckers.map(renderRequirementSource).join("")}
    <h3>Destination government sources</h3>
    ${sources.destinationSources.map(renderRequirementSource).join("")}
    <h3>Needed passenger inputs</h3>
    <ul>
      ${sources.requiredInputs.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
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
