import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
          <FaRocket />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Startup<span className="text-blue-600">Validator</span>
        </h1>
      </Link>

      <div className="hidden md:flex items-center space-x-8 font-bold text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link to="/submit" className="hover:text-blue-600 transition-colors">Validate Idea</Link>
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/reports" className="hover:text-blue-600 transition-colors">Reports</Link>
      </div>

      <div>
        <Link 
          to="/submit" 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 inline-block"
        >
          Try Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
