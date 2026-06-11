import { useState } from "react";
import {
  validateIdea,
  getValidationResult,
} from "../services/validationService";

const useValidation = () => {
  const [loading, setLoading] = useState(false);
  const [validationData, setValidationData] = useState(null);
  const [error, setError] = useState(null);

  const startValidation = async (ideaId) => {
    try {
      setLoading(true);
      setError(null);

      const result = await validateIdea(ideaId);
      setValidationData(result);

      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchValidationResult = async (ideaId) => {
    try {
      setLoading(true);

      const result = await getValidationResult(ideaId);
      setValidationData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validationData,
    startValidation,
    fetchValidationResult,
  };
};

export default useValidation;