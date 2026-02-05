import { useState } from "react";
import QueryBox from "./components/QueryBox";
import SummaryCards from "./components/SummaryCards";
import ReportTable from "./components/ReportTable";
import Insights from "./components/Insights";
import Charts from "./components/Charts";
import "./index.css";
import tataLogo from "./tata-logo.jpeg";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const downloadPPT = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/download-ppt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report: data }),
      });

      if (!res.ok) {
        throw new Error("Failed to download PPT");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Charge_Analysis_Report.pptx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading PPT");
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="header-section">
        <div className="header-content">
          <img src={tataLogo} alt="TATA Logo" className="tata-logo" />
          <h1>Charge Report Dashboard</h1>
        </div>
      </header>

      <main className="main-content">
        <QueryBox
          setLoading={setLoading}
          setData={setData}
          setError={setError}
        />

        {loading && <p>Generating report...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <>
            <SummaryCards summary={data.summary} />
            <ReportTable rows={data.report_table} />
            <Insights insights={data.insights} />
            <Charts charts={data.charts} />

            {/* DOWNLOAD BUTTON */}
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={downloadPPT}
                style={{
                  padding: "14px 40px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#003A8F",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Download PPT
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

// import { useState } from "react";
// import QueryBox from "./components/QueryBox";
// import SummaryCards from "./components/SummaryCards";
// import ReportTable from "./components/ReportTable";
// import Insights from "./components/Insights";
// import Charts from "./components/Charts";
// import "./index.css";
// import tataLogo from "./tata-logo.jpeg";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   return (
//     <div className="app-container">
//       {/* Enhanced Header with Logo and Title */}
//       <header className="header-section">
//         <div className="header-content">
//           <div className="logo-container">
//             <img 
//               src={tataLogo} 
//               alt="TATA Logo" 
//               className="tata-logo"
//             />
//           </div>
//           <div className="header-title-container">
//             <h1 className="header-title">Charge Report Dashboard</h1>
//             <div className="header-subtitle">Real-time Analytics & Insights</div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="main-content">
//         {/* Section Title */}
//         <div className="section-header">
//           <h2 className="section-title">Charge Analysis Report</h2>
//           <div className="title-underline"></div>
//         </div>

//         {/* Query Input Section */}
//         <QueryBox
//           setLoading={setLoading}
//           setData={setData}
//           setError={setError}
//         />

//         {/* Status Messages */}
//         {loading && (
//           <div className="status-message loading">
//             <div className="loading-spinner"></div>
//             <span>Generating comprehensive report, please wait...</span>
//           </div>
//         )}
//         {error && (
//           <div className="status-message error">
//             <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Results Section */}
//         {data && (
//           <div className="results-container">
//             <SummaryCards summary={data.summary} />
//             <ReportTable rows={data.report_table} />
//             <Insights insights={data.insights} />
//             <Charts charts={data.charts}/>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="footer-section">
//         <div className="footer-content">
//           <p>© 2026 TATA Motors. All rights reserved.</p>
//           <p className="footer-version">Dashboard v2.0</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import QueryBox from "./components/QueryBox";
// import SummaryCards from "./components/SummaryCards";
// import ReportTable from "./components/ReportTable";
// import Insights from "./components/Insights";
// import Charts from "./components/Charts";
// import "./index.css";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   return (
//     <div className="app-container">
//       {/* Header with Logo */}
//       <header className="header-section">
//         <div className="logo-section">
//           <img 
//             src="C:\Users\GARGI\Downloads\Charge_analysis_AIGroq\frontend\src\tata-logo.jpeg" 
//             alt="TATA Logo" 
//             className="tata-logo"
//             onError={(e) => {
//               // Fallback to SVG if image not found
//               e.target.style.display = 'none';
//               e.target.nextSibling.style.display = 'block';
//             }}
//           />
//           {/* <svg 
//             style={{ display: 'none' }}
//             className="tata-logo" 
//             viewBox="0 0 200 60" 
//             fill="none" 
//             xmlns=""
//           >
//             <path d="M10 15 H50 V25 H35 V50 H25 V25 H10 Z" fill="#1E3A8A"/>
//             <path d="M55 15 L70 15 L80 50 L70 50 L68 40 H57 L55 50 H45 Z M62.5 20 L58 33 H67 Z" fill="#1E3A8A"/>
//             <path d="M85 15 H125 V25 H110 V50 H100 V25 H85 Z" fill="#1E3A8A"/>
//             <path d="M130 15 L145 15 L155 50 L145 50 L143 40 H132 L130 50 H120 Z M137.5 20 L133 33 H142 Z" fill="#1E3A8A"/>
//             <circle cx="175" cy="32" r="15" fill="#3B82F6" opacity="0.2"/>
//           </svg> */}
//         </div>
//         <h1 className="app-title">Charge Analysis Report</h1>
//       </header>

//       {/* Query Input Section */}
//       <QueryBox
//         setLoading={setLoading}
//         setData={setData}
//         setError={setError}
//       />

//       {/* Status Messages */}
//       {loading && <div className="status-message loading">Generating report, please wait...</div>}
//       {error && <div className="status-message error">{error}</div>}

//       {/* Results Section */}
//       {data && (
//         <>
//           <SummaryCards summary={data.summary} />
//           <Insights insights={data.insights} />
//           <ReportTable rows={data.report_table} />
//           <Charts charts={data.charts}/>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;