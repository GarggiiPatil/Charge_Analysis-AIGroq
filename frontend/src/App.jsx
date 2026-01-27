import { useState } from "react";
import QueryBox from "./components/QueryBox";
import SummaryCards from "./components/SummaryCards";
import ReportTable from "./components/ReportTable";
import Insights from "./components/Insights";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="container">
      <h1 className="title">Charge Analysis Report</h1>

      <QueryBox
        setLoading={setLoading}
        setData={setData}
        setError={setError}
      />

      {loading && <p className="status">Generating report...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <SummaryCards summary={data.summary} />
          <Insights insights={data.insights} />
          <ReportTable rows={data.report_table} />
        </>
      )}
    </div>
  );
}

export default App;