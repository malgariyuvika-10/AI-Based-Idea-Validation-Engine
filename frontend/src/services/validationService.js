import api from "./api";

export const validateIdea = async (ideaId) => {
  const response = await api.post(`/validation/${ideaId}`);
  return response.data;
};

export const getValidationResult = async (ideaId) => {
  const response = await api.get(`/validation/${ideaId}`);
  return response.data;
};