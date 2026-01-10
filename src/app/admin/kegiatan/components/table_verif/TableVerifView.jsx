"use client";

import React, { useState } from "react";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailVerifModal from "../verif-kegiatan/VerifParent";
import ModalExcel from "@/components/ModalExcel"; // ✅ modal universal import

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
  importKlaimExcel, // 🔥 fungsi import dari hook
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

  // ==========================
  // Buka/Tutup Modal Import
  // ==========================
  const openImportModal = () => setIsImportOpen(true);
  const closeImportModal = () => setIsImportOpen(false);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 overflow-y-visible">
      {/* Toolbar */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
        showImportButton={true} // tombol import di toolbar
        onImportClick={openImportModal}
      />

      {/* Table */}
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
      <DetailVerifModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        claim={selectedClaim}
        onSaveStatus={updateStatus}
      />

      {/* Modal Import Excel */}
      <ModalExcel
        isOpen={isImportOpen}
        onClose={closeImportModal}
        onUpload={async (file) => {
          try {
            await importKlaimExcel(file);
            closeImportModal(); // tutup modal setelah sukses
          } catch (err) {
            // error sudah ditangani di hook
          }
        }}
        title="Import Klaim Kegiatan"
        accept=".xlsx, .xls"
      />
    </div>
  );
}
