"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TabsLainnya({ student }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= INFORMASI KARIR ================= */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
            <i className="fas fa-briefcase mr-2 text-blue-600"></i>
            Informasi Karir
          </h4>

          <div className="space-y-4">
            {/* Pekerjaan */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Pekerjaan
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.pekerjaan || "-"}
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Jenis Kelamin
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.jenis_kelamin === "P"
                  ? "PEREMPUAN"
                  : student.jenis_kelamin === "L"
                  ? "LAKI-LAKI"
                  : "-"}
              </p>
            </div>

            {/* Asal Sekolah */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Asal Sekolah
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.asal_sekolah || "-"}
              </p>
            </div>

            {/* Tahun Lulus */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Tahun Lulus
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.thn_lulus || "-"}
              </p>
            </div>

            {/* Tempat Lahir (dari original code tab Lainnya) */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Tempat Lahir
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.tempat_lahir || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= STATISTIK AKADEMIK ================= */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
            <i className="fas fa-chart-bar mr-2 text-blue-600"></i>
            Statistik Akademik
          </h4>

          <div className="space-y-4">
            {/* Total Poin */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Poin</span>
              <span className="font-bold text-blue-600">
                {student.total_poin || 0}
              </span>
            </div>

            {/* Target Poin */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Target Poin</span>
              <span className="font-semibold text-gray-700">
                {student.target_poin || 50}
              </span>
            </div>

            {/* Progress */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-green-600">
                {Math.round(
                  ((student.total_poin || 0) / (student.target_poin || 50)) *
                    100
                )}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsLainnya.propTypes = {
  student: PropTypes.object.isRequired,
};
