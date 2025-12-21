"use client";
import React from "react";

export default function TabsInfo({
  form,
  handleUppercaseChange,
  handleNormalChange,
  handleSelectChange,
  tingkatOptions,
}) {
  return (
    <div className="space-y-4">
      {/* Informasi Waktu & Tempat */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
          Informasi Waktu & Tempat
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Periode Pengajuan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode Pengajuan
            </label>
            <input
              type="text"
              name="periode_pengajuan"
              value={form.periode_pengajuan}
              onChange={handleUppercaseChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
              placeholder="CONTOH: 2024/2025"
              autoComplete="off"
            />
          </div>

          {/* Tanggal Pelaksanaan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Pelaksanaan
            </label>
            <div className="relative">
              <input
                type="date"
                name="tanggal_pelaksanaan"
                value={form.tanggal_pelaksanaan}
                onChange={handleNormalChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors 
                [&::-webkit-calendar-picker-indicator]:!invert 
                [&::-webkit-calendar-picker-indicator]:!opacity-100 
                [&::-webkit-calendar-picker-indicator]:!cursor-pointer"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Tingkat Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Kegiatan
            </label>
            <select
              name="tingkat"
              value={form.tingkat}
              onChange={handleSelectChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              autoComplete="off"
            >
              {tingkatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tempat Pelaksanaan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempat Pelaksanaan
            </label>
            <input
              type="text"
              name="tempat"
              value={form.tempat}
              onChange={handleUppercaseChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
              placeholder="LOKASI KEGIATAN"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* Informasi Narasumber */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-user-tie mr-2 text-blue-600"></i>
          Informasi Narasumber
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mentor / Narasumber
          </label>
          <input
            type="text"
            name="mentor"
            value={form.mentor}
            onChange={handleUppercaseChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
            placeholder="NAMA MENTOR ATAU NARASUMBER"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Rincian Acara */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-clipboard-list mr-2 text-blue-600"></i>
          Rincian Acara
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Kegiatan
          </label>
          <textarea
            rows={4}
            name="rincian_acara"
            value={form.rincian_acara}
            onChange={handleNormalChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Jelaskan detail kegiatan yang dilakukan..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
