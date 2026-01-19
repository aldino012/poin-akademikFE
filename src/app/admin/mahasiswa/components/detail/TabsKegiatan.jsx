"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TabsKegiatan({
  kegiatanData,
  selectedKategori,
  setSelectedKategori,
}) {
  // ========================
  // RENDER CONTENT (3 MODE)
  // ========================
  const renderContent = () => {
    // ---------- ORGANISASI ----------
    if (selectedKategori === "organisasi") {
      return (
        <div className="space-y-4">
          {kegiatanData.organisasi?.length > 0 ? (
            <div className="space-y-3">
              {kegiatanData.organisasi.map((org) => (
                <div
                  key={org.id}
                  className="p-4 bg-white rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">
                        {org.rincianAcara}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
                        <span className="inline-flex items-center">
                          <i className="fas fa-calendar text-blue-500 mr-1.5"></i>
                          {org.tanggal}
                        </span>

                        <span className="inline-flex items-center">
                          <i className="fas fa-user-tag text-indigo-500 mr-1.5"></i>
                          {org.posisi}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
              <i className="fas fa-users text-gray-300 text-3xl mb-3"></i>
              <p className="text-sm text-gray-500 font-medium">
                Belum ada pengalaman organisasi
              </p>
            </div>
          )}
        </div>
      );
    }

    // ---------- PRESTASI ----------
    if (selectedKategori === "prestasi") {
      return (
        <div className="space-y-4">
          {kegiatanData.prestasi?.length > 0 ? (
            <div className="space-y-3">
              {kegiatanData.prestasi.map((comp) => (
                <div
                  key={comp.id}
                  className="p-4 bg-white rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">
                        {comp.rincianAcara}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
                        <span className="inline-flex items-center">
                          <i className="fas fa-map-marker-alt text-blue-500 mr-1.5"></i>
                          Tingkat: {comp.tingkat}
                        </span>

                        <span className="inline-flex items-center">
                          <i className="fas fa-star text-amber-500 mr-1.5"></i>
                          {comp.poin} Poin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
              <i className="fas fa-trophy text-gray-300 text-3xl mb-3"></i>
              <p className="text-sm text-gray-500 font-medium">
                Belum ada prestasi
              </p>
            </div>
          )}
        </div>
      );
    }

    // ---------- SEMUA KEGIATAN ----------
    return (
      <div className="space-y-3">
        {kegiatanData.kegiatan?.length > 0 ? (
          kegiatanData.kegiatan.map((act) => (
            <div
              key={act.id}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
            >
              <div className="font-semibold text-gray-800 text-sm">
                {act.rincianAcara}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
                <span className="inline-flex items-center">
                  <i className="fas fa-calendar text-blue-500 mr-1.5"></i>
                  {act.tanggal}
                </span>

                <span className="inline-flex items-center">
                  <i className="fas fa-star text-amber-500 mr-1.5"></i>
                  {act.poin} poin
                </span>

                <span className="inline-flex items-center">
                  <i className="fas fa-tag text-indigo-500 mr-1.5"></i>
                  {act.jenis}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
            <i className="fas fa-list-check text-gray-300 text-3xl mb-3"></i>
            <p className="text-sm text-gray-500 font-medium">
              Tidak ada kegiatan
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-list-check mr-2 text-blue-600"></i>
          Kegiatan Mahasiswa
        </h4>

        {/* ================= SUB-TABS ================= */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedKategori === "organisasi"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedKategori("organisasi")}
          >
            <i className="fas fa-users mr-2"></i>
            Organisasi ({kegiatanData.organisasi?.length || 0})
          </button>

          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedKategori === "prestasi"
                ? "bg-amber-100 text-amber-700 border border-amber-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedKategori("prestasi")}
          >
            <i className="fas fa-trophy mr-2"></i>
            Prestasi ({kegiatanData.prestasi?.length || 0})
          </button>

          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedKategori === "semua"
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedKategori("semua")}
          >
            <i className="fas fa-list mr-2"></i>
            Semua ({kegiatanData.kegiatan?.length || 0})
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        {renderContent()}
      </div>
    </div>
  );
}

TabsKegiatan.propTypes = {
  kegiatanData: PropTypes.object.isRequired,
  selectedKategori: PropTypes.string.isRequired,
  setSelectedKategori: PropTypes.func.isRequired,
};
