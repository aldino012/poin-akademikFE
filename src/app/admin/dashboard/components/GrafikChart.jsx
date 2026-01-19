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
  LabelList,
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
  "#6366f1",
  "#14b8a6",
];

export default function BarChartKegiatan({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Data kegiatan belum tersedia</p>
      </div>
    );
  }

  const renderCustomLabel = (props) => {
    const { x, y, width, value, name } = props;
    const isLongEnough = width > 50;

    return (
      <g>
        {/* Label Judul di Atas Bar */}
        <text
          x={x + 5}
          y={y - 12}
          fill="#4b5563"
          fontSize="11px"
          fontWeight="600"
          textAnchor="start"
        >
          {name}
        </text>

        {/* Angka Persentase */}
        <text
          x={isLongEnough ? x + width - 8 : x + width + 8}
          y={y + 18}
          fill={isLongEnough ? "#ffffff" : "#4b5563"}
          fontSize="11px"
          fontWeight="700"
          textAnchor={isLongEnough ? "end" : "start"}
        >
          {`${value}%`}
        </text>
      </g>
    );
  };

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
          margin-bottom: 40px;
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

      <div className="w-full" style={{ height: data.length * 75 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 40,
              left: 10, // Memberi sedikit ruang agar garis Y tidak terpotong tepi
              bottom: 20, // Ruang untuk garis X
            }}
          >
            {/* Garis Grid Vertical saja untuk membantu pembacaan angka */}
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f3f4f6"
            />

            {/* Sumbu X (Garis Horizontal Bawah) */}
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 2 }}
              tick={false} // Menghilangkan angka di bawah agar bersih seperti contoh
            />

            {/* Sumbu Y (Garis Vertikal Kiri) */}
            <YAxis
              dataKey="name"
              type="category"
              width={1} // Lebar sangat kecil agar bar menempel ke garis
              axisLine={{ stroke: "#d1d5db", strokeWidth: 2 }} // Garis "L" vertikal
              tick={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              formatter={(val) => [`${val}%`, "Partisipasi"]}
            />

            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
              <LabelList dataKey="value" content={renderCustomLabel} />
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
