"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function ModalTambah({
  isOpen,
  onClose,
  title,
  value,
  setValue,
  onSubmit,
  placeholder = "Isi data baru...",
  setIsChildModalOpen, // 🔥 Tambahan penting
}) {
  // Jika tidak open → tidak render apa–apa
  if (!isOpen) return null;

  // 🔥 Saat modal anak dibuka → beritahu parent
  useEffect(() => {
    if (setIsChildModalOpen) setIsChildModalOpen(true);

    return () => {
      // 🔥 Saat modal anak ditutup → parent boleh close via klik luar
      if (setIsChildModalOpen) setIsChildModalOpen(false);
    };
  }, []);

  const handleSubmit = () => {
    if (value.trim()) onSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") onClose();
  };

  // 🔥 Klik luar → hanya tutup modal anak, tidak sentuh parent
  const handleOutsideClick = () => {
    onClose();
    if (setIsChildModalOpen) setIsChildModalOpen(false);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] px-4 backdrop-blur-sm">
      {/* CARD MODAL */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // ❗ Cegah close saat klik isi modal
      >
        {/* HEADER */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <i className="fas fa-plus-circle text-blue-600"></i>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Masukkan data baru di bawah ini
          </p>
        </div>

        {/* BODY */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-edit mr-1 text-blue-600"></i> Data Baru
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white
                       text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-colors"
            style={{ textTransform: "uppercase" }}
          />

          <div className="text-xs text-gray-500 mt-1 flex items-center">
            <i className="fas fa-info-circle mr-1"></i>
            Tekan Enter untuk menambahkan
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                if (setIsChildModalOpen) setIsChildModalOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                         rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-times mr-2"></i> Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={!value.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm 
                         hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-check mr-2"></i> Tambah
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY (CLICK OUTSIDE) */}
      <div
        className="absolute inset-0 -z-10"
        onClick={handleOutsideClick}
      ></div>
    </div>,
    document.body
  );
}
