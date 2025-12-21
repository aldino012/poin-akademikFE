"use client";

import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Header({ mahasiswa }) {
  const [isVisible, setIsVisible] = useState(false);
  const [patternPositions, setPatternPositions] = useState([]);
  const [fotoSrc, setFotoSrc] = useState(null);


  if (!mahasiswa) return null;

  useEffect(() => {
    setIsVisible(true);

    const rows = 6,
      cols = 12;
    const positions = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          top: `${r * (100 / rows)}%`,
          left: `${(c + (r % 2) * 0.5) * (100 / cols)}%`,
          rotate: ((r + c) % 2) * 15 - 7 + "deg",
        });
      }
    }
    setPatternPositions(positions);
  }, []);


  const baseFotoUrl = mahasiswa.foto_file_id
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/mahasiswa/foto/${mahasiswa.foto_file_id}`
    : null;

  useEffect(() => {
    if (baseFotoUrl) {
      setFotoSrc(`${baseFotoUrl}?t=${Date.now()}`);
    } else {
      setFotoSrc(null);
    }
  }, [baseFotoUrl]);

  const poin = mahasiswa.total_poin || 0;
  const targetPoin = mahasiswa.target_poin || 50;
  const sisaPoin = Math.max(0, targetPoin - poin);
 
  let badgeSymbol = "bronze";

  if (poin >= 100) badgeSymbol = "diamond";
  else if (poin >= 80) badgeSymbol = "gold";
  else if (poin >= 50) badgeSymbol = "silver";

  const badgeColor =
    badgeSymbol === "diamond"
      ? "bg-purple-500"
      : badgeSymbol === "gold"
      ? "bg-yellow-400"
      : badgeSymbol === "silver"
      ? "bg-gray-400"
      : "bg-orange-500";

  const badgeIcon = {
    diamond: "fas fa-gem",
    gold: "fas fa-medal",
    silver: "fas fa-award",
    bronze: "fas fa-star",
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const progressRaw = (poin / targetPoin) * 100;
  const progress = Math.min(progressRaw, 100);

  const getProgressColor = () => {
    if (progress >= 100) {
      return "from-green-400 to-emerald-600";
    } else if (progress >= 75) {
      return "from-teal-400 to-teal-600";
    } else if (progress >= 50) {
      return "from-cyan-400 to-cyan-600";
    } else if (progress >= 25) {
      return "from-sky-400 to-sky-600";
    } else {
      return "from-blue-400 to-blue-600";
    }
  };

  return (
    <div
      className={`relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
      bg-gradient-to-br from-blue-400 to-indigo-500 p-4 sm:p-5 
      flex flex-col sm:flex-row items-center gap-4 sm:gap-5`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {patternPositions.map((pos, index) => (
          <i
            key={index}
            className="fas fa-cat text-white absolute"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate})`,
              fontSize: "1.1rem",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          ></i>
        ))}
      </div>

      <div className="relative z-10 flex-shrink-0">
        {fotoSrc ? (
          <img
            src={fotoSrc}
            alt="Foto Mahasiswa"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                mahasiswa.nama_mhs
              )}&background=3B82F6&color=fff`;
            }}
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold border-4 border-white shadow-lg">
            {getInitials(mahasiswa.nama_mhs)}
          </div>
        )}

        {/* BADGE */}
        <div
          className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 ${badgeColor} rounded-full flex items-center justify-center shadow-md border-2 border-white`}
        >
          <i
            className={`${badgeIcon[badgeSymbol]} text-white text-xs sm:text-sm md:text-base`}
          ></i>
        </div>
      </div>

      <div className="text-center sm:text-left relative z-10 flex-1">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
          <i className="fas fa-user-graduate animate-bounce"></i>
          {mahasiswa.nama_mhs}
        </h1>

        <p className="text-[11px] sm:text-xs md:text-sm text-white mt-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <span className="px-2 py-0.5 bg-white/30 text-white rounded-full text-[10px] sm:text-xs font-semibold shadow">
            NIM: {mahasiswa.nim}
          </span>
        </p>

        <div className="mt-3">
          <div className="relative w-full h-2.5 rounded-full bg-white/25 overflow-hidden">
            <div
              className={`h-2.5 bg-gradient-to-r ${getProgressColor()} transition-all duration-1000 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-stripes animate-stripes opacity-20"></div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-white/90 mt-1">
            <span>0 poin</span>
            <span>Target: {targetPoin} poin</span>
          </div>

          {/* ⬇️ TAMBAHAN BARU — POSISI TERBAIK UNTUK INFO */}
          {sisaPoin > 0 && (
            <p className="text-[11px] sm:text-xs text-white/90 font-medium text-right mt-1 pr-1">
              Butuh <b>{sisaPoin} poin</b> lagi untuk mencapai target
            </p>
          )}

          {sisaPoin === 0 && (
            <p className="text-[11px] sm:text-xs text-green-200 font-semibold text-right mt-1 pr-1">
              🎉 Target tercapai! Selamat!
            </p>
          )}
        </div>
      </div>

      {/* Pojok kanan — sekarang hanya angka poin dan persentase */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end space-y-1">
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {poin}
            </span>
            <span className="text-xs font-medium text-white/90">poin</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
              {Math.floor(progress)}%
            </span>
            <i
              className={`fas fa-chart-line text-white/80 text-sm ${
                progress >= 100 ? "text-green-300" : ""
              }`}
            ></i>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.3) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            transparent 75%,
            transparent
          );
          background-size: 0.4rem 0.4rem;
        }
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0.8rem 0;
          }
        }
        .animate-stripes {
          animation: stripes 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
