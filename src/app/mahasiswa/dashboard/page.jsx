"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMahasiswa from "../../hooks/useMahasiswa";
import Header from "./components/Header";
import Biodata from "./components/Biodata";
import Pencapaian from "./components/Pencaipan";
import Greeting from "./components/Greeting";

export default function MahasiswaPage() {
  const { mahasiswa, loading } = useMahasiswa();

  if (!mahasiswa && !loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Gagal memuat data mahasiswa.
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col justify-center items-center min-h-screen text-gray-600 gap-3"
        >
          {/* Spinner muter sesuai theme */}
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
          <span className="text-sm font-medium text-gray-700">
            Memuat dashboard mahasiswa...
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 space-y-6 overflow-x-hidden"
        >
          <Greeting nama={mahasiswa.nama_mhs} />
          <Header mahasiswa={mahasiswa} />
          <Biodata mahasiswa={mahasiswa} />
          <Pencapaian mahasiswa={mahasiswa} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
