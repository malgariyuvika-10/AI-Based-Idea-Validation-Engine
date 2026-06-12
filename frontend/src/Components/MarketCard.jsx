import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const MarketCard = ({ market }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="font-bold mb-3">{t.cards.marketAnalysis}</h3>

      <p>{market}</p>
    </div>
  );
};

export default MarketCard;
