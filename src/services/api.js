// src/services/api.js
import axios from "axios";

const IS_LOCAL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Local json-server URL
const LOCAL_BASE = "http://localhost:4000";

// Production (Netlify): use the static JSON file
const PROD_JSON = "/companies.json";

export async function getCompanies({
  page = 1,
  limit = 6,
  q,
  location,
  industry,
  sortBy,
  order = "asc",
} = {}) {
  // =====================================================================
  // ✔ LOCAL MODE — Use json-server
  // =====================================================================
  if (IS_LOCAL) {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (q) params.q = q;
    if (location) params.location = location;
    if (industry) params.industry = industry;
    if (sortBy) {
      params._sort = sortBy;
      params._order = order;
    }

    const res = await axios.get(`${LOCAL_BASE}/companies`, { params });

    // Try to read json-server X-Total-Count
    let total = parseInt(res.headers["x-total-count"]);

    // -----------------------------------------------------------------
    // FIX: json-server often breaks pagination when filters exist
    // → so manually compute a correct list & correct total
    // -----------------------------------------------------------------
    const needManual =
      q !== undefined ||
      location !== undefined ||
      industry !== undefined ||
      sortBy !== undefined;

    if (!total || isNaN(total) || needManual) {
      const allRes = await axios.get(`${LOCAL_BASE}/companies`);
      let list = allRes.data;

      // Search
      if (q) {
        const text = q.toLowerCase();
        list = list.filter(
          (c) =>
            c.name.toLowerCase().includes(text) ||
            c.location.toLowerCase().includes(text) ||
            c.industry.toLowerCase().includes(text)
        );
      }

      // Location filter
      if (location) list = list.filter((c) => c.location === location);

      // Industry filter
      if (industry) list = list.filter((c) => c.industry === industry);

      // Sort
      if (sortBy) {
        list.sort((a, b) => {
          const A = String(a[sortBy]).toLowerCase();
          const B = String(b[sortBy]).toLowerCase();
          return order === "desc" ? (A > B ? -1 : 1) : (A < B ? -1 : 1);
        });
      }

      // Correct pagination
      total = list.length;
      const start = (page - 1) * limit;
      const paginated = list.slice(start, start + limit);

      return { data: paginated, total };
    }

    // json-server normal case
    return { data: res.data, total };
  }

  // =====================================================================
  // ✔ PRODUCTION (Netlify) — Use companies.json
  // =====================================================================
  const res = await axios.get(PROD_JSON);

  let data = Array.isArray(res.data) ? [...res.data] : [];

  // Search filter
  if (q) {
    const text = q.toLowerCase();
    data = data.filter(
      (c) =>
        c.name.toLowerCase().includes(text) ||
        c.location.toLowerCase().includes(text) ||
        c.industry.toLowerCase().includes(text)
    );
  }

  // Location filter
  if (location) data = data.filter((c) => c.location === location);

  // Industry filter
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
