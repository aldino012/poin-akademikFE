"use client";

import React from "react";
import { createPortal } from "react-dom";

// components
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";

import ModalDetail from "../modal_detail/DetailParent";
import ModalPoin from "../klaim_poin_modal/KlaimParent";
import EditKegiatanModal from "../edit/EditParent";

export default function KlaimViews({
  // data
  claims,
  loading,

  // search
  searchTerm,
  setSearchTerm,

  // status
  statusColors,

  // pagination
  pagination,

  // animations
  buttonAnimation,
  pulseAnimation,

  // mounted
  mounted,

  // detail modal
  selectedClaim,
  isDetailOpen,
  openDetail,
  closeDetail,

  // klaim poin modal
  isPoinOpen,
  openPoin,
  closePoin,

  // edit modal
  editClaim,
  isEditOpen,
  openEdit,
  closeEdit,
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
    <div className="p-2 md:p-3">
      {/* ==========================
          TOOLBAR
      ========================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-5">
        {/* SEARCH */}
        <div className="w-full md:flex-1 max-w-[350px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-9 pr-4 py-2.5
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

        {/* KLAIM POIN BUTTON */}
        <div className="w-full md:w-auto">
          <button
            onClick={openPoin}
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
            `}
          >
            {/* Shining effect */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shining"></div>
            </div>

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative flex items-center gap-3">
              <i
                className={`fas fa-star text-yellow-300 text-lg ${
                  pulseAnimation ? "animate-pulse-slow" : ""
                }`}
              ></i>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm">
                  Klaim Poin Kegiatan
                </span>
                <span className="text-xs text-green-100 opacity-90">
                  Ajukan kegiatan baru
                </span>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* ==========================
          TABLE
      ========================== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <i className="fas fa-spinner fa-spin text-3xl text-blue-600 mb-3"></i>
            <span className="text-sm">Memuat data klaim kegiatan...</span>
          </div>
        ) : (
          <>
            <TableDesktop
              currentClaims={currentItems}
              startIndex={startIndex}
              statusColors={statusColors}
              openDetailModalDesktop={openDetail}
              openEditModalDesktop={openEdit}
            />

            <TableMobile
              currentClaims={currentItems}
              statusColors={statusColors}
              openDetailModal={openDetail}
            />
          </>
        )}
      </div>

      {/* ==========================
          PAGINATION
      ========================== */}
      {!loading && (
        <div className="mt-4 md:mt-5">
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            filteredCount={filtered.length}
          />
        </div>
      )}

      {/* ==========================
          MODALS
      ========================== */}
      {mounted &&
        isDetailOpen &&
        selectedClaim &&
        createPortal(
          <ModalDetail
            isOpen={isDetailOpen}
            onClose={closeDetail}
            claim={selectedClaim}
            role="mahasiswa"
          />,
          document.body,
        )}

      {mounted &&
        isPoinOpen &&
        createPortal(
          <ModalPoin isOpen={isPoinOpen} onClose={closePoin} />,
          document.body,
        )}

      {mounted &&
        isEditOpen &&
        editClaim &&
        createPortal(
          <EditKegiatanModal
            isOpen={isEditOpen}
            onClose={closeEdit}
            claim={editClaim}
            onUpdated={() => {}}
          />,
          document.body,
        )}

      {/* ==========================
          ANIMATION STYLE
      ========================== */}
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
