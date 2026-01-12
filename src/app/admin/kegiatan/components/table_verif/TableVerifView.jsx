"use client";

import React, { useState } from "react";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailVerifModal from "../verif-kegiatan/VerifParent";
import ModalExcel from "@/components/ModalExcel";

export default function TableVerifView({
  // ===== DATA & UI =====
  claims,
  loading,
  search,
  setSearch,
  statusColors,
  pagination,

  // ===== MODAL DETAIL =====
  isDetailOpen,
  selectedClaim,
  importExcel, 
  importLoading, 
  openDetail,
  closeDetail,

  // ===== ACTIONS =====
  updateStatus,
}) {
  const [isImportOpen, setIsImportOpen] = useState(false);

  const {
    filtered,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  } = pagination;

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 overflow-y-visible">
      {/* =========================
          TOOLBAR + IMPORT BUTTON
      ========================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <TableToolbar
          search={search}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
        />

        <button
          onClick={() => setIsImportOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition bg-blue-600 hover:bg-blue-700 text-white"
        >
          Import Excel
        </button>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="overflow-y-visible">
        <TableDesktop
          currentClaims={currentItems}
          startIndex={startIndex}
          statusColors={statusColors}
          openDetailModal={openDetail}
        />

        <TableMobile
          currentClaims={currentItems}
          statusColors={statusColors}
          openDetailModal={openDetail}
        />
      </div>

      {/* =========================
          PAGINATION
      ========================= */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* =========================
          DETAIL MODAL
      ========================= */}
      <DetailVerifModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        claim={selectedClaim}
        onSaveStatus={updateStatus}
      />

      {/* =========================
          IMPORT MODAL
      ========================= */}
      <ModalExcel
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        title="Import Klaim Excel"
        importUrl="/klaim/import-excel"
        onImported={(file) => importExcel(file, () => setIsImportOpen(false))} // ✅ panggil hook dan tutup modal
      />
    </div>
  );
}
