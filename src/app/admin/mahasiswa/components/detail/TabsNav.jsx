"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6">
        {/* Tab Biodata */}
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "biodata"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("biodata")}
        >
          <i className="fas fa-user mr-2"></i>
          Biodata
        </button>

        {/* Tab Kegiatan */}
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "kegiatan"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("kegiatan")}
        >
          <i className="fas fa-list-check mr-2"></i>
          Kegiatan
        </button>

        {/* Tab Kontak */}
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "kontak"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("kontak")}
        >
          <i className="fas fa-phone mr-2"></i>
          Kontak
        </button>

        {/* Tab Lainnya */}
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "lainnya"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("lainnya")}
        >
          <i className="fas fa-info-circle mr-2"></i>
          Lainnya
        </button>
      </div>
    </div>
  );
}

TabsNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
