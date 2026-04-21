import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const server = new McpServer({
  name: "council-tools",
  version: "1.0.0",
  description: "Tools for LLM Council agents: wiki, medical, and hospital search",
});

// ─────────────────────────────────────────────
// TOOL 1 — WIKIPEDIA SEARCH
// Free, no key, no signup needed
// ─────────────────────────────────────────────
server.tool(
  "wiki_search",
  "Search Wikipedia for factual information about any topic, person, event or concept",
  {
    query: z.string().describe("The topic or keyword to search for"),
  },
  async ({ query }) => {
    try {
      // Step 1: find closest matching page title
      const search = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "opensearch",
          search: query,
          limit: 1,
          format: "json",
        },
        headers: { "User-Agent": "CouncilMCP/1.0 (educational project)" },
        timeout: 8000,
      });

      const title = search.data[1]?.[0];
      if (!title) {
        return { content: [{ type: "text", text: `No Wikipedia article found for: ${query}` }] };
      }

      // Step 2: fetch the summary of that page
      const summary = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title), {
        headers: { "User-Agent": "CouncilMCP/1.0 (educational project)" },
        timeout: 8000,
      });

      const { extract, content_urls } = summary.data;
      const text = `**${title}**\n\n${extract}\n\nSource: ${content_urls?.desktop?.page || ""}`;

      return { content: [{ type: "text", text }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Wikipedia search failed: ${err.message}` }] };
    }
  }
);

// ─────────────────────────────────────────────
// TOOL 2 — PUBMED MEDICAL SEARCH
// Free, NCBI API key optional but raises rate limit
// Register free at: https://ncbi.nlm.nih.gov/account
// ─────────────────────────────────────────────
server.tool(
  "medical_search",
  "Search PubMed for medical research papers, drug info, and clinical studies. Use for health and medical questions.",
  {
    query: z.string().describe("Medical condition, drug name, symptom, or treatment to search"),
    max_results: z.number().min(1).max(5).default(3).describe("Number of results to return (1-5)"),
  },
  async ({ query, max_results }) => {
    try {
      const apiKey = process.env.NCBI_API_KEY;
      const baseParams = apiKey ? { api_key: apiKey } : {};

      // Step 1: search for matching article IDs
      const search = await axios.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi", {
        params: {
          ...baseParams,
          db: "pubmed",
          term: query,
          retmax: max_results,
          retmode: "json",
          sort: "relevance",
        },
        timeout: 10000,
      });

      const ids = search.data.esearchresult?.idlist;
      if (!ids?.length) {
        return { content: [{ type: "text", text: `No medical research found for: ${query}` }] };
      }

      // Step 2: fetch summaries for those IDs
      const summaries = await axios.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi", {
        params: {
          ...baseParams,
          db: "pubmed",
          id: ids.join(","),
          retmode: "json",
        },
        timeout: 10000,
      });

      const results = ids
        .map((id) => {
          const r = summaries.data.result?.[id];
          if (!r || !r.title) return null;
          const authors = r.authors?.slice(0, 2).map((a) => a.name).join(", ") || "Unknown";
          return `• **${r.title}**\n  Authors: ${authors} | Published: ${r.pubdate}\n  PubMed ID: ${id} | Link: https://pubmed.ncbi.nlm.nih.gov/${id}`;
        })
        .filter(Boolean)
        .join("\n\n");

      return {
        content: [{ type: "text", text: `**PubMed results for "${query}"**\n\n${results}` }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: `Medical search failed: ${err.message}` }] };
    }
  }
);

// ─────────────────────────────────────────────
// TOOL 3 — OPEN FDA DRUG INFO
// Completely free, no key needed
// ─────────────────────────────────────────────
server.tool(
  "drug_info",
  "Look up drug information, warnings, side effects and usage from the FDA database. Fully free, no key needed.",
  {
    drug_name: z.string().describe("Name of the drug or medication"),
  },
  async ({ drug_name }) => {
    try {
      const res = await axios.get("https://api.fda.gov/drug/label.json", {
        params: {
          search: `openfda.brand_name:${drug_name}+openfda.generic_name:${drug_name}`,
          limit: 1,
        },
        timeout: 8000,
      });

      const label = res.data.results?.[0];
      if (!label) {
        return { content: [{ type: "text", text: `No FDA data found for drug: ${drug_name}` }] };
      }

      const sections = [
        label.openfda?.brand_name?.[0] && `**Brand name:** ${label.openfda.brand_name[0]}`,
        label.openfda?.generic_name?.[0] && `**Generic name:** ${label.openfda.generic_name[0]}`,
        label.purpose?.[0] && `**Purpose:** ${label.purpose[0].slice(0, 300)}`,
        label.warnings?.[0] && `**Warnings:** ${label.warnings[0].slice(0, 300)}`,
        label.dosage_and_administration?.[0] && `**Dosage:** ${label.dosage_and_administration[0].slice(0, 300)}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      return { content: [{ type: "text", text: sections }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Drug info lookup failed: ${err.message}` }] };
    }
  }
);

// ─────────────────────────────────────────────
// TOOL 4 — HOSPITAL / CLINIC SEARCH NEAR LOCATION
// Uses OpenStreetMap Overpass API — completely free, no key
// Falls back gracefully if Nominatim geocoding fails
// ─────────────────────────────────────────────
server.tool(
  "find_hospital",
  "Find hospitals, clinics or specialist facilities near a location. Completely free using OpenStreetMap.",
  {
    condition: z.string().describe("Medical condition, specialty, or type of facility (e.g. 'cardiology', 'cancer', 'emergency', 'hospital')"),
    location: z.string().describe("City, neighbourhood or address (e.g. 'Andheri, Mumbai' or 'Connaught Place, Delhi')"),
    radius_km: z.number().min(1).max(20).default(5).describe("Search radius in kilometres"),
  },
  async ({ condition, location, radius_km }) => {
    try {
      // Step 1: geocode the location name → lat/lng via Nominatim (free)
      const geo = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: location, format: "json", limit: 1 },
        headers: { "User-Agent": "CouncilMCP/1.0 (educational project)" },
        timeout: 8000,
      });

      if (!geo.data?.length) {
        return { content: [{ type: "text", text: `Could not find location: ${location}` }] };
      }

      const { lat, lon, display_name } = geo.data[0];
      const radiusMeters = radius_km * 1000;

      // Step 2: query Overpass for hospitals/clinics near that point
      // Searches amenity=hospital, amenity=clinic, amenity=doctors
      const overpassQuery = `
        [out:json][timeout:15];
        (
          node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
          node["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
          node["amenity"="doctors"](around:${radiusMeters},${lat},${lon});
          node["healthcare"="hospital"](around:${radiusMeters},${lat},${lon});
        );
        out body 10;
      `.trim();

      const overpass = await axios.post(
        "https://overpass-api.de/api/interpreter",
        overpassQuery,
        {
          headers: { "Content-Type": "text/plain" },
          timeout: 15000,
        }
      );

      const elements = overpass.data?.elements || [];

      if (!elements.length) {
        return {
          content: [{
            type: "text",
            text: `No hospitals or clinics found within ${radius_km}km of ${display_name}.\nTry increasing the radius or searching a nearby major city.`,
          }],
        };
      }

      // Step 3: format results, filter by condition keyword if relevant
      const conditionLower = condition.toLowerCase();
      const keywordMatch = (tags) => {
        const searchable = JSON.stringify(tags).toLowerCase();
        return searchable.includes(conditionLower);
      };

      // Sort: matching specialty first, then all others
      const sorted = [
        ...elements.filter((e) => keywordMatch(e.tags)),
        ...elements.filter((e) => !keywordMatch(e.tags)),
      ].slice(0, 7);

      const formatted = sorted
        .map((e, i) => {
          const t = e.tags || {};
          const name = t.name || t["name:en"] || "Unnamed facility";
          const type = t.amenity || t.healthcare || "facility";
          const addr = [t["addr:street"], t["addr:city"]].filter(Boolean).join(", ") || "Address not listed";
          const phone = t.phone || t["contact:phone"] || "Not listed";
          const specialty = t["healthcare:speciality"] || t.specialty || "";
          const mapLink = `https://www.openstreetmap.org/?mlat=${e.lat}&mlon=${e.lon}&zoom=17`;

          return [
            `${i + 1}. **${name}** (${type})`,
            `   Address: ${addr}`,
            specialty && `   Specialty: ${specialty}`,
            `   Phone: ${phone}`,
            `   Map: ${mapLink}`,
          ].filter(Boolean).join("\n");
        })
        .join("\n\n");

      return {
        content: [{
          type: "text",
          text: `**Facilities near ${display_name} for "${condition}"** (${radius_km}km radius)\n\n${formatted}\n\nData from OpenStreetMap — availability may vary.`,
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: `Hospital search failed: ${err.message}` }] };
    }
  }
);

// ─────────────────────────────────────────────
// TOOL 5 — NEWS SEARCH (The Guardian — free, no delay)
// Get key free at: https://open-platform.theguardian.com
// 500 requests/day free, full article content
// ─────────────────────────────────────────────
server.tool(
  "news_search",
  "Search recent news articles using The Guardian API. Free tier: 500 req/day. Get key at open-platform.theguardian.com",
  {
    query: z.string().describe("Topic or keywords to search news for"),
    max_results: z.number().min(1).max(5).default(3),
  },
  async ({ query, max_results }) => {
    try {
      const apiKey = process.env.GUARDIAN_API_KEY || "test"; // "test" key works with lower limits

      const res = await axios.get("https://content.guardianapis.com/search", {
        params: {
          q: query,
          "api-key": apiKey,
          "show-fields": "trailText",
          "page-size": max_results,
          "order-by": "relevance",
        },
        timeout: 8000,
      });

      const articles = res.data.response?.results;
      if (!articles?.length) {
        return { content: [{ type: "text", text: `No news found for: ${query}` }] };
      }

      const formatted = articles
        .map((a, i) =>
          `${i + 1}. **${a.webTitle}**\n   ${a.fields?.trailText || ""}\n   ${a.webPublicationDate?.slice(0, 10)} | ${a.webUrl}`
        )
        .join("\n\n");

      return { content: [{ type: "text", text: `**News: "${query}"**\n\n${formatted}` }] };
    } catch (err) {
      return { content: [{ type: "text", text: `News search failed: ${err.message}` }] };
    }
  }
);

// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Council MCP server running — tools: wiki_search, medical_search, drug_info, find_hospital, news_search");