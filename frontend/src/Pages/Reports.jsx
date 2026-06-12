import { useContext } from "react";
import ReportPreview from "../Components/ReportPreview";
import DashboardLayout from "../layouts/DashboardLayout";
import { IdeaContext } from "../context/IdeaContext";
import { LanguageContext } from "../context/LanguageContext";

const Reports = () => {
  const { idea } = useContext(IdeaContext);
  const { t } = useContext(LanguageContext);

  const buildReport = () => {
    if (!idea) {
      return t.reports.empty;
    }

    const scores = idea.validation_results || {};
    const swot = idea.swot || {};
    const competitors = idea.competitors || [];
    const suggestions = idea.ai_suggestions || [];

    return [
      t.reports.reportTitle,
      ``,
      `${t.results.idea}: ${idea.title}`,
      `${t.reports.audience}: ${idea.target_audience}`,
      `${t.reports.industry}: ${idea.industry}`,
      `${t.reports.revenueModel}: ${idea.revenue_model}`,
      ``,
      t.reports.scoring,
      `${t.reports.overall}: ${scores.overall}/100`,
      `${t.results.market}: ${scores.market}/100`,
      `${t.results.feasibility}: ${scores.feasibility}/100`,
      `${t.results.innovation}: ${scores.innovation}/100`,
      `${t.results.risk}: ${scores.risk}/100`,
      `${t.results.scalability}: ${scores.scalability}/100`,
      ``,
      t.results.successPrediction,
      `${idea.success_prediction?.probability}% - ${idea.success_prediction?.label}`,
      ``,
      t.reports.swotAnalysis,
      `${t.results.swot.strengths}: ${(swot.strengths || []).join("; ")}`,
      `${t.results.swot.weaknesses}: ${(swot.weaknesses || []).join("; ")}`,
      `${t.results.swot.opportunities}: ${(swot.opportunities || []).join("; ")}`,
      `${t.results.swot.threats}: ${(swot.threats || []).join("; ")}`,
      ``,
      t.results.competitorAnalysis,
      ...competitors.map((item) => `${item.name}: ${item.positioning}. ${t.common.gap}: ${item.gap}`),
      ``,
      t.reports.aiSuggestions,
      ...suggestions.map((item, index) => `${index + 1}. ${item}`),
      ``,
      t.reports.pitch,
      idea.pitch || "",
    ].join("\n");
  };

  const report = buildReport();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.reports.title}</h1>
            <p className="text-gray-600">{t.reports.subtitle}</p>
          </div>

          <button
            onClick={() => window.print()}
            disabled={!idea}
            className="bg-blue-600 text-white px-5 py-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.reports.download}
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
