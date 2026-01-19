"use client";

import React from "react";

export default function TablePagination({
  currentPage = 1,
  setCurrentPage = () => {},
  filteredCount = 0,
  itemsPerPage = 7,
}) {
  const totalPages = Math.ceil(filteredCount / itemsPerPage);
  const startIndex =
    filteredCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredCount);

  // Generate page numbers with responsive logic
  const generatePageNumbers = () => {
    const pages = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640; // sm breakpoint

    if (isMobile) {
      // Mobile: Tampilkan minimal halaman
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage === 1) {
          // Halaman pertama
          pages.push(1, 2, "...", totalPages);
        } else if (currentPage === totalPages) {
          // Halaman terakhir
          pages.push(1, "...", totalPages - 1, totalPages);
        } else if (currentPage === 2) {
          // Halaman kedua
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage === totalPages - 1) {
          // Halaman kedua dari belakang
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          // Halaman di tengah
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      }
    } else {
      // Desktop: Logika asli
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push("...");
          pages.push(currentPage - 1);
          pages.push(currentPage);
          pages.push(currentPage + 1);
          pages.push("...");
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (filteredCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-white rounded-lg shadow-sm border mt-4">
      {/* Info jumlah data - Responsive text */}
      <div className="text-sm text-gray-600">
        <span className="hidden sm:inline font-medium">Menampilkan</span>
        <span className="sm:hidden font-medium">Hal</span>{" "}
        <span className="font-bold text-blue-600">
          {startIndex} - {endIndex}
        </span>{" "}
        <span className="hidden sm:inline font-medium">dari</span>{" "}
        <span className="font-bold text-gray-800">{filteredCount}</span>{" "}
        <span className="hidden sm:inline font-medium">data</span>
      </div>

      {/* Navigasi halaman */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Tombol Previous */}
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`
            flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border
            transition-all duration-200 font-medium text-sm
            ${
              currentPage === 1
                ? "bg-gray-50 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
            }
          `}
          aria-label="Halaman sebelumnya"
        >
          <i className="fas fa-chevron-left text-xs sm:text-sm"></i>
        </button>

        {/* Nomor halaman */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {pageNumbers.map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === "..." ? (
                <span className="flex items-center justify-center w-6 h-8 sm:w-9 sm:h-9 text-gray-500 font-medium text-sm">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border text-xs sm:text-sm
                    transition-all duration-200 font-medium
                    ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }
                  `}
                  aria-label={`Halaman ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`
            flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border
            transition-all duration-200 font-medium text-sm
            ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-50 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
            }
          `}
          aria-label="Halaman berikutnya"
        >
          <i className="fas fa-chevron-right text-xs sm:text-sm"></i>
        </button>
      </div>
    </div>
  );
}
