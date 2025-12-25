"use client";

import React from "react";
import TableKlaim from "./components/table_verif/TableVerif";

export default function KegiatanPage() {
  return (
    <div
      className="
        p-4 
        space-y-4 
        bg-gray-50 
        h-auto                 /* 🔥 FIX: biar height menyesuaikan konten */
        overflow-y-visible     /* 🔥 FIX utama */
      "
    >
      {/* Card header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 space-y-2">
        <h1 className="text-base font-medium text-gray-800 flex items-center gap-1.5">
          <i className="fas fa-calendar-alt text-blue-600 text-sm"></i>
          Data Klaim Kegiatan
        </h1>

        <p className="text-gray-600 text-xs leading-relaxed text-justify sm:text-left">
          Halaman ini berisi daftar klaim kegiatan mahasiswa. Gunakan tabel di
          bawah untuk melihat detail klaim kegiatan dan mengelola aksi seperti{" "}
          <span className="font-medium text-gray-700">Detail</span>,{" "}
          <span className="font-medium text-gray-700">Edit</span>, atau{" "}
          <span className="font-medium text-gray-700">Hapus</span>.
        </p>
      </div>

      {/* Table klaim */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
        <TableKlaim />
      </div>

      {/* Catatan tambahan */}
      <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3 leading-relaxed">
        <div className="flex items-start sm:items-center gap-1.5">
          <i className="fas fa-info-circle text-blue-500 text-sm mt-0.5 sm:mt-0"></i>
          <p className="text-justify sm:text-left">
            Gunakan tombol{" "}
            <span className="font-medium text-gray-700">Detail</span> untuk
            melihat informasi lebih lengkap tentang klaim kegiatan.
          </p>
        </div>
      </div>
    </div>
  );
}
