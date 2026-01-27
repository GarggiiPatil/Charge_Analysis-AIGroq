function SummaryCards({ summary }) {
  return (
    <div className="cards">
      {Object.entries(summary).map(([key, value]) => (
        <div className="card" key={key}>
          <p className="card-title">
            {key.replaceAll("_", " ").toUpperCase()}
          </p>
          <p className="card-value">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;