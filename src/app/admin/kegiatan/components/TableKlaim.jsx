"use client";

import React, { useState, useEffect, useCallback } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "@/api/axios";

import TableToolbar from "./table_verif/TableToolbar";
import TableDesktop from "./table_verif/TableDesktop";
import TableMobile from "./table_verif/TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailKlaimModal from "./verif-kegiatan/VerifParent";

import { useToast } from "@/components/Toats";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function TableKlaim() {
  const { addToast } = useToast();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🎨 WARNA BADGE
  const statusColors = {
    Diajukan: "bg-gray-100 text-gray-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "Diajukan ulang": "bg-purple-100 text-purple-700",
    Ditolak: "bg-red-100 text-red-700",
    Disetujui: "bg-blue-100 text-blue-700",
  };

  // 🎯 PRIORITAS SORTING (urutan tampil)
  const statusPriority = {
    Diajukan: 1,
    Revisi: 2,
    "Diajukan ulang": 3,
    Ditolak: 4,
    Disetujui: 5,
  };

  // Fetch data
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await api.get("/klaim");
      let data = res.data.data || [];

      // SORT BERDASARKAN PRIORITAS
      data.sort((a, b) => {
        const pa = statusPriority[a.status] ?? 999;
        const pb = statusPriority[b.status] ?? 999;
        return pa - pb;
      });

      setClaims(data);
    } catch (err) {
      addToast({ message: "Gagal mengambil data klaim!", type: "danger" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter function
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

  // Pagination & filtering
  const {
    filtered,
    currentItems: currentClaims,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  } = usePaginationFilter(claims, search, filterFn, 7, []);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const openDetailModal = (claim) => {
    setSelectedClaim(claim);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedClaim(null);
    setIsDetailModalOpen(false);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  const handleUpdateStatus = async (id, status, catatan) => {
    try {
      await api.patch(`/klaim/${id}/status`, { status, catatan });
      await fetchClaims();
    } catch (err) {
      console.error(err);
      addToast({
        message:
          err.response?.data?.message || "Gagal memperbarui status klaim!",
        type: "danger",
      });
      throw err;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 overflow-y-visible">
      {/* Toolbar Search */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />

      <div className="overflow-y-visible">
        {/* DESKTOP */}
        <TableDesktop
          currentClaims={currentClaims}
          startIndex={startIndex}
          statusColors={statusColors}
          openDetailModal={openDetailModal}
        />

        {/* MOBILE */}
        <TableMobile
          currentClaims={currentClaims}
          openDetailModal={openDetailModal}
          statusColors={statusColors}
        />
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* Detail Modal */}
      <DetailKlaimModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        claim={selectedClaim}
        onSaveStatus={handleUpdateStatus}
      />
    </div>
  );
}
