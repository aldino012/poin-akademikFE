"use client";

import React from "react";
import TableKegiatanMhs from "./components/klaim_poin/TableKlaimPoint";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function KegiatanPage() {
  return (
    <div className="space-y-3">
      {/* HEADER */}
      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
        <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <i className="fas fa-calendar-alt text-blue-600"></i>
          Klaim Kegiatan Mahasiswa
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Halaman ini menampilkan daftar klaim kegiatan non-akademik mahasiswa
          beserta status dan poin yang diperoleh.
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
        <TableKegiatanMhs />

        {/* INFO */}
        <div className="mt-3 text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-2 flex items-start gap-2">
          <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
          <span>
            Gunakan tombol <b>Detail</b> untuk melihat informasi lengkap klaim
            kegiatan atau ajukan klaim baru melalui tombol <b>Klaim Poin</b>.
          </span>
        </div>
      </div>
    </div>
  );
}
