"use client";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Import sub-components
import TabsNav from "./TabsNav";
import TabsBiodata from "./TabsBiodata";
import TabsKegiatan from "./TabsKegiatan";
import TabsKontak from "./TabsKontak";
import TabsLainnya from "./TabsLainnya";
import api from "@/api/axios";

export default function DetailParent({ isOpen, onClose, student }) {
  const [activeTab, setActiveTab] = useState("biodata");
  const [selectedKategori, setSelectedKategori] = useState("organisasi");
  const [kegiatanData, setKegiatanData] = useState({
    organisasi: [],
    prestasi: [],
    kegiatan: [],
  });

  const modalRef = useRef(null);

  // ==================================================
  // 🔥 NORMALIZER (KUNCI FIX DETAIL KEGIATAN)
  // ==================================================
  const normalizeKegiatan = (items = []) =>
    items.map((i) => ({
      id: i.id,
      namaKegiatan: i.nama_kegiatan, // 🔑 snake_case → camelCase
      tanggal: i.tanggal,
      poin: Number(i.poin || 0),

      // optional (biar TabsKegiatan aman)
      posisi: i.posisi || "-",
      jenis: i.jenis || "-",
      tingkat: i.tingkat || "-",
    }));

  // =======================
  // FETCH DATA KEGIATAN
  // =======================
  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const id = student?.id_mhs || student?.id;
        if (!id) return;

        const res = await api.get(`/mahasiswa/kegiatan/${id}`);
        const data = res.data;

        setKegiatanData({
          organisasi: normalizeKegiatan(data.organisasi || []),
          prestasi: normalizeKegiatan(data.prestasi || []),
          kegiatan: normalizeKegiatan(data.data || []), // 🔥 SEMUA
        });
      } catch (error) {
        console.error("Gagal memuat data kegiatan:", error);
      }
    };

    if (isOpen && activeTab === "kegiatan") {
      fetchKegiatan();
    }
  }, [isOpen, student, activeTab]);

  // =======================
  // CLOSE DARI LUAR MODAL
  // =======================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 flex flex-col"
      >
        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-user-graduate text-lg"></i>
              Detail Mahasiswa
            </h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* ================= NAVIGATION TABS ================= */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30">
          {activeTab === "biodata" && <TabsBiodata student={student} />}

          {activeTab === "kegiatan" && (
            <TabsKegiatan
              kegiatanData={kegiatanData}
              selectedKategori={selectedKategori}
              setSelectedKategori={setSelectedKategori}
            />
          )}

          {activeTab === "kontak" && <TabsKontak student={student} />}

          {activeTab === "lainnya" && <TabsLainnya student={student} />}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500 flex items-center">
            <i className="fas fa-info-circle mr-1"></i>

            {activeTab === "kegiatan"
              ? `Kategori: ${
                  selectedKategori === "organisasi"
                    ? "Organisasi"
                    : selectedKategori === "prestasi"
                    ? "Prestasi"
                    : "Semua Kegiatan"
                }`
              : `Tab: ${
                  activeTab === "biodata"
                    ? "Biodata"
                    : activeTab === "kontak"
                    ? "Kontak"
                    : "Lainnya"
                }`}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 transition-colors text-sm font-medium shadow-sm flex items-center"
          >
            <i className="fas fa-times mr-2"></i>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

DetailParent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
};
