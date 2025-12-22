"use client";

import React, { useState } from "react";
import api from "@/api/axios";

export default function Navbar({ toggleSidebar, role = "default" }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // ✅ BENAR: TANPA /api
      await api.post("/auth/logout");

      localStorage.removeItem("user_role");
      localStorage.removeItem("user");

      window.location.href = "/auth";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Gagal logout, coba refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (role === "admin") return "Dashboard Admin";
    if (role === "user") return "Dashboard Mahasiswa";
    return "Dashboard";
  };

  return (
    <header className="flex items-center justify-between bg-white border-b px-3 py-2 shadow-sm sticky top-0 z-20">
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden text-blue-700"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        <h1 className="text-base font-semibold text-blue-800 flex items-center">
          <i className="fas fa-cog mr-1.5 text-blue-600 text-sm"></i>
          <span>{getTitle()}</span>
        </h1>
      </div>

      {/* Logout */}
      <div className="relative">
        <button
          onClick={handleLogout}
          disabled={loading}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md border border-red-100 hover:border-red-200 disabled:opacity-50"
        >
          <i className="fas fa-sign-out-alt text-xs"></i>
          <span className="hidden sm:inline">
            {loading ? "Logout..." : "Logout"}
          </span>
        </button>

        {showTooltip && (
          <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow sm:hidden">
            Logout
          </div>
        )}
      </div>
    </header>
  );
}
