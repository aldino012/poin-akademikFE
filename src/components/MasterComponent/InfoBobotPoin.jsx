"use client";
import React from "react";

export default function InfoBobotPoin() {
  return (
    <div className="text-xs text-gray-600 bg-blue-50/50 border border-blue-100 rounded-md p-2.5">
      <div className="flex items-start gap-2">
        <i className="fas fa-info-circle text-blue-500 mt-0.5 text-sm"></i>
        <div>
          <p className="font-medium text-blue-800 mb-1 text-sm">
            Informasi Bobot Poin
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 text-xs">
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></div>
              Tinggi (30+ poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
              Sedang (15-29 poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1.5"></div>
              Rendah (5-14 poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1.5"></div>
              Minimal (1-4 poin)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
