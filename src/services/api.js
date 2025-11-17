// src/services/api.js
import axios from "axios";

const IS_LOCAL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Local json-server
const LOCAL_BASE = "http://localhost:4000";

// Production: serve from /companies.json (Netlify)
const PROD_BASE = "";

// Build json-server params
function buildJsonServerParams({ page, limit, q, location, industry, sortBy, order }) {
  const params = {};

  if (page) params._page = page;
  if (limit) params._limit = limit;
  if (sortBy) {
    params._sort = sortBy;
    params._order = order || "asc";
  }
  if (q) params.q = q;
  if (location) params.location = location;
  if (industry) params.industry = industry;

  return params;
}

export async function getCompanies(opts = {}) {
  const { page = 1, limit = 6, q, location, industry, sortBy, order } = opts;

  // ---------------------------------------------------------
  // 🔹 1) LOCAL MODE → Use json-server (localhost:4000)
  // ---------------------------------------------------------
  if (IS_LOCAL) {
    const url = `${LOCAL_BASE}/companies`;
    const params = buildJsonServerParams({ page, limit, q, location, industry, sortBy, order });

    const res = await axios.get(url, { params });

    const totalHeader = res.headers["x-total-count"];
    const total = totalHeader ? parseInt(totalHeader) : res.data.length;

    return { data: res.data, total };
  }

  // ---------------------------------------------------------
  // 🔹 2) PRODUCTION (NETLIFY) → Load from /companies.json
  // ---------------------------------------------------------
  const res = await axios.get(`${PROD_BASE}/companies.json`);

  let data = Array.isArray(res.data.companies) ? [...res.data.companies] : [];

  // Search
  if (q) {
    const txt = q.toLowerCase();
    data = data.filter(
      (c) =>
        c.name.toLowerCase().includes(txt) ||
        c.location.toLowerCase().includes(txt) ||
        c.industry.toLowerCase().includes(txt)
    );
  }

  // Filters
  if (location) data = data.filter((c) => c.location === location);
  if (industry) data = data.filter((c) => c.industry === industry);

  // Sorting
  if (sortBy) {
    data.sort((a, b) => {
      const A = String(a[sortBy]).toLowerCase();
      const B = String(b[sortBy]).toLowerCase();
      return order === "desc" ? (A > B ? -1 : 1) : (A < B ? -1 : 1);
    });
  }

  // Pagination
  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  return { data: paginated, total };
}
