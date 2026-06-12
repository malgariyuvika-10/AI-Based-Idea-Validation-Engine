import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const Sidebar = () => {
  const { t } = useContext(LanguageContext);

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">{t.nav.dashboard}</h2>

      <ul className="space-y-4">
        <li><Link to="/dashboard">{t.dashboard.overview}</Link></li>
        <li><Link to="/results">{t.dashboard.results}</Link></li>
        <li><Link to="/reports">{t.nav.reports}</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
