"use client";
import React from "react";

export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModal,
}) {
  const handleDetailClick = (claim) => {
    openDetailModal(claim);
  };

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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      <div className="hidden lg:block overflow-x-auto overflow-y-visible rounded-xl shadow-lg border border-gray-100">
        <table className="w-full text-left text-xs">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs">
            <tr>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-hashtag mr-1.5 text-xs"></i>No
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-id-card mr-1.5 text-xs"></i>NIM
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-user mr-1.5 text-xs"></i>Nama
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-graduation-cap mr-1.5 text-xs"></i>Prodi
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-calendar-alt mr-1.5 text-xs"></i>Pengajuan
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-calendar-check mr-1.5 text-xs"></i>
                Pelaksanaan
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-list-alt mr-1.5 text-xs"></i>Kegiatan
              </th>
              <th className="px-3 py-2 font-medium text-center">
                <i className="fas fa-clipboard-list mr-1.5 text-xs"></i>Status
              </th>
              <th className="px-3 py-2 font-medium text-center">
                <i className="fas fa-cogs mr-1.5 text-xs"></i>Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-xs">
            {currentClaims && currentClaims.length > 0 ? (
              currentClaims.map((claim, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <td className="px-3 py-2 font-medium text-gray-700 text-xs">
                    {startIndex + idx + 1}
                  </td>

                  <td className="px-3 py-2 font-mono text-gray-900 text-xs">
                    {claim.mahasiswa?.nim || "-"}
                  </td>

                  <td className="px-3 py-2 font-medium text-gray-900 text-xs">
                    {claim.mahasiswa?.nama_mhs || "-"}
                  </td>

                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.mahasiswa?.prodi || "-"}
                  </td>

                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.tanggal_pengajuan || "-"}
                  </td>

                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.tanggal_pelaksanaan || "-"}
                  </td>

                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.masterPoin?.jenis_kegiatan || "-"}
                  </td>

                  <td className="px-3 py-2 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[claim.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {claim.status || "-"}
                    </span>
                  </td>

                  {/* ONLY DETAIL BUTTON LEFT */}
                  <td className="px-3 py-2">
                    <div className="flex gap-1 justify-center">
                      <button
                        type="button"
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 flex items-center transition-colors shadow-sm"
                        onClick={() => handleDetailClick(claim)}
                      >
                        <i className="fas fa-info-circle mr-1 text-xs"></i>
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-16 px-4 text-center">
                  <div className="animate-fade-in flex flex-col items-center justify-center">
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
    </>
  );
}
