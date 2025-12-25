"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/api/axios";

// IMPORT TAB COMPONENTS
import TabsNav from "./TabsNav";
import TabsInfo from "./TabsInfo";
import TabsBukti from "./TabsBukti";
import TabsPreview from "./TabsPreview";

export default function EditParent({ onClose, claim, onUpdated }) {
  const [form, setForm] = useState({
    periode_pengajuan: "",
    tanggal_pengajuan: "",
    rincian_acara: "",
    tingkat: "",
    tempat: "",
    tanggal_pelaksanaan: "",
    mentor: "",
    bukti_kegiatan: null,
    catatan: "",
  });

  const [poinBadge, setPoinBadge] = useState(0);
  const [badgeClass, setBadgeClass] = useState("bg-gray-300 text-gray-900");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("informasi");

  const modalRef = useRef(null);

  // Dropdown Tingkat
  const tingkatOptions = [
    { value: "", label: "Pilih Tingkat" },
    { value: "JURUSAN", label: "JURUSAN" },
    { value: "KABUPATEN", label: "KABUPATEN" },
    { value: "PROVINSI", label: "PROVINSI" },
    { value: "NASIONAL", label: "NASIONAL" },
    { value: "INTERNASIONAL", label: "INTERNASIONAL" },
  ];

  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  // Load claim data
  useEffect(() => {
    if (claim) {
      const p = claim.poin || 0;
      setPoinBadge(p);
      setBadgeClass(getBadgeClass(p));

      setForm({
        periode_pengajuan: claim.periode_pengajuan || "",
        tanggal_pengajuan: claim.tanggal_pengajuan?.split("T")[0] || "",
        rincian_acara: claim.rincian_acara || "",
        tingkat: claim.tingkat || "",
        tempat: claim.tempat || "",
        tanggal_pelaksanaan: claim.tanggal_pelaksanaan?.split("T")[0] || "",
        mentor: claim.mentor || "",
        bukti_kegiatan: null, // 🔥 reset file lama
        catatan: claim.catatan || "",
      });
    }
  }, [claim]);

  // Klik di luar modal → tutup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Uppercase
  const handleUppercaseChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  // Normal text
  const handleNormalChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // File
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ===============================
  // 🔥 SUBMIT FORM (FIX UTAMA)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔥 WAJIB UPLOAD FILE BARU SAAT REVISI
    if (claim.status === "Revisi" && !(form.bukti_kegiatan instanceof File)) {
      alert("Wajib upload bukti baru saat revisi");
      setActiveTab("bukti");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const allowed = [
      "periode_pengajuan",
      "tanggal_pengajuan",
      "rincian_acara",
      "tingkat",
      "tempat",
      "tanggal_pelaksanaan",
      "mentor",
    ];

    allowed.forEach((key) => {
      if (form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    if (form.bukti_kegiatan instanceof File) {
      formData.append("bukti_kegiatan", form.bukti_kegiatan);
    }

    formData.append("status", "Diajukan ulang");
    formData.append("catatan", form.catatan || "");

    try {
      await api.put(`/klaim/${claim.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  if (!claim) return null;
  if (claim.status !== "Revisi") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black/80">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden 
        border border-gray-200 flex flex-col animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-edit text-lg"></i>
              Perbaiki Kegiatan
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
              title="Tutup (ESC)"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30"
          autoComplete="off"
        >
          <div className="p-6 space-y-6">
            {/* Banner Warning */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-amber-600 text-lg"></i>
                <p className="text-sm font-medium text-amber-800">
                  Status saat ini: <span className="font-bold">Revisi</span> —
                  Silakan perbaiki data berikut
                </p>
              </div>
            </div>

            {/* TAB CONTENT */}
            {activeTab === "informasi" && (
              <TabsInfo
                form={form}
                handleUppercaseChange={handleUppercaseChange}
                handleNormalChange={handleNormalChange}
                handleSelectChange={handleSelectChange}
                tingkatOptions={tingkatOptions}
              />
            )}

            {activeTab === "bukti" && (
              <TabsBukti
                form={form}
                claim={claim}
                poinBadge={poinBadge}
                badgeClass={badgeClass}
                handleFileChange={handleFileChange}
              />
            )}

            {activeTab === "review" && <TabsPreview form={form} />}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-white">
            <div className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              Tab:{" "}
              {activeTab === "informasi"
                ? "Informasi"
                : activeTab === "bukti"
                ? "Bukti"
                : "Review"}
              <span className="ml-2 text-gray-400">
                • Klik luar modal untuk menutup
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 
                text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
                disabled={loading}
              >
                <i className="fas fa-times mr-2"></i>
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 
                text-white hover:from-blue-700 hover:to-indigo-800 text-sm font-medium 
                transition-colors shadow-sm flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Ajukan Ulang
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
