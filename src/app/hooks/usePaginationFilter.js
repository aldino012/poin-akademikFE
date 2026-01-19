"use client";
import { useState, useEffect } from "react";

export default function usePaginationFilter(
  data,
  search,
  filterFn,
  itemsPerPage = 7,
  filterDeps = [] // 🔥 tambahan penting
) {
  const [currentPage, setCurrentPage] = useState(1);

  // 1️⃣ Filter Data
  const filtered = data.filter(filterFn);

  // 2️⃣ Hitung total halaman
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // 3️⃣ Reset pagination hanya saat search atau filterDeps berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, ...filterDeps]); // 🔥 PERBAIKAN TERPENTING

  // 4️⃣ Jaga currentPage agar tidak melebihi totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // 5️⃣ Ambil item berdasarkan halaman sekarang
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
