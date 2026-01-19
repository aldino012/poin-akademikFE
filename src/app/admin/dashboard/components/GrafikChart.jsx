"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaChalkboardTeacher } from "react-icons/fa";

// WARNA SAMA DENGAN PIE CHART
const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];

/**
 * Grafik Bar - Persentase Jenis Kegiatan Mahasiswa
 * -----------------------------------------------
 * - Data langsung dari pie chart (name, value)
 * - TANPA hitung ulang
 * - Layout horizontal
 * - Garis animasi judul
 */
export default function BarChartKegiatan({ data = [] }) {
  // =============================
  // EMPTY STATE
  // =============================
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Data kegiatan belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* STYLE GARIS ANIMASI */}
      <style jsx>{`
        @keyframes lineGrow {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        .title-wrapper {
          position: relative;
          display: inline-block;
          margin-left: 6px; /* 🔥 sejajar dengan grafik angkatan */
          margin-bottom: 14px;
        }

        .animated-line {
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 3px;
          width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, #16a34a, #22c55e, #4ade80);
          animation: lineGrow 0.8s ease-out forwards;
        }
      `}</style>

      {/* TITLE */}
      <div className="title-wrapper">
        <h2 className="text-base font-medium text-gray-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
          <FaChalkboardTeacher className="text-green-600 text-sm" />
          Persentase Jenis Kegiatan yang Diikuti Mahasiswa
        </h2>
        <span className="animated-line"></span>
      </div>

      {/* CHART */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 10, // 🔥 DIKECILKAN → grafik MUNDUR
              left: 120, // 🔥 RAPAT KE KIRI
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" className="stroke-gray-200" />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
            />

            <YAxis
              dataKey="name"
              type="category"
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
              width={110}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              formatter={(value) => [`${value}%`, "Persentase"]}
              contentStyle={{
                borderRadius: "6px",
                boxShadow:
                  "0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
                border: "none",
                fontSize: "0.8rem",
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              isAnimationActive={true}
              animationDuration={700}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
