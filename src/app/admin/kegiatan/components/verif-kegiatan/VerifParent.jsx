"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/components/Toats";

import NavTabs from "./NavTabs";
import TabsInfo from "./TabsInfo";
import TabsBukti from "./TabsBukti";

export default function VerifParent({ isOpen, onClose, claim, onSaveStatus }) {
  const { addToast } = useToast();
  const modalRef = useRef(null);

  const [pdfError, setPdfError] = useState(false);
  const [activeTab, setActiveTab] = useState("informasi");
  const [status, setStatus] = useState("Diajukan");
  const [catatan, setCatatan] = useState("");
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mahasiswa = claim?.mahasiswa || {};
  const master = claim?.masterPoin || {};
  const kegiatan = claim || {};
  const dbStatus = claim?.status;

  const isRevisiDone =
    dbStatus === "Revisi" &&
    !!claim?.catatan_revisi &&
    claim.catatan_revisi.trim() !== "";

  /* =================== RESPONSIVE DETECTION =================== */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* =================== STATUS LOGIC =================== */
  const finalAdmin = ["Disetujui", "Ditolak"];
  const statusEditable = !finalAdmin.includes(dbStatus);

  const validTransitions = {
    Diajukan: ["Revisi", "Disetujui", "Ditolak"],
    "Diajukan ulang": ["Revisi", "Disetujui", "Ditolak"],
    Revisi: ["Disetujui", "Ditolak"],
    Ditolak: ["Revisi"],
    Disetujui: [],
  };

  const statusAllowed = validTransitions[dbStatus] || [];

  const statusAll = [
    {
      label: "Revisi",
      value: "Revisi",
      color: "bg-amber-100 text-amber-700 border border-amber-200",
    },
    {
      label: "Disetujui",
      value: "Disetujui",
      color: "bg-green-100 text-green-700 border border-green-200",
    },
    {
      label: "Ditolak",
      value: "Ditolak",
      color: "bg-red-100 text-red-700 border border-red-200",
    },
  ];

  const statusOptions = statusAll.filter((s) =>
    statusAllowed.includes(s.value)
  );

  const selectedColor =
    statusAll.find((opt) => opt.value === status)?.color ||
    "bg-gray-100 text-gray-700";

  /* =================== CLICK OUTSIDE =================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* =================== SYNC STATUS =================== */
  useEffect(() => {
    if (isOpen && claim) {
      setStatus(claim.status);
      setCatatan(claim.catatan_revisi || "");
      setPdfError(false);
      setActiveTab("informasi");
    }
  }, [isOpen, claim]);

  if (!isOpen || !claim) return null;

  /* =================== SAVE STATUS =================== */
  const handleSave = async () => {
    const statusSame = status === dbStatus;

    if (statusSame) {
      addToast({ message: "Status tidak berubah.", type: "warning" });
      return;
    }

    if ((status === "Revisi" || status === "Ditolak") && !catatan.trim()) {
      addToast({
        message: "Catatan wajib diisi untuk status Revisi atau Ditolak!",
        type: "error",
      });
      return;
    }

    try {
      setSaving(true);
      await onSaveStatus(claim.id, status, catatan);

      addToast({
        message: `Status berhasil diperbarui menjadi "${status}"`,
        type: "success",
      });

      onClose();
    } catch (err) {
      addToast({ message: "Gagal memperbarui status!", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  /* =================== FILE URL =================== */
  const getFileUrl = (filename) => {
    if (!filename) return null;
    const base = process.env.NEXT_PUBLIC_API_URL;

    if (filename.startsWith("http")) return filename;
    if (filename.startsWith("/")) return base + filename;

    return `${base}/uploads/${filename}`;
  };

  /* =================== FILE PREVIEW =================== */
  const renderBuktiKegiatan = () => {
    const klaimId = kegiatan.id;

    if (!klaimId) {
      return (
        <div className="bg-gray-50 border rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500">Tidak ada bukti kegiatan</p>
        </div>
      );
    }

    const base = process.env.NEXT_PUBLIC_API_URL;
    const url = `/api/proxy/klaim/${klaimId}/bukti`;

    const handleOpenInNewTab = () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `bukti-klaim-${klaimId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-4">
        {/* INFO */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm border">
              <i className="fas fa-file text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Bukti Kegiatan
              </p>
              <p className="text-xs text-gray-500">
                File tersimpan aman (Google Drive)
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleOpenInNewTab}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Buka
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        {!isMobile && (
          <iframe src={url} className="w-full h-[420px] border rounded-lg" />
        )}

        {isMobile && (
          <p className="text-sm text-gray-500 text-center">
            Preview tersedia di desktop
          </p>
        )}
      </div>
    );
  };


  /* =================== CATATAN CHANGE =================== */
  const handleCatatanChange = (e) => setCatatan(e.target.value.toUpperCase());

  /* =================== RENDER =================== */
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden 
        border border-gray-200 flex flex-col"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-info-circle text-base sm:text-lg"></i>
              Detail Klaim Kegiatan
            </h3>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 sm:p-2 rounded-lg hover:bg-white/20"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* TABS */}
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30">
          {activeTab === "informasi" && (
            <TabsInfo
              mahasiswa={mahasiswa}
              kegiatan={kegiatan}
              master={master}
              status={status}
              selectedColor={selectedColor}
              statusEditable={statusEditable}
              statusOptions={statusOptions}
              catatan={catatan}
              handleCatatanChange={handleCatatanChange}
              setStatus={setStatus}
              isRevisiDone={isRevisiDone}
            />
          )}

          {activeTab === "bukti" && (
            <TabsBukti renderBuktiKegiatan={renderBuktiKegiatan} />
          )}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500 flex items-center mb-2 sm:mb-0">
            <i className="fas fa-info-circle mr-1"></i>
            Tab: {activeTab === "informasi" ? "Informasi" : "Bukti Kegiatan"}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center justify-center"
            >
              <i className="fas fa-times mr-2"></i>
              Tutup
            </button>

            {statusEditable && !isRevisiDone && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 text-sm font-medium transition-colors shadow-sm flex items-center justify-center disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Simpan Perubahan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

VerifParent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  claim: PropTypes.object,
  onSaveStatus: PropTypes.func,
};
