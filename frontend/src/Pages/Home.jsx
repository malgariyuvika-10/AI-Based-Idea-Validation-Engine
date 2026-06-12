import { useContext } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { FaRocket, FaChartLine, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

const Home = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto pb-12">
        {/* Hero Section */}
        <section className="text-center py-20 px-6 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white rounded-[2.5rem] shadow-2xl mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              {t.home.titleTop} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-100">{t.home.titleAccent}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed opacity-95">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/submit"
                className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] transform hover:-translate-y-1 active:scale-95"
              >
                {t.home.validate}
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1"
              >
                {t.home.howItWorks}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t.home.featuresTitle}</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium">{t.home.featuresSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FaChartLine />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.home.marketTitle}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t.home.marketText}</p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <FaRocket />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.home.feasibilityTitle}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t.home.feasibilityText}</p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.home.riskTitle}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t.home.riskText}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-gray-950 p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
             <FaLightbulb className="text-yellow-400 text-9xl rotate-12" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-6">{t.home.ctaTitle}</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-xl font-light">{t.home.ctaText}</p>
            <Link
              to="/submit"
              className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all inline-block shadow-2xl hover:shadow-blue-500/20 active:scale-95"
            >
              {t.home.getStarted}
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
