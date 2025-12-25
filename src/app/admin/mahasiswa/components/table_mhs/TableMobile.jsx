"use client";
import React from "react";

export default function TableMobile({
  students,
  openDetail,
  openCetak,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-25px);
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
        {students.map((student, idx) => (
          <div
            key={student.id_mhs || idx}
            className="border rounded-xl p-3 shadow-sm hover:shadow-md bg-white animate-slide-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Header nama dan prodi */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800 text-[14px] leading-tight">
                {student.nama_mhs} {/* diperbaiki */}
              </h3>
              <span className="text-[11px] text-gray-500 font-medium mt-[2px]">
                {student.prodi}
              </span>
            </div>

            {/* Detail mahasiswa */}
            <div className="text-[12.5px] text-gray-600 space-y-0.5 mb-3">
              <p>
                <span className="font-medium">NIM:</span> {student.nim}
              </p>
              <p>
                <span className="font-medium">Total Poin:</span>{" "}
                {student.total_poin}
              </p>
            </div>

            {/* Tombol aksi */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Detail */}
              <button
                className="flex items-center justify-center w-full bg-blue-500 text-white px-2.5 py-1.5 rounded-md text-[11px] hover:bg-blue-600 transition-colors"
                onClick={() => openDetail(student)}
              >
                <i className="fas fa-info-circle mr-1.5 text-[10px]"></i> Detail
              </button>

              {/* Cetak */}
              <button
                className="flex items-center justify-center w-full bg-green-500 text-white px-2.5 py-1.5 rounded-md text-[11px] hover:bg-green-600 transition-colors"
                onClick={() => openCetak(student)}
              >
                <i className="fas fa-print mr-1.5 text-[10px]"></i> Cetak
              </button>

              {/* Edit */}
              <button
                className="flex items-center justify-center w-full bg-amber-500 text-white px-2.5 py-1.5 rounded-md text-[11px] hover:bg-amber-600 transition-colors"
                onClick={() => onEdit(student)}
              >
                <i className="fas fa-edit mr-1.5 text-[10px]"></i> Edit
              </button>

              {/* Hapus */}
              <button
                className="flex items-center justify-center w-full bg-red-500 text-white px-2.5 py-1.5 rounded-md text-[11px] hover:bg-red-600 transition-colors"
                onClick={() => onDelete(student)}
              >
                <i className="fas fa-trash-alt mr-1.5 text-[10px]"></i> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
