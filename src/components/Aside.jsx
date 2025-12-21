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
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900
        `}
      >
        {/* Header */}
        <div className="p-3 font-semibold text-lg flex items-center border-b border-blue-700">
          <i className="fas fa-graduation-cap mr-2 text-blue-300 text-base"></i>
          <span className="truncate">{title}</span>
        </div>

        {/* Menu */}
        <nav className="px-2 space-y-2 mt-2">
          {menuItems.map((item, idx) => {
            const isActive = activePath === item.href;
            return (
              <a
                key={idx}
                href={item.href || "#"}
                className={`flex items-center py-2.5 px-2 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-blue-700 text-white font-semibold"
                    : "hover:bg-blue-700 hover:text-blue-50"
                } ${item.extraClass || ""}`}
              >
                <i className={`${item.icon} w-4 text-center mr-2 text-sm`}></i>
                <span className="truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>
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
