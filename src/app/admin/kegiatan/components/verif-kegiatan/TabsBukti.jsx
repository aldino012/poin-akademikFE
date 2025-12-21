"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsBukti({ renderBuktiKegiatan }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        {/* Header Bukti */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <h4 className="font-semibold text-gray-800 flex items-center text-sm">
            <i className="fas fa-file-upload mr-2 text-blue-600"></i>
            Bukti Kegiatan
          </h4>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <i className="fas fa-info-circle"></i>
            File dapat dibuka atau didownload
          </div>
        </div>

        {/* Preview / Info */}
        {renderBuktiKegiatan()}
      </div>
    </div>
  );
}

TabsBukti.propTypes = {
  renderBuktiKegiatan: PropTypes.func.isRequired,
};
