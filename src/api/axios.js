import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // wajib kalau pakai cookie auth
});

/**
 * Request interceptor
 * - Pasang Authorization header JIKA token ada
 * - Aman walau backend pakai httpOnly cookie
 */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Handle 401 (unauthorized)
 * - Aman untuk Next.js (cek window)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      Cookies.remove("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
