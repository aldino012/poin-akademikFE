"use client";

import React from "react";
import MasterPoint from "../../../components/MasterPoint"; // komponen utama tabel
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MasterPointMahasiswaPage() {
  return (
    <div className="space-y-2">
      {" "}
      {/* hapus padding luar supaya mentok */}
      {/* Header Halaman */}
      <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col gap-1.5 mt-0">
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
      <div className="bg-white rounded-lg shadow-sm p-3 mt-0">
        {/* Mahasiswa hanya bisa lihat, tanpa tambah/edit/hapus */}
        <MasterPoint role="mahasiswa" />
      </div>
    </div>
  );
}
