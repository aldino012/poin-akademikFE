"use client";

import React from "react";
import useTableVerif from "./hooks/useTableVerif";
import TableVerifView from "./TableVerifView";

export default function TableVerif() {
  const verif = useTableVerif();

  return (
    <TableVerifView
      claims={verif.claims}
      loading={verif.loading}
      search={verif.search}
      setSearch={verif.setSearch}
      statusColors={verif.statusColors}
      pagination={verif.pagination}
      isDetailOpen={verif.isDetailOpen}
      selectedClaim={verif.selectedClaim}
      openDetail={verif.openDetail}
      closeDetail={verif.closeDetail}
      updateStatus={verif.updateStatus}
      importKlaimExcel={verif.importKlaimExcel} // 🔹 TERUSKAN fungsi import
    />
  );
}
