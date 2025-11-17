import axios from "axios";
const API_BASE = "http://localhost:4000";

export async function getCompanies({ page = 1, limit = 6, q, location, industry, sortBy, order } = {}) {
  const params = {};
  params._page = page;
  params._limit = limit;

  if (q) params.q = q;
  if (location) params.location = location;
  if (industry) params.industry = industry;
  if (sortBy) { params._sort = sortBy; params._order = order || "asc"; }

  const res = await axios.get(`${API_BASE}/companies`, { params });
  const total = parseInt(res.headers["x-total-count"] || "0", 10);
  return { data: res.data, total };
}
