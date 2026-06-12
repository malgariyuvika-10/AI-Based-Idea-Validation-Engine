import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const RiskCard = ({ risk }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="font-bold text-lg">{t.cards.riskLevel}</h3>

      <p className="text-2xl text-red-500 mt-2">
        {risk}
      </p>
    </div>
  );
};

export default RiskCard;
