"use client";

import React from "react";

export default function TableToolbar({ search, setSearch, setCurrentPage }) {
  return (
    <div className="mb-4 px-2 sm:px-0">
      {/* Search Box */}
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Cari NIM / Nama..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset ke halaman 1 saat search
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
    </div>
  );
}
