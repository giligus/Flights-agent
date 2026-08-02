const {
  airports,
  countryDestinations,
  cityEventSources,
  countryTourismSources,
  weatherSources,
  elAlSourceUrl,
} = window.CO_TRAVEL_DATA;

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
  ["AT", "Austria"],
  ["AU", "Australia"],
  ["CH", "Switzerland"],
  ["IE", "Ireland"],
  ["IN", "India"],
  ["JP", "Japan"],
  ["KR", "South Korea"],
  ["NZ", "New Zealand"],
  ["SG", "Singapore"],
  ["TR", "Türkiye"],
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
  GR: [
    {
      label: "Greece Ministry of Foreign Affairs",
      url: "https://www.mfa.gr/en/services/visas-for-foreigners-traveling-to-greece/",
      note: "Official Greek visa and entry guidance for foreign travelers.",
    },
  ],
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
      label: "UAE visas and Emirates ID",
      url: "https://u.ae/en/information-and-services/visa-and-emirates-id",
      note: "Official UAE government guidance for visas, entry permits, residency, and Emirates ID.",
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
  CA: [
    {
      label: "Immigration, Refugees and Citizenship Canada",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
      note: "Official Canadian visitor visa and electronic travel authorization guidance.",
    },
  ],
  DE: [
    {
      label: "Germany Visa Navigator",
      url: "https://www.auswaertiges-amt.de/en/2315524-2315524",
      note: "Official German Federal Foreign Office visa navigator.",
    },
  ],
  ES: [
    {
      label: "Spain Ministry of Foreign Affairs visas",
      url: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx",
      note: "Official Spanish visa information and application guidance.",
    },
  ],
  NL: [
    {
      label: "NetherlandsWorldwide visa checker",
      url: "https://www.netherlandsworldwide.nl/visa-the-netherlands",
      note: "Official Dutch government guidance for visas to the Netherlands.",
    },
  ],
  AT: [
    {
      label: "Austria Ministry for European and International Affairs",
      url: "https://www.bmeia.gv.at/en/travel-stay/entrance-and-residence-in-austria/visa",
      note: "Official Austrian visa and entry information.",
    },
  ],
  CH: [
    {
      label: "Switzerland State Secretariat for Migration",
      url: "https://www.sem.admin.ch/sem/en/home/themen/einreise.html",
      note: "Official Swiss government entry and visa guidance.",
    },
  ],
  IE: [
    {
      label: "Irish Immigration Service",
      url: "https://www.irishimmigration.ie/coming-to-visit-ireland/",
      note: "Official Irish visitor visa and travel guidance.",
    },
  ],
  AU: [
    {
      label: "Australia visa finder",
      url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder/visit",
      note: "Official Australian Department of Home Affairs visitor visa finder.",
    },
  ],
  NZ: [
    {
      label: "Immigration New Zealand visitor visa",
      url: "https://www.immigration.govt.nz/visas/visitor-visa/",
      note: "Official New Zealand visitor visa information and application service.",
    },
  ],
  JP: [
    {
      label: "Japan Ministry of Foreign Affairs eVISA",
      url: "https://www.mofa.go.jp/j_info/visit/visa/visaonline.html",
      note: "Official Japan eVISA information and eligibility guidance.",
    },
  ],
  KR: [
    {
      label: "Korea Visa Portal",
      url: "https://www.visa.go.kr/",
      note: "Official Republic of Korea visa navigator and application portal.",
    },
  ],
  SG: [
    {
      label: "Singapore entry visa checker",
      url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
      note: "Official Singapore Immigration and Checkpoints Authority visa requirements.",
    },
  ],
  IN: [
    {
      label: "India Visa Online",
      url: "https://indianvisaonline.gov.in/",
      note: "Official Government of India portal for regular visas and eVisas.",
    },
  ],
  TR: [
    {
      label: "Türkiye Ministry of Foreign Affairs visa information",
      url: "https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa",
      note: "Official Republic of Türkiye Ministry of Foreign Affairs visa guidance.",
    },
  ],
};
const officialGovernmentVisaHosts = new Set([
  "www.mfa.gr",
  "israel-entry.piba.gov.il",
  "www.gov.cy",
  "vistoperitalia.esteri.it",
  "www.gov.uk",
  "u.ae",
  "www.thaievisa.go.th",
  "esta.cbp.dhs.gov",
  "travel.state.gov",
  "france-visas.gouv.fr",
  "www.canada.ca",
  "www.auswaertiges-amt.de",
  "www.exteriores.gob.es",
  "www.netherlandsworldwide.nl",
  "www.bmeia.gv.at",
  "www.sem.admin.ch",
  "www.irishimmigration.ie",
  "immi.homeaffairs.gov.au",
  "www.immigration.govt.nz",
  "www.mofa.go.jp",
  "www.visa.go.kr",
  "www.ica.gov.sg",
  "indianvisaonline.gov.in",
  "www.mfa.gov.tr",
]);

function isVerifiedGovernmentVisaSource(source) {
  try {
    const url = new URL(source?.url || "");
    return url.protocol === "https:" && officialGovernmentVisaHosts.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function verifiedGovernmentVisaSources(countryCode) {
  return (officialVisaSources[countryCode] || []).filter(isVerifiedGovernmentVisaSource);
}

const destinationDirectory = [
  ...Object.entries(airports)
    .map(([key, airport]) => ({
      key,
      label: `${airport.city}, ${airport.country}`,
      type: "City",
      airport: key,
    }))
    .sort((left, right) => left.label.localeCompare(right.label)),
  ...countryDestinations
    .map(([countryCode, country, city, timezone, currency, lat, lon]) => ({
      key: `country-${countryCode}`,
      label: country,
      type: "Country",
      city,
      country,
      countryCode,
      timezone,
      currency,
      lat,
      lon,
    }))
    .sort((left, right) => left.label.localeCompare(right.label)),
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
const languageToggle = document.querySelector("#languageToggle");
const translationTextSources = new WeakMap();
const translationAttributeSources = new WeakMap();
let currentLanguage = readSavedLanguage();
let activeService = "";

const serviceDetails = {
  scan: {
    title: "Scan my ticket",
    description: "Upload a PDF or image and review the flight details extracted from your ticket.",
  },
  requirements: {
    title: "Check entry requirements",
    description: "Provide a few trip and traveler details to prepare an official-source checklist.",
  },
  visa: {
    title: "Find an official visa site",
    description: "Select one destination and access its official government visa services.",
  },
  destination: {
    title: "Explore a destination",
    description: "Review essential destination information in a clear, practical summary.",
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
languageToggle?.addEventListener("click", () => {
  setLanguage(currentLanguage === "he" ? "en" : "he");
});

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

setLanguage(currentLanguage, false);
showHome();

function showHome() {
  activeService = "";
  activeFlowBar?.removeAttribute("data-service");
  standaloneToolPanel?.removeAttribute("data-service");
  flightWorkspace?.removeAttribute("data-service");
  homeIntro?.classList.remove("hidden");
  serviceHub?.classList.remove("hidden");
  activeFlowBar?.classList.add("hidden");
  standaloneToolPanel?.classList.add("hidden");
  flightWorkspace?.classList.add("hidden");
  document.querySelectorAll(".service-tile").forEach((tile) => tile.classList.remove("active"));
  refreshIcons();
}

function showService(service, options = {}) {
  activeService = service;
  const details = serviceDetails[service] || serviceDetails.scan;
  activeFlowBar?.setAttribute("data-service", service);
  standaloneToolPanel?.setAttribute("data-service", service);
  flightWorkspace?.setAttribute("data-service", service);
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
  if (options.scroll !== false) activeFlowBar?.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.CoTravelLegacy = {
  showHome,
  showService,
  getLanguage: () => currentLanguage,
  extractTripFromFile: async (file) => {
    await extractUploadedFile(file);
    const rawText = ticketText.value.trim();
    if (!rawText) throw new Error("No readable reservation text was found.");
    return parseTicket(rawText);
  },
};

function refreshIcons() {
  applyTranslations(document);
  window.lucide?.createIcons();
}

function readSavedLanguage() {
  try {
    return localStorage.getItem("co-travel-language") === "he" ? "he" : "en";
  } catch {
    return "en";
  }
}

function setLanguage(language, rerender = true) {
  currentLanguage = language === "he" ? "he" : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "he" ? "rtl" : "ltr";
  try {
    localStorage.setItem("co-travel-language", currentLanguage);
  } catch {
    // Language preference remains active for the current page when storage is unavailable.
  }

  if (languageToggle) {
    languageToggle.querySelector("span").textContent = currentLanguage === "he" ? "English" : "עברית";
    languageToggle.setAttribute(
      "aria-label",
      currentLanguage === "he" ? "החלפת שפה לאנגלית" : "Switch language to Hebrew"
    );
  }

  if (rerender && activeService && activeService !== "scan") {
    renderStandaloneTool(activeService);
  }
  if (rerender && currentTrip) {
    renderTrip(currentTrip);
  }
  applyTranslations(document);
  window.lucide?.createIcons();
  window.dispatchEvent(new CustomEvent("co-travel-languagechange", { detail: { language: currentLanguage } }));
}

function applyTranslations(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!node.parentElement?.closest("script, style, textarea, pre, code")) {
      if (!translationTextSources.has(node)) translationTextSources.set(node, node.nodeValue);
      const source = translationTextSources.get(node);
      const match = source.match(/^(\s*)(.*?)(\s*)$/s);
      if (match?.[2]) node.nodeValue = `${match[1]}${translateUiText(match[2])}${match[3]}`;
    }
    node = walker.nextNode();
  }

  root.querySelectorAll?.("[placeholder], [title], [aria-label]").forEach((element) => {
    if (!translationAttributeSources.has(element)) translationAttributeSources.set(element, {});
    const sources = translationAttributeSources.get(element);
    ["placeholder", "title", "aria-label"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!(attribute in sources)) sources[attribute] = element.getAttribute(attribute);
      element.setAttribute(attribute, translateUiText(sources[attribute]));
    });
  });
}

function translateUiText(source) {
  if (currentLanguage !== "he") return source;
  const exact = window.CO_TRAVEL_I18N?.he?.[source];
  if (exact) return exact;

  let match = source.match(/^Step (\d+) of 3$/);
  if (match) return `שלב ${match[1]} מתוך 3`;
  match = source.match(/^Segment (\d+)$/);
  if (match) return `מקטע ${match[1]}`;
  match = source.match(/^(\d+) selected$/);
  if (match) return `${match[1]} נבחרו`;
  match = source.match(/^(\d+) (detail|details) needed$/);
  if (match) return `חסרים ${match[1]} פרטים`;
  match = source.match(/^(\d+) sources$/);
  if (match) return `${match[1]} מקורות`;
  match = source.match(/^(\d+) links$/);
  if (match) return `${match[1]} קישורים`;
  match = source.match(/^Rain (\d+)%$/);
  if (match) return `גשם ${match[1]}%`;
  match = source.match(/^(\d+)% humidity$/);
  if (match) return `${match[1]}% לחות`;
  match = source.match(/^Rate date: (.+)$/);
  if (match) return `תאריך השער: ${match[1]}`;
  return source;
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
  const steps = ["Your journey", "Your passport", "Travel details"];
  const stepFields = [
    `${renderStandaloneSelectField("Departure country", "originCountry", countryOptions)}
     ${renderStandaloneSelectField("Destination country", "destinationCountry", countryOptions)}
     ${renderStandaloneInputField("Travel date", "travelDate", "date")}`,
    `${renderStandaloneSelectField("Nationality", "nationality", countryOptions)}
     ${renderStandaloneSelectField("Passport issuing country", "passportCountry", countryOptions)}
     ${renderStandaloneSelectField("Passport type", "passportType", passportTypeOptions)}
     ${renderStandaloneInputField("Passport expiry date", "passportExpiry", "date")}`,
    `${renderStandaloneInputField("Length of stay", "stayLengthDays", "number", "Days")}
     ${renderStandaloneSelectField("Transit plans", "transitMode", transitOptions)}`,
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
              <p>Complete a few short steps. Your answers stay in place as you continue.</p>
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
              <p>A concise summary of your answers and official destination sources.</p>
            </div>
          </div>
          <span id="standaloneRequirementsStatus" class="provider-badge">Draft</span>
        </div>
        <div id="standaloneRequirementsPreview" class="requirements-preview"></div>
        <div class="official-source-list">
          <h3><i data-lucide="landmark" aria-hidden="true"></i> Official sources</h3>
          <div id="standaloneRequirementSources"></div>
        </div>
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
    if (notice) notice.textContent = "Your details are complete. Continue with the official sources in your checklist.";
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
            ? `Complete step ${standaloneRequirementsStep} of 3 to continue building your travel checklist.`
            : `Still needed: ${payload.missing_inputs.join(", ")}`
          : markPrepared
            ? "Your checklist is ready. Continue with the official sources below."
            : "All required details are complete."
      )}
    </div>
  `;

  const uniqueSources = uniqueSourcesByUrl(
    buildRequirementSourcesForCountry(payload.route.destination_country)
  );
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
    .map(([countryCode]) => [countryCode, verifiedGovernmentVisaSources(countryCode)])
    .filter(([, sources]) => sources.length)
    .sort(([leftCode], [rightCode]) =>
      (labelForCountry(leftCode) || leftCode).localeCompare(labelForCountry(rightCode) || rightCode)
    )
    .map(([countryCode, sources]) => {
      const checked = visaSelectionState.has(countryCode) ? " checked" : "";
      return `
        <label class="destination-check" data-visa-option data-country-name="${escapeHtml(
          labelForCountry(countryCode) || countryCode
        )}">
          <input type="radio" name="visaDestination" data-visa-country="${escapeHtml(countryCode)}"${checked}>
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
              <p>Select one destination to view verified government visa websites only.</p>
            </div>
          </div>
          <span id="visaSelectionCount" class="provider-badge">1 selected</span>
        </div>
        <label class="search-field" for="visaCountrySearch">
          <i data-lucide="search" aria-hidden="true"></i>
          <input id="visaCountrySearch" type="search" aria-label="Search destinations" placeholder="Search destinations" autocomplete="off">
        </label>
        <div class="destination-check-grid visa-country-grid">${options}</div>
        <div id="visaLimitNotice" class="requirement-note">Choose another country at any time to replace your selection.</div>
      </section>
      <aside class="tool-card">
        <div class="tool-card-head">
          <div class="heading-with-icon">
            <span class="section-icon icon-blue" aria-hidden="true"><i data-lucide="landmark"></i></span>
            <div>
              <h2>Official visa links</h2>
              <p>Eligibility depends on your passport and itinerary. Every link opens a verified government website.</p>
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
  standaloneToolPanel.querySelectorAll("[data-visa-country]").forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      visaSelectionState.clear();
      visaSelectionState.add(radio.dataset.visaCountry);
      showVisaLimitNotice("Destination updated. Choose another country to replace it.");
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
    verifiedGovernmentVisaSources(countryCode).map((source) => ({
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
  const renderOptions = (type) =>
    destinationDirectory
      .filter((destination) => destination.type === type)
      .map(
        (destination) =>
          `<option value="${escapeHtml(destination.key)}"${destination.key === standaloneDestinationKey ? " selected" : ""}>${escapeHtml(
            localizedDestinationLabel(destination)
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
            <p>View live weather and currency information alongside official advisory and event sources.</p>
          </div>
        </div>
        <label class="field destination-picker">
          <span>Destination</span>
          <select id="standaloneDestinationSelect">
            <optgroup label="${escapeHtml(translateUiText("EL AL destinations"))}">
              ${renderOptions("City")}
            </optgroup>
            <optgroup label="${escapeHtml(translateUiText("Countries"))}">
              ${renderOptions("Country")}
            </optgroup>
          </select>
        </label>
      </div>
      <a class="directory-source-note" href="${escapeHtml(elAlSourceUrl)}" target="_blank" rel="noopener noreferrer">
        <i data-lucide="plane" aria-hidden="true"></i>
        <span>Based on EL AL's official destination directory. Routes and seasonal availability can change.</span>
        <i data-lucide="external-link" aria-hidden="true"></i>
      </a>
      <div id="standaloneDestinationResult"></div>
    </section>
  `;
}

function localizedDestinationLabel(destination) {
  if (currentLanguage !== "he") return `${destination.label} (${destination.type})`;
  const airport = destination.airport ? airports[destination.airport] : null;
  const city = airport?.city || destination.city || "";
  const country = airport?.country || destination.country || destination.label;
  const translatedCity = translateUiText(city);
  const translatedCountry = translateUiText(country);
  const label = destination.type === "City" ? `${translatedCity}, ${translatedCountry}` : translatedCountry;
  return `${label} (${translateUiText(destination.type)})`;
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
  const parsedSegments = window.CoTravelTicketParser?.parseSegments(rawText, airports) || [];
  if (parsedSegments.length) {
    return {
      trip_id: `TRIP-${Date.now()}`,
      passengers: [{ full_name: passenger || "" }],
      segments: parsedSegments.map((segment) =>
        enrichSegment({
          ...segment,
          pnr,
          ticket_number: ticket,
        })
      ),
      meta: {
        raw_source_type: currentSourceType,
        parser: "github_pages_static",
      },
    };
  }

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
    .map((code) => ({
      code,
      index: rawText.toUpperCase().search(new RegExp(`\\b${code}\\b`)),
    }))
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
      ? '<i data-lucide="scan-search" aria-hidden="true"></i><span>Ticket scanned locally in your browser. Verify all extracted details before travel.</span>'
      : '<i data-lucide="shield-check" aria-hidden="true"></i><span>Ticket text analyzed locally in your browser. Verify all extracted details before travel.</span>';

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
            <p>${escapeHtml(translateUiText(profile.country || "Country pending"))} / ${escapeHtml(profile.airport || "-")} / ${escapeHtml(
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
                <p>Current conditions and a four-day forecast for the destination.</p>
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
                <h3>Currency converter</h3>
                <p>Convert an amount using daily reference exchange rates.</p>
              </div>
            </div>
            <span class="provider-badge">${escapeHtml(profile.currency || "Currency")}</span>
          </div>
          <div id="${escapeHtml(currencyPanelId)}" class="live-panel">${renderCurrencyConverterShell(
            profile.currency,
            currencyPanelId
          )}</div>
        </article>

        <article class="destination-card warning-card">
          <div class="destination-card-head">
            <div class="heading-with-icon compact-heading">
              <span class="section-icon icon-amber" aria-hidden="true"><i data-lucide="triangle-alert"></i></span>
              <div>
                <h3>Travel advisories</h3>
                <p>Two official sources: security guidance and local weather alerts.</p>
              </div>
            </div>
            <span class="provider-badge">${profile.warningLinks.length} sources</span>
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
                <p>A city calendar and an official national tourism guide.</p>
              </div>
            </div>
            <span class="provider-badge">${profile.eventLinks.length} links</span>
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

const converterCurrencies = [
  "ILS", "USD", "EUR", "GBP", "AED", "THB", "JPY", "CAD", "CHF", "AUD", "CNY", "HKD", "INR", "KRW",
  "PLN", "CZK", "HUF", "RON", "BGN", "DKK", "TRY", "GEL", "MAD", "ZAR", "ARS", "RSD", "MDL", "ALL",
  "EGP", "VND", "UAH", "RUB",
];
const exchangeRateCache = new Map();

function renderCurrencyConverterShell(destinationCurrency, panelId) {
  const target = destinationCurrency || "USD";
  const base = target === "ILS" ? "USD" : "ILS";
  const currencies = [...new Set([...converterCurrencies, base, target])];
  const renderOptions = (selected) =>
    currencies
      .map(
        (currency) =>
          `<option value="${escapeHtml(currency)}"${currency === selected ? " selected" : ""}>${escapeHtml(currency)}</option>`
      )
      .join("");
  return `
    <div class="currency-converter" data-currency-converter="${escapeHtml(panelId)}">
      <label class="converter-amount">
        <span>Amount</span>
        <input type="number" min="0" step="0.01" value="100" data-currency-amount inputmode="decimal">
      </label>
      <div class="converter-pair">
        <label>
          <span>From currency</span>
          <select data-currency-base>${renderOptions(base)}</select>
        </label>
        <button class="icon-button converter-swap" type="button" data-currency-swap aria-label="Swap currencies" title="Swap currencies">
          <i data-lucide="arrow-left-right" aria-hidden="true"></i>
        </button>
        <label>
          <span>To currency</span>
          <select data-currency-target>${renderOptions(target)}</select>
        </label>
      </div>
      <div class="currency-conversion-result" data-currency-result aria-live="polite">${renderLoading("Loading exchange rate...")}</div>
      <a class="currency-attribution" href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">
        Rates by ExchangeRate-API
        <i data-lucide="external-link" aria-hidden="true"></i>
      </a>
    </div>
  `;
}

async function loadCurrencyPanel(profile, panelId = "currencyPanel") {
  const panel = document.querySelector(`#${panelId}`);
  if (!panel) return;
  if (!panel.querySelector("[data-currency-converter]")) {
    panel.innerHTML = renderCurrencyConverterShell(profile.currency, panelId);
  }
  if (panel.dataset.converterBound === "true") return;
  panel.dataset.converterBound = "true";

  const amountInput = panel.querySelector("[data-currency-amount]");
  const baseSelect = panel.querySelector("[data-currency-base]");
  const targetSelect = panel.querySelector("[data-currency-target]");
  const swapButton = panel.querySelector("[data-currency-swap]");
  const result = panel.querySelector("[data-currency-result]");

  const update = async () => {
    const amount = Math.max(0, Number(amountInput.value) || 0);
    const base = baseSelect.value;
    const target = targetSelect.value;
    if (base === target) {
      result.innerHTML = renderCurrencyResult({ amount, base, target, rate: 1, updated: "" });
      applyTranslations(result);
      return;
    }
    result.innerHTML = renderLoading("Loading exchange rate...");
    applyTranslations(result);
    try {
      const data = await getExchangeRates(base);
      const rate = Number(data.rates?.[target]);
      if (!rate) throw new Error("No exchange rate returned.");
      result.innerHTML = renderCurrencyResult({
        amount,
        base,
        target,
        rate,
        updated: data.time_last_update_utc || "",
      });
      applyTranslations(result);
    } catch (error) {
      result.innerHTML = renderPanelError(error.message || "Could not load currency.");
      applyTranslations(result);
    }
  };

  amountInput.addEventListener("input", update);
  baseSelect.addEventListener("change", update);
  targetSelect.addEventListener("change", update);
  swapButton.addEventListener("click", () => {
    const previousBase = baseSelect.value;
    baseSelect.value = targetSelect.value;
    targetSelect.value = previousBase;
    update();
  });
  refreshIcons();
  await update();
}

async function getExchangeRates(base) {
  if (exchangeRateCache.has(base)) return exchangeRateCache.get(base);
  const storageKey = `co-travel-rates-${base}`;
  try {
    const cached = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (cached?.savedAt && Date.now() - cached.savedAt < 12 * 60 * 60 * 1000 && cached.data?.rates) {
      exchangeRateCache.set(base, cached.data);
      return cached.data;
    }
  } catch {
    // Continue to the live endpoint when cached data is unavailable.
  }

  const response = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`);
  if (!response.ok) throw new Error(`Currency request failed (${response.status})`);
  const data = await response.json();
  if (data.result !== "success" || !data.rates) throw new Error("No exchange rate returned.");
  exchangeRateCache.set(base, data);
  try {
    localStorage.setItem(storageKey, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // In-memory caching still prevents repeated requests during this visit.
  }
  return data;
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
          <b dir="ltr">${escapeHtml(formatTemperature(current.temperature_2m))}</b>
          <small>${escapeHtml(weatherCodeLabel(today.code))}</small>
        </div>
      </div>
      <div class="weather-secondary">
        <span class="weather-symbol wind-symbol" aria-hidden="true"><i data-lucide="wind"></i></span>
        <div>
          <span>Wind and humidity</span>
          <b dir="ltr">${escapeHtml(formatSpeed(current.wind_speed_10m))}</b>
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
              <b dir="ltr">${escapeHtml(formatTemperatureRange(daily.temperature_2m_min?.[index], daily.temperature_2m_max?.[index]))}</b>
              <small>${escapeHtml(formatRain(daily.precipitation_probability_max?.[index]))}</small>
            </div>
          `
        )
        .join("") || ""}
    </div>
  `;
}

function renderCurrencyResult({ amount, base, target, rate, updated }) {
  const converted = amount * rate;
  const numberFormatter = new Intl.NumberFormat(currentLanguage === "he" ? "he-IL" : "en-US", {
    maximumFractionDigits: 2,
  });
  return `
    <div class="currency-rate">
      <span dir="ltr">${escapeHtml(base)} to ${escapeHtml(target)}</span>
      <b dir="ltr">${escapeHtml(numberFormatter.format(amount))} ${escapeHtml(base)} = ${escapeHtml(
        numberFormatter.format(converted)
      )} ${escapeHtml(target)}</b>
      <small dir="ltr">1 ${escapeHtml(base)} = ${escapeHtml(rate.toFixed(rate < 0.01 ? 6 : 4))} ${escapeHtml(target)}</small>
      <small>${escapeHtml(updated ? `Rate date: ${new Date(updated).toLocaleDateString(currentLanguage === "he" ? "he-IL" : "en-GB")}` : "Daily reference rate")}</small>
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
  const links = [
    {
      label: "Official travel warning",
      url:
        currentLanguage === "he"
          ? "https://www.gov.il/he/Departments/DynamicCollectors/travel-warnings-nsc"
          : "https://www.gov.il/en/departments/dynamiccollectors/travel-warnings-nsc",
      note: "Israel National Security Council travel warnings.",
    },
  ];
  const weatherLink = officialWeatherLink(countryCode);
  if (weatherLink) links.push(weatherLink);
  return links.slice(0, 2);
}

function buildEventLinks(countryCode, city, countryName) {
  const links = [];
  const citySource = cityEventSources[city];
  if (citySource) {
    links.push({
      label: citySource[0],
      url: citySource[1],
      note: citySource[2],
      category: "City events",
    });
  }
  const countrySource = countryTourismSources[countryCode];
  if (countrySource) {
    links.push({
      label: countrySource[0],
      url: countrySource[1],
      note: countrySource[2],
      category: "Official tourism guide",
    });
  }
  if (!links.length) {
    return [{
      label: `${city || countryName || "Destination"} visitor information`,
      url: "",
      note: "An official event guide is not mapped for this destination yet.",
      category: "Official tourism guide",
    }];
  }
  return uniqueSourcesByUrl(links).slice(0, 2);
}

function officialWeatherLink(countryCode) {
  const source = weatherSources[countryCode];
  if (!source) return null;
  return {
    label: "Local weather alerts",
    url: source[1],
    note: source[2],
  };
}

function renderDestinationLink(source) {
  if (!source.url) {
    return `
      <div class="destination-link destination-link-muted">
        ${source.category ? `<small class="destination-link-category">${escapeHtml(source.category)}</small>` : ""}
        <b>${escapeHtml(source.label)}</b>
        <span>${escapeHtml(source.note)}</span>
      </div>
    `;
  }
  return `
    <a class="destination-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
      ${source.category ? `<small class="destination-link-category">${escapeHtml(source.category)}</small>` : ""}
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
  return countryDestinations.find(([code]) => code === countryCode)?.[4] || "";
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
  return date.toLocaleDateString(currentLanguage === "he" ? "he-IL" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
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
      <span>Your ticket supplied the route and travel date. Add the traveler's passport details to prepare the official checks.</span>
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
              <p>Enter the passport details that will be used for this journey.</p>
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

      </section>

      <aside class="requirements-side" aria-label="Travel requirement results">
        <article class="requirement-card result-card">
          <div class="summary-label">Your checklist status</div>
          <div id="requirementsResult" class="result-status"></div>
        </article>

        <article class="requirement-card">
          <h3>Official government sources</h3>
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
  if (prepareButton) prepareButton.addEventListener("click", () => updateRequirementsPreview(trip, true));
  updateRequirementsPreview(trip);
}

function updateRequirementsPreview(trip, markPrepared = false) {
  const payload = buildRequirementsQuery(trip);
  const status = requirementsTab.querySelector("#requirementsStatus");
  const preview = requirementsTab.querySelector("#requirementsPreview");
  const result = requirementsTab.querySelector("#requirementsResult");
  if (!result) return;

  const missing = payload.missing_inputs;
  if (status) {
    status.textContent = missing.length ? `${missing.length} ${missing.length === 1 ? "detail" : "details"} needed` : "Ready";
    status.classList.toggle("provider-ready", missing.length === 0);
  }

  if (preview) {
    preview.innerHTML = `
      <div class="query-grid">
        ${renderQueryFact("Origin", payload.route.origin_airport || "-")}
        ${renderQueryFact("Destination", payload.route.destination_airport || "-")}
        ${renderQueryFact("Travel date", payload.travel.travel_date || "-")}
        ${renderQueryFact("Nationality", labelForCountry(payload.passenger.nationality) || "-")}
        ${renderQueryFact("Passport", labelForCountry(payload.passenger.passport_issuing_country) || "-")}
        ${renderQueryFact("Stay", payload.travel.stay_length_days ? `${payload.travel.stay_length_days} days` : "-")}
      </div>`;
  }

  const resultText = missing.length
    ? `Still needed: ${missing.join(", ")}`
    : "Traveler details are complete. Continue with the official checkers below.";
  result.innerHTML = `
    <div class="${missing.length ? "result-waiting" : "result-ready"}">${escapeHtml(resultText)}</div>
    <div class="requirement-note">
      ${
        markPrepared && !missing.length
          ? "Open an official checker below for the current travel-document decision."
          : "co-travel organizes your details but does not independently issue visa or entry decisions."
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
  if (!isVerifiedGovernmentVisaSource(source)) return "";
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
  return verifiedGovernmentVisaSources(countryCode);
}

function uniqueSourcesByUrl(sources) {
  const seen = new Set();
  return sources.filter((source) => {
    if (!isVerifiedGovernmentVisaSource(source) || seen.has(source.url)) return false;
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
