"use client";

import React, { useEffect, useState } from "react";
import api from "@/api/axios";

export default function Pencapaian({ mahasiswa }) {
  const [mode, setMode] = useState("activities");
  const [activities, setActivities] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const mahasiswaId = mahasiswa?.id_mhs || mahasiswa?.id;

  // 🔑 NORMALIZER SESUAI RESPONSE BACKEND
  const normalize = (items = []) =>
    items.map((i) => ({
      id: i.id,
      namaKegiatan: i.nama_kegiatan,
      tanggal: i.tanggal,
      poin: Number(i.poin || 0),
    }));

  useEffect(() => {
    if (!mahasiswaId) {
      setLoading(false);
      return;
    }

    const fetchPencapaian = async () => {
      try {
        setLoading(true);

        // 🔥 PATH YANG BENAR
        const res = await api.get(`/mahasiswa/kegiatan/${mahasiswaId}`);

        // 🔥 AMBIL LANGSUNG DARI BACKEND
        setActivities(normalize(res.data?.organisasi || []));
        setCompetitions(normalize(res.data?.prestasi || []));
      } catch (err) {
        console.error("Gagal fetch pencapaian:", err);
        setActivities([]);
        setCompetitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPencapaian();
  }, [mahasiswaId]);

  const data = mode === "activities" ? activities : competitions;

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-4 text-center text-gray-500 text-sm">
        Loading pencapaian...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
        <p className="text-sm text-gray-500">
          Belum ada {mode === "activities" ? "aktivitas" : "kompetisi"} yang
          disetujui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">
      {/* SWITCH */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setMode("activities")}
          className={
            mode === "activities"
              ? "bg-yellow-500 text-white px-4 py-1.5 rounded-full"
              : "bg-yellow-100 px-4 py-1.5 rounded-full"
          }
        >
          Aktivitas
        </button>

        <button
          onClick={() => setMode("competitions")}
          className={
            mode === "competitions"
              ? "bg-yellow-500 text-white px-4 py-1.5 rounded-full"
              : "bg-yellow-100 px-4 py-1.5 rounded-full"
          }
        >
          Kompetisi
        </button>
      </div>

      <div className="flex justify-center gap-10">
        {data.map((item) => (
          <div key={item.id} className="text-center">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              +{item.poin}
            </div>
            <p className="text-xs font-semibold mt-2">{item.namaKegiatan}</p>
            <p className="text-[11px] text-gray-500">{item.tanggal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
