"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function useKlaimKegiatan() {
  // ==========================
  // DATA
  // ==========================
  const [claims, setClaims] = useState([]);

  // ==========================
  // UI STATE
  // ==========================
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [editClaim, setEditClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPoinOpen, setIsPoinOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  // ==========================
  // STATUS COLORS
  // ==========================
  const statusColors = {
    Diajukan: "bg-blue-100 text-blue-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "Diajukan ulang": "bg-orange-100 text-orange-700",
    Disetujui: "bg-green-100 text-green-700",
    Ditolak: "bg-red-100 text-red-700",
  };

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchClaims = async () => {
    try {
      setLoading(true); // <--- mulai loading
      const res = await api.get("/klaim");
      const serverData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const formatted = serverData.map((item) => ({
        id: item.id,
        tanggal_pengajuan: item.tanggal_pengajuan,
        tanggal_pelaksanaan: item.tanggal_pelaksanaan,
        rincian_acara: item.rincian_acara,
        bukti_file_id: item.bukti_file_id,
        poin: item.poin,
        status: item.status,
        masterPoin: item.masterPoin || null,
        raw: item,
      }));

      // PRIORITAS STATUS
      const statusOrder = {
        Disetujui: 1,
        Revisi: 2,
        Diajukan: 3,
        "Diajukan ulang": 4,
        Ditolak: 5,
      };

      const sorted = formatted.sort((a, b) => {
        const aOrder = statusOrder[a.status] ?? 999;
        const bOrder = statusOrder[b.status] ?? 999;
        return aOrder - bOrder;
      });

      setClaims(sorted);
    } catch (err) {
      console.error("ERROR FETCH KLAIM:", err);
    } finally {
      setLoading(false); // <--- selesai loading
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // ==========================
  // ANIMASI PULSE
  // ==========================
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ==========================
  // FILTER & PAGINATION
  // ==========================
  const filterFn = (item) =>
    (item.rincian_acara || "").toLowerCase().includes(searchTerm.toLowerCase());

  const pagination = usePaginationFilter(claims, searchTerm, filterFn, 7, []);

  // ==========================
  // DETAIL MODAL
  // ==========================
  const openDetail = (claim) => {
    setSelectedClaim(claim.raw || claim);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedClaim(null);
    setIsDetailOpen(false);
  };

  // ==========================
  // KLAIM POIN MODAL
  // ==========================
  const openPoin = () => {
    setButtonAnimation(true);
    setTimeout(() => {
      setButtonAnimation(false);
      setIsPoinOpen(true);
    }, 200);
  };

  const closePoin = () => {
    setIsPoinOpen(false);
    fetchClaims();
  };

  // ==========================
  // EDIT MODAL
  // ==========================
  const openEdit = (claim) => {
    setEditClaim(claim.raw || claim);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setEditClaim(null);
    setIsEditOpen(false);
    fetchClaims();
  };

  // ==========================
  // CLIENT MOUNT
  // ==========================
  useEffect(() => setMounted(true), []);

  // ==========================
  // RETURN API
  // ==========================
  return {
    // data
    claims,
    loading,

    // ui state
    searchTerm,
    setSearchTerm,
    mounted,
    buttonAnimation,
    pulseAnimation,

    // status
    statusColors,

    // pagination
    pagination,

    // detail modal
    selectedClaim,
    isDetailOpen,
    openDetail,
    closeDetail,

    // klaim poin modal
    isPoinOpen,
    openPoin,
    closePoin,

    // edit modal
    editClaim,
    isEditOpen,
    openEdit,
    closeEdit,

    // actions
    fetchClaims,
  };
}
