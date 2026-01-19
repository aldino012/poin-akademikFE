"use client";
import { useState, useEffect, useMemo } from "react";

export default function usePaginationFilter(
  data = [],
  search,
  filterFn,
  itemsPerPage = 7,
  filterDeps = [],
) {
  const [currentPage, setCurrentPage] = useState(1);

  // ==========================
  // FILTER DATA (MEMOIZED)
  // ==========================
  const filtered = useMemo(() => {
    return data.filter(filterFn);
  }, [data, filterFn]);

  // ==========================
  // TOTAL PAGE
  // ==========================
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // ==========================
  // 🔥 RESET PAGE SAAT DATA BERUBAH
  // ==========================
  useEffect(() => {
    setCurrentPage(1);
  }, [search, data.length, ...filterDeps]);

  // ==========================
  // JAGA PAGE VALID
  // ==========================
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // ==========================
  // CURRENT ITEMS
  // ==========================
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  return {
    filtered,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  };
}
