import { useState } from "react";
import {
  generateReport,
  getReports,
  downloadReport,
} from "../services/reportService";

const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  const createReport = async (ideaId) => {
    try {
      setLoading(true);

      const report = await generateReport(ideaId);

      return report;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const download = async (reportId) => {
    try {
      setLoading(true);

      return await downloadReport(reportId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    reports,
    error,
    createReport,
    fetchReports,
    download,
  };
};

export default useReport;