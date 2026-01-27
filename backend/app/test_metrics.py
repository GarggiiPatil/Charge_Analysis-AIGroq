from services.metrics import generate_charge_analysis

result = generate_charge_analysis(
    start_date="2026-01-10",
    end_date="2026-01-19"
)

print(result["summary"])
print(result["report_table"][:2])