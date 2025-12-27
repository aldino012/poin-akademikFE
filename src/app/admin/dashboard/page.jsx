"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Cards from "./components/Cards";
import BarChartAngkatan from "./components/GrafikBar";
import PieChartKegiatan from "./components/GrafikChart";

import api from "@/app/api/axios";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  // ================================
  // STATE DASHBOARD
  // ================================
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalKegiatan: 0,
    pendingKegiatan: 0,
  });

  const [grafikAngkatan, setGrafikAngkatan] = useState([]);

  // ================================
  // FETCH DASHBOARD DATA
  // ================================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // ================================
        // ✅ FETCH MAHASISWA
        // ================================
        const resMhs = await api.get("/mahasiswa");
        const mahasiswa = resMhs.data || [];

        const totalMahasiswa = mahasiswa.length;

        // ================================
        // 🔥 HITUNG GRAFIK ANGKATAN
        // ================================
        const angkatanMap = {};

        mahasiswa.forEach((mhs) => {
          const angkatan = mhs.angkatan || "Tidak diketahui";
          angkatanMap[angkatan] = (angkatanMap[angkatan] || 0) + 1;
        });

        const grafik = Object.entries(angkatanMap)
          .map(([angkatan, jumlah]) => ({
            angkatan,
            jumlah,
          }))
          .sort((a, b) => Number(a.angkatan) - Number(b.angkatan));

        setGrafikAngkatan(grafik);

        // ================================
        // ✅ FETCH KLAIM KEGIATAN
        // ================================
        const resKegiatan = await api.get("/klaim");
        const kegiatan = resKegiatan.data?.data || [];

        const totalKegiatan = kegiatan.length;

        // 🔥 FIX UTAMA:
        // Menunggu verifikasi = Diajukan + Diajukan ulang
        const pendingKegiatan = kegiatan.filter(
          (item) =>
            item.status === "Diajukan" || item.status === "Diajukan ulang"
        ).length;

        // ================================
        // SET STATS
        // ================================
        setStats({
          totalMahasiswa,
          totalKegiatan,
          pendingKegiatan,
        });
      } catch (err) {
        console.error("Gagal fetch dashboard admin:", err);
      } finally {
        // sedikit delay agar transisi halus
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchDashboard();
  }, []);

  // ================================
  // RENDER
  // ================================
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-screen text-lg font-medium text-gray-600"
        >
          Memuat data dashboard...
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* ================================
              CARDS STATISTIK
          ================================ */}
          <Cards data={stats} />

          {/* ================================
              GRAFIK
          ================================ */}
          <BarChartAngkatan data={grafikAngkatan} />
          <PieChartKegiatan />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
