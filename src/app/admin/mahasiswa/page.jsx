"use client";

import React from "react";
import TableMhs from "./components/table_mhs/TableMhs";

export default function MahasiswaPage() {
  return (
    <div className="space-y-4">
      {/* Header halaman */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
          <i className="fas fa-user-graduate text-blue-600"></i>
          Data Mahasiswa
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          Kelola data mahasiswa dan informasi total poin yang telah mereka
          kumpulkan dalam kegiatan akademik maupun non-akademik.
        </p>
      </div>

      {/* Table mahasiswa */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <TableMhs />
      </div>

      {/* Info tambahan */}
      <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 mt-1"></i>

          <div>
            <p className="font-semibold text-blue-800 mb-2">
              Informasi Status Mahasiswa
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Terverifikasi
              </span>

              <span className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Belum Terverifikasi
              </span>

              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Perlu Revisi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
