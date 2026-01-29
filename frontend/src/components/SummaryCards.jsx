function SummaryCards({ summary }) {
  if (!summary) return null;

  // Format the key names to be more readable
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Get icon for each card type
  const getCardIcon = (key) => {
    const icons = {
        'total_charged_cycles': '',
        'total_charged_vehicles': '',
      'opportunity_charged': '',
      'full_charged': '',
      'critical_faults': '',
      'interruptions': '⏸',
      'average_temperature': '',
      'max_temperature': ''
    };
    return icons[key.toLowerCase()] || '';
  };

  return (
    <div className="summary-section">
      <div className="cards-grid">
        {Object.entries(summary).map(([key, value], index) => (
          <div 
            className="summary-card" 
            key={key}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="card-icon">{getCardIcon(key)}</div>
            <div className="card-title">{formatKey(key)}</div>
            <div className="card-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryCards;


// function SummaryCards({ summary }) {
//   if (!summary) return null;

//   // Format the key names to be more readable
//   const formatKey = (key) => {
//     return key
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   return (
//     <div className="summary-section">
//       <div className="cards-grid">
//         {Object.entries(summary).map(([key, value]) => (
//           <div className="summary-card" key={key}>
//             <div className="card-title">{formatKey(key)}</div>
//             <div className="card-value">{value}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SummaryCards;