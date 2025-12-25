"use client";

import React from "react";

// 🔥 LOGIC
import useMasterPoint from "./hooks/useMasterPoint";

// 🎨 VIEW
import MasterPointView from "./MasterPointView";

export default function MasterPoint({ role = "mahasiswa" }) {
  // ==========================
  // AMBIL LOGIC DARI HOOK
  // ==========================
  const masterPoint = useMasterPoint({ role });

  // ==========================
  // RENDER VIEW
  // ==========================
  return (
    <MasterPointView
      /* role */
      isAdmin={masterPoint.isAdmin}
      /* data */
      kegiatan={masterPoint.kegiatan}
      /* search */
      searchTerm={masterPoint.searchTerm}
      setSearchTerm={masterPoint.setSearchTerm}
      /* pagination */
      pagination={masterPoint.pagination}
      /* ui state */
      isModalOpen={masterPoint.isModalOpen}
      setIsModalOpen={masterPoint.setIsModalOpen}
      isEditOpen={masterPoint.isEditOpen}
      setIsEditOpen={masterPoint.setIsEditOpen}
      isImportOpen={masterPoint.isImportOpen}
      setIsImportOpen={masterPoint.setIsImportOpen}
      editData={masterPoint.editData}
      importConfig={masterPoint.importConfig}
      setImportConfig={masterPoint.setImportConfig}
      loadingExport={masterPoint.loadingExport}
      /* actions */
      getBadgeClass={masterPoint.getBadgeClass}
      handleExportExcel={masterPoint.handleExportExcel}
      handleSave={masterPoint.handleSave}
      handleEditSave={masterPoint.handleEditSave}
      handleEditTrigger={masterPoint.handleEditTrigger}
      handleDelete={masterPoint.handleDelete}
      fetchData={masterPoint.fetchData}
    />
  );
}
