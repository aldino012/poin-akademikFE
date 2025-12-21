"use client";

import React from "react";
import Card from "./Card";

export default function Cards({ data }) {
  const adminCards = [
    {
      title: "Total Mahasiswa",
      value: data.totalMahasiswa,
      change: "Jumlah total mahasiswa aktif",
      changeColor: "text-gray-600",
      changeIcon: "fas fa-users",
      iconBg: "bg-blue-100",
      icon: "fas fa-users text-blue-600",
      border: "border-l-4 border-blue-500",
    },
    {
      title: "Kegiatan Terdaftar",
      value: data.totalKegiatan,
      change: `${data.pendingKegiatan} menunggu verifikasi`,
      changeColor: "text-yellow-600",
      changeIcon: "fas fa-calendar-check",
      iconBg: "bg-yellow-100",
      icon: "fas fa-calendar-check text-yellow-600",
      border: "border-l-4 border-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {adminCards.map((card, idx) => (
        <Card key={idx} {...card} />
      ))}
    </div>
  );
}
