import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Startup Validator</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/submit">Submit Idea</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/reports">Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;