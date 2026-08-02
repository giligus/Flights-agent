const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "site", "app.js"), "utf8");
const sourceMatch = appSource.match(
  /const officialVisaSources = \{([\s\S]*?)\n\};\nconst officialGovernmentVisaHosts/
);
const allowlistMatch = appSource.match(
  /const officialGovernmentVisaHosts = new Set\(\[([\s\S]*?)\n\]\);/
);

assert.ok(sourceMatch, "official visa source registry should be present");
assert.ok(allowlistMatch, "government visa hostname allowlist should be present");

const sourceUrls = [...sourceMatch[1].matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
const allowedHosts = new Set(
  [...allowlistMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1].toLowerCase())
);

assert.ok(sourceUrls.length >= 20, "expected the full official visa directory");
for (const sourceUrl of sourceUrls) {
  const parsed = new URL(sourceUrl);
  assert.equal(parsed.protocol, "https:", `${sourceUrl} must use HTTPS`);
  assert.ok(allowedHosts.has(parsed.hostname.toLowerCase()), `${sourceUrl} is not a verified government host`);
}

assert.ok(
  sourceUrls.includes("https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa"),
  "Türkiye must lead to its Ministry of Foreign Affairs"
);
assert.ok(!sourceUrls.some((url) => url.includes("evisa.gov.tr")), "Türkiye must not use the disputed redirect");
assert.ok(!appSource.includes("https://www.traveldoc.aero/"), "TravelDoc must not be exposed as a link");
assert.ok(!appSource.includes("https://www.iatatravelcentre.com/"), "IATA must not be exposed as a link");

console.log(`official visa source audit: OK (${sourceUrls.length} government URLs)`);
