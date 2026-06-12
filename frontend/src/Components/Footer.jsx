import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      {t.footer}
    </footer>
  );
};

export default Footer;
