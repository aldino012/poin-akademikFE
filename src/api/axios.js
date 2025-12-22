import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ WAJIB untuk cookie auth
});

// ❌ JANGAN pakai request interceptor untuk token
// ❌ JANGAN baca Cookies.get("token")
// ❌ JANGAN set Authorization header manual

// Response interceptor (AMAN, TIDAK MAKSA REDIRECT)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // optional: logging saja
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized (401)");
    }
    return Promise.reject(error);
  }
);

export default api;
