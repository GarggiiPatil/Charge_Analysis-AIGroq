import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analyze";

function QueryBox({ setLoading, setData, setError }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!query) return;

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
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-box">
      <textarea
        placeholder="e.g. Generate a charge analysis report from 10 Jan 2026 to 19 Jan 2026"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSubmit}>
        Generate Report
      </button>
    </div>
  );
}

export default QueryBox;