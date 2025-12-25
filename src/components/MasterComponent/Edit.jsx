"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ModalEditPoin({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    id_poin: null,
    kode_keg: "",
    jenis_kegiatan: "",
    posisi: "",
    bobot_poin: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        id_poin: initialData.id || initialData.id_poin || null,
        kode_keg: initialData.kode_keg || "",
        jenis_kegiatan: initialData.jenis_kegiatan || "",
        posisi: initialData.posisi || "",
        bobot_poin: initialData.bobot_poin || 0,
      });
      setError("");
    }
  }, [initialData]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isOpen
      ) {
        handleClose();
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
  }, [isOpen]);

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "kode_keg"
          ? value.toUpperCase()
          : name === "jenis_kegiatan" || name === "posisi"
          ? value.toUpperCase() // Tambahkan uppercase untuk jenis_kegiatan dan posisi
          : name === "bobot_poin"
          ? Number(value) || 0
          : value,
    }));
    setError("");
  };

  // Fungsi khusus untuk input bobot poin
  const handlePoinChange = (e) => {
    const value = e.target.value;

    // Hanya menerima angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Jika kosong, set ke 0
    if (numericValue === "") {
      setForm((prev) => ({ ...prev, bobot_poin: 0 }));
      setError("");
      return;
    }

    // Parse ke number
    const parsedValue = parseInt(numericValue, 10);

    // Batasi maksimal 100
    if (parsedValue > 100) {
      setForm((prev) => ({ ...prev, bobot_poin: 100 }));
      return;
    }

    // Batasi minimal 0
    if (parsedValue < 0) {
      setForm((prev) => ({ ...prev, bobot_poin: 0 }));
      return;
    }

    setForm((prev) => ({ ...prev, bobot_poin: parsedValue }));
    setError("");
  };

  const handleKeyDown = (e) => {
    // Mencegah karakter selain angka, backspace, delete, tab, arrow keys
    if (
      !/[\d]/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    // Validasi paste agar hanya angka yang diterima
    const pastedText = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedText)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[A-Z0-9]{4}$/.test(form.kode_keg)) {
      setError("Kode harus 4 karakter, huruf kapital dan angka, contoh: BEM1");
      return;
    }

    if (
      !form.kode_keg ||
      !form.jenis_kegiatan ||
      !form.posisi ||
      !form.bobot_poin ||
      form.bobot_poin < 1
    ) {
      setError("Semua field wajib diisi dan bobot poin minimal 1!");
      return;
    }

    if (form.bobot_poin > 100) {
      setError("Bobot poin maksimal adalah 100!");
      return;
    }

    setLoading(true);
    try {
      await onSave({
        ...form,
        id: form.id_poin,
      });
      onClose();
    } catch (error) {
      console.error("Error updating poin:", error);
      setError("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200 max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <i className="fas fa-edit mr-2 text-lg"></i>
              Edit Master Poin
            </h2>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition text-lg"
              disabled={loading}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
          autoComplete="off"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center text-red-700 text-sm">
                <i className="fas fa-exclamation-circle mr-2 text-red-500"></i>
                {error}
              </div>
            </div>
          )}

          {/* Kode Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-hashtag mr-1 text-amber-600"></i>
              Kode Kegiatan
            </label>
            <input
              type="text"
              name="kode_keg"
              value={form.kode_keg}
              onChange={handleChange}
              placeholder="Contoh: BEM1, HMJ2"
              maxLength={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors uppercase font-medium"
              required
              disabled={loading}
              autoComplete="off"
              style={{ textTransform: "uppercase" }}
            />
            <p className="text-xs text-gray-500 mt-1">
              3 karakter huruf kapital dan 1 angka
            </p>
          </div>

          {/* Jenis Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-tasks mr-1 text-amber-600"></i>
              Jenis Kegiatan
            </label>
            <input
              type="text"
              name="jenis_kegiatan"
              value={form.jenis_kegiatan}
              onChange={handleChange}
              placeholder="MASUKKAN JENIS KEGIATAN"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors uppercase"
              required
              disabled={loading}
              autoComplete="off"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          {/* Posisi / Peran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-user-tie mr-1 text-amber-600"></i>
              Posisi / Peran
            </label>
            <input
              type="text"
              name="posisi"
              value={form.posisi}
              onChange={handleChange}
              placeholder="MASUKKAN POSISI ATAU PERAN"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors uppercase"
              required
              disabled={loading}
              autoComplete="off"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          {/* Bobot Poin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-star mr-1 text-amber-500"></i>
              Bobot Poin
            </label>
            <div className="relative">
              <input
                type="text"
                name="bobot_poin"
                value={form.bobot_poin === 0 ? "" : form.bobot_poin}
                onChange={handlePoinChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder="Masukkan angka (1-100)"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors no-spinner"
                required
                disabled={loading}
                autoComplete="off"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-500 text-sm">poin</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Masukkan angka 1-100 menggunakan keyboard
            </p>
          </div>

          {/* Preview Badge */}
          {form.kode_keg && form.bobot_poin > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <i className="fas fa-eye mr-2 text-amber-600"></i>
                Preview Perubahan
              </h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Kode:</span>
                    <span className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded border">
                      {form.kode_keg}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 truncate">
                    {form.jenis_kegiatan}
                  </p>
                  <p className="text-xs text-gray-600">
                    Posisi: <span className="font-medium">{form.posisi}</span>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <i className="fas fa-star text-xs"></i>
                  <span className="text-sm font-bold">{form.bobot_poin}</span>
                  <span className="text-xs">Poin</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors shadow-sm border border-gray-300 flex items-center"
              disabled={loading}
            >
              <i className="fas fa-times mr-2"></i>
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
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
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
