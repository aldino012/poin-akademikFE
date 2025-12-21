"use client"

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TableMaster from "./MasterComponent/TableMaster";
import CardMaster from "./MasterComponent/CardMaster";
import Pagination from "../components/Pagianation";
import InfoBobotPoin from "./MasterComponent/InfoBobotPoin";
import ModalTambahPoin from "./MasterComponent/Tambah";
import ModalEditPoin from "./MasterComponent/Edit";
import ModalExcel from "./MasterComponent/ModalExcel";
import { useToast } from "@/components/Toats";
import api from "@/api/axios";

// 🔥 IMPORT HOOK PAGINATION
import usePaginationFilter from "@/app/hooks/usePaginationFilter";

// Helper untuk normalisasi data jadi uppercase
function toUpperObj(obj) {
  return {
    ...obj,
    kode: obj.kode.toUpperCase(),
    jenis: obj.jenis.toUpperCase(),
    peran: obj.peran.toUpperCase(),
  };
}

export default function MasterPoint({ role = "mahasiswa" }) {
  const { addToast } = useToast();
  const isAdmin = role === "admin";

  const [kegiatan, setKegiatan] = useState([]);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importConfig, setImportConfig] = useState({
    title: "",
    importUrl: "",
    exportUrl: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loadingExport, setLoadingExport] = useState(false);

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await api.get("/api/masterpoin");

      const mapped = res.data.map((item) =>
        toUpperObj({
          id: item.id_poin,
          kode: item.kode_keg,
          jenis: item.jenis_kegiatan,
          peran: item.posisi,
          poin: item.bobot_poin,
        })
      );

      setKegiatan(mapped);
    } catch (error) {
      addToast({
        message: error.response?.data?.message || error.message,
        type: "danger",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Export Excel
  const handleExportExcel = async () => {
    try {
      setLoadingExport(true);

      const response = await api.get("/api/masterpoin/export-excel", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      let filename = "master-poin.xlsx";
      const contentDisposition = response.headers["content-disposition"];

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) filename = match[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      addToast({ message: "File Excel berhasil diexport", type: "success" });
    } catch (error) {
      addToast({
        message: error.response?.data?.message || "Gagal mengexport data",
        type: "danger",
      });
    } finally {
      setLoadingExport(false);
    }
  };

  // ======================================================
  // 🔥 FILTER + PAGINATION WITH CUSTOM HOOK (REPLACES OLD SYSTEM)
  // ======================================================
  const {
    filtered,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  } = usePaginationFilter(
    kegiatan,
    searchTerm,
    (item) => {
      const s = searchTerm.toLowerCase();
      return (
        item.jenis.toLowerCase().includes(s) ||
        item.peran.toLowerCase().includes(s) ||
        item.kode.toLowerCase().includes(s)
      );
    },
    7 // items per page
  );

  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  // Tambah data (admin only)
  const handleSave = async (newData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: newData.kode_keg,
        jenis_kegiatan: newData.jenis_kegiatan,
        posisi: newData.posisi,
        bobot_poin: parseInt(newData.bobot_poin, 10),
      };

      const res = await api.post("/api/masterpoin", payload);

      setKegiatan((prev) => [
        ...prev,
        toUpperObj({
          id: res.data.data.id_poin,
          kode: res.data.data.kode_keg,
          jenis: res.data.data.jenis_kegiatan,
          peran: res.data.data.posisi,
          poin: res.data.data.bobot_poin,
        }),
      ]);

      addToast({ message: res.data.message, type: "success" });
      setIsModalOpen(false);
    } catch (error) {
      addToast({
        message: error.response?.data?.message || error.message,
        type: "danger",
      });
    }
  };

  // Edit data (admin only)
  const handleEditSave = async (updatedData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: updatedData.kode_keg,
        jenis_kegiatan: updatedData.jenis_kegiatan,
        posisi: updatedData.posisi,
        bobot_poin: parseInt(updatedData.bobot_poin, 10),
      };

      const res = await api.put(`/api/masterpoin/${updatedData.id}`, payload);

      setKegiatan((prev) =>
        prev.map((item) =>
          item.id === updatedData.id
            ? toUpperObj({
                id: res.data.data.id_poin,
                kode: res.data.data.kode_keg,
                jenis: res.data.data.jenis_kegiatan,
                peran: res.data.data.posisi,
                poin: res.data.data.bobot_poin,
              })
            : item
        )
      );

      addToast({ message: res.data.message, type: "success" });
      setIsEditOpen(false);
    } catch (error) {
      addToast({
        message: error.response?.data?.message || error.message,
        type: "danger",
      });
    }
  };

  // Buka modal edit
  const handleEditTrigger = (item) => {
    if (!isAdmin) return;

    setEditData({
      id: item.id,
      kode_keg: item.kode,
      jenis_kegiatan: item.jenis,
      posisi: item.peran,
      bobot_poin: item.poin,
    });

    setIsEditOpen(true);
  };

  // Delete data
  const handleDelete = (item) => {
    if (!isAdmin) return;

    addToast({
      message: `Hapus kegiatan ${item.jenis} - ${item.peran}?`,
      type: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/api/masterpoin/${item.id}`);
          setKegiatan((prev) => prev.filter((i) => i.id !== item.id));
          addToast({ message: "Data berhasil dihapus", type: "success" });
        } catch (error) {
          addToast({
            message: error.response?.data?.message || error.message,
            type: "danger",
          });
        }
      },
    });
  };

  return (
    <div className="p-3 space-y-3">
      {/* Search + Action */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between mb-2">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        </div>

        {isAdmin && (
          <div className="flex flex-wrap gap-3">
            {/* Tambah Data Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-plus text-sm"></i>
              <span>Tambah Data</span>
            </button>

            {/* Export Excel Button */}
            <button
              onClick={handleExportExcel}
              disabled={loadingExport || kegiatan.length === 0}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingExport ? (
                <>
                  <i className="fas fa-spinner fa-spin text-sm"></i>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-file-export text-sm"></i>
                  <span>Export Excel</span>
                </>
              )}
            </button>

            {/* Import Excel Button */}
            <button
              onClick={() => {
                setImportConfig({
                  title: "Import Excel Master Poin",
                  importUrl: "/api/masterpoin/import-excel",
                  exportUrl: "/api/masterpoin/export-excel",
                });
                setIsImportOpen(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-file-import text-sm"></i>
              <span>Import Excel</span>
            </button>
          </div>
        )}
      </div>

      {/* Table & Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <TableMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
        />
        <CardMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filtered.length}
      />

      {/* Info Bobot */}
      <InfoBobotPoin />

      {/* Modal Tambah */}
      <ModalTambahPoin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Modal Edit */}
      <ModalEditPoin
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialData={editData}
      />

      <ModalExcel
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImported={fetchData}
        title={importConfig.title}
        importUrl={importConfig.importUrl}
        exportUrl={importConfig.exportUrl}
      />
    </div>
  );
}
