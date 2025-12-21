"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6">
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "informasi-dasar"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("informasi-dasar")}
        >
          <i className="fas fa-info-circle mr-2"></i>
          Informasi Dasar
        </button>

        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "detail-kegiatan"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("detail-kegiatan")}
        >
          <i className="fas fa-calendar-alt mr-2"></i>
          Detail Kegiatan
        </button>

        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "bukti-upload"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("bukti-upload")}
        >
          <i className="fas fa-upload mr-2"></i>
          Bukti & Upload
        </button>
      </div>
    </div>
  );
}

TabsNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
