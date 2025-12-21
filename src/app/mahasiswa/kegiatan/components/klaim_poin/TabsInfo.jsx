"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsInfo({
  formData,
  masterPoin,
  setFormData,
  poinBadge,
  badgeClass,
  getBadgeClass,
}) {
  return (
    <div className="space-y-4">
      {/* Data Mahasiswa */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-user mr-2 text-blue-600"></i>
          Data Mahasiswa
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIM
            </label>
            <input
              type="text"
              value={formData.nim}
              readOnly
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 text-sm uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.nama}
              readOnly
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 text-sm uppercase"
            />
          </div>
        </div>
      </div>

      {/* Pilih Kegiatan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-tasks mr-2 text-blue-600"></i>
          Pilih Kegiatan
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kegiatan & Posisi
            </label>

            <select
              value={formData.masterpoin_id}
              onChange={(e) => {
                const id = e.target.value;
                const selected = masterPoin.find((mp) => mp.id_poin == id);

                // 🔥 FIELD YANG BENAR DARI DATABASE
                const poin = selected?.bobot_poin || 0;

                // update form
                setFormData((prev) => ({
                  ...prev,
                  masterpoin_id: id,
                  poin: poin,
                }));

                // update badge color
                getBadgeClass(poin);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">-- Pilih Jenis Kegiatan --</option>
              {masterPoin.map((mp) => (
                <option key={mp.id_poin} value={mp.id_poin}>
                  {mp.jenis_kegiatan} — {mp.posisi}
                </option>
              ))}
            </select>
          </div>

          {/* Badge Poin */}
          <div className="flex justify-center">
            <div
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${badgeClass} flex items-center gap-2`}
            >
              <i className="fas fa-star"></i>
              <span>{formData.poin} Poin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  masterPoin: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
  poinBadge: PropTypes.number.isRequired,
  badgeClass: PropTypes.string.isRequired,
  getBadgeClass: PropTypes.func.isRequired,
};
