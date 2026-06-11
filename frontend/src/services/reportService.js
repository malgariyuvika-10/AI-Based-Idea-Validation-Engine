import api from "./api";

export const generateReport = async (ideaId) => {
  const response = await api.post(`/reports/${ideaId}`);
  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

export const downloadReport = async (reportId) => {
  const response = await api.get(`/reports/download/${reportId}`, {
    responseType: "blob",
  });

  return response.data;
};