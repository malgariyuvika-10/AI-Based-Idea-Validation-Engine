import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Submit Idea API
export const submitIdea = (ideaData) => {
  return API.post("/submit-idea", ideaData);
};