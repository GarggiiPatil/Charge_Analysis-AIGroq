import sqlite3
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "db" / "charging_data.db"

def run_query(query: str, params: dict):
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql_query(query, conn, params=params)
    conn.close()
    return df

# METRIC QUERIES

CHARGED_VEHICLES_QUERY = """
SELECT COUNT(DISTINCT vehicle_id) AS Charged_Vehicles
FROM charging_sessions
WHERE
    delta_soc > 0
    AND charge_duration_in_min > 0
    AND kwh_charged > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

TOTAL_CHARGED_CYCLES_QUERY = """
SELECT COUNT(*) AS Total_Charged_Cycles
FROM charging_sessions
WHERE
    delta_soc > 0
    AND charge_duration_in_min > 0
    AND kwh_charged > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

CRITICAL_FAULTY_CYCLES_QUERY = """
SELECT COUNT(*) AS Critical_Faulty_Cycles
FROM charging_sessions
WHERE
    signal_occurence_count > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

INTERRUPTION_CYCLES_QUERY = """
SELECT COUNT(*) AS Interruption_Cycles
FROM charging_sessions
WHERE
    no_of_interrupt > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

OPPORTUNITY_CHARGED_CYCLES_QUERY = """
SELECT COUNT(*) AS Opportunity_Charged_Cycles
FROM charging_sessions
WHERE
    soc_end < 100
    AND delta_soc > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

FULL_CHARGED_CYCLES_QUERY = """
SELECT COUNT(*) AS Full_Charged_Cycles
FROM charging_sessions
WHERE
    soc_end = 100
    AND delta_soc > 0
    AND event_date BETWEEN :start_date AND :end_date;
"""

CITY_VEHICLE_REPORT_QUERY = """
SELECT
    dlr_org_city AS City,
    vehicle_type,
    COUNT(DISTINCT vehicle_id) AS Charged_Vehicles,
    COUNT(*) AS Total_Charged_Cycles,
    SUM(CASE WHEN signal_occurence_count > 0 THEN 1 ELSE 0 END) AS Critical_Faulty_Cycles,
    SUM(CASE WHEN no_of_interrupt > 0 THEN 1 ELSE 0 END) AS Interruption_Cycles,
    SUM(CASE WHEN soc_end < 100 THEN 1 ELSE 0 END) AS Opportunity_Charged_Cycles,
    SUM(CASE WHEN soc_end = 100 THEN 1 ELSE 0 END) AS Full_Charged_Cycles,
    MAX(a_max_cell_temp) AS MAX_Temp_Pack_A,
    MAX(b_max_cell_temp) AS MAX_Temp_Pack_B,
    MAX(c_max_cell_temp) AS MAX_Temp_Pack_C,
    MAX(d_max_cell_temp) AS MAX_Temp_Pack_D
FROM charging_sessions
WHERE
    delta_soc > 0
    AND charge_duration_in_min > 0
    AND kwh_charged > 0
    AND event_date BETWEEN :start_date AND :end_date
GROUP BY dlr_org_city, vehicle_type
ORDER BY dlr_org_city, vehicle_type;
"""