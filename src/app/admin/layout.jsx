"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/Aside";
import Navbar from "../../components/Navbar";
import { ToastProvider } from "../../components/Toats";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();

  const adminMenuItems = [
    {
      icon: "fas fa-tachometer-alt",
      text: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: "fas fa-user-graduate",
      text: "Mahasiswa",
      href: "/admin/mahasiswa",
    },
    {
      icon: "fas fa-star",
      text: "Master Poin",
      href: "/admin/poin",
    },
    {
      icon: "fas fa-calendar-check",
      text: "Verifikasi Kegiatan",
      href: "/admin/kegiatan",
    },
    {
      icon: "fas fa-arrow-left",
      text: "Kembali ke Homepage",
      href: "/",
      extraClass: "mt-4",
    },
  ];

  return (
    <ToastProvider>
      {/* WRAPPER UTAMA */}
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* SIDEBAR */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          title="SIPAK"
          menuItems={adminMenuItems}
          activePath={pathname}
        />

        {/* KONTEN */}
        <div className="flex flex-col flex-1 md:ml-64">
          {/* NAVBAR */}
          <Navbar
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            toggleSidebar={toggleSidebar}
            role="admin"
            userName="Admin Kemahasiswaan"
          />

          {/* 🔥 SATU-SATUNYA AREA SCROLL */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
