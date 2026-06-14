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
    provider: "local",
    api_key: ""
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
            <input
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              name="title"
              placeholder={t.submit.ideaName}
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />

            <textarea
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              rows="6"
              placeholder={t.submit.description}
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              name="target_audience"
              placeholder={t.submit.targetAudience}
              value={formData.target_audience}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
          </div>

          <div className="space-y-4 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              {t.submit.aiSettings?.title || "AI Validation Settings"}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <label className="text-sm font-medium text-blue-700">
                {t.submit.aiSettings?.provider || "AI Provider"}
              </label>
              <select
                className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="local">{t.submit.aiSettings?.local || "Local AI (Ollama)"}</option>
                <option value="gemini">{t.submit.aiSettings?.cloud || "Cloud AI (Gemini)"}</option>
              </select>
            </div>

            {formData.provider === "gemini" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700">
                  {t.submit.aiSettings?.apiKey || "Bring Your Own Token (API Key)"}
                </label>
                <input
                  type="password"
                  className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  name="api_key"
                  placeholder={t.submit.aiSettings?.apiKeyPlaceholder || "Enter your Gemini API key..."}
                  value={formData.api_key}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.target_audience.trim()}
            className={`w-full bg-blue-600 text-white px-4 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? t.submit.analyzing : t.submit.validateNow}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SubmitIdea;
