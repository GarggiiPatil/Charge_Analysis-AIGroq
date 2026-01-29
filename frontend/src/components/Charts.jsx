import Plot from "react-plotly.js";

function Charts({ charts }) {
  if (!charts) return null;

  /* ---------- DATA EXTRACTION ---------- */
  const cities = charts.bar_total_cycles.map(d => d.City);
  const totalCycles = charts.bar_total_cycles.map(d => d.Total_Charged_Cycles);

  const chargedVehicles = charts.grouped_vehicles.map(d => d.Charged_Vehicles);
  const totalVehicles = charts.grouped_vehicles.map(d => d.Total_Charged_Cycles);

  const oppCycles = charts.stacked_charging.map(d => d.Opportunity_Charged_Cycles);
  const fullCycles = charts.stacked_charging.map(d => d.Full_Charged_Cycles);

  const temperatures = charts.temperature_line.map(d => d.MAX_TEMP_OVERALL);

  const faults = charts.fault_bubble.map(d => d.Critical_Faulty_Cycles);
  const interruptions = charts.fault_bubble.map(d => d.Interruption_Cycles);

  const totalOpp = oppCycles.reduce((a, b) => a + b, 0);
  const totalFull = fullCycles.reduce((a, b) => a + b, 0);

  /* ---------- STYLES ---------- */
  const cardStyle = {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease"
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "20px",
    color: "#1a4d8f",
    fontFamily: "'Poppins', sans-serif"
  };

  const transparentLayout = {
    height: 360,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: {
      family: "'Outfit', sans-serif",
      size: 12,
      color: "#475569"
    },
    margin: { t: 20, r: 20, b: 50, l: 60 },
    xaxis: {
      gridcolor: "#e2e8f0",
      showgrid: true
    },
    yaxis: {
      gridcolor: "#e2e8f0",
      showgrid: true
    }
  };

  const chartColors = {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444"
  };

  return (
    <div style={{ 
      marginTop: "50px", 
      marginBottom: "40px",
      animation: "fadeInUp 0.8s ease-out 0.4s both"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#1a4d8f",
          marginBottom: "8px",
          fontFamily: "'Poppins', sans-serif"
        }}>
          Charging Analytics Visualizations
        </h2>
        <div style={{
          width: "80px",
          height: "4px",
          background: "linear-gradient(90deg, #3b82f6, #2563eb)",
          margin: "0 auto",
          borderRadius: "2px"
        }}></div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
          gap: "32px"
        }}
      >
        {/* 1️⃣ Total Charged Cycles */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Total Charged Cycles by City</div>
          <Plot
            data={[
              { 
                x: cities, 
                y: totalCycles, 
                type: "bar",
                marker: {
                  color: chartColors.primary,
                  line: {
                    color: "#2563eb",
                    width: 1
                  }
                }
              }
            ]}
            layout={transparentLayout}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 2️⃣ Charged Vehicles vs Total Charging Cycles */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Charged Vehicles vs Total Charging Cycles</div>
          <Plot
            data={[
              { 
                x: cities, 
                y: chargedVehicles, 
                type: "bar", 
                name: "Charged Vehicles",
                marker: { color: chartColors.secondary }
              },
              { 
                x: cities, 
                y: totalVehicles, 
                type: "bar", 
                name: "Total Charging Cycles",
                marker: { color: chartColors.primary }
              }
            ]}
            layout={{ 
              ...transparentLayout, 
              barmode: "group",
              legend: { orientation: "h", y: -0.2 }
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 3️⃣ Opportunity vs Full Charging Cycles */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Opportunity vs Full Charging Cycles</div>
          <Plot
            data={[
              { 
                x: cities, 
                y: oppCycles, 
                type: "bar", 
                name: "Opportunity Charging",
                marker: { color: chartColors.warning }
              },
              { 
                x: cities, 
                y: fullCycles, 
                type: "bar", 
                name: "Full Charging",
                marker: { color: chartColors.success }
              }
            ]}
            layout={{ 
              ...transparentLayout, 
              barmode: "stack",
              legend: { orientation: "h", y: -0.2 }
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 4️⃣ Maximum Battery Temperature */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Maximum Battery Temperature Trend (°C)</div>
          <Plot
            data={[
              {
                x: cities,
                y: temperatures,
                type: "scatter",
                mode: "lines+markers",
                line: { 
                  color: chartColors.danger, 
                  width: 3,
                  shape: "spline"
                },
                marker: { 
                  size: 10, 
                  color: chartColors.danger,
                  line: { color: "#fff", width: 2 }
                }
              }
            ]}
            layout={transparentLayout}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 5️⃣ Critical Faults vs Interruptions */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Critical Faults vs Charging Interruptions</div>
          <Plot
            data={[
              {
                x: faults,
                y: interruptions,
                text: cities,
                mode: "markers",
                marker: {
                  size: faults.map(v => Math.max(v * 12 + 15, 15)),
                  color: chartColors.danger,
                  opacity: 0.7,
                  line: { color: "#fff", width: 2 }
                },
                type: "scatter"
              }
            ]}
            layout={{
              ...transparentLayout,
              xaxis: { title: "Critical Faulty Cycles", gridcolor: "#e2e8f0" },
              yaxis: { title: "Interruption Cycles", gridcolor: "#e2e8f0" }
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 6️⃣ Charging Completion Distribution */}
        <div style={cardStyle} className="chart-card">
          <div style={titleStyle}>Charging Completion Distribution</div>
          <Plot
            data={[
              {
                labels: ["Opportunity Charging", "Full Charging"],
                values: [totalOpp, totalFull],
                type: "pie",
                marker: {
                  colors: [chartColors.warning, chartColors.success]
                },
                textinfo: "label+percent",
                textfont: { size: 14, family: "'Outfit', sans-serif" },
                hole: 0.4
              }
            ]}
            layout={{
              ...transparentLayout,
              showlegend: false
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;

// import Plot from "react-plotly.js";

// function Charts({ charts }) {
//   if (!charts) return null;

//   /* ---------- DATA EXTRACTION ---------- */
//   const cities = charts.bar_total_cycles.map(d => d.City);
//   const totalCycles = charts.bar_total_cycles.map(d => d.Total_Charged_Cycles);

//   const chargedVehicles = charts.grouped_vehicles.map(d => d.Charged_Vehicles);
//   const totalVehicles = charts.grouped_vehicles.map(d => d.Total_Charged_Cycles);

//   const oppCycles = charts.stacked_charging.map(d => d.Opportunity_Charged_Cycles);
//   const fullCycles = charts.stacked_charging.map(d => d.Full_Charged_Cycles);

//   const temperatures = charts.temperature_line.map(d => d.MAX_TEMP_OVERALL);

//   const faults = charts.fault_bubble.map(d => d.Critical_Faulty_Cycles);
//   const interruptions = charts.fault_bubble.map(d => d.Interruption_Cycles);

//   const totalOpp = oppCycles.reduce((a, b) => a + b, 0);
//   const totalFull = fullCycles.reduce((a, b) => a + b, 0);

//   /* ---------- STYLES ---------- */
//   const cardStyle = {
//     background: "#ffffff",
//     borderRadius: "14px",
//     padding: "18px 16px 12px",
//     boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
//   };

//   const titleStyle = {
//     textAlign: "center",
//     fontWeight: 600,
//     marginBottom: "12px",
//     marginTop: "6px"
//   };

//   const transparentLayout = {
//     height: 330,
//     paper_bgcolor: "rgba(0,0,0,0)",
//     plot_bgcolor: "rgba(0,0,0,0)"
//   };

//   return (
//     <div style={{ marginTop: "40px" }}>
//       <h2 style={{ marginBottom: "20px" }}>
//         Charging Analytics Visualizations
//       </h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
//           gap: "32px"
//         }}
//       >
//         {/* 1️⃣ Total Charged Cycles */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Total Charged Cycles by City</div>
//           <Plot
//             data={[
//               { x: cities, y: totalCycles, type: "bar" }
//             ]}
//             layout={transparentLayout}
//             config={{ displayModeBar: true }}
//           />
//         </div>

//         {/* 2️⃣ Charged Vehicles vs Total Charging Cycles */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Charged Vehicles vs Total Charging Cycles</div>
//           <Plot
//             data={[
//               { x: cities, y: chargedVehicles, type: "bar", name: "Charged Vehicles" },
//               { x: cities, y: totalVehicles, type: "bar", name: "Total Charging Cycles" }
//             ]}
//             layout={{ ...transparentLayout, barmode: "group" }}
//             config={{ displayModeBar: true }}
//           />
//         </div>

//         {/* 3️⃣ Opportunity vs Full Charging Cycles */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Opportunity vs Full Charging Cycles</div>
//           <Plot
//             data={[
//               { x: cities, y: oppCycles, type: "bar", name: "Opportunity Charging" },
//               { x: cities, y: fullCycles, type: "bar", name: "Full Charging" }
//             ]}
//             layout={{ ...transparentLayout, barmode: "stack" }}
//             config={{ displayModeBar: true }}
//           />
//         </div>

//         {/* 4️⃣ Maximum Battery Temperature */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Maximum Battery Temperature Trend (°C)</div>
//           <Plot
//             data={[
//               {
//                 x: cities,
//                 y: temperatures,
//                 type: "scatter",
//                 mode: "lines+markers"
//               }
//             ]}
//             layout={transparentLayout}
//             config={{ displayModeBar: true }}
//           />
//         </div>

//         {/* 5️⃣ Critical Faults vs Interruptions */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Critical Faults vs Charging Interruptions</div>
//           <Plot
//             data={[
//               {
//                 x: faults,
//                 y: interruptions,
//                 text: cities,
//                 mode: "markers",
//                 marker: {
//                   size: faults.map(v => v * 10 + 10),
//                   opacity: 0.6
//                 },
//                 type: "scatter"
//               }
//             ]}
//             layout={{
//               ...transparentLayout,
//               xaxis: { title: "Critical Faulty Cycles" },
//               yaxis: { title: "Interruption Cycles" }
//             }}
//             config={{ displayModeBar: true }}
//           />
//         </div>

//         {/* 6️⃣ Charging Completion Distribution */}
//         <div style={cardStyle}>
//           <div style={titleStyle}>Charging Completion Distribution</div>
//           <Plot
//             data={[
//               {
//                 labels: ["Opportunity Charging", "Full Charging"],
//                 values: [totalOpp, totalFull],
//                 type: "pie"
//               }
//             ]}
//             layout={transparentLayout}
//             config={{ displayModeBar: true }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Charts;