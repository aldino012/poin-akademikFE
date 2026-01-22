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
  const isAdmin = role === "admin";

  return (
    <div className="p-6 space-y-6">
      {/* --- SECTION 1: STATUS SAAT INI (Tampil untuk Semua) --- */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-flag mr-2 text-blue-600"></i>
          Status Klaim
        </h4>

        {/* Status Badge Display */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Status Saat Ini</p>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold px-3 py-1.5 rounded-full inline-block shadow-sm ${selectedColor}`}
              >
                {originalStatus}
              </span>

              {/* Lock Icon jika Final */}
              {originalIsFinal && (
                <span className="text-gray-400" title="Status Final">
                  <i className="fas fa-lock text-xs"></i>
                </span>
              )}
            </div>
          </div>

          {originalIsFinal && (
            <div className="hidden sm:flex bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-green-700 border border-green-200 items-center gap-1">
              <i className="fas fa-check-circle"></i>
              Final
            </div>
          )}
        </div>
      </div>

      {/* --- SECTION 2: FORM UBAH STATUS (Hanya Admin) --- */}
      {isAdmin ? (
        <div className="space-y-4 animate-fade-in">
          {/* Input Select Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubah Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={statusDisabled}
                className={`w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-colors cursor-pointer appearance-none bg-white ${selectedColor} ${
                  statusDisabled
                    ? "opacity-60 cursor-not-allowed bg-gray-100"
                    : ""
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
              {/* Custom Chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>

            {statusDisabled && (
              <p className="text-xs text-gray-500 mt-2 ml-1">
                <i className="fas fa-lock mr-1"></i>
                Status sudah final, tidak dapat diubah.
              </p>
            )}
          </div>

          {/* Textarea Catatan (Hanya muncul jika Admin memilih Revisi/Tolak) */}
          {shouldShowCatatan && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-slide-down">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-comment-dots mr-2 text-amber-600"></i>
                Catatan {status === "Revisi" ? "Revisi" : "Penolakan"}
              </label>

              <textarea
                value={catatanRevisi}
                onChange={(e) => setCatatanRevisi(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 text-sm border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none bg-white placeholder-gray-400"
                placeholder={`Jelaskan alasan ${status === "Revisi" ? "revisi" : "penolakan"} kepada mahasiswa...`}
              />

              <p className="text-xs text-amber-700 mt-2 flex items-center">
                <i className="fas fa-info-circle mr-1.5"></i>
                Catatan ini wajib diisi dan akan terbaca oleh mahasiswa.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* --- SECTION 3: TAMPILAN MAHASISWA (Tanpa Input) --- */
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">
            <i className="fas fa-info-circle mr-2 text-gray-400"></i>
            Hanya admin yang dapat mengubah status klaim ini.
          </p>
        </div>
      )}
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
