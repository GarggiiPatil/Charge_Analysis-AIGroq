from services.llm_service import extract_dates, generate_insights
from services.metrics import generate_charge_analysis

user_input = "Generate a charge analysis report from 10 Jan 2026 to 19 Jan 2026"

# Step 1: Extract dates
dates = extract_dates(user_input)

# Step 2: Compute metrics
report = generate_charge_analysis(
    dates["start_date"],
    dates["end_date"]
)

# Step 3: Generate insights
insights = generate_insights(
    report["summary"],
    dates["start_date"],
    dates["end_date"]
)

print("DATES:", dates)
print("\nSUMMARY:", report["summary"])
print("\nINSIGHTS:\n", insights)