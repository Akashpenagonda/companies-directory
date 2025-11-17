import React from "react";

export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="mt-6 flex items-center justify-between dark:text-gray-300">
      <div>Page {page} of {totalPages}</div>
      <div className="flex gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50">Prev</button>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
