import { useContext } from "react";
import ReportPreview from "../Components/ReportPreview";
import DashboardLayout from "../layouts/DashboardLayout";
import { IdeaContext } from "../context/IdeaContext";

const Reports = () => {
  const { idea } = useContext(IdeaContext);

  const buildReport = () => {
    if (!idea) {
      return "No report available yet. Submit and validate an idea first.";
    }

    const scores = idea.validation_results || {};
    const swot = idea.swot || {};
    const competitors = idea.competitors || [];
    const suggestions = idea.ai_suggestions || [];

    return [
      `AI Idea Validation Report`,
      ``,
      `Idea: ${idea.title}`,
      `Audience: ${idea.target_audience}`,
      `Industry: ${idea.industry}`,
      `Revenue Model: ${idea.revenue_model}`,
      ``,
      `AI Idea Scoring`,
      `Overall: ${scores.overall}/100`,
      `Market: ${scores.market}/100`,
      `Feasibility: ${scores.feasibility}/100`,
      `Innovation: ${scores.innovation}/100`,
      `Risk: ${scores.risk}/100`,
      `Scalability: ${scores.scalability}/100`,
      ``,
      `Success Prediction`,
      `${idea.success_prediction?.probability}% - ${idea.success_prediction?.label}`,
      ``,
      `SWOT Analysis`,
      `Strengths: ${(swot.strengths || []).join("; ")}`,
      `Weaknesses: ${(swot.weaknesses || []).join("; ")}`,
      `Opportunities: ${(swot.opportunities || []).join("; ")}`,
      `Threats: ${(swot.threats || []).join("; ")}`,
      ``,
      `Competitor Analysis`,
      ...competitors.map((item) => `${item.name}: ${item.positioning}. Gap: ${item.gap}`),
      ``,
      `AI Suggestions`,
      ...suggestions.map((item, index) => `${index + 1}. ${item}`),
      ``,
      `Pitch`,
      idea.pitch || "",
    ].join("\n");
  };

  const report = buildReport();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PDF Report</h1>
            <p className="text-gray-600">Generate a printable validation report for your latest idea.</p>
          </div>

          <button
            onClick={() => window.print()}
            disabled={!idea}
            className="bg-blue-600 text-white px-5 py-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download PDF
          </button>
        </div>

        <div className="print:bg-white">
          <ReportPreview report={report} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
