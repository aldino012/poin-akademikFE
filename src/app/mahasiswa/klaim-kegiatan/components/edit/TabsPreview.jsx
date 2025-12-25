"use client";
import React from "react";

export default function TabsPreview({ form }) {
  return (
    <div className="space-y-4">
      {/* Catatan dari Admin */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-comment-alt mr-2 text-red-600"></i>
          Catatan dari Admin
        </h4>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <textarea
            readOnly
            value={form.catatan}
            className="w-full bg-transparent text-gray-700 text-sm border-0 focus:ring-0 resize-none"
            rows={4}
            placeholder="Tidak ada catatan dari admin"
            autoComplete="off"
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Catatan ini membantu Anda untuk memperbaiki data yang kurang tepat
        </p>
      </div>

      {/* Ringkasan Perubahan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-info-circle mr-2 text-blue-600"></i>
          Ringkasan Perubahan
        </h4>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-500"></i>
            <span>
              Status akan berubah menjadi{" "}
              <span className="font-semibold">"Diajukan ulang"</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fas fa-clock text-amber-500"></i>
            <span>Verifikasi ulang membutuhkan waktu 1-3 hari kerja</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fas fa-file-check text-blue-500"></i>
            <span>Pastikan semua data sudah benar sebelum mengirim</span>
          </div>
        </div>
      </div>
    </div>
  );
}
