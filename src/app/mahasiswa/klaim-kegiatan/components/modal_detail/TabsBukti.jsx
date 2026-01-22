"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TabsBukti({ kegiatan }) {
  const [pdfError, setPdfError] = useState(false);
  const [fileExists, setFileExists] = useState(true);

  // =====================================================
  // URL STREAM BUKTI (PRIVATE DRIVE VIA BACKEND)
  // =====================================================
  const getStreamUrl = () => {
    if (!kegiatan?.id || !kegiatan?.bukti_file_id) return null;
    return `/api/proxy/klaim/${kegiatan.id}/bukti`;
  };

  // =====================================================
  // CEK FILE ADA ATAU TIDAK
  // =====================================================
  const checkFileExistence = async () => {
    const url = getStreamUrl();
    if (!url) return setFileExists(false);

    try {
      const res = await fetch(url, { method: "HEAD" });
      setFileExists(res.ok);
    } catch (err) {
      setFileExists(false);
    }
  };

  useEffect(() => {
    checkFileExistence();
    setPdfError(false);
  }, [kegiatan?.id, kegiatan?.bukti_file_id]);

  const handleOpenFile = (e) => {
    e.preventDefault();
    const url = getStreamUrl();
    if (!url || !fileExists) return;
    window.open(url, "_blank");
  };

  const handlePdfError = () => {
    setPdfError(true);
  };

  // =====================================================
  // RENDER BUKTI KEGIATAN
  // =====================================================
  const renderBuktiKegiatan = () => {
    if (!kegiatan?.bukti_file_id || !fileExists) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <i className="fas fa-file-exclamation text-gray-300 text-3xl mb-3"></i>
          <p className="text-sm text-gray-500 font-medium">
            Tidak ada bukti kegiatan
          </p>
        </div>
      );
    }

    const streamUrl = getStreamUrl();

    return (
      <div className="space-y-4">
        {/* ===============================
            PREVIEW SECTION
        =============================== */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          {!pdfError ? (
            <iframe
              src={streamUrl}
              className="w-full h-64 border-0"
              title="Preview Bukti Kegiatan"
              onError={handlePdfError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
              <i className="fas fa-file-pdf text-red-300 text-4xl mb-3"></i>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Preview tidak dapat ditampilkan
              </p>
              <p className="text-xs text-gray-500">
                File mungkin tidak ditemukan. Silakan buka di tab baru.
              </p>
            </div>
          )}
        </div>

        {/* ===============================
            FILE INFO & ACTION
        =============================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-lock text-green-600"></i>
            <span className="font-medium truncate">
              Bukti Kegiatan (Private Drive)
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleOpenFile}
              disabled={!streamUrl || !fileExists}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                streamUrl && fileExists
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-external-link-alt"></i>
              Buka File
            </button>

            <a
              href={streamUrl || "#"}
              download
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                streamUrl && fileExists
                  ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (!streamUrl || !fileExists) e.preventDefault();
                e.stopPropagation();
              }}
            >
              <i className="fas fa-download"></i>
              Download
            </a>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================
  // RETURN UTAMA
  // =====================================================
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-file-upload mr-2 text-blue-600"></i>
          Bukti Kegiatan
        </h4>

        {renderBuktiKegiatan()}
      </div>
    </div>
  );
}

TabsBukti.propTypes = {
  kegiatan: PropTypes.object.isRequired,
};
