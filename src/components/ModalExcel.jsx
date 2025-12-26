"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useToast } from "@/components/Toats";
import api from "@/app/api/axios";

export default function ModalImportExcel({
  isOpen,
  onClose,
  onImported,
  title = "Import Excel",
  importUrl, // ⬅️ FIX: HARUS DARI PARENT, TANPA DEFAULT
  acceptTypes = ".xlsx, .xls",
  maxSizeMB = 5,
}) {
  const { addToast } = useToast();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const modalRef = useRef(null);

  // Close on outside click
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const sizeInMB = selectedFile.size / 1024 / 1024;

      if (sizeInMB > maxSizeMB) {
        addToast({
          message: `File terlalu besar. Maksimal ${maxSizeMB}MB`,
          type: "error",
        });
        return;
      }

      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const acceptedTypesArray = acceptTypes
        .split(",")
        .map((t) => t.trim().replace(".", ""));

      if (
        !acceptedTypesArray.includes(fileExtension) &&
        !acceptedTypesArray.includes(`${fileExtension}x`)
      ) {
        addToast({
          message: `Format file tidak didukung. Gunakan ${acceptTypes}`,
          type: "error",
        });
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize(sizeInMB.toFixed(2) + " MB");
    }
  };

  const handleImport = async () => {
    if (!file) {
      addToast({
        message: "Silakan pilih file Excel terlebih dahulu",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(importUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      addToast({
        message: res.data.message || "Import data berhasil!",
        type: "success",
      });

      onImported();
      onClose();
    } catch (error) {
      console.error("Import error:", error);
      addToast({
        message:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mengimport data",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setFileSize("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    // Validasi ukuran
    const sizeInMB = droppedFile.size / 1024 / 1024;
    if (sizeInMB > maxSizeMB) {
      addToast({
        message: `File terlalu besar. Maksimal ${maxSizeMB}MB`,
        type: "error",
      });
      return;
    }

    // Validasi ekstensi
    const fileExtension = droppedFile.name.split(".").pop().toLowerCase();
    const acceptedTypesArray = acceptTypes
      .split(",")
      .map((t) => t.trim().replace(".", ""));

    if (!acceptedTypesArray.includes(fileExtension)) {
      addToast({
        message: `Format file tidak didukung. Gunakan ${acceptTypes}`,
        type: "error",
      });
      return;
    }

    setFile(droppedFile);
    setFileName(droppedFile.name);
    setFileSize(sizeInMB.toFixed(2) + " MB");
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <i className="fas fa-file-import text-lg"></i>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
              disabled={loading}
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload Box */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Pilih File Excel
              </label>
              <span className="text-xs text-gray-500">Maks. {maxSizeMB}MB</span>
            </div>

            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="
        border-2 border-dashed border-gray-300 rounded-xl p-6
        text-center hover:border-blue-500 transition-colors
        cursor-pointer bg-gray-50/50
      "
              >
                <input
                  type="file"
                  accept={acceptTypes}
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />

                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <i className="fas fa-file-excel text-blue-600 text-2xl"></i>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Klik untuk upload file
                    </p>

                    <p className="text-xs text-gray-500">
                      atau drag & drop file di sini
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-600">
                      <i className="fas fa-file text-gray-400"></i>
                      {acceptTypes}
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <i className="fas fa-file-excel text-green-600 text-lg"></i>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-[10px]"></i>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {fileName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{fileSize}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-green-600 font-medium">
                          <i className="fas fa-check-circle mr-1"></i>
                          Siap diimport
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    disabled={loading}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-500 text-lg"></i>
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Pastikan file Excel sesuai format
                </p>
                <p className="text-xs text-blue-600">
                  Proses import akan menambahkan data baru ke sistem
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium shadow-sm border border-gray-300 flex items-center"
            disabled={loading}
          >
            <i className="fas fa-times mr-2"></i>
            Batal
          </button>

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Memproses...
              </>
            ) : (
              <>
                <i className="fas fa-upload mr-2"></i>
                Import Sekarang
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
