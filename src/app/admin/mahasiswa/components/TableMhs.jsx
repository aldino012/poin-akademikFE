"use client";
import React, { useState, useEffect } from "react";
import api from "@/api/axios";

import TableToolbar from "./table_mhs/TableToolbar";
import TableDesktop from "./table_mhs/TableDesktop";
import TableMobile from "./table_mhs/TableMobile";
import TablePagination from "@/components/Pagianation";

import DetailModal from "./detail/DetailParent";
import ModalTambahMhs from "./tambah/TambahMainForm";
import ModalEdit from "./edit/EditMainForm";

import ModalExcel from "@/components/MasterComponent/ModalExcel";
import { useToast } from "@/components/Toats";

// 🔥 HOOK FILTER + PAGINATION
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function TableMhs() {
  const { addToast } = useToast();

  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [excelConfig, setExcelConfig] = useState({
    title: "",
    importUrl: "",
    exportUrl: "",
  });

  const [search, setSearch] = useState("");
  const [filterPoin, setFilterPoin] = useState("all");

  // ==========================
  // FETCH DATA MAHASISWA
  // ==========================
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const res = await api.get("/mahasiswa");

      // 🔥 BIARKAN BACKEND YANG NGATUR URUTAN
      setStudentsData(res.data);
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal memuat data mahasiswa", type: "error" });
    }
  };

  // ==========================
  // ✅ CETAK CV (AKTIF)
  // ==========================
  const openCetak = (student) => {
    if (!student?.id_mhs) return;

    // 🔥 PENTING: tutup modal detail dulu
    setIsModalOpen(false);

    // beri delay kecil agar backdrop benar-benar hilang
    setTimeout(() => {
      window.open(`/cv/${student.id_mhs}`, "_blank", "noopener,noreferrer");
    }, 150);
  };

  // ==========================
  // MODALS
  // ==========================
  const openTambah = () => setIsTambahOpen(true);
  const closeTambah = () => setIsTambahOpen(false);

  const openEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };
  const closeEdit = () => setIsEditOpen(false);

  const openDetail = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // ==========================
  // CRUD
  // ==========================
  const handleTambah = async () => {
    try {
      addToast({ message: "Mahasiswa berhasil ditambahkan", type: "success" });
      closeTambah();

      // 🔥 WAJIB: ambil ulang dari backend
      fetchMahasiswa();
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal menambah mahasiswa", type: "error" });
    }
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      const formData = new FormData();

      // ===============================
      // FIELD BIASA (KECUALI FOTO)
      // ===============================
      Object.entries(updatedStudent).forEach(([key, val]) => {
        if (key === "foto") return; // foto diproses khusus
        if (val === undefined || val === null) return;
        formData.append(key, val);
      });

      // ===============================
      // FOTO (HANYA JIKA FILE BARU)
      // ===============================
      if (updatedStudent.foto instanceof File) {
        formData.append("foto", updatedStudent.foto);
      }

      const res = await api.put(
        `/mahasiswa/${updatedStudent.id_mhs}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updated = res.data.mahasiswa; // 🔥 INI KUNCI UTAMA

      setStudentsData((prev) => {
        const index = prev.findIndex((s) => s.id_mhs === updated.id_mhs);

        if (index === -1) return prev;

        const newData = [...prev];
        newData[index] = updated; // 🔥 ganti data di posisi lama
        return newData;
      });

      addToast({
        message: "Data mahasiswa berhasil diperbarui",
        type: "success",
      });

      closeEdit();
    } catch (error) {
      let msg = error.response?.data?.message || "Gagal memperbarui data";

      if (
        msg.includes("Duplicate entry") ||
        msg.toLowerCase().includes("nim")
      ) {
        msg = "Gagal update: NIM tersebut sudah digunakan!";
      }

      addToast({ message: msg, type: "error" });
    }
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Hapus mahasiswa "${student.nama_mhs}"?`)) return;
    try {
      await api.delete(`/mahasiswa/${student.id_mhs}`);
     setStudentsData((prev) => prev.filter((s) => s.id_mhs !== student.id_mhs));
      addToast({ message: "Mahasiswa berhasil dihapus", type: "success" });
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal menghapus mahasiswa", type: "error" });
    }
  };

  // ==========================
  // IMPORT & EXPORT EXCEL
  // ==========================
  const handleOpenImport = () => {
    setExcelConfig({
      title: "Import Excel Mahasiswa",
      importUrl: "/mahasiswa/import-excel",
      exportUrl: "/mahasiswa/export-excel",
    });
    setIsExcelOpen(true);
  };

  const handleOpenExport = async () => {
    try {
      const res = await api.get("/mahasiswa/export-excel", {
      responseType: "blob",
     });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "Data_Mahasiswa.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      addToast({ message: "Export berhasil!", type: "success" });
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal export Excel", type: "error" });
    }
  };

  // ==========================
  // FILTER + PAGINATION
  // ==========================
  const {
    filtered,
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
    startIndex,
    endIndex,
  } = usePaginationFilter(
    studentsData,
    search,
    (s) => {
      const nom = s.nama_mhs?.toLowerCase().includes(search.toLowerCase());
      const nim = s.nim?.includes(search);
      const poin = Number(s.total_poin) || 0;

      let matchPoin = true;

      if (filterPoin === "0") matchPoin = poin === 0;
      if (filterPoin === "1-10") matchPoin = poin >= 1 && poin <= 10;
      if (filterPoin === "11-25") matchPoin = poin >= 11 && poin <= 25;
      if (filterPoin === "26-50") matchPoin = poin >= 26 && poin <= 50;
      if (filterPoin === ">50") matchPoin = poin > 50;

      return (nom || nim) && matchPoin;
    },
    7
  );

  // RENDER
  return (
    <div
      className="
        bg-white 
        rounded-xl 
        shadow-md 
        border 
        border-gray-100 
        p-4 
        overflow-y-visible
      "
    >
      {/* Toolbar */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        filterPoin={filterPoin}
        setFilterPoin={setFilterPoin}
        onAdd={openTambah}
        onImport={handleOpenImport}
        onExport={handleOpenExport}
        disableExport={studentsData.length === 0}
      />

      {/* Table */}
      <div className="overflow-y-visible">
        <TableDesktop
          students={currentItems}
          startIndex={startIndex}
          openDetail={openDetail}
          openCetak={openCetak}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
        <TableMobile
          students={currentItems}
          openDetail={openDetail}
          openCetak={openCetak}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* Modals */}
      <ModalTambahMhs
        isOpen={isTambahOpen}
        onClose={closeTambah}
        onSubmit={handleTambah}
      />
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
      />
      <ModalEdit
        isOpen={isEditOpen}
        onClose={closeEdit}
        student={selectedStudent}
        onSubmit={handleUpdate}
      />

      {/* Modal Excel Universal */}
      <ModalExcel
        isOpen={isExcelOpen}
        onClose={() => setIsExcelOpen(false)}
        title={excelConfig.title}
        importUrl={excelConfig.importUrl}
        exportUrl={excelConfig.exportUrl}
        onImported={fetchMahasiswa}
      />
    </div>
  );
}
