"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/app/api/axios"; // Axios tetap sama
import { useToast } from "@/components/Toats";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function useTableVerif() {
  const { addToast } = useToast();

  // ==========================
  // STATE UTAMA
  // ==========================
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // MODAL DETAIL
  // ==========================
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // ==========================
  // MODAL EXCEL
  // ==========================
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [excelConfig, setExcelConfig] = useState({
    title: "Import Excel Klaim Kegiatan",
    importUrl: "/klaim/import", // Path setelah proxy
    exportUrl: "",
  });

  // ==========================
  // WARNA STATUS
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
  // FETCH DATA KLAIM
  // ==========================
  const fetchVerif = async () => {
    setLoading(true);
    try {
      const res = await api.get("/klaim"); // dipanggil via proxy
      let data = res.data.data || [];

      // sort berdasarkan prioritas status
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
  // FILTER SEARCH
  // ==========================
  const filterFn = useCallback(
    (c) => {
      const s = search.toLowerCase();
      return (
        c.mahasiswa?.nama_mhs?.toLowerCase().includes(s) ||
        c.mahasiswa?.id_mhs?.toString().includes(s)
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
  // UPDATE STATUS KLAIM
  // ==========================
  const updateStatus = async (id, status, catatan) => {
    try {
      await api.patch(`/klaim/${id}/status`, { status, catatan });
      await fetchVerif();
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
  // IMPORT EXCEL KLAIM
  // ==========================
  const openImportExcel = () => {
    setExcelConfig({
      title: "Import Excel Klaim Kegiatan",
      importUrl: "/klaim/import", // tetap path setelah proxy
      exportUrl: "",
    });
    setIsExcelOpen(true);
  };

  const handleImportSuccess = async () => {
    await fetchVerif(); // refresh data setelah import
    setIsExcelOpen(false);
  };

  // ==========================
  // RETURN API HOOK
  // ==========================
  return {
    // data
    claims,
    selectedClaim,
    loading,

    // ui
    search,
    setSearch,
    statusColors,

    // pagination
    pagination,

    // modal detail
    isDetailOpen,
    openDetail,
    closeDetail,

    // modal excel
    isExcelOpen,
    excelConfig,
    openImportExcel,
    handleImportSuccess,
    setIsExcelOpen,

    // actions
    updateStatus,
  };
}
