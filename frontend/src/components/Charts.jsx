import Plot from "react-plotly.js";

function Charts({charts}){
    if(!charts) return null;

    //CHART 1: TOTAL CHARGE CYCLE BY CITY
    const cityName = charts.cycles_by_city.map(d => d.City);
    const totalCycles = charts.cycles_by_city.map(d => Total_Charged_Cycles);

    //CHART 2: OPPORTUNITY VS FULL CHARGING
    const oppCycles = charts.charging_type.map(d => d.Opportunity_Charged_Cycles);
    const fullCycles = charts.charging_type.map(d => d.Full_Charged_Cycles);

    //CHART 3: FAULTS AND INTERRUPTIONS
    const faults = charts.faults_interruptions.map( d => d.Critical_Faulty_Cycles);
    const interruptions = charts.faults_interruptions.map( d => d.Interruptions_Cycles);

    return(
        <div>
            <h2>Analytics Visualizations</h2>
            {/* Chart 1*/}
            <Plot 
            data = {[
                {
                    x: cityNames,
                    y: totalCycles,
                    type: "bar",
                    name: "Total Charged Cycles"
                }
            ]}
            layout={{title: "Total Charged Cyles by City"}}></Plot>

            {/* Chart 2*/}
            <Plot>
                data={[
                    {
                        x: cityNames,
                        y: oppCycles,
                        type: "bar",
                        name: "Oppotunity Charging"
                    },
                    {
                        x: cityNames,
                        y: fullCycles,
                        type: "bar",
                        name: "Full Charging"
                    }
                ]}
                layout={{
                    title:"Opportunity vs Full Charging",
                    barmode:"stack"
                }}
            </Plot>
            
            {/* Chart 3*/}
            <Plot>
                data={[
                    {
                        x: cityNames,
                        y: faults,
                        type: "bar",
                        name: "Critical Faults"
                    },
                    {
                        x: cityNames,
                        y: interruptions,
                        type: "bar",
                        name: "Interruptions"
                    }
                ]}
                layout={{
                    title:"Fault and Interruptions",
                    barmode:"group"
                }}
            </Plot>
        </div>
    );
}

export default Charts;