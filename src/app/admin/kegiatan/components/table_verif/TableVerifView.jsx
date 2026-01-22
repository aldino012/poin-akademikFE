"use client";

import React, { useState } from "react";

import TableToolbarVerif from "./TableToolbar";
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

  // 🔒 Disable export konsisten
  const isExportDisabled = loading || exportLoading || claims.length === 0;

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        border
        border-gray-100
        p-4
        overflow-y-visible
      "
    >
      {/* ==========================
          TOOLBAR
      ========================== */}
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

      {/* ==========================
          TABLE (DESKTOP & MOBILE)
      ========================== */}
      <div className="overflow-y-visible min-h-[300px]">
        {loading ? (
          // ==========================
          // LOADING STATE
          // ==========================
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <i className="fas fa-spinner fa-spin text-3xl text-blue-600 mb-3"></i>
            <span className="text-sm">Memuat data verifikasi klaim...</span>
          </div>
        ) : (
          // ==========================
          // TABLE STATE
          // ==========================
          <>
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
          </>
        )}
      </div>

      {/* ==========================
          PAGINATION
      ========================== */}
      {!loading && (
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredCount={filtered.length}
        />
      )}

      {/* ==========================
          DETAIL MODAL
      ========================== */}
      <DetailVerifModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        claim={selectedClaim}
        onSaveStatus={updateStatus}
      />

      {/* ==========================
          IMPORT MODAL
      ========================== */}
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
