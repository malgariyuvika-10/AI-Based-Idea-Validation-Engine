import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import SubmitIdea from "../Pages/SubmitIdea";
import Dashboard from "../Pages/Dashboard";
import Results from "../Pages/Results";
import Reports from "../Pages/Reports";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit" element={<SubmitIdea />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/results" element={<Results />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;