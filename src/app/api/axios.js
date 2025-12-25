import axios from "axios";

const api = axios.create({
  baseURL: "/api/proxy",

  withCredentials: true,
});

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
