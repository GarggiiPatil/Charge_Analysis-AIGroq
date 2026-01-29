function ReportTable({ rows }) {
  if (!rows || rows.length === 0) return null;

  const headers = Object.keys(rows[0]);

  // Format header names
  const formatHeader = (header) => {
    return header
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="table-section">
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px"
      }}>
        <span style={{ fontSize: "32px" }}></span>
        <h2 className="table-title" style={{ marginBottom: 0, paddingBottom: 0, border: "none" }}>
          Detailed City-wise Analysis
        </h2>
      </div>
      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{formatHeader(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportTable;

// function ReportTable({ rows }) {
//   if (!rows || rows.length === 0) return null;

//   const headers = Object.keys(rows[0]);

//   // Format header names
//   const formatHeader = (header) => {
//     return header
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   return (
//     <div className="table-section">
//       <h2 className="table-title">Detailed City-wise Analysis</h2>
//       <div className="table-container">
//         <table className="report-table">
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th key={header}>{formatHeader(header)}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => (
//               <tr key={index}>
//                 {headers.map((header) => (
//                   <td key={header}>{row[header]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ReportTable;
