import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>

      <ul className="space-y-4">
        <li><Link to="/dashboard">Overview</Link></li>
        <li><Link to="/results">Results</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;