// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { getCompanies } from "../services/api";

import Filters from "../components/Filters";
import CompanyCard from "../components/CompanyCard";
import Pagination from "../components/Pagination";
import useDebounce from "../utils/useDebounce";

// detect environment (local or netlify)
const IS_LOCAL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [allList, setAllList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const q = useDebounce(search, 350);

  const [locationFilter, setLocationFilter] = useState(null);
  const [industryFilter, setIndustryFilter] = useState(null);
  const [sortParams, setSortParams] = useState(null);

  // -------------------------------------------------------------------
  // ⭐ FIXED: Fetch full company list using local OR production URL
  // -------------------------------------------------------------------
  useEffect(() => {
    const url = IS_LOCAL
      ? "http://localhost:4000/companies"
      : "/companies.json";

    axios
      .get(url)
      .then((res) => setAllList(res.data || []))
      .catch(() => setAllList([]));
  }, []);

  // -------------------------------------------------------------------
  // ⭐ Main paginated + filtered API call (local via api.js / production using static)
  // -------------------------------------------------------------------
  useEffect(() => {
    setLoading(true);

    getCompanies({
      page,
      limit,
      q: q || undefined,
      location: locationFilter || undefined,
      industry: industryFilter || undefined,
      sortBy: sortParams?.sortBy,
      order: sortParams?.order,
    })
      .then(({ data, total }) => {
        setCompanies(data || []);
        setTotal(total || 0);
      })
      .catch(() => {
        setCompanies([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [page, q, locationFilter, industryFilter, sortParams]);

  // -------------------------------------------------------------------
  // ⭐ Reset filters
  // -------------------------------------------------------------------
  const resetFilters = () => {
    setSearch("");
    setLocationFilter(null);
    setIndustryFilter(null);
    setSortParams(null);
    setPage(1);
  };

  return (
    <>
      {/* =============================================================== */}
      {/* ⭐ HERO SECTION  */}
      {/* =============================================================== */}
      <section id="home" className="w-full pt-28 pb-24 text-center relative overflow-hidden">

        {/* Glow background */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[650px] h-[650px]
          bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-[160px] rounded-full">
        </div>

        {/* hero content centered */}
        <div className="max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
          >
            Discover Top Companies{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Instantly
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Browse, filter and explore verified companies with a futuristic interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <a
              href="#companies"
              className="relative px-8 py-3 rounded-full text-white font-medium 
                bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30 
                hover:shadow-purple-600/50 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Companies
            </a>
          </motion.div>
        </div>

      </section>

      {/* =============================================================== */}
      {/* ⭐ MAIN CONTENT (FILTERS + CARDS) */}
      {/* =============================================================== */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Filters */}
        <Filters
          allCompanies={allList}
          searchTerm={search}
          setSearchTerm={(v) => {
            setSearch(v);
            setPage(1);
          }}
          locationFilter={locationFilter}
          setLocationFilter={(v) => {
            setLocationFilter(v);
            setPage(1);
          }}
          industryFilter={industryFilter}
          setIndustryFilter={(v) => {
            setIndustryFilter(v);
            setPage(1);
          }}
          setSortBy={(v) => {
            setSortParams(v);
            setPage(1);
          }}
          onResetFilters={resetFilters}
        />

        {/* Companies Grid */}
        <section
          id="companies"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          {loading ? (
            Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
            ))
          ) : companies.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
                No companies found
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try clearing filters or adjusting search.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            companies.map((c) => <CompanyCard key={c.id} company={c} />)
          )}
        </section>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination page={page} setPage={setPage} total={total} limit={limit} />
        </div>
      </div>
    </>
  );
}
