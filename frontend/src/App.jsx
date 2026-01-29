import { useState } from "react";
import QueryBox from "./components/QueryBox";
import SummaryCards from "./components/SummaryCards";
import ReportTable from "./components/ReportTable";
import Insights from "./components/Insights";
import Charts from "./components/Charts";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="app-container">
      {/* Header with Logo */}
      <header className="header-section">
        <div className="logo-section">
          <img 
            src="C:\Users\GARGI\Downloads\Charge_analysis_AIGroq\frontend\src\tata-logo.jpeg" 
            alt="TATA Logo" 
            className="tata-logo"
            onError={(e) => {
              // Fallback to SVG if image not found
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* <svg 
            style={{ display: 'none' }}
            className="tata-logo" 
            viewBox="0 0 200 60" 
            fill="none" 
            xmlns=""
          >
            <path d="M10 15 H50 V25 H35 V50 H25 V25 H10 Z" fill="#1E3A8A"/>
            <path d="M55 15 L70 15 L80 50 L70 50 L68 40 H57 L55 50 H45 Z M62.5 20 L58 33 H67 Z" fill="#1E3A8A"/>
            <path d="M85 15 H125 V25 H110 V50 H100 V25 H85 Z" fill="#1E3A8A"/>
            <path d="M130 15 L145 15 L155 50 L145 50 L143 40 H132 L130 50 H120 Z M137.5 20 L133 33 H142 Z" fill="#1E3A8A"/>
            <circle cx="175" cy="32" r="15" fill="#3B82F6" opacity="0.2"/>
          </svg> */}
        </div>
        <h1 className="app-title">Charge Analysis Report</h1>
      </header>

      {/* Query Input Section */}
      <QueryBox
        setLoading={setLoading}
        setData={setData}
        setError={setError}
      />

      {/* Status Messages */}
      {loading && <div className="status-message loading">Generating report, please wait...</div>}
      {error && <div className="status-message error">{error}</div>}

      {/* Results Section */}
      {data && (
        <>
          <SummaryCards summary={data.summary} />
          <Insights insights={data.insights} />
          <ReportTable rows={data.report_table} />
          <Charts charts={data.charts}/>
        </>
      )}
    </div>
  );
}

export default App;

// import { useState } from "react";
// import QueryBox from "./components/QueryBox";
// import SummaryCards from "./components/SummaryCards";
// import ReportTable from "./components/ReportTable";
// import Insights from "./components/Insights";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   return (
//     <div className="container">
//       <h1 className="title">Charge Analysis Report</h1>

//       <QueryBox
//         setLoading={setLoading}
//         setData={setData}
//         setError={setError}
//       />

//       {loading && <p className="status">Generating report...</p>}
//       {error && <p className="error">{error}</p>}

//       {data && (
//         <>
//           <SummaryCards summary={data.summary} />
//           <Insights insights={data.insights} />
//           <ReportTable rows={data.report_table} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;