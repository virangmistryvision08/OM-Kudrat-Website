import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Create an Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast("Invalid or expired Token!");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
