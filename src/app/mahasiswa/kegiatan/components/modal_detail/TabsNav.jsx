"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6">
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "informasi"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("informasi")}
        >
          <i className="fas fa-info-circle mr-2"></i>
          Informasi
        </button>

        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "bukti"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("bukti")}
        >
          <i className="fas fa-file-upload mr-2"></i>
          Bukti
        </button>

        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "status"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("status")}
        >
          <i className="fas fa-flag mr-2"></i>
          Status
        </button>
      </div>
    </div>
  );
}

TabsNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
