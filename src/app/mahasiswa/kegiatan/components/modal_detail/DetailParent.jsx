"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import TabsNav from "./TabsNav";
import TabsInfo from "./TabsInfo";
import TabsBukti from "./TabsBukti";
import TabsStatus from "./TabsStatus";

import { useToast } from "@/components/Toats";

export default function DetailParent({
  isOpen,
  onClose,
  claim,
  onSaveStatus,
  role,
}) {
  const { addToast } = useToast();
  const modalRef = useRef(null);

  const [pdfError, setPdfError] = useState(false);
  const [activeTab, setActiveTab] = useState("informasi");

  const mahasiswa = claim?.mahasiswa || {};
  const master = claim?.masterPoin || {};
  const kegiatan = claim || {};

  const originalStatus = claim?.status || "Diajukan";
  const [status, setStatus] = useState(originalStatus);
  const [catatanRevisi, setCatatanRevisi] = useState(
    claim?.catatan_revisi || ""
  );
  const [saving, setSaving] = useState(false);

  // HANDLE CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  useEffect(() => {
    setStatus(claim?.status || "Diajukan");
    setCatatanRevisi(claim?.catatan_revisi || "");
    setPdfError(false);
  }, [claim]);

  if (!isOpen || !claim) return null;

  // STATUS DATA
  const statusAll = [
    {
      label: "Diajukan",
      value: "Diajukan",
      color: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    {
      label: "Revisi",
      value: "Revisi",
      color: "bg-amber-100 text-amber-700 border border-amber-200",
    },
    {
      label: "Diajukan ulang",
      value: "Diajukan ulang",
      color: "bg-indigo-100 text-indigo-700 border border-indigo-200",
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

  const getStatusOptions = () => {
    const allowedTransitions = {
      Diajukan: ["Revisi", "Disetujui", "Ditolak"],
      "Diajukan ulang": ["Revisi", "Disetujui", "Ditolak"],
      Revisi: ["Disetujui", "Ditolak"],
      Ditolak: ["Revisi", "Disetujui"],
      Disetujui: ["Revisi", "Ditolak"],
    };

    const allowed = allowedTransitions[status] || [];
    return statusAll.filter((item) => allowed.includes(item.value));
  };

  const statusOptions = getStatusOptions();
  const selectedColor =
    statusAll.find((opt) => opt.value === status)?.color ||
    "bg-gray-100 text-gray-700";
  const originalIsFinal =
    originalStatus === "Disetujui" || originalStatus === "Ditolak";

  const shouldShowCatatan =
    role === "admin" && (status === "Revisi" || status === "Ditolak");

  const statusDisabled = role !== "admin" || originalIsFinal;

  // SAVE STATUS
  const handleSave = async () => {
    if (shouldShowCatatan && !catatanRevisi.trim()) {
      addToast({
        message: "Catatan revisi wajib diisi jika status Revisi atau Ditolak.",
        type: "error",
      });
      return;
    }

    try {
      setSaving(true);

      await onSaveStatus(
        claim.id,
        status,
        shouldShowCatatan ? catatanRevisi : null
      );

      addToast({
        message: `Status klaim berhasil diperbarui menjadi "${status}".`,
        type: "success",
      });

      onClose();
    } catch (err) {
      console.error("SAVE STATUS ERROR:", err);
      addToast({ message: "Gagal menyimpan status.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-info-circle text-lg"></i>
              Detail Klaim Kegiatan
            </h3>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30">
          {activeTab === "informasi" && (
            <TabsInfo
              mahasiswa={mahasiswa}
              kegiatan={kegiatan}
              master={master}
            />
          )}

          {activeTab === "bukti" && <TabsBukti kegiatan={kegiatan} />}

          {activeTab === "status" && (
            <TabsStatus
              originalStatus={originalStatus}
              status={status}
              setStatus={setStatus}
              statusOptions={statusOptions}
              selectedColor={selectedColor}
              originalIsFinal={originalIsFinal}
              shouldShowCatatan={shouldShowCatatan}
              catatanRevisi={catatanRevisi}
              setCatatanRevisi={setCatatanRevisi}
              statusDisabled={statusDisabled}
              role={role}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
          >
            <i className="fas fa-times mr-2"></i>
            Tutup
          </button>

          {role === "admin" && !originalIsFinal && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
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
  );
}

DetailParent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  claim: PropTypes.object,
  onSaveStatus: PropTypes.func,
  role: PropTypes.string.isRequired,
};
