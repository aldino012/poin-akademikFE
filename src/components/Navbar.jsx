"use client";

import React, { useState } from "react";

const handleLogout = async () => {
  try {
    await fetch("http://localhost:5050/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  } catch (err) {
    console.log(err);
  }
};

export default function Navbar({ toggleSidebar, role = "default" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTitle = () => {
    if (role === "admin") return "Dashboard Admin";
    if (role === "user") return "Dashboard Mahasiswa";
    return "Dashboard";
  };

  return (
    <header className="flex items-center justify-between bg-white border-b px-3 py-2 shadow-sm sticky top-0 z-20">
      <div className="flex items-center space-x-2">
        <button
          id="menuBtn"
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        <h1 className="text-base font-semibold text-blue-800 flex items-center">
          <i className="fas fa-cog mr-1.5 text-blue-600 text-sm"></i>
          <span>{getTitle()}</span>
        </h1>
      </div>

      {/* Tombol Logout dengan Tooltip */}
      <div className="relative flex items-center">
        <button
          onClick={handleLogout}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 border border-red-100 hover:border-red-200"
        >
          <i className="fas fa-sign-out-alt text-xs"></i>
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* Tooltip untuk mobile */}
        {showTooltip && (
          <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg sm:hidden">
            Logout
          </div>
        )}
      </div>
    </header>
  );
}
