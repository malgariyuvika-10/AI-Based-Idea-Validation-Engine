import axios from "axios";

const api = axios.create({
  baseURL:  "https://ai-based-idea-validation-engine.onrender.com/api"
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;