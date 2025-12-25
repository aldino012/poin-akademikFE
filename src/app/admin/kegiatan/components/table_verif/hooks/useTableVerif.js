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
  // FETCH
  // ==========================
  const fetchVerif = async () => {
    try {
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
      addToast({ message: "Gagal mengambil data verifikasi!", type: "danger" });
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
        c.mahasiswa?.id_mhs?.toString().includes(s)
      );
    },
    [search]
  );

  const pagination = usePaginationFilter(claims, search, filterFn, 7, []);

  // ==========================
  // MODAL
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
  };
}
