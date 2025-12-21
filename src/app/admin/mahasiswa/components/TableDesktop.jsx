"use client";
import React from "react";

export default function TableDesktop({
  students,
  startIndex, // ⬅️ TAMBAH PARAM INI
  openDetail,
  openCetak,
  onEdit,
  onDelete,
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-md border border-gray-100">
        <table className="w-full text-left text-[13px] leading-snug">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-[13px]">
            <tr>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-hashtag mr-1 text-xs"></i>No
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-id-card mr-1 text-xs"></i>NIM
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-user mr-1 text-xs"></i>Nama
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-graduation-cap mr-1 text-xs"></i>Prodi
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-star mr-1 text-xs"></i>Total Poin
              </th>
              <th className="px-4 py-2">Foto</th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-cogs mr-1 text-xs"></i>Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-[12.5px] text-gray-700">
            {/* Jika TIDAK ADA DATA */}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 px-4 text-center">
                  <div className="animate-fade-in flex flex-col items-center justify-center">
                    <div className="mb-4">
                      <i className="fas fa-search text-4xl text-gray-300"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Tidak ada data yang ditemukan
                    </h3>
                    <p className="text-gray-500 text-sm max-w-md mb-6">
                      Tidak ada mahasiswa dengan poin dalam rentang yang Anda
                      cari.
                    </p>
                    <div className="text-xs text-gray-400">
                      <i className="fas fa-lightbulb mr-1 text-amber-400"></i>
                      Coba ubah filter pencarian Anda
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {/* Jika ADA DATA */}
            {students.map((student, idx) => (
              <tr
                key={student.id_mhs || idx}
                className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* NOMOR */}
                <td className="px-3 py-2 font-medium text-gray-700">
                  {startIndex + idx + 1}
                </td>

                <td className="px-3 py-2 font-mono text-gray-900">
                  {student.nim}
                </td>

                <td className="px-3 py-2 font-semibold text-gray-900">
                  {student.nama_mhs}
                </td>

                <td className="px-3 py-2 text-gray-700">{student.prodi}</td>

                <td className="px-3 py-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800">
                    <i className="fas fa-star mr-1 text-[10px]"></i>
                    {student.total_poin} Total Poin
                  </span>
                </td>

                <td className="px-4 py-2">
                  <img
                    src={
                      student.foto_file_id
                        ? `${API_URL}/api/mahasiswa/foto/${
                            student.foto_file_id
                          }?t=${student.updated_at || Date.now()}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            student.nama_mhs
                          )}`
                    }
                    alt="Foto Mahasiswa"
                    className="w-12 h-12 object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student.nama_mhs
                      )}`;
                    }}
                  />
                </td>

                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      className="bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-md text-[11px] hover:bg-blue-200 flex items-center transition-colors shadow-sm"
                      onClick={() => openDetail(student)}
                    >
                      <i className="fas fa-info-circle mr-1"></i> Detail
                    </button>

                    <button
                      className="bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-md text-[11px] hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                      onClick={() => onEdit(student)}
                    >
                      <i className="fas fa-edit mr-1"></i> Edit
                    </button>

                    <button
                      className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-md text-[11px] hover:bg-red-200 flex items-center transition-colors shadow-sm"
                      onClick={() => onDelete(student)}
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Hapus
                    </button>

                    <button
                      className="bg-green-100 text-green-700 px-2.5 py-1.5 rounded-md text-[11px] hover:bg-green-200 flex items-center transition-colors shadow-sm"
                      onClick={() => openCetak(student)}
                    >
                      <i className="fas fa-print mr-1"></i> Cetak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
