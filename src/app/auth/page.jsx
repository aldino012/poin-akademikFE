"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingOverlay from "@/components/LoadingOverlay";
import api from "@/app/api/axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔥 PERBAIKAN PENTING (WAJIB UNTUK COOKIE JWT)
      const res = await api.post("/auth/login", formData);

      const data = res.data;

      if (data.role) {
        Cookies.set("user_role", data.role, { expires: 1 });
      }

      if (data.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/mahasiswa/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Login gagal");
      } else {
        setError("Tidak dapat terhubung ke server");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          {/* Header dengan Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                {/* Logo Maskot */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 p-2 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_V1CTLaPZtFPL2_WjnHARR-1XzkNbwkqvA&s"
                      alt="Maskot STIKOM Banyuwangi"
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=STIKOM+BW&background=3B82F6&color=fff&size=128`;
                      }}
                    />
                  </div>
                </div>
                {/* Dekorasi */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              STIKOM Banyuwangi
            </h1>
            <p className="text-sm text-gray-600">
              Sistem Manajemen Poin Kegiatan Mahasiswa
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Form Header Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white text-center">
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login ke Sistem
              </h2>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center text-red-700 text-sm">
                    <i className="fas fa-exclamation-circle mr-2 text-red-500"></i>
                    {error}
                  </div>
                </div>
              )}

              {/* Input Identifier */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <i className="fas fa-user mr-2 text-blue-600"></i>
                  NIM / NIP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Masukkan NIM atau NIP"
                    className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                    required
                    disabled={loading}
                  />
                  <i className="fas fa-id-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <i className="fas fa-lock mr-2 text-blue-600"></i>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                    required
                    disabled={loading}
                  />
                  <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">Mahasiswa:</span> Gunakan NIM
                    <br />
                    <span className="font-medium">Admin/Dosen:</span> Gunakan
                    NIP
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Memproses Login...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Login ke Sistem
                  </>
                )}
              </button>

              {/* Footer Info */}
              <div className="text-center pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Sistem Poin Kegiatan Mahasiswa © {new Date().getFullYear()}
                </p>
              </div>
            </form>
          </div>

          {/* Version Info */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-600 font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay show={loading} text="Mengalihkan ke dashboard..." />
    </>
  );
}
