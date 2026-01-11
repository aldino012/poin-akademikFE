"use client";

import React from "react";

export default function TableToolbar({
  search,
  setSearch,
  setCurrentPage,
  onImport, // 🔥 BARU
}) {
  return (
    <div className="mb-4 px-2 sm:px-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Search Box */}
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Cari NIM / Nama..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="
            pl-9 pr-3 py-1.5 sm:py-2
            border rounded-md
            text-[13px] sm:text-sm
            w-full
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
            bg-gray-50 text-gray-800 placeholder-gray-400
            transition-all
          "
        />
        <i
          className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2
          text-gray-400 text-[13px] sm:text-sm"
        ></i>
      </div>

      {/* Import Button */}
      <div className="flex justify-end">
        <button
          onClick={onImport}
          className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-lg
            bg-gradient-to-r from-green-600 to-emerald-700
            text-white text-sm font-medium
            hover:from-green-700 hover:to-emerald-800
            transition-colors
            shadow-sm
          "
        >
          <i className="fas fa-file-import"></i>
          Import Excel
        </button>
      </div>
    </div>
  );
}
