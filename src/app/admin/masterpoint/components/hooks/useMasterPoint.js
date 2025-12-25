"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/components/Toats";
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

export default function UseMasterPoint({ role = "mahasiswa" } = {}) {
  const { addToast } = useToast();
  const isAdmin = role === "admin";

  // ==========================
  // STATE DATA
  // ==========================
  const [kegiatan, setKegiatan] = useState([]);

  // ==========================
  // STATE UI
  // ==========================
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  const [importConfig, setImportConfig] = useState({
    title: "",
    importUrl: "",
    exportUrl: "",
  });

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchData = async () => {
    try {
      const res = await api.get("/masterpoin");

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

  // ==========================
  // FILTER + PAGINATION
  // ==========================
  const pagination = usePaginationFilter(
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
    7
  );

  // ==========================
  // BADGE CLASS
  // ==========================
  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  // ==========================
  // EXPORT EXCEL
  // ==========================
  const handleExportExcel = async () => {
    try {
      setLoadingExport(true);

      const response = await api.get("/masterpoin/export-excel", {
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
        if (match?.[1]) filename = match[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      addToast({
        message: "File Excel berhasil diexport",
        type: "success",
      });
    } catch (error) {
      addToast({
        message: error.response?.data?.message || "Gagal mengexport data",
        type: "danger",
      });
    } finally {
      setLoadingExport(false);
    }
  };

  // ==========================
  // TAMBAH DATA
  // ==========================
  const handleSave = async (newData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: newData.kode_keg,
        jenis_kegiatan: newData.jenis_kegiatan,
        posisi: newData.posisi,
        bobot_poin: parseInt(newData.bobot_poin, 10),
      };

      const res = await api.post("/masterpoin", payload);

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

  // ==========================
  // EDIT DATA
  // ==========================
  const handleEditSave = async (updatedData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: updatedData.kode_keg,
        jenis_kegiatan: updatedData.jenis_kegiatan,
        posisi: updatedData.posisi,
        bobot_poin: parseInt(updatedData.bobot_poin, 10),
      };

      const res = await api.put(`/masterpoin/${updatedData.id}`, payload);

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

  // ==========================
  // EDIT TRIGGER
  // ==========================
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

  // ==========================
  // DELETE
  // ==========================
  const handleDelete = (item) => {
    if (!isAdmin) return;

    addToast({
      message: `Hapus kegiatan ${item.jenis} - ${item.peran}?`,
      type: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/masterpoin/${item.id}`);
          setKegiatan((prev) => prev.filter((i) => i.id !== item.id));
          addToast({
            message: "Data berhasil dihapus",
            type: "success",
          });
        } catch (error) {
          addToast({
            message: error.response?.data?.message || error.message,
            type: "danger",
          });
        }
      },
    });
  };

  // ==========================
  // RETURN API
  // ==========================
  return {
    // role
    isAdmin,

    // data
    kegiatan,

    // search
    searchTerm,
    setSearchTerm,

    // pagination
    pagination,

    // ui state
    isModalOpen,
    setIsModalOpen,
    isEditOpen,
    setIsEditOpen,
    isImportOpen,
    setIsImportOpen,
    editData,
    importConfig,
    setImportConfig,
    loadingExport,

    // actions
    getBadgeClass,
    handleExportExcel,
    handleSave,
    handleEditSave,
    handleEditTrigger,
    handleDelete,
    fetchData,
  };
}
