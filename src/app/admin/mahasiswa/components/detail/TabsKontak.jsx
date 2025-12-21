"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TabsKontak({ student }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= INFORMASI KONTAK ================= */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
            <i className="fas fa-phone mr-2 text-blue-600"></i>
            Informasi Kontak
          </h4>

          <div className="space-y-4">
            {/* Telepon Pribadi */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Telepon Pribadi
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.tlp_saya || "-"}
              </p>
            </div>

            {/* Telepon Rumah */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Telepon Rumah
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {student.tlp_rumah || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= INFORMASI TAMBAHAN ================= */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
            <i className="fas fa-info-circle mr-2 text-blue-600"></i>
            Informasi Tambahan
          </h4>

          <div className="space-y-4">
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
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Alamat
              </label>
              <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[80px]">
                {student.alamat || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsKontak.propTypes = {
  student: PropTypes.object.isRequired,
};
