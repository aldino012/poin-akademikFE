"use client";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaUsers,
  FaTrophy,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaEllipsisH,
} from "react-icons/fa";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];

export default function PieChartKegiatan() {
  const data = [
    { name: "Organisasi", value: 30, icon: <FaUsers /> },
    { name: "Lomba", value: 25, icon: <FaTrophy /> },
    { name: "Seminar / Workshop", value: 20, icon: <FaChalkboardTeacher /> },
    { name: "Pengabdian Masyarakat", value: 15, icon: <FaHandsHelping /> },
    { name: "Lain-lain", value: 10, icon: <FaEllipsisH /> },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Outer radius menyesuaikan mobile
  const getOuterRadius = () => {
    if (windowWidth < 480) return 60;
    if (windowWidth < 640) return 70;
    if (windowWidth < 768) return 80;
    if (windowWidth < 1024) return 95;
    return 110;
  };

  // Radius untuk lingkaran persentase
  const getLabelCircleRadius = () => {
    if (windowWidth < 480) return 10;
    if (windowWidth < 640) return 12;
    if (windowWidth < 768) return 14;
    return 16;
  };

  // Custom label untuk pie chart dengan ikon dan persentase dalam lingkaran
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    let radiusOffset = 0;

    if (isMobile) {
      if (data[index].value / 100 < 0.15) {
        radiusOffset = 12;
      }
    }

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5 + radiusOffset;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <foreignObject
        x={x - getLabelCircleRadius()}
        y={y - getLabelCircleRadius()}
        width={getLabelCircleRadius() * 2}
        height={getLabelCircleRadius() * 2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-[18px] text-white">
          {data[index].icon}
        </div>
      </foreignObject>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-800 flex items-center text-sm">
            <span className="mr-2" style={{ color: payload[0].payload.fill }}>
              {data.find((item) => item.name === payload[0].name)?.icon}
            </span>
            {payload[0].name}
          </p>
          <p className="text-gray-600 text-xs">
            {payload[0].value}% dari total kegiatan
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md pie-chart-container">
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

        @keyframes pieGrow {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @keyframes highlightSegment {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes lineExpand {
          to {
            width: 100%;
          }
        }

        .pie-chart-container {
          animation: fadeInUp 0.6s ease-out;
        }

        .chart-title-wrapper {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.6s ease-out;
        }

        .title-container {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          position: relative;
        }

        .title-container::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          border-radius: 1px;
          animation: lineExpand 0.8s ease forwards;
          animation-delay: 0.3s;
        }

        .pulse-circle {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #16a34a;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .pie-segment {
          animation: pieGrow 1.2s ease-out;
          transform-origin: center;
        }

        .pie-segment:hover {
          animation: highlightSegment 0.4s ease;
          opacity: 0.9;
        }

        .legend-item {
          transition: all 0.2s ease;
          padding: 4px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          margin: 3px;
        }

        .legend-item:hover {
          background-color: #f3f4f6;
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .pie-legend-container {
            flex-direction: column;
          }

          .pie-chart-wrapper {
            height: 180px !important;
          }

          .legend-grid {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }

          .legend-item {
            padding: 6px;
            margin: 1px 0;
          }
        }
      `}</style>

      <div className="chart-title-wrapper">
        <div className="title-container">
          <span className="pulse-circle"></span>
          <FaChalkboardTeacher className="text-green-600 text-lg" />
          <h2 className="text-base sm:text-lg font-medium text-gray-800">
            Distribusi Jenis Kegiatan Mahasiswa
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between pie-legend-container">
        <div
          className="w-full lg:w-1/2 pie-chart-wrapper"
          style={{ height: isMobile ? "180px" : "280px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={getOuterRadius()}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-out"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="pie-segment"
                    style={{ transition: "opacity 0.3s" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 legend-grid">
            {data.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="legend-item flex items-center p-2 rounded-md border border-gray-100"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-base mr-1">{entry.icon}</span>
                <span className="text-xs font-medium">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
