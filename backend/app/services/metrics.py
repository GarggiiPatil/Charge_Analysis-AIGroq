import pandas as pd
from .sql_service import (
    run_query,
    CHARGED_VEHICLES_QUERY,
    TOTAL_CHARGED_CYCLES_QUERY,
    CRITICAL_FAULTY_CYCLES_QUERY,
    INTERRUPTION_CYCLES_QUERY,
    OPPORTUNITY_CHARGED_CYCLES_QUERY,
    FULL_CHARGED_CYCLES_QUERY,
    CITY_VEHICLE_REPORT_QUERY
)


def generate_charge_analysis(start_date: str, end_date: str, city: str = None):
    """
    Generates full charge analysis report between given dates.
    Optionally filters by city.
    Returns KPIs + report table + chart-ready datasets.
    """

    params = {
        "start_date": start_date,
        "end_date": end_date
    }

    # KPI METRICS (GLOBAL)

    charged_vehicles = run_query(
        CHARGED_VEHICLES_QUERY, params
    ).iloc[0]["Charged_Vehicles"]

    total_cycles = run_query(
        TOTAL_CHARGED_CYCLES_QUERY, params
    ).iloc[0]["Total_Charged_Cycles"]

    critical_faults = run_query(
        CRITICAL_FAULTY_CYCLES_QUERY, params
    ).iloc[0]["Critical_Faulty_Cycles"]

    interruption_cycles = run_query(
        INTERRUPTION_CYCLES_QUERY, params
    ).iloc[0]["Interruption_Cycles"]

    opportunity_cycles = run_query(
        OPPORTUNITY_CHARGED_CYCLES_QUERY, params
    ).iloc[0]["Opportunity_Charged_Cycles"]

    full_cycles = run_query(
        FULL_CHARGED_CYCLES_QUERY, params
    ).iloc[0]["Full_Charged_Cycles"]

    # MAIN REPORT TABLE

    report_df = run_query(
        CITY_VEHICLE_REPORT_QUERY, params
    )

    if report_df.empty:
        return {
            "date_range": {"start_date": start_date, "end_date": end_date},
            "filters": {"city": city},
            "summary": {},
            "report_table": [],
            "charts": {}
        }

    # Optional City Filter

    if city:
        report_df = report_df[
            report_df["City"].astype(str).str.lower() == city.lower()
        ]

    if report_df.empty:
        return {
            "date_range": {"start_date": start_date, "end_date": end_date},
            "filters": {"city": city},
            "summary": {},
            "report_table": [],
            "charts": {}
        }

    # TEMPERATURE AGGREGATION

    temp_cols = [
        "MAX_Temp_Pack_A",
        "MAX_Temp_Pack_B",
        "MAX_Temp_Pack_C",
        "MAX_Temp_Pack_D"
    ]

    for col in temp_cols:
        if col not in report_df.columns:
            report_df[col] = 0

    report_df["MAX_TEMP_OVERALL"] = report_df[temp_cols].max(axis=1)

    # SUMMARY KPIs

    insights = {
        "charged_vehicles": int(charged_vehicles or 0),
        "total_charged_cycles": int(total_cycles or 0),
        "critical_faulty_cycles": int(critical_faults or 0),
        "interruption_cycles": int(interruption_cycles or 0),
        "opportunity_charged_cycles": int(opportunity_cycles or 0),
        "full_charged_cycles": int(full_cycles or 0),

        "opportunity_charge_ratio": round(
            opportunity_cycles / total_cycles, 2
        ) if total_cycles else 0,

        "full_charge_ratio": round(
            full_cycles / total_cycles, 2
        ) if total_cycles else 0
    }

    # REPORT TABLE JSON

    report_table = report_df.to_dict(orient="records")

    # CHART DATASETS

    charts = {
        # BAR — Total cycles per city
        "bar_total_cycles": report_df[
            ["City", "Total_Charged_Cycles"]
        ].to_dict("records"),

        # GROUPED BAR — Vehicles vs cycles
        "grouped_vehicles": report_df[
            ["City", "Charged_Vehicles", "Total_Charged_Cycles"]
        ].to_dict("records"),

        # STACKED BAR — Opportunity vs Full
        "stacked_charging": report_df[
            ["City", "Opportunity_Charged_Cycles", "Full_Charged_Cycles"]
        ].to_dict("records"),

        # LINE — Temperature
        "temperature_line": report_df[
            ["City", "MAX_TEMP_OVERALL"]
        ].to_dict("records"),

        # BUBBLE — Faults vs Interruptions
        "fault_bubble": report_df[
            ["City", "Critical_Faulty_Cycles", "Interruption_Cycles"]
        ].to_dict("records")
    }

    # FINAL RESPONSE
    return {
        "date_range": {
            "start_date": start_date,
            "end_date": end_date
        },
        "filters": {
            "city": city
        },
        "summary": insights,
        "report_table": report_table,
        "charts": charts
    }