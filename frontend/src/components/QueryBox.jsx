import { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analyze";

function QueryBox({ setLoading, setData, setError }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  /*  Speech Recognition Setup  */
  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setQuery(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    return recognition;
  };

  /*  Voice Controls  */
  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current && recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const rec = recognitionRef.current || initRecognition();
      if (rec) {
        rec.start();
        setIsListening(true);
      }
    }
  };

  /*  Submit  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(API_URL, { query });
      setData(response.data);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /*  UI  */
  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "0 20px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#ffffff",
        borderRadius: "50px",
        padding: "8px 8px 8px 24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "2px solid #e2e8f0",
        transition: "all 0.3s ease"
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#3b82f6";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(59, 130, 246, 0.2)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      }}
      >
        <input
          type="text"
          placeholder="Speak or type your report query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              handleSubmit(e);
            }
          }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontFamily: "'Outfit', sans-serif",
            color: "#1e293b",
            background: "transparent",
            padding: "8px 0"
          }}
        />

        {/* Voice Button */}
        <button
          type="button"
          onClick={toggleVoice}
          style={{
            background: isListening 
              ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" 
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: isListening 
              ? "0 4px 15px rgba(239, 68, 68, 0.4)" 
              : "0 4px 15px rgba(59, 130, 246, 0.3)",
            animation: isListening ? "pulse 1.5s infinite" : "none"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          title={isListening ? "Stop Recording" : "Start Voice Input"}
        >
          {isListening ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="white"/>
              <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" fill="white"/>
            </svg>
          )}
        </button>
      </div>

      {/* Generate Report Button */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginTop: "20px" 
      }}>
        <button
          onClick={handleSubmit}
          disabled={!query.trim()}
          style={{
            background: query.trim() 
              ? "linear-gradient(135deg, #4f87f5 0%, #3b75e8 100%)" 
              : "#cbd5e1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "16px 48px",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            fontFamily: "'Outfit', sans-serif",
            cursor: query.trim() ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            boxShadow: query.trim() 
              ? "0 4px 12px rgba(79, 135, 245, 0.3)" 
              : "none",
            textTransform: "uppercase"
          }}
          onMouseEnter={(e) => {
            if (query.trim()) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(79, 135, 245, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = query.trim() 
              ? "0 4px 12px rgba(79, 135, 245, 0.3)" 
              : "none";
          }}
        >
          Generate Report
        </button>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 4px 25px rgba(239, 68, 68, 0.7);
          }
        }
      `}</style>
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
//       setError("Please enter a query to generate the report");
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
//             rows={2}
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