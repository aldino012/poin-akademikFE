"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { FaChalkboardTeacher } from "react-icons/fa";

const COLORS = [
  "#2563eb", // Biru
  "#16a34a", // Hijau
  "#f59e0b", // Kuning/Oranye
  "#dc2626", // Merah
  "#9333ea", // Ungu
  "#3b82f6", // Biru Muda
  "#10b981", // Hijau Tosca
  "#6366f1", // Indigo
  "#14b8a6", // Teal
];

export default function BarChartKegiatan({ data = [] }) {
  // Empty State
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
          <FaChalkboardTeacher className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-500 font-medium">
          Data kegiatan belum tersedia
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Grafik akan muncul setelah ada data masuk.
        </p>
      </div>
    );
  }

  // Custom Label: Logika Pintar (Dalam/Luar)
  const renderPercentageLabel = (props) => {
    const { x, y, width, value } = props;
    // Jika lebar bar > 35px, teks masuk ke dalam (putih). Jika tidak, di luar (abu-abu).
    const isWideEnough = width > 35;

    return (
      <text
        x={isWideEnough ? x + width - 8 : x + width + 5} // Posisi X
        y={y + 18} // Posisi Y (tengah bar)
        fill={isWideEnough ? "#ffffff" : "#4b5563"} // Warna Teks (Putih/Abu)
        fontSize="12px"
        fontWeight="700"
        textAnchor={isWideEnough ? "end" : "start"} // Rata Kanan (Dalam) atau Kiri (Luar)
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Header / Judul */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <div className="p-1.5 bg-green-50 rounded-lg">
            <FaChalkboardTeacher className="text-green-600" />
          </div>
          Persentase Jenis Kegiatan
        </h2>
        <p className="text-xs text-gray-400 mt-1 ml-9">
          Distribusi partisipasi mahasiswa per kategori kegiatan
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* KOLOM KIRI: CHART */}
        <div
          className="flex-1"
          style={{ height: Math.max(300, data.length * 50) }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 0,
                right: 40,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f3f4f6"
              />

              {/* SUMBU X */}
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={{ stroke: "#d1d5db", strokeWidth: 2 }}
                tick={false}
                tickLine={false}
              />

              {/* SUMBU Y */}
              <YAxis
                dataKey="name"
                type="category"
                width={10}
                axisLine={{ stroke: "#d1d5db", strokeWidth: 2 }}
                tick={false}
                tickLine={false}
              />

              {/* Batang Grafik */}
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                barSize={28}
                isAnimationActive={true}
              >
                {/* Menggunakan Custom Label renderPercentageLabel */}
                <LabelList dataKey="value" content={renderPercentageLabel} />

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

        {/* KOLOM KANAN: LEGEND */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 pt-2 border-l border-gray-100 pl-4 md:border-l-0 md:pl-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Keterangan Kategori
          </h3>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-sm mt-1 flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700 leading-snug">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.value}% Partisipasi
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
