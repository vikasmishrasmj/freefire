import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 15000,
  withCredentials: true, // ✅ enable credentials for cookies/token
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/auth/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
