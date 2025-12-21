"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

// Context
const ToastContext = createContext();

// Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Tambah toast
  const addToast = useCallback(
    ({ message, type = "info", duration = 3000, onConfirm }) => {
      const id = crypto.randomUUID(); // ✅ FIX: ID selalu unik

      setToasts((prev) => [
        ...prev,
        { id, message, type, duration, onConfirm },
      ]);

      if (!onConfirm) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  // Hapus toast manual
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Konfirmasi toast
  const confirmToast = (toast) => {
    if (toast.onConfirm) toast.onConfirm();
    removeToast(toast.id);
  };

  const toastStyle = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle className="w-5 h-5 text-white" />,
    },
    warning: {
      bg: "bg-yellow-500 text-black",
      icon: <AlertTriangle className="w-5 h-5 text-black" />,
    },
    danger: {
      bg: "bg-red-600",
      icon: <XCircle className="w-5 h-5 text-white" />,
    },
    info: { bg: "bg-blue-500", icon: <Info className="w-5 h-5 text-white" /> },
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col gap-3 z-[9999] w-full max-w-sm px-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const { bg, icon } = toastStyle[toast.type] || toastStyle.info;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`relative flex items-start sm:items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${bg} text-white`}
              >
                <div className="flex-shrink-0 mt-0.5">{icon}</div>

                <div className="flex-1 text-sm">{toast.message}</div>

                <div className="flex gap-2">
                  {toast.onConfirm ? (
                    <>
                      <button
                        onClick={() => confirmToast(toast)}
                        className="px-3 py-1 rounded bg-white text-black hover:bg-gray-200 transition text-sm"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => removeToast(toast.id)}
                        className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300 transition text-sm"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="text-lg leading-none hover:opacity-80 transition"
                    >
                      &times;
                    </button>
                  )}
                </div>

                {!toast.onConfirm && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white/60"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{
                      duration: toast.duration / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => useContext(ToastContext);
