"use client";

import React from "react";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";

import DetailModal from "../detail/DetailParent";
import ModalTambahMhs from "../tambah/TambahMainForm";
import ModalEdit from "../edit/EditMainForm";
import ModalExcel from "@/components/ModalExcel";

export default function TableMhsView({
  // data
  studentsData,
  selectedStudent,

  // filter
  search,
  setSearch,
  filterPoin,
  setFilterPoin,

  // pagination
  pagination,

  // modal state
  isDetailOpen,
  isTambahOpen,
  isEditOpen,
  isExcelOpen,
  excelConfig,

  // modal handler
  openDetail,
  closeDetail,
  openTambah,
  closeTambah,
  openEdit,
  closeEdit,

  // actions
  openCetak,
  handleTambahSuccess,
  handleUpdate,
  handleDelete,
  openImportExcel,
  handleExportExcel,
  setIsExcelOpen,
  handleImportSuccess,
}) {
  const {
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    filtered,
  } = pagination;

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
      <TableToolbar
        search={search}
        setSearch={setSearch}
        filterPoin={filterPoin}
        setFilterPoin={setFilterPoin}
        onAdd={openTambah}
        onImport={openImportExcel}
        onExport={handleExportExcel}
        disableExport={studentsData.length === 0}
      />

      {/* ==========================
          TABLE (DESKTOP & MOBILE)
      ========================== */}
      <div className="overflow-y-visible">
        <TableDesktop
          students={currentItems}
          startIndex={startIndex}
          openDetail={openDetail}
          openCetak={openCetak}
          onEdit={openEdit}
          onDelete={handleDelete}
        />

        <TableMobile
          students={currentItems}
          openDetail={openDetail}
          openCetak={openCetak}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ==========================
          PAGINATION
      ========================== */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* ==========================
          MODAL TAMBAH
      ========================== */}
      <ModalTambahMhs
        isOpen={isTambahOpen}
        onClose={closeTambah}
        onSubmit={handleTambahSuccess}
      />

      {/* ==========================
          MODAL DETAIL
      ========================== */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        student={selectedStudent}
      />

      {/* ==========================
          MODAL EDIT
      ========================== */}
      <ModalEdit
        isOpen={isEditOpen}
        onClose={closeEdit}
        student={selectedStudent}
        onSubmit={handleUpdate}
      />

      {/* ==========================
          MODAL EXCEL
      ========================== */}
      <ModalExcel
        isOpen={isExcelOpen}
        onClose={() => setIsExcelOpen(false)}
        title={excelConfig.title}
        importUrl={excelConfig.importUrl}
        exportUrl={excelConfig.exportUrl}
        onImported={handleImportSuccess} 
      />
    </div>
  );
}
