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

/**
 * Grafik Jenis Kegiatan Mahasiswa
 * --------------------------------
 * - Horizontal bar chart
 * - Warna bar menyesuaikan jenis kegiatan
 * - Animasi ringan & aman untuk laporan akademik
 * - Data dikirim dari parent
 */

// Mapping warna per jenis kegiatan
const COLOR_MAP = {
  Akademik: "#2563eb",
  Organisasi: "#16a34a",
  Sosial: "#f59e0b",
  Kompetisi: "#dc2626",
  Lainnya: "#9333ea",
};

export default function BarChartKegiatan({ data = [] }) {
  // =============================
  // EMPTY STATE
  // =============================
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          Data grafik kegiatan belum tersedia
        </p>
      </div>
    );
  }

  // =============================
  // UI GRAFIK
  // =============================
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* TITLE */}
      <h2 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
        <FaChalkboardTeacher className="text-green-600 text-sm" />
        Persentase Jenis Kegiatan yang Diikuti Mahasiswa
      </h2>

      {/* CHART */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="2 2" className="stroke-gray-200" />

            <XAxis
              type="number"
              tickFormatter={(v) => `${v}%`}
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
            />

            <YAxis
              dataKey="kegiatan"
              type="category"
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
              width={120}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              formatter={(value, name, props) => [
                `${props.payload.persentase}% (${props.payload.jumlah} mahasiswa)`,
                "Jumlah",
              ]}
              contentStyle={{
                borderRadius: "6px",
                boxShadow:
                  "0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
                border: "none",
                fontSize: "0.8rem",
              }}
            />

            <Bar
              dataKey="persentase"
              radius={[0, 6, 6, 0]}
              isAnimationActive={true}
              animationDuration={700} // 🎯 animasi ringan
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLOR_MAP[entry.kegiatan] || "#6b7280"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-gray-400 mt-2">Sumber: Data 369 Mahasiswa</p>
    </div>
  );
}
