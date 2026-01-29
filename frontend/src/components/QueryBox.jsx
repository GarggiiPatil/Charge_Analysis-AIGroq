import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analyze";

function QueryBox({ setLoading, setData, setError }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError("Please enter a query to generate the report");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(API_URL, {
        query: query
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate report. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    // Allow Shift+Enter for new line, but Enter alone submits
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="query-section">
      <div className="query-box">
        <div className="textarea-wrapper">
          <textarea
            className="query-textarea"
            placeholder="Enter date range for charge analysis (e.g., Generate Charge Analysis Report from 10 Jan 2026 to 19 Jan 2026)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
          />
        </div>
        <div className="button-wrapper">
          <button 
            className="generate-btn" 
            onClick={handleSubmit}
            disabled={!query.trim()}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueryBox;

// import { useState } from "react";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/analyze";

// function QueryBox({ setLoading, setData, setError }) {
//   const [query, setQuery] = useState("");

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError("Please enter a query");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setData(null);

//     try {
//       const response = await axios.post(API_URL, {
//         query: query
//       });
//       setData(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate report. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     // Allow Shift+Enter for new line, but Enter alone submits
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="query-section">
//       <div className="query-box">
//         <div className="textarea-wrapper">
//           <textarea
//             className="query-textarea"
//             placeholder="Enter date range for charge analysis (e.g., Generate Charge Analysis Report from 10 Jan 2026 to 19 Jan 2026)"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyPress={handleKeyPress}
//             rows={1}
//           />
//         </div>
//         <div className="button-wrapper">
//           <button 
//             className="generate-btn" 
//             onClick={handleSubmit}
//             disabled={!query.trim()}
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QueryBox;