CREATE TABLE IF NOT EXISTS charging_sessions (
    dlr_org_city TEXT,
    vehicle_type TEXT,
    vehicle_id TEXT,
    delta_soc REAL,
    charge_duration_in_min INTEGER,
    kwh_charged REAL,
    signal_occurence_count INTEGER,
    no_of_interrupt INTEGER,
    soc_end REAL,
    a_max_cell_temp REAL,
    b_max_cell_temp REAL,
    c_max_cell_temp REAL,
    d_max_cell_temp REAL,
    smart_city BOOLEAN,
    event_date DATE
);