"use client";

import React from "react";
import useTableVerif from "./hooks/useTableVerif";
import TableVerifView from "./TableVerifView";

export default function TableVerif() {
  const verif = useTableVerif();

  return (
    <TableVerifView
      /* ===== DATA ===== */
      claims={verif.claims}
      loading={verif.loading}
      search={verif.search}
      setSearch={verif.setSearch}
      statusColors={verif.statusColors}
      pagination={verif.pagination}
      /* ===== MODAL DETAIL ===== */
      isDetailOpen={verif.isDetailOpen}
      selectedClaim={verif.selectedClaim}
      openDetail={verif.openDetail}
      closeDetail={verif.closeDetail}
      /* ===== ACTIONS ===== */
      updateStatus={verif.updateStatus}
      importExcel={verif.importExcel} // ✅ hook importExcel sudah pass ke view
      importLoading={verif.importLoading} // ✅ state loading import
    />
  );
}
