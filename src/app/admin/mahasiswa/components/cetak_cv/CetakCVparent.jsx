"use client";

import { useEffect } from "react";

/* ================= IMPORT COMPONENT ================= */
import KopHeaderCV from "./KopHeaderCV";
import BiodataCV from "./BiodataCV";
import OrganisasiCV from "./OrganisasiCV";
import PrestasiCV from "./PrestasiCV";
import FooterCV from "./FooterCV";

export default function CetakCVparent({ biodata, organisasi, prestasi }) {
  // ================= LOAD CSS & FONT =================
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/cv/style/cv.css";
    link.id = "cv-style";
    document.head.appendChild(link);

    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    fa.id = "font-awesome";
    document.head.appendChild(fa);

    return () => {
      document.getElementById("cv-style")?.remove();
      document.getElementById("font-awesome")?.remove();
    };
  }, []);

  if (!biodata) {
    return (
      <div className="p-10 text-center text-gray-500">Memuat data CV...</div>
    );
  }

  const handlePrint = () => window.print();

  return (
    <>
      {/* ================= FLOATING PRINT BUTTON ================= */}
      <button className="btn-print-floating" onClick={handlePrint}>
        <i className="fas fa-print"></i>
        <span>Cetak CV</span>
      </button>

      {/* ================= CV ================= */}
      <div className="cv-container">
        <KopHeaderCV biodata={biodata} />

        <div className="content-wrapper">
          <BiodataCV biodata={biodata} />
          <OrganisasiCV organisasi={organisasi} />
          <PrestasiCV prestasi={prestasi} />
          <FooterCV biodata={biodata} />
        </div>
      </div>
    </>
  );
}
