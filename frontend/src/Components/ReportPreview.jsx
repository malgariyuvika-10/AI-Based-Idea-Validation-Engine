const ReportPreview = ({ report }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="font-bold text-xl mb-4">
        Report Preview
      </h2>

      <pre className="whitespace-pre-wrap">
        {report}
      </pre>
    </div>
  );
};

export default ReportPreview;