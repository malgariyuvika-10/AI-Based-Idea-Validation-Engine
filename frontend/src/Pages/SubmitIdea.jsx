import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { submitIdea } from "../services/ideaService";
import { IdeaContext } from "../context/IdeaContext";
import { LanguageContext } from "../context/LanguageContext";
import MainLayout from "../layouts/MainLayout";

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_audience: "",
    industry: "Technology",
    revenue_model: "One-time Purchase",
  });
  const [loading, setLoading] = useState(false);
  const { setIdea } = useContext(IdeaContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const industries = Object.keys(t.submit.industries);
  const revenueModels = Object.keys(t.submit.revenueModels);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.target_audience.trim()) return;

    setLoading(true);
    try {
      const result = await submitIdea(formData);

      console.log("Success:", result);
      setIdea(result);
      
      alert(t.submit.success);
      navigate("/results"); // Redirect to results page
    } catch (error) {
      console.error("Submission Error:", error);
      const message = error.response?.data?.detail || t.submit.backendHint;
      alert(`${t.submit.failure} ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {t.submit.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            name="title"
            placeholder={t.submit.ideaName}
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows="6"
            placeholder={t.submit.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            name="target_audience"
            placeholder={t.submit.targetAudience}
            value={formData.target_audience}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              disabled={loading}
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {t.submit.industries[industry]}
                </option>
              ))}
            </select>

            <select
              className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              name="revenue_model"
              value={formData.revenue_model}
              onChange={handleChange}
              disabled={loading}
            >
              {revenueModels.map((model) => (
                <option key={model} value={model}>
                  {t.submit.revenueModels[model]}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.target_audience.trim()}
            className={`w-full bg-blue-600 text-white px-4 py-3 rounded font-bold hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? t.submit.analyzing : t.submit.validateNow}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SubmitIdea;
