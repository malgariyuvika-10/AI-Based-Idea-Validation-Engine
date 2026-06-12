import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { LanguageContext } from "../context/LanguageContext";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(LanguageContext);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 relative">
        {!isHomePage && (
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t.common.back}
          </button>
        )}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
