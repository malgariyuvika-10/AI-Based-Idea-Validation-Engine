import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaRocket } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

const Navbar = () => {
  const { language, setLanguage, languages, t } = useContext(LanguageContext);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
          <FaRocket />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Startup<span className="text-blue-600">Validator</span>
        </h1>
      </Link>

      <div className="hidden md:flex items-center space-x-8 font-bold text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition-colors">{t.nav.home}</Link>
        <Link to="/submit" className="hover:text-blue-600 transition-colors">{t.nav.validate}</Link>
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors">{t.nav.dashboard}</Link>
        <Link to="/reports" className="hover:text-blue-600 transition-colors">{t.nav.reports}</Link>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative flex items-center" aria-label="Select language">
          <FaGlobe className="absolute left-3 text-blue-600 pointer-events-none" />
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-9 pr-8 py-2.5 font-bold text-gray-700 shadow-sm outline-none hover:border-blue-300 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(languages).map(([code, item]) => (
              <option key={code} value={code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <Link 
          to="/submit" 
          className="bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 inline-block whitespace-nowrap"
        >
          {t.nav.cta}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
