"use client";

import React from "react";
import PropTypes from "prop-types";

export default function NavTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-4 sm:px-6 justify-center">
        <div className="flex">
          {/* TAB INFORMASI */}
          <button
            className={`px-3 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "informasi"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("informasi")}
          >
            <i className="fas fa-info-circle mr-2"></i>
            Informasi
          </button>

          {/* TAB BUKTI */}
          <button
            className={`px-3 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "bukti"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("bukti")}
          >
            <i className="fas fa-file-upload mr-2"></i>
            Bukti Kegiatan
          </button>
        </div>
      </div>
    </div>
  );
}

NavTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
