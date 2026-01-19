"use client";
import React from "react";

export default function TableToolbarVerif({
  search,
  setSearch,
  setCurrentPage,

  onImport,
  onExport,
  disableExport = false,
  importLoading = false,
  exportLoading = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white border-b border-gray-200 rounded-t-lg">
      {/* Judul */}
      <h3 className="text-sm font-medium flex items-center text-gray-800">
        <i className="fas fa-clipboard-check mr-2 text-blue-600 text-sm"></i>
        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent font-semibold">
          Verifikasi Klaim Kegiatan
        </span>
      </h3>

      {/* Search + Aksi */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-56">
          <input
            type="text"
            placeholder="Cari NIM / Nama..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
              bg-white text-gray-800 shadow-sm transition-all"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-2">
          {/* Import */}
          <button
            onClick={onImport}
            disabled={importLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600
              hover:from-blue-600 hover:to-indigo-700
              text-white px-3 py-1.5 rounded-lg text-xs font-medium
              flex items-center gap-1.5 transition-all shadow
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-file-import text-xs"></i>
            <span className="hidden sm:inline">
              {importLoading ? "Importing..." : "Import"}
            </span>
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            disabled={disableExport || exportLoading}
            className="bg-gradient-to-r from-purple-500 to-indigo-600
              hover:from-purple-600 hover:to-indigo-700
              text-white px-3 py-1.5 rounded-lg text-xs font-medium
              flex items-center gap-1.5 transition-all shadow
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-file-export text-xs"></i>
            <span className="hidden sm:inline">
              {exportLoading ? "Exporting..." : "Export"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
