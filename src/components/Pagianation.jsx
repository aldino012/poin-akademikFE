"use client";

import React from "react";

export default function TablePagination({
  currentPage = 1,
  setCurrentPage = () => {},
  totalPages = 1,
  startIndex = 0,
  endIndex = 0,
  filteredCount = 0,
}) {
  if (filteredCount === 0) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 640;

    if (isMobile) {
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage === 1) {
          pages.push(1, 2, "...", totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1, "...", totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      }
    } else {
      const maxVisible = 5;
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-white rounded-lg shadow-sm border mt-4">
      <div className="text-sm text-gray-600">
        Menampilkan{" "}
        <span className="font-bold text-blue-600">
          {startIndex + 1} - {endIndex}
        </span>{" "}
        dari <span className="font-bold">{filteredCount}</span> data
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {pageNumbers.map((p, i) =>
          p === "..." ? (
            <span key={i}>...</span>
          ) : (
            <button
              key={i}
              onClick={() => setCurrentPage(p)}
              className={p === currentPage ? "font-bold" : ""}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
