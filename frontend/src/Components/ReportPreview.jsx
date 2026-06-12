import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const ReportPreview = ({ report }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="font-bold text-xl mb-4">
        {t.reports.preview}
      </h2>

      <pre className="whitespace-pre-wrap">
        {report}
      </pre>
    </div>
  );
};

export default ReportPreview;
