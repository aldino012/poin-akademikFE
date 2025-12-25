"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import api from "@/api/axios";

// Components
import TableDesktop from "./klaim_poin/TableDesktop";
import EditKegiatanModal from "./edit/EditParent";
import TableMobile from "./klaim_poin/TableMobile";
import TablePagination from "@/components/Pagianation";
import ModalDetail from "./modal_detail/DetailParent";
import ModalPoin from "./klaim_poin_modal/KlaimParent";

// 🔥 import hook terbaru
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function KegiatanMhs() {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  // Modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPoinOpen, setIsPoinOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editClaim, setEditClaim] = useState(null);

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Warna status
  const statusColors = {
    Diajukan: "bg-blue-100 text-blue-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "Diajukan ulang": "bg-orange-100 text-orange-700",
    Disetujui: "bg-green-100 text-green-700",
    Ditolak: "bg-red-100 text-red-700",
  };

  // ==============================================
  // FETCH DATA
  // ==============================================
  const fetchClaims = async () => {
    try {
      const res = await api.get("/klaim");
      const serverData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      // mapping data klaim
      const formatted = serverData.map((item) => ({
        id: item.id,
        tanggal_pengajuan: item.tanggal_pengajuan,
        tanggal_pelaksanaan: item.tanggal_pelaksanaan,
        rincian_acara: item.rincian_acara,
        bukti_file_id: item.bukti_file_id,
        poin: item.poin,
        status: item.status,
        masterPoin: item.masterPoin || null,
        raw: item,
      }));

      // ==============================================
      // 🔥 SORTING STATUS (PRIORITAS)
      // ==============================================
      const statusOrder = {
        Disetujui: 1,
        Revisi: 2,
        Diajukan: 3,
        "Diajukan ulang": 4,
        Ditolak: 5,
      };

      const sortedData = formatted.sort((a, b) => {
        const orderA = statusOrder[a.status] ?? 999;
        const orderB = statusOrder[b.status] ?? 999;
        return orderA - orderB;
      });

      setClaims(sortedData);
    } catch (err) {
      console.error("ERROR FETCH KLAIM:", err);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // ==============================================
  // ANIMASI
  // ==============================================
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ==============================================
  // FILTER & PAGINATION — PAKAI HOOK BARU
  // ==============================================
  const filterFn = (item) =>
    (item.rincian_acara || "").toLowerCase().includes(searchTerm.toLowerCase());

  const {
    filtered,
    currentItems: currentClaims,
    currentPage: pageNow,
    setCurrentPage: setPage,
    totalPages,
    startIndex,
    endIndex,
  } = usePaginationFilter(
    claims, // semua data
    searchTerm, // search
    filterFn, // filter
    7, // jumlah item per halaman
    [] // tidak ada filter tambahan
  );

  // ==============================================
  // MODAL DETAIL
  // ==============================================
  const openDetailModal = (claim) => {
    setSelectedClaim(claim.raw || claim);
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedClaim(null);
    setIsDetailOpen(false);
  };

  // ==============================================
  // MODAL KLAIM POIN
  // ==============================================
  const openPoinModal = () => {
    setButtonAnimation(true);
    setTimeout(() => {
      setButtonAnimation(false);
      setIsPoinOpen(true);
    }, 200);
  };

  const closePoinModal = () => {
    setIsPoinOpen(false);
    fetchClaims();
  };

  // ==============================================
  // MODAL EDIT KLAIM
  // ==============================================
  const openEditModalDesktop = (claim) => {
    setEditClaim(claim.raw || claim);
    setIsEditOpen(true);
  };

  const closeEditModalDesktop = () => {
    setEditClaim(null);
    setIsEditOpen(false);
    fetchClaims();
  };

  // ==============================================
  // MOUNTING CLIENT
  // ==============================================
  useEffect(() => setMounted(true), []);

  // ==============================================
  // RENDER
  // ==============================================
  return (
    <div className="p-2 md:p-3">
      {/* === TOOLBAR FIXED WIDTH === */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-5">
        {/* Search — UKURAN FLEKSIBEL SESUAI TOMBOL */}
        <div className="w-full md:w-auto md:flex-1 max-w-[350px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                pl-9 pr-4 py-2.5
                border border-gray-300 rounded-lg
                text-sm w-full
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                focus:outline-none
                bg-white text-gray-800
                placeholder-gray-500
                transition-all duration-200
                shadow-sm
              `}
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            )}
          </div>
        </div>

        {/* Tombol Klaim Poin - MEMANJANG HORIZONTAL */}
        <div className="w-full md:w-auto">
          <button
            onClick={openPoinModal}
            className={`
              relative
              bg-gradient-to-r from-green-600 to-green-500
              text-white
              px-7 py-3 rounded-lg
              shadow-lg hover:shadow-xl
              hover:from-green-700 hover:to-green-600
              transition-all duration-300
              w-full md:w-auto
              min-w-[280px]
              max-w-[320px]
              flex items-center justify-center
              overflow-hidden
              ${buttonAnimation ? "scale-[0.98]" : "scale-100"}
              group
              h-auto
            `}
          >
            {/* Shining effect - garis putih berjalan */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shining"></div>
            </div>

            {/* Subtle shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Konten tombol - ICON + TEKS DENGAN SPASI LEBIH */}
            <div className="relative flex items-center justify-center gap-3 w-full">
              <div className="relative">
                <i className="fas fa-star text-yellow-300 text-lg animate-pulse-slow"></i>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm tracking-wide">
                  Klaim Poin Kegiatan
                </span>
                <span className="text-xs text-green-100 font-medium opacity-90">
                  Ajukan kegiatan baru
                </span>
              </div>
            </div>

            {/* Efek glow saat hover */}
            <div className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* === CARD UTAMA (TABLE WRAPPED) === */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* TABLE DESKTOP */}
        <TableDesktop
          currentClaims={currentClaims}
          startIndex={startIndex}
          statusColors={statusColors}
          openDetailModalDesktop={openDetailModal}
          openEditModalDesktop={openEditModalDesktop}
        />

        {/* TABLE MOBILE */}
        <TableMobile
          currentClaims={currentClaims}
          statusColors={statusColors}
          openDetailModal={openDetailModal}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 md:mt-5">
        <TablePagination
          currentPage={pageNow}
          setCurrentPage={setPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredCount={filtered.length}
        />
      </div>

      {/* MODALS */}
      {mounted &&
        isDetailOpen &&
        selectedClaim &&
        createPortal(
          <ModalDetail
            isOpen={isDetailOpen}
            onClose={closeDetailModal}
            claim={selectedClaim}
            role="mahasiswa"
          />,
          document.body
        )}

      {mounted &&
        isPoinOpen &&
        createPortal(
          <ModalPoin isOpen={isPoinOpen} onClose={closePoinModal} />,
          document.body
        )}

      {mounted &&
        isEditOpen &&
        editClaim &&
        createPortal(
          <EditKegiatanModal
            isOpen={isEditOpen}
            onClose={closeEditModalDesktop}
            claim={editClaim}
            onUpdated={fetchClaims}
          />,
          document.body
        )}

      <style jsx>{`
        @keyframes shining {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-shining {
          animation: shining 2s infinite;
          animation-delay: 1s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }

        .group:hover .animate-shining {
          animation: shining 1.5s infinite;
          animation-delay: 0s;
        }
      `}</style>
    </div>
  );
}
