import ValidationChart from "../components/ValidationChart";

const Results = () => {
  const data = [
    { name: "Market", score: 80 },
    { name: "Innovation", score: 90 },
    { name: "Risk", score: 60 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Validation Results
      </h2>

      <ValidationChart data={data} />
    </div>
  );
};

export default Results;