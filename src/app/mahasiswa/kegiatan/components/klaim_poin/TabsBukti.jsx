"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsBukti({ formData, setFormData, masterPoin }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
        <i className="fas fa-file-upload mr-2 text-blue-600"></i>
        Upload Bukti Kegiatan
      </h4>

      <div className="space-y-4">
        {/* Upload Bukti */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Bukti Kegiatan
          </label>

          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bukti_kegiatan: e.target.files[0],
              }))
            }
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            required
          />

          <p className="text-xs text-gray-500 mt-2">
            Unggah file bukti (PDF, JPG, PNG) maksimal 5MB
          </p>
        </div>

        {/* Info Penting */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-800 mb-2 flex items-center text-sm">
            <i className="fas fa-info-circle mr-2"></i>
            Informasi Penting
          </h5>

          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
              Pastikan file bukti jelas dan dapat dibaca
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
              Sertifikat, foto kegiatan, atau dokumen resmi lainnya
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
              Proses verifikasi membutuhkan waktu 1-3 hari kerja
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-medium text-green-800 mb-3 flex items-center text-sm">
            <i className="fas fa-clipboard-check mr-2"></i>
            Ringkasan Pengajuan
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-600">Jenis Kegiatan:</span>
              <p className="font-medium text-gray-800">
                {masterPoin.find((mp) => mp.id_poin == formData.masterpoin_id)
                  ?.jenis_kegiatan || "-"}
              </p>
            </div>

            <div>
              <span className="text-gray-600">Poin:</span>
              <p className="font-bold text-blue-600">{formData.poin} Poin</p>
            </div>

            <div>
              <span className="text-gray-600">Tanggal Pengajuan:</span>
              <p className="font-medium text-gray-800">
                {formData.tanggal_pengajuan || "-"}
              </p>
            </div>

            <div>
              <span className="text-gray-600">Tanggal Pelaksanaan:</span>
              <p className="font-medium text-gray-800">
                {formData.tanggal_pelaksanaan || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsBukti.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  masterPoin: PropTypes.array.isRequired,
};
