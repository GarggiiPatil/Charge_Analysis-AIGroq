import pandas as pd
import numpy as np
import sqlite3
from datetime import datetime, timedelta
import random
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "db" / "charging_data.db"
SCHEMA_PATH = BASE_DIR / "db" / "schema.sql"

# Connect DB
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Create table
with open(SCHEMA_PATH, "r") as f:
    cursor.executescript(f.read())

# Configuration
NUM_RECORDS = 5000
cities = ["Delhi", "Bangalore", "Chennai", "Mumbai", "Pune"]
vehicle_types = [
    "4/12 Low Entry EV FBV",
    "7/12 Low Entry EV FBV",
    "ULTRA URBAN9/9 EV FBV"
]

start_date = datetime(2025, 12, 1)
end_date = datetime(2026, 1, 31)

def random_date():
    delta = end_date - start_date
    return start_date + timedelta(days=random.randint(0, delta.days))

data = []

for _ in range(NUM_RECORDS):
    delta_soc = round(random.uniform(5, 60), 2)
    charge_duration = random.randint(10, 180)
    kwh = round(delta_soc * random.uniform(0.15, 0.25), 3)

    soc_end = random.choice([100, random.uniform(40, 99)])

    record = {
        "dlr_org_city": random.choice(cities),
        "vehicle_type": random.choice(vehicle_types),
        "vehicle_id": f"EV-{random.randint(1000, 9999)}",
        "delta_soc": delta_soc,
        "charge_duration_in_min": charge_duration,
        "kwh_charged": kwh,
        "signal_occurence_count": random.choice([0, 0, 0, 1, 2]),
        "no_of_interrupt": random.choice([0, 0, 1, 2]),
        "soc_end": round(soc_end, 2),
        "a_max_cell_temp": round(random.uniform(28, 45), 1),
        "b_max_cell_temp": round(random.uniform(28, 46), 1),
        "c_max_cell_temp": round(random.uniform(28, 47), 1),
        "d_max_cell_temp": round(random.uniform(28, 48), 1),
        "smart_city": random.choice([0, 1]),
        "event_date": random_date().date()
    }

    data.append(record)

df = pd.DataFrame(data)

# Insert into SQLite
df.to_sql("charging_sessions", conn, if_exists="append", index=False)

conn.commit()
conn.close()

print(f"Inserted {len(df)} charging records successfully.")