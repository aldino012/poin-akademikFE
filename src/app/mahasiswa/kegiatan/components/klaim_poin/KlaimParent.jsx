"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useToast } from "@/components/Toats";

import TabsNav from "./TabsNav";
import TabsInfo from "./TabsInfo";
import TabsDetail from "./TabsDetail";
import TabsBukti from "./TabsBukti";

export default function KlaimParent({ isOpen, onClose }) {
  const { addToast } = useToast();
  const modalRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [masterPoin, setMasterPoin] = useState([]);
  const [activeTab, setActiveTab] = useState("informasi-dasar");
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    mahasiswa_id: "",
    masterpoin_id: "",
    tanggal_pengajuan: new Date().toISOString().split("T")[0],
    rincian_acara: "",
    bukti_kegiatan: null,
    periode_pengajuan: "2025",
    tingkat: "Jurusan",
    tempat: "",
    tanggal_pelaksanaan: "",
    mentor: "",
    narasumber: "",
    poin: 0,
  });

  const [poinBadge, setPoinBadge] = useState(0);
  const [badgeClass, setBadgeClass] = useState("bg-gray-300 text-gray-900");

  // Handle click outside modal
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

  // Validasi form
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const requiredFields = [
      formData.masterpoin_id,
      formData.rincian_acara,
      formData.tempat,
      formData.tanggal_pelaksanaan,
      formData.tingkat,
    ];

    const isRequiredFilled = requiredFields.every(
      (field) => field && field.toString().trim() !== ""
    );

    const isFileUploaded = formData.bukti_kegiatan !== null;

    setIsFormValid(isRequiredFilled && isFileUploaded);
  };

  // Fetch user
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/auth/profile", {
        withCredentials: true,
      });

      const u = res.data.data;
      setUser(u);

      const formattedName = (u.name || u.nama_mhs || "").toUpperCase();

      setFormData((prev) => ({
        ...prev,
        nim: u.nim,
        nama: formattedName,
        mahasiswa_id: u.id_mhs,
      }));
    } catch (err) {
      console.log("ERR USER:", err);
    }
  };

  // Fetch master poin
  const fetchMasterPoin = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/masterpoin", {
        withCredentials: true,
      });

      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setMasterPoin(data || []);
    } catch (err) {
      console.log("ERR MASTER POIN:", err);
      setMasterPoin([]);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    Promise.all([fetchUser(), fetchMasterPoin()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [isOpen]);

  const getBadgeClass = (poin) => {
    if (poin >= 30) return setBadgeClass("bg-blue-600 text-white");
    if (poin >= 15) return setBadgeClass("bg-green-500 text-white");
    if (poin >= 5) return setBadgeClass("bg-yellow-400 text-gray-900");
    return setBadgeClass("bg-gray-300 text-gray-900");
  };

  const handleInputChange = (field, value) => {
    if (typeof value === "string") {
      value = value.toUpperCase();
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    if (!date) return;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setFormData((prev) => ({
      ...prev,
      [field]: formattedDate,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      addToast({
        message: "Harap lengkapi semua data yang diperlukan!",
        type: "error",
      });
      return;
    }

    try {
      const fd = new FormData();

      fd.append("mahasiswa_id", formData.mahasiswa_id);
      fd.append("masterpoin_id", formData.masterpoin_id);
      fd.append("tanggal_pengajuan", formData.tanggal_pengajuan);
      fd.append("rincian_acara", formData.rincian_acara);
      fd.append("bukti_kegiatan", formData.bukti_kegiatan);
      fd.append("periode_pengajuan", formData.periode_pengajuan);
      fd.append("tingkat", formData.tingkat);
      fd.append("tempat", formData.tempat);
      fd.append("tanggal_pelaksanaan", formData.tanggal_pelaksanaan);
      fd.append("mentor", formData.mentor);
      fd.append("narasumber", formData.narasumber);
      fd.append("poin", formData.poin);

      const res = await axios.post("http://localhost:5050/api/klaim", fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      addToast({ message: "Klaim poin berhasil diajukan!", type: "success" });
      onClose();
    } catch (err) {
      console.log("ERR SUBMIT:", err.response?.data || err);
      addToast({
        message: err.response?.data?.message || "Gagal mengajukan klaim.",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-700 font-medium">Memuat data...</p>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-star text-lg"></i>
              Formulir Klaim Poin
            </h2>

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

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30"
        >
          <div className="p-6 space-y-6">
            {activeTab === "informasi-dasar" && (
              <TabsInfo
                formData={formData}
                masterPoin={masterPoin}
                setFormData={setFormData}
                poinBadge={poinBadge}
                badgeClass={badgeClass}
                getBadgeClass={getBadgeClass}
              />
            )}

            {activeTab === "detail-kegiatan" && (
              <TabsDetail
                formData={formData}
                handleDateChange={handleDateChange}
                handleInputChange={handleInputChange}
              />
            )}

            {activeTab === "bukti-upload" && (
              <TabsBukti
                formData={formData}
                setFormData={setFormData}
                masterPoin={masterPoin}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-white">
            <div className="text-xs text-gray-500">
              <i className="fas fa-info-circle mr-1"></i>
              Tab:{" "}
              {activeTab === "informasi-dasar"
                ? "Informasi Dasar"
                : activeTab === "detail-kegiatan"
                ? "Detail Kegiatan"
                : "Bukti & Upload"}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
              >
                <i className="fas fa-times mr-2"></i>
                Batal
              </button>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Ajukan Klaim
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
