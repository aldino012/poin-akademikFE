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

// Komponen kustom untuk label Y-Axis agar teks rapi
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
      >
        {payload.value.length > 22
          ? `${payload.value.substring(0, 22)}...`
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

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 45, // Ditambah agar label persentase di ujung kanan tidak terpotong
              left: 5,
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
              hide // Sembunyikan Axis X agar lebih bersih karena angka sudah ada di Bar
            />

            <YAxis
              dataKey="name"
              type="category"
              width={130}
              tick={<CustomYAxisTick />}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              formatter={(value) => [`${value}%`, "Persentase"]}
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
              barSize={24}
              isAnimationActive={true}
            >
              {/* Menampilkan Persentase di dalam/ujung Bar */}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(val) => `${val}%`}
                style={{ fill: "#374151", fontSize: "11px", fontWeight: "600" }}
                offset={10}
              />

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
