"use client";
import React from "react";

export default function TableMobile({
  currentClaims = [],
  startIndex = 0,
  statusColors = {},
  openDetailModal = () => {},
}) {
  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="lg:hidden p-3 space-y-3">
        {currentClaims.length > 0 ? (
          currentClaims.map((claim, idx) => {
            const status = claim.status || "-";
            const statusClass =
              statusColors?.[status] ?? "bg-gray-100 text-gray-700";

            return (
              <div
                key={idx}
                className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-all bg-white animate-slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Header Nama & Prodi */}
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {claim.mahasiswa?.nama_mhs || "-"}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {claim.mahasiswa?.prodi || "-"}
                  </span>
                </div>

                {/* NIM */}
                <p className="text-[11px] text-gray-600 mt-0.5">
                  <i className="fas fa-id-card mr-1"></i>
                  NIM:{" "}
                  <span className="font-mono">
                    {claim.mahasiswa?.nim || "-"}
                  </span>
                </p>

                {/* Informasi kegiatan */}
                <div className="mt-1.5 space-y-0.5 text-[11px] text-gray-600">
                  <p>
                    <i className="fas fa-calendar-alt mr-1"></i>
                    Pengajuan: {claim.tanggal_pengajuan || "-"}
                  </p>
                  <p>
                    <i className="fas fa-calendar-check mr-1"></i>
                    Pelaksanaan: {claim.tanggal_pelaksanaan || "-"}
                  </p>
                  <p>
                    <i className="fas fa-list-alt mr-1"></i>
                    Kegiatan: {claim.masterPoin?.jenis_kegiatan || "-"}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Tombol Aksi (Detail Only) */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => openDetailModal(claim)}
                    className="w-full bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-[11px] hover:bg-blue-200 flex items-center justify-center shadow-sm"
                  >
                    <i className="fas fa-info-circle mr-1"></i> Detail
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-4 text-sm italic">
            Tidak ada data ditemukan.
          </div>
        )}
      </div>
    </>
  );
}
