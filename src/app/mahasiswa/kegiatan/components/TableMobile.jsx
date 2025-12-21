"use client";
import React from "react";

export default function TableMobile({
  currentClaims = [],
  openDetailModal = () => {},
  openEditModal = () => {},
  statusColors = {},
}) {
  return (
    <div className="block lg:hidden p-2 space-y-3">
      {currentClaims.length > 0 ? (
        currentClaims.map((claim, idx) => {
          const status = claim.status || "-";
          const statusClass =
            statusColors[status] || "bg-gray-100 text-gray-700";

          return (
            <div
              key={idx}
              className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-all bg-white"
            >
              {/* No */}
              <p className="text-[11px] text-gray-500 mb-1">
                <i className="fas fa-hashtag mr-1"></i>
                No: <span className="font-medium">{idx + 1}</span>
              </p>

              {/* Informasi Kegiatan */}
              <div className="space-y-1 text-[12px] text-gray-700">
                {/* Jenis Kegiatan */}
                <p>
                  <i className="fas fa-book-open mr-1 text-indigo-600"></i>
                  Jenis Kegiatan:{" "}
                  <span className="font-semibold">
                    {claim.masterPoin?.jenis_kegiatan || "-"}
                  </span>
                </p>

                {/* Rincian Acara */}
                <p>
                  <i className="fas fa-list-alt mr-1"></i>
                  Rincian Acara:{" "}
                  <span className="font-medium">
                    {claim.rincian_acara || "-"}
                  </span>
                </p>

                {/* Tgl Pengajuan */}
                <p>
                  <i className="fas fa-calendar-alt mr-1"></i>
                  Pengajuan:{" "}
                  <span className="font-medium">
                    {claim.tanggal_pengajuan || "-"}
                  </span>
                </p>

                {/* Tgl Pelaksanaan */}
                <p>
                  <i className="fas fa-calendar-check mr-1"></i>
                  Pelaksanaan:{" "}
                  <span className="font-medium">
                    {claim.tanggal_pelaksanaan || "-"}
                  </span>
                </p>

                {/* Poin */}
                <p>
                  <i className="fas fa-star mr-1 text-yellow-500"></i>
                  Poin:{" "}
                  <span className="font-semibold">{claim.poin ?? "-"}</span>
                </p>
              </div>

              {/* Status */}
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium ${statusClass}`}
                >
                  {status}
                </span>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-2 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => openDetailModal(claim)}
                  className="w-full bg-blue-100 text-blue-700 px-2 py-1.5 rounded-lg text-[11px] hover:bg-blue-200 flex items-center justify-center shadow-sm"
                >
                  <i className="fas fa-info-circle mr-1"></i> Detail
                </button>

                {claim.status === "Revisi" && (
                  <button
                    type="button"
                    onClick={() => openEditModal(claim)}
                    className="w-full bg-yellow-100 text-yellow-700 px-2 py-1.5 rounded-lg text-[11px] hover:bg-yellow-200 flex items-center justify-center shadow-sm"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-4 italic text-[12px]">
          Tidak ada data ditemukan.
        </div>
      )}
    </div>
  );
}
