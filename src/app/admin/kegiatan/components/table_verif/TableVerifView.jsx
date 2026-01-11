"use client";

import React from "react";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailVerifModal from "../verif-kegiatan/VerifParent";

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
    </div>
  );
}
