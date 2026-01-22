"use client";

import React from "react";

// 🔥 LOGIC
import useKlaimKegiatan from "./hooks/useKlaimKegiatan";

// 🎨 VIEW
import KlaimViews from "./KlaimViews";

export default function KegiatanMhs() {
  // ==========================
  // AMBIL SEMUA LOGIC
  // ==========================
  const klaim = useKlaimKegiatan();

  // ==========================
  // RENDER VIEW
  // ==========================
  return (
    <KlaimViews
      /* data */
      claims={klaim.claims}
      loading={klaim.claims.length === 0} // <-- tambahkan loading state
      /* search */
      searchTerm={klaim.searchTerm}
      setSearchTerm={klaim.setSearchTerm}
      /* status */
      statusColors={klaim.statusColors}
      /* pagination */
      pagination={klaim.pagination}
      /* animations */
      buttonAnimation={klaim.buttonAnimation}
      pulseAnimation={klaim.pulseAnimation}
      /* mounted */
      mounted={klaim.mounted}
      /* detail modal */
      selectedClaim={klaim.selectedClaim}
      isDetailOpen={klaim.isDetailOpen}
      openDetail={klaim.openDetail}
      closeDetail={klaim.closeDetail}
      /* klaim poin modal */
      isPoinOpen={klaim.isPoinOpen}
      openPoin={klaim.openPoin}
      closePoin={klaim.closePoin}
      /* edit modal */
      editClaim={klaim.editClaim}
      isEditOpen={klaim.isEditOpen}
      openEdit={klaim.openEdit}
      closeEdit={klaim.closeEdit}
    />
  );
}
