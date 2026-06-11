import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SubmitIdea from "../pages/SubmitIdea";
import Dashboard from "../pages/Dashboard";
import Results from "../pages/Results";
import Reports from "../pages/Reports";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitIdea />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;