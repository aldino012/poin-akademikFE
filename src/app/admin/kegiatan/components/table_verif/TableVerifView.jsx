"use client";

import React, { useState } from "react";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailVerifModal from "../verif-kegiatan/VerifParent";
import ModalImportExcel from "@/components/ModalExcel";

export default function TableVerifView({
  claims,
  loading,
  search,
  setSearch,
  statusColors,
  pagination,
  isDetailOpen,
  selectedClaim,
  openDetail,
  closeDetail,
  updateStatus,

  // 🔥 props dari hook
  importExcel,
  importing,
  refreshData,
}) {
  const {
    filtered,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  } = pagination;

  const [isImportOpen, setIsImportOpen] = useState(false);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  // 🔥 Fungsi import wrapper untuk modal
  const handleImport = async (file) => {
    if (!file) return;

    try {
      // panggil hook importExcel
      if (importExcel && typeof importExcel === "function") {
        await importExcel(file);
      }

      // refresh table
      if (refreshData && typeof refreshData === "function") {
        await refreshData();
      }

      // close modal
      setIsImportOpen(false);
    } catch (err) {
      console.error("IMPORT FAILED", err);
      // tetap biarkan modal terbuka jika error
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 overflow-y-visible">
      {/* ================= Toolbar ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <TableToolbar
          search={search}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
        />

        {/* 🔥 IMPORT BUTTON */}
        <button
          onClick={() => setIsImportOpen(true)}
          className="
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-blue-600 to-indigo-700
            text-white text-sm font-medium
            hover:from-blue-700 hover:to-indigo-800
            shadow-sm flex items-center gap-2
          "
        >
          <i className="fas fa-file-import"></i>
          Import Excel
        </button>
      </div>

      {/* ================= Table ================= */}
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

      {/* ================= Pagination ================= */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* ================= Detail Modal ================= */}
      <DetailVerifModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        claim={selectedClaim}
        onSaveStatus={updateStatus}
      />

      {/* ================= Import Excel Modal ================= */}
      <ModalImportExcel
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        title="Import Klaim Kegiatan"
        acceptTypes=".xlsx,.xls"
        maxSizeMB={5}
        loading={importing}
        onImport={async (file) => {
          await importExcel(file, () => setIsImportOpen(false)); // modal auto-close
        }}
      />
    </div>
  );
}
