const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
      <p>{recommendation}</p>
    </div>
  );
};

export default RecommendationCard;