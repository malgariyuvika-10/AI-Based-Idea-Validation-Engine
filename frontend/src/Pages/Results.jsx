import { useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { LanguageContext } from "../context/LanguageContext";
import ValidationChart from "../Components/ValidationChart";
import MainLayout from "../layouts/MainLayout";

const Results = () => {
  const { idea } = useContext(IdeaContext);
  const { t } = useContext(LanguageContext);

  const scores = idea?.validation_results || {};
  const chartData = idea?.validation_results ? [
    { name: t.results.market, score: scores.market || scores.market_potential || 0 },
    { name: t.results.feasibility, score: scores.feasibility || 0 },
    { name: t.results.innovation, score: scores.innovation || scores.innovation_score || 0 },
    { name: t.results.risk, score: scores.risk || scores.risk_score || 0 },
    { name: t.results.scalability, score: scores.scalability || 0 }
  ] : [
    { name: t.results.market, score: 0 },
    { name: t.results.innovation, score: 0 },
    { name: t.results.risk, score: 0 }
  ];

  const scoreCards = [
    [t.results.aiIdeaScore, scores.overall || 0],
    [t.results.market, scores.market || 0],
    [t.results.feasibility, scores.feasibility || 0],
    [t.results.innovation, scores.innovation || 0],
    [t.results.risk, scores.risk || 0],
    [t.results.scalability, scores.scalability || 0],
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          {t.results.title}
        </h2>

        {idea ? (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{t.results.idea}: {idea.title}</h3>
              <p className="text-gray-600">{idea.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{idea.industry}</span>
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">{idea.revenue_model}</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{idea.target_audience}</span>
                {idea.provider && (
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                    AI: {idea.provider === "local" ? "Local (Ollama)" : "Cloud (Gemini)"}
                  </span>
                )}
                {idea.language && (
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                    {t.common.language}: {idea.language.name}{idea.language.is_mixed ? ` ${t.common.mixed}` : ""}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {scoreCards.map(([label, value]) => (
                <div key={label} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm font-semibold text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-blue-700 mt-2">{value}/100</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{t.results.analysisScores}</h3>
              <ValidationChart data={chartData} />
            </div>

            {idea.success_prediction && (
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold mb-2">{t.results.successPrediction}</h3>
                <p className="text-4xl font-bold text-blue-700">{idea.success_prediction.probability}%</p>
                <p className="text-gray-600 mt-2">{idea.success_prediction.label} {t.results.potential}. {idea.success_prediction.reason}</p>
              </div>
            )}

            {idea.swot && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(idea.swot).map(([key, items]) => (
                  <div key={key} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 capitalize">{t.results.swot[key] || key}</h3>
                    <ul className="space-y-2 text-gray-700">
                      {items.map((item) => (
                        <li key={item} className="border-l-4 border-blue-200 pl-3">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {idea.competitors && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t.results.competitorAnalysis}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {idea.competitors.map((competitor) => (
                    <div key={competitor.name} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900">{competitor.name}</h4>
                      <p className="text-sm text-gray-600 mt-2">{competitor.positioning}</p>
                      <p className="text-sm text-blue-700 mt-3 font-medium">{t.common.gap}: {competitor.gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {idea.ai_suggestions && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t.results.aiSuggestions}</h3>
                <ul className="space-y-3 text-gray-700">
                  {idea.ai_suggestions.map((suggestion) => (
                    <li key={suggestion} className="bg-blue-50 border border-blue-100 rounded-lg p-3">{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {idea.pitch && (
              <div className="bg-gray-950 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{t.results.pitchGenerator}</h3>
                <p className="text-gray-100 leading-relaxed">{idea.pitch}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">{t.results.noIdea}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Results;
