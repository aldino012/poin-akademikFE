"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsStatus({
  originalStatus,
  status,
  setStatus,
  statusOptions,
  selectedColor,
  originalIsFinal,
  shouldShowCatatan,
  catatanRevisi,
  setCatatanRevisi,
  statusDisabled,
  role,
}) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-flag mr-2 text-blue-600"></i>
          Status Klaim
        </h4>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div>
              <p className="text-xs text-gray-600">Status Saat Ini</p>
              <p
                className={`text-sm font-semibold px-3 py-1.5 rounded-full inline-block ${selectedColor}`}
              >
                {originalStatus}
              </p>
            </div>

            {originalIsFinal && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <i className="fas fa-lock"></i>
                Status Final
              </div>
            )}
          </div>

          {/* Status Update */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubah Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={statusDisabled}
                className={`w-full px-3 py-2.5 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${selectedColor} ${
                  statusDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option value={originalStatus} disabled>
                  {originalStatus} (Saat ini)
                </option>

                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Catatan untuk Revisi/Ditolak (Admin only) */}
            {shouldShowCatatan && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-comment-dots mr-2 text-amber-600"></i>
                  Catatan {status === "Revisi" ? "Revisi" : "Penolakan"}
                </label>

                <textarea
                  value={catatanRevisi}
                  onChange={(e) => setCatatanRevisi(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none bg-white"
                  placeholder="Masukkan catatan untuk mahasiswa..."
                />

                <p className="text-xs text-amber-600 mt-2">
                  <i className="fas fa-info-circle mr-1"></i>
                  Catatan ini akan dilihat oleh mahasiswa
                </p>
              </div>
            )}

            {/* Role Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-user-shield mr-2 text-blue-600"></i>
                <span>
                  Role saat ini:{" "}
                  <span className="font-semibold text-blue-700">{role}</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {role === "admin"
                  ? "Anda dapat mengubah status klaim ini"
                  : "Hanya admin yang dapat mengubah status klaim"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsStatus.propTypes = {
  originalStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  statusOptions: PropTypes.array.isRequired,
  selectedColor: PropTypes.string.isRequired,
  originalIsFinal: PropTypes.bool.isRequired,
  shouldShowCatatan: PropTypes.bool.isRequired,
  catatanRevisi: PropTypes.string.isRequired,
  setCatatanRevisi: PropTypes.func.isRequired,
  statusDisabled: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};
