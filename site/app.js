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
  ["GR", "Greece"],
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
const officialVisaSources = {
  IL: [
    {
      label: "Israel Population & Immigration Authority",
      url: "https://israel-entry.piba.gov.il/",
      note: "Official ETA-IL, eVisa-B2, and entry procedure portal.",
    },
  ],
  CY: [
    {
      label: "Gov.cy visas",
      url: "https://www.gov.cy/en/information/visas/",
      note: "Official Republic of Cyprus visa information.",
    },
  ],
  IT: [
    {
      label: "Visa for Italy",
      url: "https://vistoperitalia.esteri.it/",
      note: "Official Italian Ministry of Foreign Affairs visa checker.",
    },
  ],
  GB: [
    {
      label: "GOV.UK visa checker",
      url: "https://www.gov.uk/check-uk-visa",
      note: "Official UK visa and ETA checker.",
    },
  ],
  AE: [
    {
      label: "UAE visit visas",
      url: "https://u.ae/en/information-and-services/visa-and-emirates-id/visit-visas",
      note: "Official UAE government visit visa guidance.",
    },
  ],
  TH: [
    {
      label: "Thailand e-Visa",
      url: "https://www.thaievisa.go.th/",
      note: "Official Thai e-Visa portal.",
    },
  ],
  US: [
    {
      label: "Official ESTA application",
      url: "https://esta.cbp.dhs.gov/",
      note: "Official U.S. Customs and Border Protection travel authorization for eligible Visa Waiver Program travelers. ESTA is not a visa.",
    },
    {
      label: "U.S. visitor visa",
      url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
      note: "Official U.S. Department of State guidance for travelers who need a visitor visa.",
    },
  ],
  FR: [
    {
      label: "France-Visas",
      url: "https://france-visas.gouv.fr/en/",
      note: "Official French visa portal.",
    },
  ],
};
const destinationDirectory = [
  { key: "TLV", label: "Tel Aviv, Israel", type: "City", airport: "TLV" },
  { key: "LCA", label: "Larnaca, Cyprus", type: "City", airport: "LCA" },
  { key: "LHR", label: "London, United Kingdom", type: "City", airport: "LHR" },
  { key: "JFK", label: "New York, United States", type: "City", airport: "JFK" },
  { key: "CDG", label: "Paris, France", type: "City", airport: "CDG" },
  { key: "FCO", label: "Rome, Italy", type: "City", airport: "FCO" },
  { key: "MXP", label: "Milan, Italy", type: "City", airport: "MXP" },
  { key: "VCE", label: "Venice, Italy", type: "City", airport: "VCE" },
  { key: "ATH", label: "Athens, Greece", type: "City", airport: "ATH" },
  { key: "DXB", label: "Dubai, United Arab Emirates", type: "City", airport: "DXB" },
  {
    key: "IL",
    label: "Israel",
    type: "Country",
    city: "Jerusalem",
    country: "Israel",
    countryCode: "IL",
    timezone: "Asia/Jerusalem",
    currency: "ILS",
    lat: 31.7683,
    lon: 35.2137,
  },
  {
    key: "CY",
    label: "Cyprus",
    type: "Country",
    city: "Nicosia",
    country: "Cyprus",
    countryCode: "CY",
    timezone: "Asia/Nicosia",
    currency: "EUR",
    lat: 35.1856,
    lon: 33.3823,
  },
  {
    key: "IT",
    label: "Italy",
    type: "Country",
    city: "Rome",
    country: "Italy",
    countryCode: "IT",
    timezone: "Europe/Rome",
    currency: "EUR",
    lat: 41.9028,
    lon: 12.4964,
  },
  {
    key: "GB",
    label: "United Kingdom",
    type: "Country",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    timezone: "Europe/London",
    currency: "GBP",
    lat: 51.5072,
    lon: -0.1276,
  },
  {
    key: "AE",
    label: "United Arab Emirates",
    type: "Country",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    timezone: "Asia/Dubai",
    currency: "AED",
    lat: 24.4539,
    lon: 54.3773,
  },
  {
    key: "FR",
    label: "France",
    type: "Country",
    city: "Paris",
    country: "France",
    countryCode: "FR",
    timezone: "Europe/Paris",
    currency: "EUR",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    key: "US",
    label: "United States",
    type: "Country",
    city: "Washington, DC",
    country: "United States",
    countryCode: "US",
    timezone: "America/New_York",
    currency: "USD",
    lat: 38.9072,
    lon: -77.0369,
  },
  {
    key: "TH",
    label: "Thailand",
    type: "Country",
    city: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
    timezone: "Asia/Bangkok",
    currency: "THB",
    lat: 13.7563,
    lon: 100.5018,
  },
];
const standaloneRequirementsState = {};
const visaSelectionState = new Set(["IL"]);
let standaloneDestinationKey = "TLV";
let standaloneRequirementsStep = 1;
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
const standaloneToolPanel = document.querySelector("#standaloneToolPanel");
const homeIntro = document.querySelector("#homeIntro");
const serviceHub = document.querySelector("#serviceHub");
const activeFlowBar = document.querySelector("#activeFlowBar");
const activeFlowTitle = document.querySelector("#activeFlowTitle");
const activeFlowDescription = document.querySelector("#activeFlowDescription");
const backServicesBtn = document.querySelector("#backServicesBtn");
const flightWorkspace = document.querySelector("#flightWorkspace");
const textReview = document.querySelector("#textReview");
const textReviewLabel = document.querySelector("#textReviewLabel");

const serviceDetails = {
  scan: {
    title: "Scan my ticket",
    description: "Upload a PDF or photo, then review the detected flight details.",
  },
  requirements: {
    title: "Check entry requirements",
    description: "Tell us about the trip and traveler to prepare an official-source checklist.",
  },
  visa: {
    title: "Find an official visa site",
    description: "Choose up to five destinations and continue only to government sources.",
  },
  destination: {
    title: "Explore a destination",
    description: "See practical destination information in one easy-to-scan view.",
  },
};

let currentTrip = null;
let currentSourceType = "pasted_text";

document.querySelectorAll(".service-tile").forEach((button) => {
  button.addEventListener("click", () => {
    showService(button.dataset.service);
  });
});

backServicesBtn?.addEventListener("click", showHome);

document.querySelectorAll("input[name='mode']").forEach((input) => {
  input.addEventListener("change", () => {
    const fileMode = input.value === "file" && input.checked;
    dropZone.classList.toggle("hidden", !fileMode);
    ticketText.classList.toggle("text-from-file", fileMode);
    if (textReview) textReview.open = !fileMode;
    if (textReviewLabel) textReviewLabel.textContent = fileMode ? "Review extracted text" : "Paste ticket text";
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
  currentSourceType = document.querySelector("input[name='mode']:checked")?.value === "file" ? "browser_text_file" : "pasted_text";
  results.classList.add("hidden");
  emptyState.classList.remove("hidden");
  if (textReview) textReview.open = document.querySelector("input[name='mode']:checked")?.value === "text";
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

showHome();

function showHome() {
  homeIntro?.classList.remove("hidden");
  serviceHub?.classList.remove("hidden");
  activeFlowBar?.classList.add("hidden");
  standaloneToolPanel?.classList.add("hidden");
  flightWorkspace?.classList.add("hidden");
  document.querySelectorAll(".service-tile").forEach((tile) => tile.classList.remove("active"));
  refreshIcons();
}

function showService(service) {
  const details = serviceDetails[service] || serviceDetails.scan;
  homeIntro?.classList.add("hidden");
  serviceHub?.classList.add("hidden");
  activeFlowBar?.classList.remove("hidden");
  if (activeFlowTitle) activeFlowTitle.textContent = details.title;
  if (activeFlowDescription) activeFlowDescription.textContent = details.description;

  const scanMode = service === "scan";
  flightWorkspace?.classList.toggle("hidden", !scanMode);
  standaloneToolPanel?.classList.toggle("hidden", scanMode);
  if (!scanMode) {
    if (service === "requirements") standaloneRequirementsStep = 1;
    renderStandaloneTool(service);
  }
  refreshIcons();
  activeFlowBar?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function refreshIcons() {
  window.lucide?.createIcons();
}

function renderStandaloneTool(service) {
  if (!standaloneToolPanel) return;

  if (service === "visa") {
    standaloneToolPanel.innerHTML = renderVisaTool();
    bindVisaTool();
    refreshIcons();
    return;
  }

  if (service === "destination") {
    standaloneToolPanel.innerHTML = renderDestinationInfoTool();
    bindDestinationInfoTool();
    refreshIcons();
    return;
  }

  standaloneToolPanel.innerHTML = renderStandaloneRequirements();
  bindStandaloneRequirements();
  refreshIcons();
}

function renderStandaloneRequirements() {
  const steps = ["Your trip", "Your passport", "Trip details"];
  const stepFields = [
    `${renderStandaloneSelectField("Where are you leaving from?", "originCountry", countryOptions)}
     ${renderStandaloneSelectField("Where are you going?", "destinationCountry", countryOptions)}
     ${renderStandaloneInputField("When do you travel?", "travelDate", "date")}`,
    `${renderStandaloneSelectField("Your citizenship / nationality", "nationality", countryOptions)}
     ${renderStandaloneSelectField("Passport issuing country", "passportCountry", countryOptions)}
     ${renderStandaloneSelectField("Passport type", "passportType", passportTypeOptions)}
     ${renderStandaloneInputField("Passport expiry", "passportExpiry", "date")}`,
    `${renderStandaloneInputField("How many days will you stay?", "stayLengthDays", "number", "Days")}
     ${renderStandaloneSelectField("Will you transit on the way?", "transitMode", transitOptions)}`,
  ];

  return `
    <div class="tool-layout requirements-guide">
      <section class="tool-card guide-card">
        <div class="tool-card-head">
          <div class="heading-with-icon">
            <span class="section-icon icon-teal" aria-hidden="true"><i data-lucide="clipboard-check"></i></span>
            <div>
              <div class="summary-label">Step ${standaloneRequirementsStep} of 3</div>
              <h2>${escapeHtml(steps[standaloneRequirementsStep - 1])}</h2>
              <p>Answer a few details at a time. We will keep your progress as you continue.</p>
            </div>
          </div>
          <span class="provider-badge">About 2 minutes</span>
        </div>

        <div class="step-progress" aria-label="Requirement check progress">
          ${steps
            .map(
              (label, index) => `
                <div class="step-marker ${index + 1 === standaloneRequirementsStep ? "active" : ""} ${
                  index + 1 < standaloneRequirementsStep ? "complete" : ""
                }">
                  <span>${index + 1 < standaloneRequirementsStep ? '<i data-lucide="check"></i>' : index + 1}</span>
                  <b>${escapeHtml(label)}</b>
                </div>
              `
            )
            .join("")}
        </div>

        <div class="requirements-form guided-fields">
          ${stepFields[standaloneRequirementsStep - 1]}
        </div>
        <div id="standaloneStepNotice" class="step-notice" role="status"></div>
        <div class="requirement-actions">
          ${
            standaloneRequirementsStep > 1
              ? '<button class="secondary" id="standalonePreviousStepBtn" type="button"><i data-lucide="arrow-left" aria-hidden="true"></i> Back</button>'
              : ""
          }
          <button class="primary" id="standaloneNextStepBtn" type="button">
            ${standaloneRequirementsStep === 3 ? '<i data-lucide="search-check" aria-hidden="true"></i> Check my trip' : 'Continue <i data-lucide="arrow-right" aria-hidden="true"></i>'}
          </button>
        </div>
      </section>
      <aside class="tool-card">
        <div class="tool-card-head">
          <div class="heading-with-icon">
            <span class="section-icon icon-amber" aria-hidden="true"><i data-lucide="list-checks"></i></span>
            <div>
              <h2>Your travel checklist</h2>
              <p>Your answers and official destination sources, kept in one place.</p>
            </div>
          </div>
          <span id="standaloneRequirementsStatus" class="provider-badge">Draft</span>
        </div>
        <div id="standaloneRequirementsPreview" class="requirements-preview"></div>
        <div class="official-source-list">
          <h3><i data-lucide="landmark" aria-hidden="true"></i> Official sources</h3>
          <div id="standaloneRequirementSources"></div>
        </div>
        <details class="advanced-details">
          <summary><span><i data-lucide="braces" aria-hidden="true"></i> Advanced details</span></summary>
          <p>Technical data for a licensed travel-requirements provider.</p>
          <button class="secondary compact-button" id="standaloneCopyRequirementsBtn" type="button">
            <i data-lucide="copy" aria-hidden="true"></i> Copy details
          </button>
          <pre id="standaloneQueryJson" class="query-json"></pre>
        </details>
      </aside>
    </div>
  `;
}

function bindStandaloneRequirements() {
  standaloneToolPanel.querySelectorAll("[data-standalone-req-field]").forEach((field) => {
    if (standaloneRequirementsState[field.dataset.standaloneReqField] == null && field.value) {
      standaloneRequirementsState[field.dataset.standaloneReqField] = field.value;
    }
    field.addEventListener("input", () => {
      standaloneRequirementsState[field.dataset.standaloneReqField] = field.value;
      field.removeAttribute("aria-invalid");
      field.closest(".field")?.classList.remove("field-error");
      updateStandaloneRequirementsPreview();
    });
    field.addEventListener("change", () => {
      const key = field.dataset.standaloneReqField;
      standaloneRequirementsState[key] = field.value;
      if (key === "nationality" && !standaloneRequirementsState.passportCountry) {
        standaloneRequirementsState.passportCountry = field.value;
        const passportField = standaloneToolPanel.querySelector('[data-standalone-req-field="passportCountry"]');
        if (passportField) passportField.value = field.value;
      }
      field.removeAttribute("aria-invalid");
      field.closest(".field")?.classList.remove("field-error");
      updateStandaloneRequirementsPreview();
    });
  });

  standaloneToolPanel.querySelector("#standalonePreviousStepBtn")?.addEventListener("click", () => {
    standaloneRequirementsStep = Math.max(1, standaloneRequirementsStep - 1);
    renderStandaloneTool("requirements");
  });
  standaloneToolPanel.querySelector("#standaloneNextStepBtn")?.addEventListener("click", () => {
    const missing = missingStandaloneStepFields(standaloneRequirementsStep);
    const notice = standaloneToolPanel.querySelector("#standaloneStepNotice");
    if (missing.length) {
      if (notice) notice.textContent = `Please complete: ${missing.map((item) => item.label).join(", ")}.`;
      missing.forEach((item) => {
        const field = standaloneToolPanel.querySelector(`[data-standalone-req-field="${item.key}"]`);
        field?.setAttribute("aria-invalid", "true");
        field?.closest(".field")?.classList.add("field-error");
      });
      return;
    }
    if (standaloneRequirementsStep < 3) {
      standaloneRequirementsStep += 1;
      renderStandaloneTool("requirements");
      return;
    }
    updateStandaloneRequirementsPreview(true);
    if (notice) notice.textContent = "Your details are ready. Use the official links in your checklist.";
  });
  standaloneToolPanel.querySelector("#standaloneCopyRequirementsBtn")?.addEventListener("click", async (event) => {
    await copyText(JSON.stringify(buildStandaloneRequirementsQuery(), null, 2));
    event.currentTarget.textContent = "Copied";
    window.setTimeout(() => {
      event.currentTarget.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i> Copy details';
      refreshIcons();
    }, 1400);
  });

  updateStandaloneRequirementsPreview();
}

function updateStandaloneRequirementsPreview(markPrepared = false) {
  const payload = buildStandaloneRequirementsQuery();
  const status = standaloneToolPanel.querySelector("#standaloneRequirementsStatus");
  const preview = standaloneToolPanel.querySelector("#standaloneRequirementsPreview");
  const sources = standaloneToolPanel.querySelector("#standaloneRequirementSources");
  if (!status || !preview || !sources) return;

  status.textContent = payload.missing_inputs.length
    ? standaloneRequirementsStep < 3
      ? "In progress"
      : `${payload.missing_inputs.length} ${payload.missing_inputs.length === 1 ? "detail" : "details"} needed`
    : "Ready";
  status.classList.toggle("provider-ready", payload.missing_inputs.length === 0);
  preview.innerHTML = `
    <div class="query-grid">
      ${renderQueryFact("Origin", labelForCountry(payload.route.origin_country) || "-")}
      ${renderQueryFact("Destination", labelForCountry(payload.route.destination_country) || "-")}
      ${renderQueryFact("Nationality", labelForCountry(payload.passenger.nationality) || "-")}
      ${renderQueryFact("Passport", labelForCountry(payload.passenger.passport_issuing_country) || "-")}
      ${renderQueryFact("Travel date", payload.travel.travel_date || "-")}
      ${renderQueryFact("Stay", payload.travel.stay_length_days ? `${payload.travel.stay_length_days} days` : "-")}
    </div>
    <div class="${payload.missing_inputs.length ? "result-waiting" : "result-ready"}">
      ${escapeHtml(
        payload.missing_inputs.length
          ? standaloneRequirementsStep < 3
            ? `Complete step ${standaloneRequirementsStep} of 3 to build your travel checklist.`
            : `Still needed: ${payload.missing_inputs.join(", ")}`
          : markPrepared
            ? "Your details are ready. Continue with the official sources below."
            : "All required details are complete."
      )}
    </div>
  `;

  const queryJson = standaloneToolPanel.querySelector("#standaloneQueryJson");
  if (queryJson) queryJson.textContent = JSON.stringify(payload, null, 2);

  const officialSources = [
    ...buildRequirementSourcesForCountry(payload.route.destination_country),
    ...buildRequirementSourcesForCountry(payload.route.origin_country),
  ];
  const uniqueSources = uniqueSourcesByUrl(officialSources);
  sources.innerHTML = uniqueSources.length
    ? uniqueSources.map(renderRequirementSource).join("")
    : `<div class="requirement-note">Choose a destination to show official government sources.</div>`;
  refreshIcons();
}

function missingStandaloneStepFields(step) {
  const fieldsByStep = {
    1: [
      ["originCountry", "departure country"],
      ["destinationCountry", "destination country"],
      ["travelDate", "travel date"],
    ],
    2: [
      ["nationality", "nationality"],
      ["passportCountry", "passport issuing country"],
      ["passportType", "passport type"],
      ["passportExpiry", "passport expiry"],
    ],
    3: [["stayLengthDays", "stay length"]],
  };
  return (fieldsByStep[step] || [])
    .filter(([key]) => !standaloneFieldValue(key))
    .map(([key, label]) => ({ key, label }));
}

function buildStandaloneRequirementsQuery() {
  const payload = {
    provider_target: "traveldoc_or_iata_timatic_backend",
    generated_at: new Date().toISOString(),
    passenger: {
      nationality: standaloneFieldValue("nationality"),
      passport_issuing_country: standaloneFieldValue("passportCountry"),
      passport_type: standaloneFieldValue("passportType"),
      passport_expiry: standaloneFieldValue("passportExpiry"),
    },
    route: {
      origin_country: standaloneFieldValue("originCountry"),
      destination_country: standaloneFieldValue("destinationCountry"),
    },
    travel: {
      travel_date: standaloneFieldValue("travelDate"),
      stay_length_days: standaloneFieldValue("stayLengthDays"),
      transit_mode: standaloneFieldValue("transitMode") || "unknown",
    },
    missing_inputs: [],
  };
  payload.missing_inputs = missingRequirementInputs(payload);
  if (!payload.route.origin_country) payload.missing_inputs.push("Origin country");
  if (!payload.route.destination_country) payload.missing_inputs.push("Destination country");
  return payload;
}

function renderVisaTool() {
  const options = Object.entries(officialVisaSources)
    .map(([countryCode, sources]) => {
      const checked = visaSelectionState.has(countryCode) ? " checked" : "";
      return `
        <label class="destination-check" data-visa-option data-country-name="${escapeHtml(
          labelForCountry(countryCode) || countryCode
        )}">
          <input type="checkbox" data-visa-country="${escapeHtml(countryCode)}"${checked}>
          <span class="mini-icon" aria-hidden="true"><i data-lucide="map-pin"></i></span>
          <span>
            <b>${escapeHtml(labelForCountry(countryCode) || countryCode)}</b>
            <small>${escapeHtml(sources[0]?.label || "Official visa site")}</small>
          </span>
        </label>
      `;
    })
    .join("");

  return `
    <div class="tool-layout">
      <section class="tool-card">
        <div class="tool-card-head">
          <div class="heading-with-icon">
            <span class="section-icon icon-amber" aria-hidden="true"><i data-lucide="badge-check"></i></span>
            <div>
              <div class="summary-label">Official sources only</div>
              <h2>Where are you going?</h2>
              <p>Select 1 to 5 destinations. We will show the relevant government or official authority sites.</p>
            </div>
          </div>
          <span id="visaSelectionCount" class="provider-badge">1 selected</span>
        </div>
        <label class="search-field" for="visaCountrySearch">
          <i data-lucide="search" aria-hidden="true"></i>
          <input id="visaCountrySearch" type="search" aria-label="Search destinations" placeholder="Search destinations" autocomplete="off">
        </label>
        <div class="destination-check-grid">${options}</div>
        <div id="visaLimitNotice" class="requirement-note">Select between 1 and 5 destinations.</div>
      </section>
      <aside class="tool-card">
        <div class="tool-card-head">
          <div class="heading-with-icon">
            <span class="section-icon icon-blue" aria-hidden="true"><i data-lucide="landmark"></i></span>
            <div>
              <h2>Official visa links</h2>
              <p>Eligibility depends on your passport and trip details. Each link opens the authority website.</p>
            </div>
          </div>
        </div>
        <div id="visaSourceResults" class="official-source-list"></div>
      </aside>
    </div>
  `;
}

function bindVisaTool() {
  standaloneToolPanel.querySelector("#visaCountrySearch")?.addEventListener("input", (event) => {
    const query = event.currentTarget.value.trim().toLowerCase();
    standaloneToolPanel.querySelectorAll("[data-visa-option]").forEach((option) => {
      option.classList.toggle("hidden", !option.dataset.countryName.toLowerCase().includes(query));
    });
  });
  standaloneToolPanel.querySelectorAll("[data-visa-country]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const countryCode = checkbox.dataset.visaCountry;
      if (checkbox.checked && visaSelectionState.size >= 5) {
        checkbox.checked = false;
        showVisaLimitNotice("Maximum 5 destinations. Clear one destination before adding another.");
        return;
      }
      if (checkbox.checked) {
        visaSelectionState.add(countryCode);
      } else if (visaSelectionState.size > 1) {
        visaSelectionState.delete(countryCode);
      } else {
        checkbox.checked = true;
        showVisaLimitNotice("Keep at least 1 destination selected.");
      }
      renderVisaResults();
    });
  });
  renderVisaResults();
}

function renderVisaResults() {
  const count = standaloneToolPanel.querySelector("#visaSelectionCount");
  const resultsPanel = standaloneToolPanel.querySelector("#visaSourceResults");
  if (!count || !resultsPanel) return;
  count.textContent = `${visaSelectionState.size} selected`;
  const sources = [...visaSelectionState].flatMap((countryCode) =>
    (officialVisaSources[countryCode] || []).map((source) => ({
      ...source,
      countryCode,
      countryName: labelForCountry(countryCode) || countryCode,
    }))
  );
  resultsPanel.innerHTML = sources
    .map(
      (source) => `
        <article class="requirement-card visa-source-card">
          <div class="summary-label">${escapeHtml(source.countryName)}</div>
          <a class="official-link-button" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
            <span>${escapeHtml(source.label)}</span>
            <i data-lucide="external-link" aria-hidden="true"></i>
          </a>
          <div class="requirement-note">${escapeHtml(source.note)}</div>
        </article>
      `
    )
    .join("");
  refreshIcons();
}

function showVisaLimitNotice(message) {
  const notice = standaloneToolPanel.querySelector("#visaLimitNotice");
  if (notice) notice.textContent = message;
}

function renderDestinationInfoTool() {
  const options = destinationDirectory
    .map(
      (destination) =>
        `<option value="${escapeHtml(destination.key)}"${destination.key === standaloneDestinationKey ? " selected" : ""}>${escapeHtml(
          `${destination.label} (${destination.type})`
        )}</option>`
    )
    .join("");
  return `
    <section class="tool-card destination-tool-card">
      <div class="tool-card-head">
        <div class="heading-with-icon">
          <span class="section-icon icon-coral" aria-hidden="true"><i data-lucide="map-pinned"></i></span>
          <div>
            <div class="summary-label">Destination at a glance</div>
            <h2>Choose a city or country</h2>
            <p>See live weather and currency, plus official advisory and event channels.</p>
          </div>
        </div>
        <label class="field destination-picker">
          <span>Destination</span>
          <select id="standaloneDestinationSelect">${options}</select>
        </label>
      </div>
      <div id="standaloneDestinationResult"></div>
    </section>
  `;
}

function bindDestinationInfoTool() {
  const select = standaloneToolPanel.querySelector("#standaloneDestinationSelect");
  select?.addEventListener("change", () => {
    standaloneDestinationKey = select.value;
    renderStandaloneDestinationResult();
  });
  renderStandaloneDestinationResult();
}

function renderStandaloneDestinationResult() {
  const result = standaloneToolPanel.querySelector("#standaloneDestinationResult");
  if (!result) return;
  const profile = buildDestinationProfileFromKey(standaloneDestinationKey);
  result.innerHTML = renderDestinationProfile(profile, "standalone");
  loadDestinationPanels(profile, "standalone");
  refreshIcons();
}

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
  const flightMatch = [...rawText.matchAll(/\b([A-Z]{2,3})\s?(\d{2,4})\b/g)].find(
    (match) => match[0].replace(/\s+/g, "").toUpperCase() !== pnr.toUpperCase()
  );
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
    if (textReview) textReview.open = false;
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
  resultNotice.innerHTML =
    currentSourceType === "browser_image_ocr" || currentSourceType === "browser_pdf"
      ? '<i data-lucide="scan-search" aria-hidden="true"></i><span>Ticket scanned in this browser. Please check the detected details before travel.</span>'
      : '<i data-lucide="shield-check" aria-hidden="true"></i><span>Ticket text analyzed in this browser. Please confirm the important details.</span>';

  const segment = trip.segments[0] || {};
  const passenger = trip.passengers[0]?.full_name || "-";
  const route = `${segment.departure_airport || "-"} to ${segment.arrival_airport || "-"}`;
  const flight = `${segment.airline_code || ""} ${segment.flight_number || ""}`.trim() || "-";
  const firstDeparture = segment.departure_datetime_local || "-";
  const firstPnr = segment.pnr || "-";

  summaryGrid.innerHTML = [
    ["Route", route, "summary-tile route-tile", "route"],
    ["Passenger", passenger, "summary-tile", "user-round"],
    ["First flight", flight, "summary-tile", "plane"],
    ["Departure", firstDeparture, "summary-tile attention-tile", "clock-3"],
    ["Booking reference", firstPnr, "summary-tile", "ticket-check"],
  ]
    .map(
      ([label, value, className, icon]) => `
        <article class="${className}">
          <div class="summary-heading"><div class="summary-label">${escapeHtml(label)}</div><i data-lucide="${escapeHtml(
            icon
          )}" aria-hidden="true"></i></div>
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
  refreshIcons();
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
      <span class="priority-caption">Booking reference</span>
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
        ${renderDetail("Booking reference", segment.pnr || "-")}
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
  return renderDestinationProfile(buildDestinationProfile(trip));
}

function renderDestinationProfile(profile, panelPrefix = "") {
  const weatherPanelId = panelPrefix ? `${panelPrefix}WeatherPanel` : "weatherPanel";
  const currencyPanelId = panelPrefix ? `${panelPrefix}CurrencyPanel` : "currencyPanel";
  return `
    <div class="destination-briefing">
      <article class="destination-hero">
        <div class="heading-with-icon destination-title">
          <span class="section-icon icon-coral" aria-hidden="true"><i data-lucide="map-pin"></i></span>
          <div>
            <div class="summary-label">Destination at a glance</div>
            <h3>${escapeHtml(profile.city || profile.airport || "Destination")}</h3>
            <p>${escapeHtml(profile.country || "Country pending")} / ${escapeHtml(profile.airport || "-")} / ${escapeHtml(
              profile.timezone || "timezone pending"
            )}</p>
          </div>
        </div>
        <div class="destination-badges">
          <span>${escapeHtml(profile.currency || "Currency")}</span>
          <span>${escapeHtml(profile.travelDate || "Travel date pending")}</span>
        </div>
      </article>

      <div class="destination-grid">
        <article class="destination-card weather-card">
          <div class="destination-card-head">
            <div class="heading-with-icon compact-heading">
              <span class="section-icon icon-sky" aria-hidden="true"><i data-lucide="cloud-sun"></i></span>
              <div>
                <h3>Weather</h3>
                <p>Forecast near the arrival city or airport.</p>
              </div>
            </div>
            <span class="provider-badge">Open-Meteo</span>
          </div>
          <div id="${escapeHtml(weatherPanelId)}" class="live-panel">${renderLoading("Loading weather...")}</div>
        </article>

        <article class="destination-card currency-card">
          <div class="destination-card-head">
            <div class="heading-with-icon compact-heading">
              <span class="section-icon icon-green" aria-hidden="true"><i data-lucide="circle-dollar-sign"></i></span>
              <div>
                <h3>Currency</h3>
                <p>Simple reference rate for arrival currency.</p>
              </div>
            </div>
            <span class="provider-badge">${escapeHtml(profile.currency || "Currency")}</span>
          </div>
          <div id="${escapeHtml(currencyPanelId)}" class="live-panel">${renderLoading("Loading currency...")}</div>
        </article>

        <article class="destination-card warning-card">
          <div class="destination-card-head">
            <div class="heading-with-icon compact-heading">
              <span class="section-icon icon-amber" aria-hidden="true"><i data-lucide="triangle-alert"></i></span>
              <div>
                <h3>Official advisories</h3>
                <p>Security, disaster, health, and weather-warning channels.</p>
              </div>
            </div>
            <span class="provider-badge">Official links</span>
          </div>
          <div class="warning-list">
            ${profile.warningLinks.map(renderDestinationLink).join("")}
          </div>
        </article>

        <article class="destination-card events-card">
          <div class="destination-card-head">
            <div class="heading-with-icon compact-heading">
              <span class="section-icon icon-purple" aria-hidden="true"><i data-lucide="calendar-days"></i></span>
              <div>
                <h3>Events and local guides</h3>
                <p>Official tourism and city event calendars.</p>
              </div>
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
  await loadDestinationPanels(buildDestinationProfile(trip));
}

async function loadDestinationPanels(profile, panelPrefix = "") {
  await Promise.allSettled([
    loadWeatherPanel(profile, panelPrefix ? `${panelPrefix}WeatherPanel` : "weatherPanel"),
    loadCurrencyPanel(profile, panelPrefix ? `${panelPrefix}CurrencyPanel` : "currencyPanel"),
  ]);
}

async function loadWeatherPanel(profile, panelId = "weatherPanel") {
  const panel = document.querySelector(`#${panelId}`);
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
    refreshIcons();
  } catch (error) {
    panel.innerHTML = renderPanelError(error.message || "Could not load weather.");
  }
}

async function loadCurrencyPanel(profile, panelId = "currencyPanel") {
  const panel = document.querySelector(`#${panelId}`);
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
    refreshIcons();
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
      <div class="weather-primary">
        <span class="weather-symbol" aria-hidden="true"><i data-lucide="${escapeHtml(weatherIconName(today.code))}"></i></span>
        <div>
          <span>Now</span>
          <b>${escapeHtml(formatTemperature(current.temperature_2m))}</b>
          <small>${escapeHtml(weatherCodeLabel(today.code))}</small>
        </div>
      </div>
      <div class="weather-secondary">
        <span class="weather-symbol wind-symbol" aria-hidden="true"><i data-lucide="wind"></i></span>
        <div>
          <span>Wind and humidity</span>
          <b>${escapeHtml(formatSpeed(current.wind_speed_10m))}</b>
          <small>${escapeHtml(formatHumidity(current.relative_humidity_2m))}</small>
        </div>
      </div>
    </div>
    <div class="forecast-row">
      ${daily.time
        ?.map(
          (day, index) => `
            <div>
              <span>${escapeHtml(shortDate(day))}</span>
              <i class="forecast-icon" data-lucide="${escapeHtml(weatherIconName(daily.weather_code?.[index]))}" aria-hidden="true"></i>
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

function buildDestinationProfileFromKey(key) {
  const entry = destinationDirectory.find((destination) => destination.key === key) || destinationDirectory[0];
  if (entry.airport) {
    const airport = airports[entry.airport] || {};
    return {
      airport: entry.airport,
      city: airport.city || entry.label,
      country: airport.country || "",
      countryCode: airport.countryCode || countryCodeForAirport(entry.airport),
      timezone: airport.timezone || "",
      currency: airport.currency || currencyForCountry(airport.countryCode),
      lat: airport.lat,
      lon: airport.lon,
      travelDate: "Live",
      warningLinks: buildWarningLinks(airport.countryCode || countryCodeForAirport(entry.airport), airport.country || ""),
      eventLinks: buildEventLinks(airport.countryCode || countryCodeForAirport(entry.airport), airport.city, airport.country),
    };
  }

  return {
    airport: entry.type,
    city: entry.city || "",
    country: entry.country || entry.label,
    countryCode: entry.countryCode,
    timezone: entry.timezone || "",
    currency: entry.currency || currencyForCountry(entry.countryCode),
    lat: entry.lat,
    lon: entry.lon,
    travelDate: "Live",
    warningLinks: buildWarningLinks(entry.countryCode, entry.country || entry.label),
    eventLinks: buildEventLinks(entry.countryCode, entry.city, entry.country || entry.label),
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
      <b>${escapeHtml(source.label)} <i data-lucide="external-link" aria-hidden="true"></i></b>
      <span>${escapeHtml(source.note)}</span>
    </a>
  `;
}

function renderLoading(message) {
  return `<div class="panel-loading"><i data-lucide="loader-circle" aria-hidden="true"></i>${escapeHtml(message)}</div>`;
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

function weatherIconName(code) {
  if (code === 0) return "sun";
  if ([1, 2].includes(code)) return "cloud-sun";
  if (code === 3) return "cloud";
  if ([45, 48].includes(code)) return "cloud-fog";
  if ([51, 53, 55].includes(code)) return "cloud-drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "cloud-rain";
  if ([71, 73, 75].includes(code)) return "snowflake";
  if ([95, 96, 99].includes(code)) return "cloud-lightning";
  return "cloud-sun";
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
      <i data-lucide="info" aria-hidden="true"></i>
      <span>Your ticket supplied the route and travel date. Add traveler details before checking the official sources.</span>
    </div>
    <div class="requirements-workspace">
      <section class="requirements-main" aria-label="Travel document query">
        <article class="requirement-card requirement-hero">
          <div>
            <div class="summary-label">Route basis</div>
            <div class="summary-value">${escapeHtml(route || "-")}</div>
            <div class="requirement-note">${escapeHtml(sources.destinationName)} / travel date ${escapeHtml(travelDate || "-")}</div>
          </div>
          <span class="provider-badge">From your ticket</span>
        </article>

        <article class="requirement-card">
          <div class="requirement-card-head">
            <div>
              <h3>Traveler details</h3>
              <p>Use the passport that will be carried on this trip.</p>
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
            <button class="primary" id="prepareRequirementsBtn" type="button">
              <i data-lucide="search-check" aria-hidden="true"></i> Check my trip
            </button>
          </div>
        </article>

        <details class="requirement-card advanced-details">
          <summary>
            <span><i data-lucide="braces" aria-hidden="true"></i> Advanced details</span>
            <span id="requirementsStatus" class="provider-badge">Draft</span>
          </summary>
          <p>Technical trip data for a licensed travel-requirements provider.</p>
          <div class="requirement-actions">
            <button class="secondary compact-button" id="copyRequirementsBtn" type="button">
              <i data-lucide="copy" aria-hidden="true"></i> Copy details
            </button>
          </div>
          <div id="requirementsPreview" class="requirements-preview"></div>
        </details>
      </section>

      <aside class="requirements-side" aria-label="Travel requirement results">
        <article class="requirement-card result-card">
          <div class="summary-label">Your checklist status</div>
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
        copyButton.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i> Copy details';
        refreshIcons();
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
  status.textContent = missing.length ? `${missing.length} ${missing.length === 1 ? "detail" : "details"} needed` : "Ready";
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
    ? `Still needed: ${missing.join(", ")}`
    : "Traveler details are complete. Continue with the official checkers below.";
  result.innerHTML = `
    <div class="${missing.length ? "result-waiting" : "result-ready"}">${escapeHtml(resultText)}</div>
    <div class="requirement-note">
      ${
        markPrepared && !missing.length
          ? "Open an official checker below to receive the current decision for this traveler."
          : "This page organizes your details but does not make a visa or entry decision."
      }
    </div>
    <div class="provider-result-list">
      <div><b>Traveler details</b><span>${missing.length ? "Needs attention" : "Complete"}</span></div>
      <div><b>Official decision</b><span>Continue to an official checker</span></div>
    </div>
  `;
  refreshIcons();
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

function renderStandaloneSelectField(label, key, options) {
  const selectedValue = standaloneRequirementsState[key] || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <select data-standalone-req-field="${escapeHtml(key)}">
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

function renderStandaloneInputField(label, key, type, suffix = "") {
  const value = standaloneRequirementsState[key] || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input data-standalone-req-field="${escapeHtml(key)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}" ${
        suffix ? `placeholder="${escapeHtml(suffix)}"` : ""
      }>
    </label>
  `;
}

function standaloneFieldValue(key) {
  const field = standaloneToolPanel.querySelector(`[data-standalone-req-field="${key}"]`);
  return field ? field.value.trim() : standaloneRequirementsState[key] || "";
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
      <a class="official-link-button" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
        <span>${escapeHtml(source.label)}</span>
        <i data-lucide="external-link" aria-hidden="true"></i>
      </a>
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
    for (const source of buildRequirementSourcesForCountry(segment.arrival_country_code)) {
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

function buildRequirementSourcesForCountry(countryCode) {
  if (!countryCode) return [];
  return officialVisaSources[countryCode] || [];
}

function uniqueSourcesByUrl(sources) {
  const seen = new Set();
  return sources.filter((source) => {
    if (!source.url || seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

function countryCodeForAirport(iata) {
  const airport = airports[iata] || {};
  if (airport.countryCode) return airport.countryCode;
  const byCountryName = {
    Israel: "IL",
    Cyprus: "CY",
    Italy: "IT",
    "United Kingdom": "GB",
    "United Arab Emirates": "AE",
    Thailand: "TH",
    "United States": "US",
    France: "FR",
    Germany: "DE",
    Greece: "GR",
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
