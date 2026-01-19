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
];

export default function BarChartKegiatan({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Data kegiatan belum tersedia</p>
      </div>
    );
  }

  // Komponen Label Kustom untuk Nama Kegiatan & Persentase
  const renderCustomLabel = (props) => {
    const { x, y, width, value, name } = props;

    // Tentukan apakah bar cukup panjang untuk menampung teks (misal threshold 40%)
    const isLongEnough = width > 160;

    return (
      <g>
        {/* Nama Kegiatan di atas Bar (Solusi agar tidak terpotong dan rapat kiri) */}
        <text
          x={x}
          y={y - 8}
          fill="#374151"
          fontSize="11px"
          fontWeight="600"
          textAnchor="start"
        >
          {name}
        </text>

        {/* Persentase */}
        <text
          x={isLongEnough ? x + width - 8 : x + width + 8}
          y={y + 16}
          fill={isLongEnough ? "#ffffff" : "#374151"}
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
          margin-bottom: 30px;
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

      {/* Tinggi ditambah (h-96) agar jarak antar bar yang punya label atas tidak sesak */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 50,
              left: 0, // Benar-benar menempel ke garis L kiri
              bottom: 10,
            }}
            barGap={20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f0f0f0"
            />

            <XAxis type="number" domain={[0, 100]} hide />

            <YAxis
              dataKey="name"
              type="category"
              width={0} // Menghilangkan kolom label di kiri
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              formatter={(val) => [`${val}%`, "Partisipasi"]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
              {/* Custom Label yang menangani nama di atas dan angka di dalam/luar */}
              <LabelList dataKey="value" content={renderCustomLabel} />

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
