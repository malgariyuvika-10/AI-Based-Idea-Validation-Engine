import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { submitIdea } from "../services/ideaService";
import { IdeaContext } from "../context/IdeaContext";
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
  const navigate = useNavigate();

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
      
      alert("Idea submitted successfully!");
      navigate("/results"); // Redirect to results page
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit idea. Make sure your backend server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Validate Your Startup Idea
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            name="title"
            placeholder="Idea name"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows="6"
            placeholder="Describe your idea in detail..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            name="target_audience"
            placeholder="Target audience"
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
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>E-commerce</option>
              <option>SaaS</option>
              <option>Other</option>
            </select>

            <select
              className="border p-3 w-full rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              name="revenue_model"
              value={formData.revenue_model}
              onChange={handleChange}
              disabled={loading}
            >
              <option>One-time Purchase</option>
              <option>Marketplace Commission</option>
              <option>Advertising</option>
              <option>Services</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.target_audience.trim()}
            className={`w-full bg-blue-600 text-white px-4 py-3 rounded font-bold hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Analyzing Idea..." : "Validate Now"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SubmitIdea;
