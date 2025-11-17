import axios from "axios";

const IS_LOCAL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Local json-server
const LOCAL_BASE = "http://localhost:4000";

// Production (Netlify): load static JSON file
const PROD_JSON = "/companies.json";

export async function getCompanies({
  page = 1,
  limit = 6,
  q,
  location,
  industry,
  sortBy,
  order
} = {}) {
  // ---------------------------------------------------------
  // ✔ LOCAL MODE → Use json-server
  // ---------------------------------------------------------
  if (IS_LOCAL) {
    const params = {
      _page: page,
      _limit: limit
    };

    if (q) params.q = q;
    if (location) params.location = location;
    if (industry) params.industry = industry;
    if (sortBy) {
      params._sort = sortBy;
      params._order = order || "asc";
    }

    const res = await axios.get(`${LOCAL_BASE}/companies`, { params });

    const total = parseInt(res.headers["x-total-count"] || res.data.length);

    return { data: res.data, total };
  }

  // ---------------------------------------------------------
  // ✔ PRODUCTION (Netlify) → Use /companies.json
  // ---------------------------------------------------------
  const res = await axios.get(PROD_JSON);

  // IMPORTANT: res.data IS ALREADY AN ARRAY
  let data = Array.isArray(res.data) ? [...res.data] : [];

  // 🔍 Search
  if (q) {
    const text = q.toLowerCase();
    data = data.filter(
      (c) =>
        c.name.toLowerCase().includes(text) ||
        c.location.toLowerCase().includes(text) ||
        c.industry.toLowerCase().includes(text)
    );
  }

  // 📍 Filter by location
  if (location) data = data.filter((c) => c.location === location);

  // 🏭 Filter by industry
  if (industry) data = data.filter((c) => c.industry === industry);

  // 🔽 Sorting
  if (sortBy) {
    data.sort((a, b) => {
      const A = String(a[sortBy]).toLowerCase();
      const B = String(b[sortBy]).toLowerCase();
      return order === "desc" ? (A > B ? -1 : 1) : (A < B ? -1 : 1);
    });
  }

  // 📄 Pagination
  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  return { data: paginated, total };
}
