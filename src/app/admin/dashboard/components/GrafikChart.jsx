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

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#3b82f6",
  "#10b981",
];

// Komponen kustom untuk label Y-Axis agar teks tidak berantakan
const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#4b5563"
        fontSize="11px"
        fontWeight="500"
        className="recharts-text recharts-cartesian-axis-tick-value"
      >
        {/* Logika memotong teks jika terlalu panjang (opsional) */}
        {payload.value.length > 20
          ? `${payload.value.substring(0, 20)}...`
          : payload.value}
      </text>
    </g>
  );
};

export default function BarChartKegiatan({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Data kegiatan belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
          margin-bottom: 24px;
        }
        .animated-line {
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 3px;
          width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          animation: lineGrow 0.8s ease-out forwards;
        }
      `}</style>

      <div className="title-wrapper">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <FaChalkboardTeacher className="text-green-600" />
          Persentase Jenis Kegiatan Mahasiswa
        </h2>
        <span className="animated-line"></span>
      </div>

      {/* Tinggi disesuaikan agar label tidak berhimpitan (h-80 atau h-96 lebih ideal untuk banyak data) */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 10, // Margin luar kiri dikecilkan
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f0f0f0"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              fontSize={11}
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />

            <YAxis
              dataKey="name"
              type="category"
              width={140} // Lebar area teks kiri (sesuaikan dengan panjang teks)
              tick={<CustomYAxisTick />}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              formatter={(value) => [`${value}%`, "Partisipasi"]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              barSize={20} // Ukuran batang dipertegas
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
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
