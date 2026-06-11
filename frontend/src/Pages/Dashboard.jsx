import DashboardLayout from "../layouts/DashboardLayout";
import ScoreCard from "../components/ScoreCard";
import RiskCard from "../components/RiskCard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 gap-6">
        <ScoreCard score={82} />
        <RiskCard risk="Medium" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;