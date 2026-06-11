const ScoreCard = ({ score }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="font-bold text-lg">Validation Score</h3>

      <p className="text-4xl text-green-600 mt-3">
        {score}/100
      </p>
    </div>
  );
};

export default ScoreCard;