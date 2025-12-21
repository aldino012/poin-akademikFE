"use client";
import React from "react";

export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModalDesktop,
  openEditModalDesktop,
}) {
  const handleDetailClick = (claim) => {
    openDetailModalDesktop(claim);
  };

  return (
    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
      <table className="w-full text-left text-sm md:text-xs">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs md:text-[11px]">
          <tr>
            <th className="px-3 py-2 font-medium">No</th>
            <th className="px-3 py-2 font-medium">Jenis Kegiatan</th>
            <th className="px-3 py-2 font-medium">Rincian Acara</th>
            <th className="px-3 py-2 font-medium">Tgl Pengajuan</th>
            <th className="px-3 py-2 font-medium">Tgl Pelaksanaan</th>
            <th className="px-3 py-2 font-medium text-center">Status</th>
            <th className="px-3 py-2 font-medium text-center">Poin</th>
            <th className="px-3 py-2 font-medium text-center">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-xs md:text-[11px]">
          {currentClaims && currentClaims.length > 0 ? (
            currentClaims.map((claim, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50/60 transition-colors duration-150"
              >
                {/* No */}
                <td className="px-3 py-2 font-medium text-gray-700">
                  {startIndex + idx + 1}
                </td>

                {/* Jenis Kegiatan */}
                <td className="px-3 py-2 text-gray-700">
                  {claim.masterPoin?.jenis_kegiatan || "-"}
                </td>

                {/* Rincian Acara */}
                <td className="px-3 py-2 text-gray-700">
                  {claim.rincian_acara || "-"}
                </td>

                {/* Tgl Pengajuan */}
                <td className="px-3 py-2 text-gray-700">
                  {claim.tanggal_pengajuan || "-"}
                </td>

                {/* Tgl Pelaksanaan */}
                <td className="px-3 py-2 text-gray-700">
                  {claim.tanggal_pelaksanaan || "-"}
                </td>

                {/* Status */}
                <td className="px-3 py-2 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-medium ${
                      statusColors[claim.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.status || "-"}
                  </span>
                </td>

                {/* Poin */}
                <td className="px-3 py-2 text-center text-gray-700">
                  {claim.poin || "-"}
                </td>

                {/* Aksi */}
                <td className="px-3 py-2 text-center flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[12px] hover:bg-blue-200 flex items-center justify-center transition-colors shadow-sm"
                    onClick={() => handleDetailClick(claim)}
                  >
                    <i className="fas fa-info-circle mr-1"></i> Detail
                  </button>

                  {claim.status === "Revisi" && (
                    <button
                      type="button"
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-[12px] hover:bg-yellow-200 flex items-center justify-center transition-colors shadow-sm"
                      onClick={() => openEditModalDesktop(claim)}
                    >
                      <i className="fas fa-edit mr-1"></i> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-16 px-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <i className="fas fa-search text-4xl text-gray-300"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Tidak ada data yang ditemukan
                  </p>
                  <p className="text-xs text-gray-500 max-w-md">
                    Tidak ada data klaim poin yang tersedia untuk ditampilkan.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
