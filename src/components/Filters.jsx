import React, { useMemo } from "react";

export default function Filters({
  allCompanies,
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  industryFilter,
  setIndustryFilter,
  setSortBy,
  onResetFilters
}) {
  const locations = useMemo(() => {
    const set = new Set(allCompanies.map((c) => c.location));
    return Array.from(set);
  }, [allCompanies]);

  const industries = useMemo(() => {
    const set = new Set(allCompanies.map((c) => c.industry));
    return Array.from(set);
  }, [allCompanies]);

  const filtersActive =
    searchTerm !== "" ||
    locationFilter !== null ||
    industryFilter !== null ||
    setSortBy !== null;

  return (
    <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center">

      {/* Search */}
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search companies..."
        className="flex-1 min-w-0 p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
        focus:ring-2 focus:ring-indigo-300 outline-none"
      />

      {/* Location Filter */}
      <select
        value={locationFilter || ""}
        onChange={(e) => setLocationFilter(e.target.value || null)}
        className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Industry Filter */}
      <select
        value={industryFilter || ""}
        onChange={(e) => setIndustryFilter(e.target.value || null)}
        className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <option value="">All Industries</option>
        {industries.map((ind) => (
          <option key={ind} value={ind}>
            {ind}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        defaultValue=""
        onChange={(e) => {
          const v = e.target.value;
          if (v === "name_asc") setSortBy({ sortBy: "name", order: "asc" });
          else if (v === "name_desc") setSortBy({ sortBy: "name", order: "desc" });
          else setSortBy(null);
        }}
        className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <option value="">Sort</option>
        <option value="name_asc">Name (A → Z)</option>
        <option value="name_desc">Name (Z → A)</option>
      </select>

      {/* RESET BUTTON */}
      {filtersActive && (
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Reset
        </button>
      )}
    </div>
  );
}
