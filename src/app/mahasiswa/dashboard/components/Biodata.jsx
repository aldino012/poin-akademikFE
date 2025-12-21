"use client";

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Biodata({ mahasiswa }) {
  if (!mahasiswa) return null;

  const biodataItems = [
    { label: "Angkatan", key: "angkatan", icon: "calendar" },
    { label: "Program Studi", key: "prodi", icon: "graduation-cap" },
    { label: "Tanggal Lahir", key: "tgl_lahir", icon: "birthday-cake" },
    { label: "Tempat Lahir", key: "tempat_lahir", icon: "map-marker-alt" },
    { label: "Alamat", key: "alamat", icon: "map-marker-alt" },
    { label: "No. Telp", key: "tlp_saya", icon: "phone" },
    { label: "Email", key: "email", icon: "envelope" },
  ];

  const formatTanggal = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-4 sm:p-6 transition-all duration-700 border border-blue-200">
      <h2 className="text-base font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <i className="fas fa-id-card text-blue-600 text-sm"></i>
        Biodata Mahasiswa
      </h2>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-blue-100 p-4 sm:p-5 overflow-hidden">
        <div className="hidden md:block">
          {/* Tampilan desktop - tetap sama seperti sebelumnya */}
          <table className="w-full text-sm text-gray-700">
            <tbody>
              {biodataItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-blue-100 last:border-none hover:bg-blue-50/60 transition-colors duration-200"
                >
                  <td className="py-2 pr-4 font-medium flex items-center gap-2 text-gray-700">
                    <i
                      className={`fas fa-${item.icon} text-blue-600 text-xs w-4`}
                    ></i>
                    {item.label}
                  </td>
                  <td className="py-2 text-gray-800">
                    {item.key === "tgl_lahir"
                      ? formatTanggal(mahasiswa[item.key])
                      : mahasiswa[item.key] || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tampilan mobile - lebih responsif */}
        <div className="md:hidden">
          {biodataItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-blue-100 last:border-none hover:bg-blue-50/60 transition-colors duration-200 py-3 flex flex-col sm:flex-row"
            >
              <div className="font-medium text-gray-700 flex items-center gap-2 mb-1 sm:mb-0">
                <i
                  className={`fas fa-${item.icon} text-blue-600 text-xs w-4`}
                ></i>
                <span className="text-xs sm:text-sm">{item.label}</span>
              </div>
              <div className="text-gray-800 pl-6 sm:pl-0 text-sm break-words overflow-wrap-anywhere">
                {item.key === "tgl_lahir"
                  ? formatTanggal(mahasiswa[item.key])
                  : mahasiswa[item.key] || "-"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
