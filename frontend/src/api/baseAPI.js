import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api" || "http://localhost:5000/api",
});

export default axiosInstance;
