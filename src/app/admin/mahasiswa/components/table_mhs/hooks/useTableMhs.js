"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import { useToast } from "@/components/Toats";
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

export default function useTableMhs() {
  const { addToast } = useToast();

  // ==========================
  // STATE DATA
  // ==========================
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ==========================
  // STATE MODAL
  // ==========================
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExcelOpen, setIsExcelOpen] = useState(false);

  // ==========================
  // EXCEL CONFIG
  // ==========================
  const [excelConfig, setExcelConfig] = useState({
    title: "",
    importUrl: "",
    exportUrl: "",
  });

  // ==========================
  // FILTER & SEARCH
  // ==========================
  const [search, setSearch] = useState("");
  const [filterPoin, setFilterPoin] = useState("all");

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchMahasiswa = async () => {
    try {
      const res = await api.get("/mahasiswa");
      setStudentsData(res.data);
    } catch (error) {
      console.error(error);
      addToast({
        message: "Gagal memuat data mahasiswa",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // ==========================
  // FILTER + PAGINATION
  // ==========================
  const pagination = usePaginationFilter(
    studentsData,
    search,
    (mhs) => {
      const namaMatch = mhs.nama_mhs
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const nimMatch = mhs.nim?.includes(search);

      const poin = Number(mhs.total_poin) || 0;

      let matchPoin = true;

      if (filterPoin === "0") matchPoin = poin === 0;
      if (filterPoin === "1-10") matchPoin = poin >= 1 && poin <= 10;
      if (filterPoin === "11-25") matchPoin = poin >= 11 && poin <= 25;
      if (filterPoin === "26-50") matchPoin = poin >= 26 && poin <= 50;
      if (filterPoin === ">50") matchPoin = poin > 50;

      return (namaMatch || nimMatch) && matchPoin;
    },
    7
  );

  // ==========================
  // MODAL HANDLER
  // ==========================
  const openDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedStudent(null);
    setIsDetailOpen(false);
  };

  const openTambah = () => setIsTambahOpen(true);
  const closeTambah = () => setIsTambahOpen(false);

  const openEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setSelectedStudent(null);
    setIsEditOpen(false);
  };

  // ==========================
  // CETAK CV
  // ==========================
  const openCetak = (student) => {
    if (!student?.id_mhs) return;

    setIsDetailOpen(false);

    setTimeout(() => {
      window.open(`/cv/${student.id_mhs}`, "_blank", "noopener,noreferrer");
    }, 150);
  };

  // ==========================
  // CRUD
  // ==========================
  const handleTambahSuccess = () => {
    addToast({
      message: "Mahasiswa berhasil ditambahkan",
      type: "success",
    });
    closeTambah();
    fetchMahasiswa();
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      const formData = new FormData();

      Object.entries(updatedStudent).forEach(([key, val]) => {
        if (key === "foto") return;
        if (val === undefined || val === null) return;
        formData.append(key, val);
      });

      if (updatedStudent.foto instanceof File) {
        formData.append("foto", updatedStudent.foto);
      }

      const res = await api.put(
        `/mahasiswa/${updatedStudent.id_mhs}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updated = res.data.mahasiswa;

      setStudentsData((prev) => {
        const idx = prev.findIndex((m) => m.id_mhs === updated.id_mhs);
        if (idx === -1) return prev;

        const newData = [...prev];
        newData[idx] = updated;
        return newData;
      });

      addToast({
        message: "Data mahasiswa berhasil diperbarui",
        type: "success",
      });

      closeEdit();
    } catch (error) {
      let msg =
        error.response?.data?.message || "Gagal memperbarui data mahasiswa";

      if (
        msg.toLowerCase().includes("duplicate") ||
        msg.toLowerCase().includes("nim")
      ) {
        msg = "Gagal update: NIM sudah digunakan!";
      }

      addToast({ message: msg, type: "error" });
    }
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Hapus mahasiswa "${student.nama_mhs}"?`)) return;

    try {
      await api.delete(`/mahasiswa/${student.id_mhs}`);

      setStudentsData((prev) =>
        prev.filter((m) => m.id_mhs !== student.id_mhs)
      );

      addToast({
        message: "Mahasiswa berhasil dihapus",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        message: "Gagal menghapus mahasiswa",
        type: "error",
      });
    }
  };

  // ==========================
  // EXCEL
  // ==========================
  const openImportExcel = () => {
    setExcelConfig({
      title: "Import Excel Mahasiswa",
      importUrl: "/mahasiswa/import-excel",
      exportUrl: "/mahasiswa/export-excel",
    });
    setIsExcelOpen(true);
  };

  const handleImportSuccess = () => {
    fetchMahasiswa();
    setIsExcelOpen(false);
  };

  const handleExportExcel = async () => {
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

      addToast({
        message: "Export Excel berhasil",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        message: "Gagal export Excel",
        type: "error",
      });
    }
  };

  // ==========================
  // RETURN API
  // ==========================
  return {
    // data
    studentsData,
    selectedStudent,

    // filter
    search,
    setSearch,
    filterPoin,
    setFilterPoin,

    // pagination
    pagination,

    // modal state
    isDetailOpen,
    isTambahOpen,
    isEditOpen,
    isExcelOpen,
    excelConfig,

    // modal handler
    openDetail,
    closeDetail,
    openTambah,
    closeTambah,
    openEdit,
    closeEdit,

    // actions
    openCetak,
    handleTambahSuccess,
    handleUpdate,
    handleDelete,
    openImportExcel,
    handleImportSuccess,
    handleExportExcel,
    setIsExcelOpen,

    // utils
    fetchMahasiswa,
    setSelectedStudent,
  };
}
