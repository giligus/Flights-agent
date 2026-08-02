(function exposeTicketParser(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CoTravelTicketParser = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createTicketParser() {
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

  function parseSegments(rawText, airports = {}) {
    const text = normalizeText(rawText);
    if (!text) return [];

    const candidates = findFlightCandidates(text)
      .map((candidate) => ({
        ...candidate,
        dateTimes: parseDateTimesAfterFlight(text, candidate),
      }))
      .filter((candidate) => candidate.dateTimes.departure || candidate.dateTimes.arrival);

    return candidates.map((candidate, index) => {
      const nextIndex = candidates[index + 1]?.index ?? text.length;
      const block = text.slice(candidate.index, nextIndex);
      const route = findRouteForFlight(text, candidate, airports);

      return {
        airline_code: candidate.airlineCode,
        flight_number: candidate.flightNumber,
        departure_airport: route[0] || "",
        arrival_airport: route[1] || "",
        departure_datetime_local: candidate.dateTimes.departure,
        arrival_datetime_local: candidate.dateTimes.arrival,
        duration: firstMatch(block, [
          /duration\s*:?\s*(\d{1,2}:\d{2})/i,
          /(\d{1,2}:\d{2})\s*duration/i,
        ]),
        booking_class: firstMatch(block, [/economy\s*\(([A-Z])\)/i]),
        baggage_allowance: firstMatch(block, [
          /baggage\s*:?\s*([0-9]\s*PC(?:\s*\(\d+\))?)/i,
          /\b([0-9]\s*PC(?:\s*\(\d+\))?)\b/i,
          /baggage\s*:?\s*([0-9]{1,2}\s*(?:KG|KGS|LB|LBS))/i,
        ]),
        seat: firstMatch(block, [/seat\s*[:\-]\s*([0-9]{1,2}[A-Z])/i]),
        gate: firstMatch(block, [/gate\s*[:\-]\s*([A-Z0-9]+)/i]),
      };
    });
  }

  function findFlightCandidates(text) {
    const matches = [];
    const pattern = /\b([A-Z][A-Z0-9]|[A-Z0-9][A-Z])\s?(\d{2,4})\b/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        airlineCode: match[1],
        flightNumber: match[2],
        token: match[0],
        index: match.index,
      });
    }
    return matches;
  }

  function parseDateTimesAfterFlight(text, candidate) {
    const tail = text.slice(candidate.index + candidate.token.length, candidate.index + candidate.token.length + 280);
    const values = tail.match(/\b(?:\d{1,2}:\d{2}|\d{1,2}[A-Z]{3}\d{2,4})\b/gi) || [];

    for (let index = 0; index <= values.length - 4; index += 1) {
      const group = values.slice(index, index + 4);
      if (isTime(group[0]) && isDate(group[1]) && isTime(group[2]) && isDate(group[3])) {
        return {
          departure: parseMixedDate(group[1], group[0]),
          arrival: parseMixedDate(group[3], group[2]),
        };
      }
      if (isDate(group[0]) && isTime(group[1]) && isDate(group[2]) && isTime(group[3])) {
        return {
          departure: parseMixedDate(group[0], group[1]),
          arrival: parseMixedDate(group[2], group[3]),
        };
      }
    }

    return { departure: "", arrival: "" };
  }

  function findRouteForFlight(text, candidate, airports) {
    const beforeStart = Math.max(0, candidate.index - 520);
    const before = text.slice(beforeStart, candidate.index);
    const beforeMentions = findAirportMentions(before, airports, beforeStart);
    const routeBefore = lastDistinctCodes(beforeMentions, 2);
    if (routeBefore.length === 2) return routeBefore;

    const nearbyStart = Math.max(0, candidate.index - 150);
    const nearby = text.slice(nearbyStart, candidate.index + candidate.token.length + 180);
    const nearbyMentions = findAirportMentions(nearby, airports, nearbyStart).filter(
      (mention) => mention.code !== candidate.airlineCode
    );
    const routeNearby = firstDistinctCodes(nearbyMentions, 2);
    if (routeNearby.length === 2) return routeNearby;

    return ["", ""];
  }

  function findAirportMentions(text, airports, offset = 0) {
    const mentions = [];
    const upper = text.toUpperCase();

    Object.entries(airports).forEach(([code, airport]) => {
      collectMatches(mentions, upper, code, code, offset);
      if (airport?.city && airport.city.length >= 3) {
        collectMatches(mentions, upper, airport.city.toUpperCase(), code, offset);
      }
    });

    return mentions.sort((left, right) => left.index - right.index || right.termLength - left.termLength);
  }

  function collectMatches(mentions, text, term, code, offset) {
    const pattern = new RegExp(`(^|[^A-Z0-9])${escapeRegExp(term)}(?=$|[^A-Z0-9])`, "g");
    let match;
    while ((match = pattern.exec(text)) !== null) {
      mentions.push({
        code,
        index: offset + match.index + match[1].length,
        termLength: term.length,
      });
    }
  }

  function firstDistinctCodes(mentions, count) {
    const codes = [];
    mentions.forEach((mention) => {
      if (!codes.includes(mention.code) && codes.length < count) codes.push(mention.code);
    });
    return codes;
  }

  function lastDistinctCodes(mentions, count) {
    const codes = [];
    for (let index = mentions.length - 1; index >= 0 && codes.length < count; index -= 1) {
      if (!codes.includes(mentions[index].code)) codes.unshift(mentions[index].code);
    }
    return codes;
  }

  function parseMixedDate(dateText, timeText) {
    const match = dateText.match(/(\d{1,2})([A-Z]{3})(\d{2,4})/i);
    if (!match) return "";
    const month = monthMap[match[2].toUpperCase()];
    if (!month) return "";
    const day = match[1].padStart(2, "0");
    const year = match[3].length === 2 ? `20${match[3]}` : match[3];
    return `${year}-${month}-${day} ${timeText}`;
  }

  function firstMatch(text, patterns) {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return (match[1] || "").trim();
    }
    return "";
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function isTime(value) {
    return /^\d{1,2}:\d{2}$/.test(value);
  }

  function isDate(value) {
    return /^\d{1,2}[A-Z]{3}\d{2,4}$/i.test(value);
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  return { parseSegments };
});
