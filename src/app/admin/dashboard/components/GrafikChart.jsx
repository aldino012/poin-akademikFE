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
  Legend,
} from "recharts";

/**
 * Grafik Mahasiswa per Angkatan
 * ------------------------------
 * - PURE COMPONENT
 * - Data dari parent
 * - Animasi ringan & akademik
 */
export default function BarChartAngkatan({ data = [] }) {
  // =============================
  // EMPTY STATE
  // =============================
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          Data grafik angkatan belum tersedia
        </p>
      </div>
    );
  }

  // =============================
  // UI
  // =============================
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* STYLE KHUSUS GARIS ANIMASI */}
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
          margin-bottom: 12px;
        }

        .animated-line {
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 3px;
          width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa);
          animation: lineGrow 0.8s ease-out forwards;
        }
      `}</style>

      {/* TITLE */}
      <div className="title-wrapper">
        <h2 className="text-base font-medium text-gray-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
          <i className="fas fa-chart-bar text-blue-600 text-sm"></i>
          Grafik Mahasiswa per Angkatan
        </h2>
        <span className="animated-line"></span>
      </div>

      {/* CHART */}
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

            <YAxis
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
              allowDecimals={false}
            />

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
              name="Jumlah Mahasiswa"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
