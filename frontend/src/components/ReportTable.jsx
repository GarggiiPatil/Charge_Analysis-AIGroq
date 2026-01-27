function ReportTable({ rows }) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="table-container">
      <h2>Detailed Report</h2>
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {headers.map((h) => (
                <td key={h}>{row[h]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;