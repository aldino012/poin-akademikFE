"use client";

import React, { useEffect, useState } from "react";
import api from "@/api/axios";

export default function Pencapaian({ mahasiswa }) {
  const [mode, setMode] = useState("activities");
  const [activities, setActivities] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH DATA PENCAPAIAN BERDASARKAN ID MAHASISWA
  // =====================================================
  useEffect(() => {
    if (!mahasiswa || !mahasiswa.id_mhs) {
      setLoading(false);
      return;
    }

    const fetchPencapaian = async () => {
      try {
        const res = await api.get(`/mahasiswa/cv/${mahasiswa.id_mhs}`);

        // AMAN UNTUK SEMUA STRUKTUR
        const payload = res.data?.data || res.data || {};

        setActivities(payload.organisasi || payload.kegiatan || []);
        setCompetitions(payload.prestasi || []);
      } catch (err) {
        console.error("Gagal memuat pencapaian:", err);
        setActivities([]);
        setCompetitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPencapaian();
  }, [mahasiswa]);

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-4 text-center text-gray-500 text-sm">
        Loading pencapaian...
      </div>
    );
  }

  const data = mode === "activities" ? activities : competitions;
  const showLine = data.length > 1;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">
      {/* SWITCH */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setMode("activities")}
          className={`px-4 py-1.5 text-xs rounded-full font-semibold transition ${
            mode === "activities"
              ? "bg-yellow-500 text-white shadow"
              : "bg-yellow-100 text-gray-900 hover:bg-yellow-200"
          }`}
        >
          Aktivitas
        </button>

        <button
          onClick={() => setMode("competitions")}
          className={`px-4 py-1.5 text-xs rounded-full font-semibold transition ${
            mode === "competitions"
              ? "bg-yellow-500 text-white shadow"
              : "bg-yellow-100 text-gray-900 hover:bg-yellow-200"
          }`}
        >
          Kompetisi
        </button>
      </div>

      <h2 className="text-sm font-bold text-gray-800 mb-6 text-center">
        {mode === "activities" ? "Kegiatan Terbaru" : "Kompetisi Terbaru"}
      </h2>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block relative">
        {showLine && (
          <div className="absolute top-7 left-0 right-0 mx-12 border-t-2 border-dashed border-yellow-300"></div>
        )}

        <div className="relative z-10 flex justify-center gap-24">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center shadow border-4 border-white">
                  <i
                    className={`fas ${
                      mode === "activities" ? "fa-running" : "fa-medal"
                    } text-white`}
                  ></i>
                </div>
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 rounded-full">
                  +{item.poin}
                </span>
              </div>

              <div className="mt-3 text-center max-w-[160px]">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {item.namaKegiatan}
                </p>
                <p className="text-[11px] text-gray-500">{item.tanggal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden relative">
        {showLine && (
          <div className="absolute left-7 top-14 bottom-0 w-px border-l-2 border-dashed border-yellow-300"></div>
        )}

        {data.map((item) => (
          <div key={item.id} className="relative flex mb-6 last:mb-0">
            <div className="relative z-10 mr-4">
              <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center shadow border-4 border-white">
                <i
                  className={`fas ${
                    mode === "activities" ? "fa-running" : "fa-medal"
                  } text-white`}
                ></i>
              </div>
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 rounded-full">
                +{item.poin}
              </span>
            </div>

            <div className="mt-1">
              <p className="text-xs font-semibold text-gray-800">
                {item.namaKegiatan}
              </p>
              <p className="text-[11px] text-gray-500">{item.tanggal}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
