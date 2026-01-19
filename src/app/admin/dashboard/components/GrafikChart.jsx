"use client";

import React, { useMemo } from "react";
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
 * Persentase Jenis Kegiatan Mahasiswa
 * ----------------------------------
 * - Hitung persentase otomatis
 * - Horizontal bar chart
 * - Warna konsisten per kegiatan
 * - Garis animasi sejajar grafik angkatan
 */

// Warna konsisten
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
        <p className="text-gray-400 text-sm">Data kegiatan belum tersedia</p>
      </div>
    );
  }

  // =============================
  // HITUNG PERSENTASE (AMAN)
  // =============================
  const processedData = useMemo(() => {
    const total = data.reduce((sum, d) => sum + Number(d.jumlah || 0), 0);

    return data.map((item) => ({
      ...item,
      persentase: total ? Number(((item.jumlah / total) * 100).toFixed(1)) : 0,
    }));
  }, [data]);

  // =============================
  // UI
  // =============================
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
          margin-left: 6px; /* 🔥 MUNDUR SEDIKIT (SEJAJAR) */
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
            data={processedData}
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
              width={130}
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              formatter={(value, name, props) => [
                `${value}% (${props.payload.jumlah} mahasiswa)`,
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
              animationDuration={700}
              animationEasing="ease-out"
            >
              {processedData.map((entry, index) => (
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
      <p className="text-xs text-gray-400 mt-2 ml-1">
        Sumber: Data Mahasiswa (n ={" "}
        {processedData.reduce((s, d) => s + d.jumlah, 0)})
      </p>
    </div>
  );
}
