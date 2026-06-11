const CompetitorCard = ({ competitor }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="font-bold mb-2">
        {competitor.name}
      </h3>

      <p>{competitor.description}</p>
    </div>
  );
};

export default CompetitorCard;