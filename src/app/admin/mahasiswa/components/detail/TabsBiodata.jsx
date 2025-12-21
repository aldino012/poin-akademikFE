"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TabsBiodata({ student }) {
  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ======================== FOTO PROFIL + POIN ======================== */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative">
            <img
              src={
                student.foto_file_id
                  ? `${process.env.NEXT_PUBLIC_API_URL}/api/mahasiswa/foto/${
                      student.foto_file_id
                    }?t=${student.updated_at || Date.now()}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      student.nama_mhs
                    )}&background=3B82F6&color=fff`
              }
              alt={student.nama_mhs}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.nama_mhs
                )}&background=3B82F6&color=fff`;
              }}
            />

            {/* Badge Poin */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-white">
                <i className="fas fa-star text-sm"></i>
                <span className="font-bold text-sm">
                  {student.total_poin || 0}
                </span>
                <span className="text-xs font-medium">Poin</span>
              </div>
            </div>
          </div>

          {/* Info Poin */}
          <div className="mt-12 bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-full">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
              <i className="fas fa-chart-line mr-2 text-blue-600"></i>
              Progress Poin
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Poin Terkumpul</span>
                <span className="font-bold text-blue-600">
                  {student.total_poin || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target Poin</span>
                <span className="font-semibold text-gray-700">
                  {student.target_poin || 50}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      ((student.total_poin || 0) /
                        (student.target_poin || 50)) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                {Math.round(
                  ((student.total_poin || 0) / (student.target_poin || 50)) *
                    100
                )}
                % dari target
              </div>
            </div>
          </div>
        </div>

        {/* ======================== BIODATA ======================== */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
              <i className="fas fa-id-card mr-2 text-blue-600"></i>
              Informasi Pribadi
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NIM */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  NIM
                </label>
                <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                  {student.nim || "-"}
                </p>
              </div>

              {/* Nama */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Nama Lengkap
                </label>
                <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                  {student.nama_mhs || "-"}
                </p>
              </div>

              {/* Prodi */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Program Studi
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  {student.prodi || "-"}
                </p>
              </div>

              {/* Angkatan */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Angkatan
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  {student.angkatan || "-"}
                </p>
              </div>

              {/* Tempat lahir */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Tempat Lahir
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  {student.tempat_lahir || "-"}
                </p>
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Tanggal Lahir
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  {student.tgl_lahir || "-"}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200 break-all">
                  {student.email || "-"}
                </p>
              </div>

              {/* Alamat */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Alamat
                </label>
                <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[60px]">
                  {student.alamat || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsBiodata.propTypes = {
  student: PropTypes.object.isRequired,
};
