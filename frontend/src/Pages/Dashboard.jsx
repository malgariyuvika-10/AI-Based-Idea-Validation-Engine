import { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import ScoreCard from "../Components/ScoreCard";
import RiskCard from "../Components/RiskCard";
import { IdeaContext } from "../context/IdeaContext";

const Dashboard = () => {
  const { idea } = useContext(IdeaContext);
  const scores = idea?.validation_results || {
    overall: 0,
    market: 0,
    feasibility: 0,
    innovation: 0,
    risk: 0,
    scalability: 0,
  };

  const scoreData = [
    { name: "Market", score: scores.market || 0 },
    { name: "Feasibility", score: scores.feasibility || 0 },
    { name: "Innovation", score: scores.innovation || 0 },
    { name: "Risk", score: scores.risk || 0 },
    { name: "Scale", score: scores.scalability || 0 },
  ];

  const predictionData = [
    { name: "Idea", value: scores.overall || 0 },
    { name: "Success", value: idea?.success_prediction?.probability || 0 },
    { name: "Scale", value: scores.scalability || 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Idea Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {idea ? `Current idea: ${idea.title}` : "Submit an idea to populate your dashboard."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard score={scores.overall || 0} />
          <RiskCard risk={idea?.success_prediction?.label || "Not available"} />
          <div className="bg-white shadow rounded p-6">
            <h3 className="font-bold text-lg">Success Prediction</h3>
            <p className="text-4xl text-blue-600 mt-3">
              {idea?.success_prediction?.probability || 0}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="font-bold text-xl mb-4">Validation Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="font-bold text-xl mb-4">Growth Signals</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
