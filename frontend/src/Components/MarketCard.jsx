const MarketCard = ({ market }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="font-bold mb-3">Market Analysis</h3>

      <p>{market}</p>
    </div>
  );
};

export default MarketCard;