"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/app/api/axios";
import { useToast } from "@/components/Toats";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function useTableVerif() {
  const { addToast } = useToast();

  // ==========================
  // STATE
  // ==========================
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // 🔥 IMPORT EXCEL
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  // ==========================
  // STATUS STYLE
  // ==========================
  const statusColors = {
    Diajukan: "bg-gray-100 text-gray-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "Diajukan ulang": "bg-purple-100 text-purple-700",
    Ditolak: "bg-red-100 text-red-700",
    Disetujui: "bg-blue-100 text-blue-700",
  };

  const statusPriority = {
    Diajukan: 1,
    Revisi: 2,
    "Diajukan ulang": 3,
    Ditolak: 4,
    Disetujui: 5,
  };

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchVerif = async () => {
    setLoading(true);
    try {
      const res = await api.get("/klaim");
      const data = res.data?.data || [];

      data.sort((a, b) => {
        const pa = statusPriority[a.status] ?? 999;
        const pb = statusPriority[b.status] ?? 999;
        return pa - pb;
      });

      setClaims(data);
    } catch (err) {
      console.error(err);
      addToast({
        message: "Gagal mengambil data verifikasi klaim!",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerif();
  }, []);

  // ==========================
  // FILTER & PAGINATION
  // ==========================
  const filterFn = useCallback(
    (c) => {
      const s = search.toLowerCase();
      return (
        c.mahasiswa?.nama_mhs?.toLowerCase().includes(s) ||
        c.mahasiswa?.nim?.toString().includes(s)
      );
    },
    [search]
  );

  const pagination = usePaginationFilter(claims, search, filterFn, 7, []);

  // ==========================
  // MODAL DETAIL
  // ==========================
  const openDetail = (claim) => {
    setSelectedClaim(claim);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedClaim(null);
    setIsDetailOpen(false);
  };

  // ==========================
  // UPDATE STATUS
  // ==========================
  const updateStatus = async (id, status, catatan) => {
    try {
      await api.patch(`/klaim/${id}/status`, { status, catatan });
      await fetchVerif();
      addToast({
        message: "Status klaim berhasil diperbarui",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      addToast({
        message:
          err.response?.data?.message || "Gagal memperbarui status verifikasi!",
        type: "danger",
      });
      throw err;
    }
  };

  // ==========================
  // 🔥 IMPORT EXCEL KLAIM (FIX UTAMA)
  // ==========================
  const importExcel = async (file) => {
    if (!file) {
      addToast({
        message: "File Excel belum dipilih",
        type: "warning",
      });
      throw new Error("File kosong");
    }

    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";

    if (!isExcel) {
      addToast({
        message: "File harus berformat Excel (.xls / .xlsx)",
        type: "danger",
      });
      throw new Error("Format file salah");
    }

    const formData = new FormData();
    formData.append("file", file);

    setImporting(true);
    setImportResult(null);

    try {
      const res = await api.post("/klaim/import-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = res.data;
      setImportResult(result);

      // TOAST HASIL
      if (result.inserted > 0 && result.failed === 0) {
        addToast({
          message: `Import berhasil (${result.inserted} data)`,
          type: "success",
        });
      } else if (result.inserted > 0 && result.failed > 0) {
        addToast({
          message: `Import sebagian berhasil (${result.inserted} berhasil, ${result.failed} gagal)`,
          type: "warning",
        });
      } else {
        addToast({
          message: "Import gagal, tidak ada data yang masuk",
          type: "danger",
        });
      }

      // 🔥 PENTING
      await fetchVerif();

      // 🔥 RETURN RESULT → BIAR MODAL TAHU SUKSES
      return result;
    } catch (err) {
      console.error("IMPORT ERROR:", err);
      addToast({
        message:
          err.response?.data?.message || "Gagal mengimpor klaim dari Excel",
        type: "danger",
      });
      throw err;
    } finally {
      setImporting(false);
    }
  };

  // ==========================
  // RETURN
  // ==========================
  return {
    // data
    claims,
    loading,
    selectedClaim,

    // ui
    search,
    setSearch,
    statusColors,

    // pagination
    pagination,

    // modal
    isDetailOpen,
    openDetail,
    closeDetail,

    // actions
    updateStatus,

    // 🔥 import
    importExcel,
    importing,
    importResult,
  };
}
