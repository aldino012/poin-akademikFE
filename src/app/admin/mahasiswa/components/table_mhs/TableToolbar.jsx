"use client";
import React from "react";

export default function TableToolbar({
  search,
  setSearch,
  filterPoin,
  setFilterPoin,
  onAdd,
  onImport, // callback import Excel
  onExport, // callback export Excel
  disableExport = false, // ⬅️ FIX: tambahkan default value
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white border-b border-gray-200 rounded-t-lg">
      {/* Judul */}
      <h3 className="text-sm font-medium flex items-center text-gray-800 w-full sm:w-auto">
        <i className="fas fa-list-alt mr-2 text-blue-600 text-sm"></i>
        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent font-semibold">
          Daftar Mahasiswa
        </span>
      </h3>

      {/* Search + Filter + Aksi */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-56">
          <input
            type="text"
            placeholder="Cari NIM / Nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white text-gray-800 shadow-sm transition-all"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        </div>

        {/* Filter Poin */}
        <select
          value={filterPoin}
          onChange={(e) => setFilterPoin(e.target.value)}
          className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-blue-50 text-blue-800 font-medium shadow-sm transition-all w-full sm:w-auto"
        >
          <option value="all">Semua Poin</option>
          <option value="0">Poin = 0</option>
          <option value="1-10">1 - 10</option>
          <option value="11-25">11 - 25</option>
          <option value="26-50">26 - 50</option>
          <option value=">50">&gt; 50</option>
        </select>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Tambah */}
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 shadow hover:shadow-md"
          >
            <i className="fas fa-user-plus text-xs"></i>
            <span className="hidden sm:inline">Tambah</span>
          </button>

          {/* Import */}
          <button
            onClick={onImport}
            disabled={!onImport}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-file-import text-xs"></i>
            <span className="hidden sm:inline">Import</span>
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            disabled={!onExport || disableExport} // ⬅️ sekarang sudah aman
            className="
              bg-gradient-to-r from-purple-500 to-indigo-600 
              hover:from-purple-600 hover:to-indigo-700 
              text-white px-3 py-1.5 rounded-lg text-xs font-medium 
              flex items-center justify-center gap-1.5 transition-all 
              duration-200 shadow hover:shadow-md 
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <i className="fas fa-file-export text-xs"></i>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
