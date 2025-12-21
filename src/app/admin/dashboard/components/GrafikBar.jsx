"use client";

import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BarChartAngkatan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // 🔥 FETCH DATA MAHASISWA
  // =============================
  useEffect(() => {
    const fetchAngkatan = async () => {
      try {
        const res = await api.get("/api/mahasiswa");

        // Ambil array mahasiswa
        const mahasiswa = res.data || [];

        // Hitung jumlah per angkatan
        const angkatanMap = {};

        mahasiswa.forEach((mhs) => {
          const angkatan = mhs.angkatan || "Tidak diketahui";
          angkatanMap[angkatan] = (angkatanMap[angkatan] || 0) + 1;
        });

        // Konversi menjadi array grafik
        let grafik = Object.entries(angkatanMap).map(([angkatan, jumlah]) => ({
          angkatan,
          jumlah,
        }));

        // Sort dari paling lama → terbaru
        grafik.sort((a, b) => Number(a.angkatan) - Number(b.angkatan));

        setData(grafik);
      } catch (err) {
        console.error("Gagal fetch angkatan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAngkatan();
  }, []);

  // =============================
  // UI LOADING SEMENTARA
  // =============================
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-gray-500 text-sm">Memuat grafik angkatan...</p>
      </div>
    );
  }

  // =============================
  // UI GRAFIK DAN ANIMASI
  // =============================
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm bar-chart-container">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        @keyframes lineExpand {
          to {
            width: 100%;
          }
        }

        .bar-chart-container {
          animation: fadeInUp 0.6s ease-out;
        }

        .chart-title {
          position: relative;
          display: inline-block;
        }

        .chart-title::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          border-radius: 1px;
          animation: lineExpand 0.8s ease forwards;
          animation-delay: 0.3s;
        }

        .custom-bar {
          animation: barGrow 1s ease-out;
          transform-origin: bottom;
        }

        .pulse-circle {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #2563eb;
          border-radius: 50%;
          margin-right: 6px;
          animation: pulse 1.5s infinite;
        }
      `}</style>

      <h2 className="text-base font-medium text-gray-700 mb-3 flex items-center gap-2 chart-title">
        <span className="pulse-circle"></span>
        <i className="fas fa-chart-bar text-blue-600 text-sm"></i>
        Grafik Mahasiswa per Angkatan
      </h2>

      <div className="w-full h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" className="stroke-gray-200" />

            <XAxis
              dataKey="angkatan"
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
            />

            <YAxis fontSize="0.75rem" tick={{ fill: "#4b5563" }} />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: "6px",
                boxShadow:
                  "0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
                border: "none",
                fontSize: "0.8rem",
              }}
            />

            <Legend
              wrapperStyle={{
                paddingTop: 8,
                fontSize: "0.75rem",
                color: "#374151",
              }}
            />

            <Bar
              dataKey="jumlah"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              className="custom-bar"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
