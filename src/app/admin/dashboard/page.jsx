"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "./components/Cards";
import BarChartAngkatan from "./components/GrafikBar";
import PieChartKegiatan from "./components/GrafikChart";
import api from "@/app/api/axios";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  // 🔥 State untuk data dashboard
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalKegiatan: 0,
    pendingKegiatan: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // ================================
        // ✅ Ambil data mahasiswa (BENAR)
        // ================================
        const resMhs = await api.get("/mahasiswa");
        const totalMahasiswa = resMhs.data.length;

        // ================================
        // ✅ Ambil data kegiatan (BENAR)
        // ================================
        const resKegiatan = await api.get("/klaim");
        const kegiatan = resKegiatan.data.data || [];

        const totalKegiatan = kegiatan.length;
        const pendingKegiatan = kegiatan.filter(
          (item) => item.status === "pending"
        ).length;

        setStats({
          totalMahasiswa,
          totalKegiatan,
          pendingKegiatan,
        });
      } catch (err) {
        console.error("Gagal fetch dashboard admin:", err);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchDashboard();
  }, []);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="space-y-6"
        >
          {/* 🔥 Kirim data dashboard ke Cards */}
          <Cards data={stats} />

          <BarChartAngkatan />
          <PieChartKegiatan />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
