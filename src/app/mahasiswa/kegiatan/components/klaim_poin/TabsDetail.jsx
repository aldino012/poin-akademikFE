"use client";

import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TabsDetail({
  formData,
  handleDateChange,
  handleInputChange,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Informasi Waktu */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-calendar mr-2 text-blue-600"></i>
          Informasi Waktu
        </h4>

        <div className="space-y-4">
          {/* Tanggal Pengajuan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Pengajuan
            </label>
            <input
              type="date"
              value={formData.tanggal_pengajuan}
              readOnly
              disabled
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-900 text-sm cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tanggal pengajuan diisi otomatis dengan tanggal hari ini
            </p>
          </div>

          {/* Tanggal Pelaksanaan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Pelaksanaan
            </label>

            <DatePicker
              selected={
                formData.tanggal_pelaksanaan
                  ? new Date(formData.tanggal_pelaksanaan)
                  : null
              }
              onChange={(date) => handleDateChange(date, "tanggal_pelaksanaan")}
              dateFormat="yyyy-MM-dd"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showIcon
              placeholderText="Pilih tanggal pelaksanaan"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              calendarIconClassname="text-gray-500"
              popperClassName="z-50"
              required
            />

            <p className="text-xs text-gray-500 mt-1">
              Pilih tanggal pelaksanaan kegiatan
            </p>
          </div>
        </div>
      </div>

      {/* Lokasi & Narasumber */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
          Lokasi & Narasumber
        </h4>

        <div className="space-y-4">
          {/* Tempat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempat
            </label>
            <input
              type="text"
              value={formData.tempat}
              onChange={(e) => handleInputChange("tempat", e.target.value)}
              placeholder="Masukkan tempat kegiatan"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
              required
            />
          </div>

          {/* Tingkat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat
            </label>
            <select
              value={formData.tingkat}
              onChange={(e) => handleInputChange("tingkat", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">-- Pilih Tingkat --</option>
              <option value="JURUSAN">JURUSAN</option>
              <option value="KABUPATEN">KABUPATEN</option>
              <option value="PROVINSI">PROVINSI</option>
              <option value="NASIONAL">NASIONAL</option>
              <option value="INTERNASIONAL">INTERNASIONAL</option>
            </select>
          </div>

          {/* Mentor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mentor
            </label>
            <input
              type="text"
              value={formData.mentor}
              onChange={(e) => handleInputChange("mentor", e.target.value)}
              placeholder="Nama mentor (jika ada)"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
            />
          </div>

          {/* Narasumber */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Narasumber
            </label>
            <input
              type="text"
              value={formData.narasumber}
              onChange={(e) => handleInputChange("narasumber", e.target.value)}
              placeholder="Nama narasumber (jika ada)"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
            />
          </div>
        </div>
      </div>

      {/* Rincian Acara */}
      <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-clipboard-list mr-2 text-blue-600"></i>
          Rincian Acara
        </h4>

        <textarea
          value={formData.rincian_acara}
          onChange={(e) => handleInputChange("rincian_acara", e.target.value)}
          rows={4}
          placeholder="JELASKAN DETAIL KEGIATAN YANG DIIKUTI..."
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none uppercase"
          required
        />
      </div>
    </div>
  );
}

TabsDetail.propTypes = {
  formData: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
