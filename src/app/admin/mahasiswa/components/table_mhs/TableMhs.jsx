"use client";

import React from "react";

// hook (logic)
import useTableMhs from "./hooks/useTableMhs";

// view (render)
import TableMhsView from "./TableMhsView";

export default function TableMhs() {
  // ==========================
  // AMBIL SEMUA LOGIC
  // ==========================
  const tableMhs = useTableMhs();

  // ==========================
  // RENDER VIEW
  // ==========================
  return (
    <TableMhsView
      /* data */
      studentsData={tableMhs.studentsData}
      selectedStudent={tableMhs.selectedStudent}
      loading={tableMhs.loading}
      /* filter */
      search={tableMhs.search}
      setSearch={tableMhs.setSearch}
      filterPoin={tableMhs.filterPoin}
      setFilterPoin={tableMhs.setFilterPoin}
      /* pagination */
      pagination={tableMhs.pagination}
      /* modal state */
      isDetailOpen={tableMhs.isDetailOpen}
      isTambahOpen={tableMhs.isTambahOpen}
      isEditOpen={tableMhs.isEditOpen}
      isExcelOpen={tableMhs.isExcelOpen}
      excelConfig={tableMhs.excelConfig}
      /* modal handler */
      openDetail={tableMhs.openDetail}
      closeDetail={tableMhs.closeDetail}
      openTambah={tableMhs.openTambah}
      closeTambah={tableMhs.closeTambah}
      openEdit={tableMhs.openEdit}
      closeEdit={tableMhs.closeEdit}
      /* actions */
      openCetak={tableMhs.openCetak}
      handleTambahSuccess={tableMhs.handleTambahSuccess}
      handleUpdate={tableMhs.handleUpdate}
      handleDelete={tableMhs.handleDelete}
      openImportExcel={tableMhs.openImportExcel}
      handleExportExcel={tableMhs.handleExportExcel}
      setIsExcelOpen={tableMhs.setIsExcelOpen}
      handleImportSuccess={tableMhs.handleImportSuccess}
    />
  );
}
