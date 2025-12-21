import React from "react";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex px-6">
        {/* Data Pribadi */}
        <button
          type="button"
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "data-pribadi"
              ? "border-amber-600 text-amber-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("data-pribadi")}
        >
          <i className="fas fa-user mr-2"></i>
          Data Pribadi
        </button>

        {/* Data Lainnya */}
        <button
          type="button"
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "data-lainnya"
              ? "border-amber-600 text-amber-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("data-lainnya")}
        >
          <i className="fas fa-info-circle mr-2"></i>
          Data Lainnya
        </button>
      </div>
    </div>
  );
}
