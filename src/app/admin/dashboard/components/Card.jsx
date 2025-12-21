"use client";

import React from "react";

export default function Card({
  title,
  value,
  change,
  changeIcon,
  changeColor = "",
  iconBg = "bg-blue-100",
  icon = "fas fa-chart-bar",
  border = "",
  textColor = "text-gray-800",
  extraClass = "",
}) {
  return (
    <div
      className={`stats-card bg-white p-4 md:p-5 rounded-xl shadow-md ${border} ${extraClass}`}
    >
      <div className="flex justify-between items-start">
        {/* Keterangan */}
        <div>
          <p className={`text-xs font-medium ${textColor}`}>{title}</p>
          <h2
            className={`text-base md:text-lg font-semibold mt-1 ${textColor}`}
          >
            {value}
          </h2>

          {change && (
            <p className={`text-[11px] mt-2 flex items-center ${changeColor}`}>
              <i className={`${changeIcon} mr-1`}></i>
              {change}
            </p>
          )}
        </div>

        {/* Ikon */}
        <div className={`${iconBg} p-2 md:p-3 rounded-lg`}>
          <i className={`${icon} text-sm md:text-base`}></i>
        </div>
      </div>
    </div>
  );
}
