"use client";
import React from "react";
export default function CardMaster({
  currentItems = [],
  isAdmin = false,
  getBadgeClass = () => {},
  onEdit,
  onDelete,
}) {
  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="block lg:hidden">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              key={index}
              className="p-3 mb-3 border border-gray-200 rounded-lg shadow-sm bg-white animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header: Kode + Poin */}
              <div className="flex justify-between items-start mb-2">
                <div className="font-mono font-semibold text-gray-900 text-xs sm:text-sm truncate">
                  {item.kode}
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(
                    item.poin
                  )}`}
                >
                  {item.poin} poin
                </span>
              </div>
              {/* Jenis */}
              <div className="mb-2">
                <div className="text-xs text-gray-500 flex items-center">
                  <i className="fas fa-layer-group mr-1 text-gray-400"></i>
                  Jenis
                </div>
                <div
                  className="text-xs sm:text-sm text-gray-700 truncate"
                  title={item.jenis}
                >
                  {item.jenis}
                </div>
              </div>
              {/* Posisi */}
              <div className="mb-3">
                <div className="text-xs text-gray-500 flex items-center">
                  <i className="fas fa-user-tie mr-1 text-gray-400"></i>
                  Posisi
                </div>
                <div
                  className="text-xs sm:text-sm text-gray-700 truncate"
                  title={item.peran}
                >
                  {item.peran}
                </div>
              </div>
              {/* Tombol Aksi untuk Admin */}
              {isAdmin && (
                <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                    title="Edit"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 flex items-center transition-colors shadow-sm"
                    title="Hapus"
                  >
                    <i className="fas fa-trash-alt mr-1"></i>
                    <span>Hapus</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            <div className="flex flex-col items-center justify-center">
              <i className="fas fa-search text-2xl text-gray-300 mb-2"></i>
              <p className="text-xs sm:text-sm">
                Tidak ada data yang ditemukan
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
