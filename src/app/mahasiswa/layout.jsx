"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/Aside";
import Navbar from "../../components/Navbar";
import { ToastProvider } from "../../components/Toats"; // import ToastProvider

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();

  // 📝 Menu khusus User / Mahasiswa
  const userMenu = [
    { icon: "fas fa-tachometer-alt", text: "Dashboard", href: "/mahasiswa/dashboard" },
    { icon: "fas fa-star", text: "Poin Non Akademik", href: "/mahasiswa/poin" },
    { icon: "fas fa-calendar-check", text: " Klaim Kegiatan", href: "/mahasiswa/klaim-kegiatan" },
  ];

  return (
    // 🌟 Wrap seluruh layout dengan ToastProvider
    <ToastProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          title="Panel Mahasiswa"
          menuItems={userMenu}
          activePath={pathname}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full md:ml-64 min-h-screen bg-gray-50">
          {/* Navbar */}
          <Navbar
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            toggleSidebar={toggleSidebar}
            role="user"
            userName="Mahasiswa Aktif"
          />

          {/* Konten halaman */}
          <main className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
