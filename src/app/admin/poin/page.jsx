"use client";

import React from "react";
import MasterPoint from "../../../components/MasterPoint"; // komponen utama tabel
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MasterPointAdminPage() {
  return (
    <div className="p-3 space-y-3">
      {/* Header Halaman */}
      <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col gap-1.5">
        <h1 className="text-base font-medium text-gray-800 flex items-center gap-1.5">
          <i className="fas fa-star text-blue-600 text-sm"></i> Master Point
        </h1>
        <p className="text-xs text-gray-600">
          Daftar lengkap jenis kegiatan mahasiswa beserta kode, kategori,
          posisi/tingkatan, dan bobot poin yang sesuai. Data ini digunakan
          sebagai acuan dalam verifikasi kegiatan akademik maupun non-akademik.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        {/* Admin punya tombol tambah, edit, hapus */}
        <MasterPoint role="admin" />
      </div>
    </div>
  );
}
