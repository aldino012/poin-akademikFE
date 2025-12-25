"use client";
import React from "react";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6">
        {/* TAB INFORMASI */}
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

        {/* TAB BUKTI */}
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

        {/* TAB REVIEW */}
        <button
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "review"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("review")}
        >
          <i className="fas fa-eye mr-2"></i>
          Review
        </button>
      </div>
    </div>
  );
}
