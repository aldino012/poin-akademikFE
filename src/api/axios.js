import axios from "axios";

const api = axios.create({
  // 🔥 PENTING:
  // SEMUA request sekarang lewat Next.js proxy
  // BUKAN langsung ke Railway
  baseURL: "/api/proxy",

  // 🔥 WAJIB agar cookie auth ikut terkirim
  withCredentials: true,
});

// ❌ JANGAN pakai request interceptor untuk token
// ❌ JANGAN baca Cookies.get("token")
// ❌ JANGAN set Authorization header manual
// ❌ JANGAN redirect paksa di sini

// Response interceptor (AMAN: hanya logging)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized (401)");
    }
    return Promise.reject(error);
  }
);

export default api;
