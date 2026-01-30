import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (future auth, logging, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token later
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (global error handling)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
