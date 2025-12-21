"use client";
import React from "react";

export default function TabsBukti({
  form,
  claim,
  poinBadge,
  badgeClass,
  handleFileChange,
}) {
  return (
    <div className="space-y-4">
      {/* ===============================
          POIN KEGIATAN
         =============================== */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-star mr-2 text-blue-600"></i>
          Poin Kegiatan
        </h4>

        <div className="flex justify-center">
          <div
            className={`px-5 py-3 rounded-full text-base font-bold shadow-lg ${badgeClass} flex items-center gap-2`}
          >
            <i className="fas fa-star"></i>
            <span>{poinBadge} Poin</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          Poin akan diberikan setelah verifikasi admin
        </p>
      </div>

      {/* ===============================
          BUKTI KEGIATAN
         =============================== */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-file-upload mr-2 text-blue-600"></i>
          Bukti Kegiatan
        </h4>

        <div className="space-y-4">
          {/* UPLOAD FILE BARU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti Baru <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              name="bukti_kegiatan"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600 
                file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 
                file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                hover:file:bg-blue-100 transition-colors"
              autoComplete="off"
            />

            <p className="text-xs text-gray-500 mt-2">
              Format: JPG, PNG, PDF (Maks. 5MB). <br />
              <span className="text-red-600 font-medium">
                Wajib upload ulang saat revisi.
              </span>
            </p>
          </div>

          {/* ===============================
              PREVIEW BUKTI LAMA (DRIVE)
             =============================== */}
          {claim?.bukti_file_id && !form.bukti_kegiatan && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h5 className="font-medium text-amber-800 mb-2 flex items-center text-sm">
                <i className="fas fa-history mr-2"></i>
                Bukti Saat Ini
              </h5>

              <div className="flex items-center gap-2">
                <i className="fas fa-cloud text-amber-600"></i>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/klaim/${claim.id}/bukti`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Lihat Bukti (Google Drive)
                </a>
              </div>
            </div>
          )}

          {/* ===============================
              PREVIEW FILE BARU
             =============================== */}
          {form.bukti_kegiatan instanceof File && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h5 className="font-medium text-green-800 mb-2 flex items-center text-sm">
                <i className="fas fa-check-circle mr-2"></i>
                File Baru
              </h5>

              <div className="flex items-center gap-3">
                {form.bukti_kegiatan.type.startsWith("image/") ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(form.bukti_kegiatan)}
                      alt="Preview Bukti Baru"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {form.bukti_kegiatan.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(form.bukti_kegiatan.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-file text-gray-500 text-xl"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {form.bukti_kegiatan.name}
                      </p>
                      <p className="text-xs text-gray-500">File dokumen</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
