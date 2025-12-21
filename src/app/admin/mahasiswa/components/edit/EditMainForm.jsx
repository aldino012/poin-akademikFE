"use client";
import React, { useState, useEffect, useRef } from "react";
import TabsNav from "./TabsNav";
import TabDataPribadi from "./TabDataPribadi";
import TabDataLainnya from "./TabDataLainnya";

export default function EditMainForm({ isOpen, onClose, student, onSubmit }) {
  const [form, setForm] = useState({
    id_mhs: "",
    nim: "",
    nama_mhs: "",
    prodi: "",
    angkatan: "",
    target_poin: 50,
    total_poin: 0,
    id_jur: "",
    tempat_lahir: "",
    tgl_lahir: "",
    pekerjaan: "",
    alamat: "",
    asal_sekolah: "",
    thn_lulus: "",
    tlp_saya: "",
    tlp_rumah: "",
    email: "",
    jenis_kelamin: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("data-pribadi");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // ================= CLICK OUTSIDE =================
  useEffect(() => {
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose]);

  // ================= LOAD DATA SAAT EDIT =================
  useEffect(() => {
    if (!student || !isOpen) return;

    const genderRaw = (student.jenis_kelamin || "").trim().toUpperCase();

    setForm({
      id_mhs: student.id_mhs ?? "",
      nim: student.nim ?? "",
      nama_mhs: student.nama_mhs ?? "",
      prodi: student.prodi ?? "",
      angkatan: student.angkatan ?? "",
      target_poin: student.target_poin ?? 50,
      total_poin: student.total_poin ?? 0,
      id_jur: student.id_jur ?? "",
      tempat_lahir: student.tempat_lahir ?? "",
      tgl_lahir: student.tgl_lahir ?? "",
      pekerjaan: student.pekerjaan ?? "",
      alamat: student.alamat ?? "",
      asal_sekolah: student.asal_sekolah ?? "",
      thn_lulus: student.thn_lulus ?? "",
      tlp_saya: student.tlp_saya ?? "",
      tlp_rumah: student.tlp_rumah ?? "",
      email: student.email ?? "",
      jenis_kelamin: genderRaw === "L" || genderRaw === "P" ? genderRaw : "",
      foto: null,
    });

    // ✅ PREVIEW FOTO (AMAN + CACHE BUSTING CLIENT-ONLY)
    if (student.foto_file_id) {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/mahasiswa/foto/${student.foto_file_id}`;
      setPreview(`${baseUrl}?t=${Date.now()}`);
    } else {
      setPreview(
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          student.nama_mhs || "User"
        )}`
      );
    }
  }, [student, isOpen]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "jenis_kelamin") {
      setForm((prev) => ({
        ...prev,
        jenis_kelamin: value,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPLOAD FOTO =================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      foto: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await onSubmit(form); // 🔥 parent yang bertanggung jawab update state list
      onClose();
    } catch (err) {
      console.error("Edit submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-0">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[85vh] overflow-hidden border border-gray-200"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <i className="fas fa-edit mr-2 text-lg"></i>
              Edit Data Mahasiswa
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition text-lg"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* TABS NAV */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[55vh]"
          autoComplete="off"
        >
          <div className="p-6 space-y-4">
            {/* FOTO */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={preview}
                alt="Preview Foto"
                className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 shadow-sm mb-3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                autoComplete="off"
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 transition-colors"
              />
            </div>

            {/* TAB CONTENT */}
            {activeTab === "data-pribadi" && (
              <TabDataPribadi form={form} handleChange={handleChange} />
            )}

            {activeTab === "data-lainnya" && (
              <TabDataLainnya form={form} handleChange={handleChange} />
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Tab:{" "}
                {activeTab === "data-pribadi" ? "Data Pribadi" : "Data Lainnya"}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 text-sm 
                  font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
                >
                  <i className="fas fa-times mr-2"></i>
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white 
                  hover:from-amber-600 hover:to-amber-700 text-sm font-medium transition-colors shadow-sm 
                  flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i> Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
