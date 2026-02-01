function Insights({ insights }) {
  if (!insights) return null;

  // Parse insights - can be string or array
  const parseInsights = (data) => {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === 'string') {
      // Split by numbered list or newlines
      return data
        .split(/\d+\.\s+/)
        .filter(item => item.trim().length > 0)
        .map(item => item.trim());
    }
    return [];
  };

  const insightsList = parseInsights(insights);

  if (insightsList.length === 0) return null;

  // Parse markdown-style bold text **text**
  const parseMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="insights-section">
      <h2 className="insights-title">Summary</h2>
      <ul className="insights-list">
        {insightsList.map((insight, index) => (
          <li 
            key={index} 
            className="insight-item"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {parseMarkdown(insight)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Insights;

// function Insights({ insights }) {
//   if (!insights) return null;

//   // Parse insights - can be string or array
//   const parseInsights = (data) => {
//     if (Array.isArray(data)) {
//       return data;
//     }
//     if (typeof data === 'string') {
//       // Split by numbered list or newlines
//       return data
//         .split(/\d+\.\s+/)
//         .filter(item => item.trim().length > 0)
//         .map(item => item.trim());
//     }
//     return [];
//   };

//   const insightsList = parseInsights(insights);

//   if (insightsList.length === 0) return null;

//   // Parse markdown-style bold text **text**
//   const parseMarkdown = (text) => {
//     const parts = text.split(/(\*\*.*?\*\*)/g);
//     return parts.map((part, index) => {
//       if (part.startsWith('**') && part.endsWith('**')) {
//         return <strong key={index}>{part.slice(2, -2)}</strong>;
//       }
//       return part;
//     });
//   };

//   return (
//     <div className="insights-section">
//       <h2 className="insights-title">Key Insights</h2>
//       <ul className="insights-list">
//         {insightsList.map((insight, index) => (
//           <li key={index} className="insight-item">
//             {parseMarkdown(insight)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Insights;
