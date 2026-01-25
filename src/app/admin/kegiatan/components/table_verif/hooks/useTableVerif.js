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

  const [importLoading, setImportLoading] = useState(false);

  // ==========================
  // CONFIG (Warna & Prioritas)
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
  // 1. FETCH DATA
  // ==========================
  const fetchVerif = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/klaim");
      let data = res.data.data || [];

      // Sort berdasarkan prioritas status
      data.sort((a, b) => {
        const pa = statusPriority[a.status] ?? 999;
        const pb = statusPriority[b.status] ?? 999;
        return pa - pb;
      });

      setClaims(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      // Opsional: Error fetch bisa tetap ditampilkan atau di-silent juga jika mau
      addToast({
        message: "Gagal mengambil data verifikasi!",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data saat komponen pertama kali di-mount
  useEffect(() => {
    fetchVerif();
  }, [fetchVerif]);

  // ==========================
  // 2. FILTER & PAGINATION
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

  const pagination = usePaginationFilter(claims, search, filterFn, 7, []);

  // ==========================
  // 3. MODAL HANDLER
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
  // 4. ACTION: UPDATE STATUS
  // ==========================
  const updateStatus = async (id, status, catatan) => {
    try {
      await api.patch(`/klaim/${id}/status`, { status, catatan });

      setClaims((prev) =>
        prev.map((c) => (c.id_klaim === id ? { ...c, status, catatan } : c)),
      );

    
    } catch (err) {
      console.error(err);
      addToast({
        message: "Gagal memperbarui status",
        type: "danger",
      });
      fetchVerif();
    }
  };

  // ==========================
  // 5. ACTION: IMPORT EXCEL (CLEAN VERSION)
  // ==========================
  const importExcel = async (file, onFinish) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportLoading(true);

      const res = await api.post("/klaim/import-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Tetap tampilkan Toast Sukses (Ringkas) agar user tahu proses selesai
      // (Bisa dihapus juga jika benar-benar ingin silent total)
      const { inserted = 0, skipped = 0 } = res.data;
      addToast({
        message: `Import Selesai: ${inserted} Masuk, ${skipped} Skip.`,
        type: "success",
        duration: 4000,
      });

      // 🔥 LOGIKA ERROR DETAIL & MESSAGE ERROR DIHILANGKAN DI SINI 🔥

      // ✅ REFRESH DATA (Wajib agar tabel update)
      await fetchVerif();

      // Callback tutup modal
      if (onFinish && typeof onFinish === "function") {
        onFinish();
      }
    } catch (err) {
      // ❌ Tidak menampilkan toast error ke user, hanya log di console
      console.error("Import Error (Silent):", err);
    } finally {
      setImportLoading(false);
    }
  };

  return {
    // Data
    claims,
    loading,
    selectedClaim,

    // UI State
    search,
    setSearch,
    statusColors,

    // Pagination
    pagination,

    // Modal Controls
    isDetailOpen,
    openDetail,
    closeDetail,

    // Actions
    updateStatus,
    importExcel,
    importLoading,
  };
}
