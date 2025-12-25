"use client";
import React, { useState, useRef, useEffect } from "react";
import api from "@/app/api/axios";
import { useToast } from "@/components/Toats";

import TabsNav from "./TabsNav";
import TabDataPribadi from "./TabDataPribadi";
import TabDataLainnya from "./TabDataLainnya";

export default function Tambah({ isOpen, onClose, onSubmit }) {
  const { addToast } = useToast(); // 🔥 WAJIB ADA

  const [form, setForm] = useState({
    nim: "",
    nama_mhs: "",
    prodi: "S1",
    angkatan: "",
    total_poin: 0,
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

  const [activeTab, setActiveTab] = useState("data-pribadi");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Close parent modal jika klik luar DAN modal anak tidak terbuka
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !isChildModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChildModalOpen, onClose]);

  // Helper: Uppercase except email
  const toUpperCaseExceptEmail = (name, value) => {
    const exclude = ["email", "tgl_lahir", "prodi", "foto", "nim"];
    return exclude.includes(name) ? value : value.toUpperCase();
  };

  // Only numeric NIM
  const validateNIM = (value) => value.replace(/[^0-9]/g, "");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm((p) => ({ ...p, foto: files[0] }));
    } else if (name === "nim") {
      setForm((p) => ({ ...p, nim: validateNIM(value) }));
    } else {
      setForm((p) => ({ ...p, [name]: toUpperCaseExceptEmail(name, value) }));
    }
  };

  // Submit
  const isInvalid = loading || !form.nim || !form.nama_mhs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // 🔥 reset error lama

    // ===============================
    // VALIDASI FRONTEND (WAJIB)
    // ===============================
    let newErrors = {};

    if (!form.nim) {
      newErrors.nim = "NIM wajib diisi";
    } else if (!/^\d+$/.test(form.nim)) {
      newErrors.nim = "NIM hanya boleh berisi angka";
    }

    if (!form.nama_mhs) {
      newErrors.nama_mhs = "Nama mahasiswa wajib diisi";
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast({
        message: "Periksa kembali data yang diinput",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      // ===============================
      // SIAPKAN FORM DATA
      // ===============================
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "foto" && form[key] !== "") {
          fd.append(key, form[key]);
        }
      });

      if (form.foto) {
        fd.append("foto", form.foto);
      }

      const res = await api.post("/mahasiswa", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      onSubmit(); // cukup trigger refresh
      onClose();

      // ===============================
      // RESET FORM
      // ===============================
      setForm({
        nim: "",
        nama_mhs: "",
        prodi: "S1",
        angkatan: "",
        total_poin: 0,
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
    } catch (err) {
      const res = err.response?.data;

      if (res?.errors) {
        setErrors((prev) => ({
          ...prev,
          ...res.errors,
        }));

        addToast({
          message: res.message || "Validasi gagal",
          type: "error",
        });
      } else {
        addToast({
          message: res?.message || "Gagal menambahkan mahasiswa",
          type: "error",
        });
      }
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <i className="fas fa-user-plus mr-2 text-lg"></i>
              Tambah Mahasiswa Baru
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition text-lg"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* NAVIGASI TAB */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[55vh]"
          autoComplete="off"
        >
          <div className="p-6 space-y-4">
            {activeTab === "data-pribadi" && (
              <TabDataPribadi
                form={form}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {activeTab === "data-lainnya" && (
              <TabDataLainnya
                form={form}
                handleChange={handleChange}
                setIsChildModalOpen={setIsChildModalOpen} // 🔥 WAJIB ADA\\
                errors={errors}
              />
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
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
                >
                  <i className="fas fa-times mr-2"></i>
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isInvalid}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
