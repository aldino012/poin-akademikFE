"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/app/api/axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Ini akan memicu perubahan tampilan pada tombol

    try {
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
      // Loading tetap true agar tombol tidak 'flicker' kembali ke posisi awal saat redirect
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Login gagal");
      } else {
        setError("Tidak dapat terhubung ke server");
      }
      setLoading(false); // Matikan loading di tombol jika error agar bisa diklik lagi
      console.error("Login error:", error);
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

              {/* Submit Button dengan Loading State Internal */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed opacity-90" // Style saat loading
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg text-white" // Style normal
                  }
                  text-white
                `}
              >
                {loading ? (
                  <>
                    {/* Spinner Icon */}
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Login ke Sistem</span>
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

      {/* TIDAK ADA CODE OVERLAY DI SINI */}
    </>
  );
}
