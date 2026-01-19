"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/app/api/axios";
import { useToast } from "@/components/Toats";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function useTableVerif() {
  const { addToast } = useToast();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [importLoading, setImportLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false); // 🔥 NEW

  // 🎨 WARNA STATUS
  const statusColors = {
    Diajukan: "bg-gray-100 text-gray-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "Diajukan ulang": "bg-purple-100 text-purple-700",
    Ditolak: "bg-red-100 text-red-700",
    Disetujui: "bg-blue-100 text-blue-700",
  };

  // 🎯 PRIORITAS SORT
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
    try {
      setLoading(true);
      const res = await api.get("/klaim");
      let data = res.data.data || [];

      data.sort((a, b) => {
        const pa = statusPriority[a.status] ?? 999;
        const pb = statusPriority[b.status] ?? 999;
        return pa - pb;
      });

      setClaims(data);
    } catch (err) {
      console.error(err);
      addToast({
        message: "Gagal mengambil data verifikasi!",
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
  // FILTER
  // ==========================
  const filterFn = useCallback(
    (c) => {
      const s = search.toLowerCase();
      return (
        c.mahasiswa?.nama_mhs?.toLowerCase().includes(s) ||
        c.mahasiswa?.nim?.toString().includes(s)
      );
    },
    [search],
  );

  const pagination = usePaginationFilter(claims, search, filterFn, 7);

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
  // IMPORT EXCEL
  // ==========================
  const importExcel = async (file, onFinish) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportLoading(true);

      const res = await api.post("/klaim/import-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { inserted = 0, skipped = 0, failed = 0, errors = [] } = res.data;

      addToast({
        message: `Import selesai → ${inserted} berhasil, ${skipped} duplikat, ${failed} gagal`,
        type: failed > 0 ? "warning" : "success",
        duration: 6000,
      });

      if (failed > 0 && errors.length > 0) {
        errors.slice(0, 3).forEach((e) => {
          addToast({
            message: `Row ${e.row} (${e.nim || "-"}) → ${e.error}`,
            type: "danger",
            duration: 7000,
          });
        });
      }

      await fetchVerif();

      // 🔥 PENTING: reset search agar data langsung tampil
      setSearch("");

      if (onFinish && typeof onFinish === "function") {
        onFinish();
      }
    } catch (err) {
      console.error(err);
      addToast({
        message: err.response?.data?.message || "Gagal melakukan import Excel!",
        type: "danger",
      });
      throw err;
    } finally {
      setImportLoading(false);
    }
  };

  // ==========================
  // 🔥 EXPORT EXCEL (BARU)
  // ==========================
  const exportExcel = async () => {
    try {
      setExportLoading(true);

      const res = await api.get("/klaim/export-excel", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "klaim_kegiatan.xlsx";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      addToast({
        message: "Export Excel berhasil",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      addToast({
        message: "Gagal export Excel!",
        type: "danger",
      });
    } finally {
      setExportLoading(false);
    }
  };

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
    importExcel,
    exportExcel, // 🔥 expose

    // state
    importLoading,
    exportLoading, // 🔥 expose
  };
}
