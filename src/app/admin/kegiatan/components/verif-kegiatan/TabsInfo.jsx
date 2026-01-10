"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsInfo({
  mahasiswa,
  kegiatan,
  master,
  status,
  statusEditable,
  statusOptions,
  selectedColor,
  catatan,
  handleCatatanChange,
  catatanEditable, 
  setStatus,
}) {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* ================= IDENTITAS MAHASISWA ================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm">
          <i className="fas fa-user-graduate mr-2 text-blue-600"></i>
          Identitas Mahasiswa
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              NIM
            </label>
            <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
              {mahasiswa.nim}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Nama Lengkap
            </label>
            <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
              {mahasiswa.nama_mhs}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Angkatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {mahasiswa.angkatan}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Program Studi
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {mahasiswa.prodi}
            </p>
          </div>
        </div>
      </div>

      {/* ================= INFORMASI KEGIATAN ================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm">
          <i className="fas fa-calendar-check mr-2 text-blue-600"></i>
          Informasi Kegiatan
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tanggal Pengajuan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tanggal_pengajuan}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tanggal Pelaksanaan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tanggal_pelaksanaan}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tingkat
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tingkat}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tempat
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tempat}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Kode Kegiatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {master.kode_keg}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Jenis Kegiatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {master.jenis_kegiatan}
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Rincian Acara
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[60px]">
              {kegiatan.rincian_acara}
            </p>
          </div>
        </div>
      </div>

      {/* ================= STATUS KLAIM ================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm">
          <i className="fas fa-flag mr-2 text-blue-600"></i>
          Status Klaim
        </h4>

        <div className="space-y-4">
          {/* Status Saat Ini */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 gap-2">
            <div>
              <p className="text-xs text-gray-600">Status Saat Ini</p>
              <p
                className={`text-sm font-semibold px-3 py-1.5 rounded-full inline-block ${selectedColor}`}
              >
                {status}
              </p>
            </div>

            {!statusEditable && (
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 self-start sm:self-auto">
                <i className="fas fa-lock"></i>
                Status Final
              </div>
            )}
          </div>

          {/* Ubah Status */}
          {statusEditable ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubah Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium ${selectedColor}`}
                >
                  <option value={status} disabled>
                    {status} (Saat ini)
                  </option>

                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {(status === "Revisi" || status === "Ditolak") && (
                <div className="bg-gray-50 border border-gray-900 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <i className="fas fa-comment-dots mr-2 text-gray-800"></i>
                    Catatan {status === "Revisi" ? "Revisi" : "Penolakan"}
                  </label>

                  <textarea
                    value={catatan}
                    readOnly={!catatanEditable}
                    onChange={catatanEditable ? handleCatatanChange : undefined}
                    rows={4}
                    className={`w-full px-3 py-2.5 text-sm border rounded-lg resize-none
        ${
          catatanEditable
            ? "border-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
            : "border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
        }`}
                    placeholder="Masukkan catatan untuk mahasiswa..."
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <i className="fas fa-lock text-gray-400 text-2xl mb-2"></i>
              <p className="text-sm text-gray-600">
                Status sudah final dan tidak dapat diubah
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

TabsInfo.propTypes = {
  mahasiswa: PropTypes.object.isRequired,
  kegiatan: PropTypes.object.isRequired,
  master: PropTypes.object.isRequired,

  status: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  statusEditable: PropTypes.bool.isRequired,
  statusOptions: PropTypes.array.isRequired,

  catatan: PropTypes.string.isRequired,
  handleCatatanChange: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};
