"use client";

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import TableMasterPoints from "./TableDesktop";
import CardMaster from "./TableMobile";
import Pagination from "@/components/Pagianation";
import InfoBobotPoin from "./InfoBobotPoint";

import ModalTambahPoin from "./tambah/TambahPoint";
import ModalEditPoin from "./edit/EditPoint";
import ModalExcel from "./modal_excel/ModalExcel";

export default function MasterPointView({
  // role
  isAdmin,

  // data
  kegiatan,

  // search
  searchTerm,
  setSearchTerm,

  // pagination
  pagination,

  // ui state
  isModalOpen,
  setIsModalOpen,
  isEditOpen,
  setIsEditOpen,
  isImportOpen,
  setIsImportOpen,
  editData,
  importConfig,
  setImportConfig,
  loadingExport,

  // actions
  getBadgeClass,
  handleExportExcel,
  handleSave,
  handleEditSave,
  handleEditTrigger,
  handleDelete,
  fetchData,
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

  return (
    <div className="p-3 space-y-3">
      {/* ==========================
          SEARCH + ACTION
      ========================== */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between mb-2">
        {/* SEARCH */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              pl-10 pr-4 py-2.5 w-full
              bg-white border border-gray-300
              rounded-lg text-sm
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              focus:outline-none
              transition-all shadow-sm
            "
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        </div>

        {/* ACTION BUTTONS (ADMIN) */}
        {isAdmin && (
          <div className="flex flex-wrap gap-3">
            {/* TAMBAH */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                bg-gradient-to-r from-emerald-500 to-green-600
                hover:from-emerald-600 hover:to-green-700
                text-white px-5 py-2.5 rounded-lg text-sm font-medium
                flex items-center gap-2
                transition-all shadow-md hover:shadow-lg
              "
            >
              <i className="fas fa-plus text-sm"></i>
              <span>Tambah Data</span>
            </button>

            {/* EXPORT */}
            <button
              onClick={handleExportExcel}
              disabled={loadingExport || kegiatan.length === 0}
              className="
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-600 hover:to-purple-700
                text-white px-5 py-2.5 rounded-lg text-sm font-medium
                flex items-center gap-2
                transition-all shadow-md hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loadingExport ? (
                <>
                  <i className="fas fa-spinner fa-spin text-sm"></i>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-file-export text-sm"></i>
                  <span>Export Excel</span>
                </>
              )}
            </button>

            {/* IMPORT */}
            <button
              onClick={() => {
                setImportConfig({
                  title: "Import Excel Master Poin",
                  importUrl: "/masterpoin/import-excel",
                  exportUrl: "/masterpoin/export-excel",
                });
                setIsImportOpen(true);
              }}
              className="
                bg-gradient-to-r from-blue-500 to-indigo-600
                hover:from-blue-600 hover:to-indigo-700
                text-white px-5 py-2.5 rounded-lg text-sm font-medium
                flex items-center gap-2
                transition-all shadow-md hover:shadow-lg
              "
            >
              <i className="fas fa-file-import text-sm"></i>
              <span>Import Excel</span>
            </button>
          </div>
        )}
      </div>

      {/* ==========================
          TABLE & CARD
      ========================== */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <TableMasterPoints
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
        />

        <CardMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
        />
      </div>

      {/* ==========================
          PAGINATION
      ========================== */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* ==========================
          INFO BOBOT
      ========================== */}
      <InfoBobotPoin />

      {/* ==========================
          MODAL TAMBAH
      ========================== */}
      <ModalTambahPoin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* ==========================
          MODAL EDIT
      ========================== */}
      <ModalEditPoin
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialData={editData}
      />

      {/* ==========================
          MODAL EXCEL
      ========================== */}
      <ModalExcel
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImported={fetchData}
        title={importConfig.title}
        importUrl={importConfig.importUrl}
        exportUrl={importConfig.exportUrl}
      />
    </div>
  );
}
