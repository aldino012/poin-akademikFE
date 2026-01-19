"use client";

import React, { useState } from "react";

import TableToolbarVerif from "./TableToolbarVerif";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailVerifModal from "../verif-kegiatan/VerifParent";
import ModalExcel from "@/components/ModalExcel";

export default function TableVerifView({
  // ===== DATA =====
  claims,
  loading,
  search,
  setSearch,
  statusColors,
  pagination,

  // ===== MODAL DETAIL =====
  isDetailOpen,
  selectedClaim,
  openDetail,
  closeDetail,

  // ===== ACTIONS =====
  importExcel,
  importLoading,
  exportExcel,
  exportLoading,
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

  // 🔥 LOGIKA DISABLE EXPORT (GLOBAL & KONSISTEN)
  const isExportDisabled = loading || exportLoading || claims.length === 0;

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">
      {/* =========================
          TOOLBAR (SEARCH + IMPORT + EXPORT)
      ========================= */}
      <TableToolbarVerif
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
        onImport={() => setIsImportOpen(true)}
        onExport={exportExcel}
        disableExport={isExportDisabled}
        importLoading={importLoading}
        exportLoading={exportLoading}
      />

      {/* =========================
          TABLE
      ========================= */}
      <div className="p-4 overflow-y-visible">
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
        onImported={(file) => importExcel(file, () => setIsImportOpen(false))}
      />
    </div>
  );
}
