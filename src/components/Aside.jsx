"use client";

import React from "react";

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  title,
  menuItems = [],
  activePath = "",
}) {
  return (
    <>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 w-64 h-full 
          bg-gradient-to-b from-blue-800 to-blue-900 
          text-white 
          transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
          z-40
          flex flex-col
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900
        `}
      >
        {/* Header */}
        <div className="p-4 font-semibold text-lg flex items-center border-b border-blue-700/50">
          <i className="fas fa-graduation-cap mr-3 text-blue-300"></i>
          <span className="truncate">{title}</span>
        </div>

        {/* Menu Items (flex-grow mendorong copyright ke bawah) */}
        <nav className="px-2 space-y-1 mt-3 flex-grow">
          {menuItems.map((item, idx) => {
            const isActive = activePath === item.href;
            return (
              <a
                key={idx}
                href={item.href || "#"}
                className={`flex items-center py-2.5 px-3 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-blue-700 text-white font-medium"
                    : "hover:bg-blue-800/80 hover:text-blue-100"
                } ${item.extraClass || ""}`}
              >
                <i
                  className={`${item.icon} w-5 text-center mr-3 text-sm opacity-90`}
                ></i>
                <span className="truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>

        {/* Copyright Section */}
        {/* Desain: Rapi, font sedikit lebih kecil, menyatu dengan warna dasar */}
        <div className="p-5 text-xs text-blue-200 border-t border-blue-800/50 bg-blue-900/30">
          <p className="mb-2 opacity-70 uppercase tracking-wide text-[10px]">
            Aplikasi dibuat oleh
          </p>

          <div className="space-y-1 font-medium text-white/90">
            <p>Abdul Haris, M. Kom</p>
            <p>Achmad Aldino</p>
            <p>Novan Ramadani</p>
          </div>

          <div className="mt-3 pt-2 border-t border-blue-800/50 text-blue-300 font-semibold">
            STIKOM PGRI BWI 2026
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
