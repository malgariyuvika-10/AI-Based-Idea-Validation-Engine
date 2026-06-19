import axios from "axios";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "").replace(/\/$/, "") ||
  "https://ai-based-idea-validation-engine.onrender.com/api";
const NORMALIZED_API_BASE_URL = API_BASE_URL.endsWith("/api")
  ? API_BASE_URL
  : `${API_BASE_URL}/api`;

const api = axios.create({
  baseURL: NORMALIZED_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
