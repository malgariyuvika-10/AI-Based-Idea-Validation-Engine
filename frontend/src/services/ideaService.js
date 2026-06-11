import api from "./api";

export const submitIdea = async (ideaData) => {
  const response = await api.post("/ideas", ideaData);
  return response.data;
};

export const getIdeas = async () => {
  const response = await api.get("/ideas");
  return response.data;
};

export const getIdeaById = async (id) => {
  const response = await api.get(`/ideas/${id}`);
  return response.data;
};