# Charge Analysis Report Generation using LLM (Groq AI)

An end-to-end **LLM-assisted analytics system** that generates EV charge analysis reports from **natural language queries**, combining the flexibility of Large Language Models with the reliability of **SQL and Pandas**.

---

##  Project Overview

This project allows users to generate a **Charge Analysis Report** by simply typing a natural language query such as:

> “Generate a charge analysis report from 10 Jan 2026 to 19 Jan 2026.”

The system automatically:
- Understands user intent using an LLM
- Extracts the date range
- Queries EV charging data
- Computes business metrics
- Generates structured reports and insights
- Displays results on a React-based UI

---

##  Key Design Principle

**LLM for understanding and insights, SQL/Pandas for computation**

The Large Language Model is strictly limited to:
- Natural language understanding
- Date extraction
- Insight generation

All numerical metrics are computed deterministically using **SQL and Pandas** to ensure accuracy and prevent hallucinations.

---

##  System Architecture

React Frontend
↓
FastAPI Backend
↓
Groq LLM (Date Extraction & Insights)
↓
SQLite Database + Pandas Metrics



---

##  Features

- Natural language report generation
- Deterministic KPI computation
- City and vehicle-type level aggregation
- Fault and interruption analysis
- Opportunity vs full charging insights
- Clean and responsive UI
- Production-safe LLM integration

---

##  Metrics Computed

- **Charged Vehicles** – Unique vehicles with valid charging cycles  
- **Total Charged Cycles** – Total valid charging sessions  
- **Critical Faulty Cycles** – Sessions with fault signals  
- **Interruption Cycles** – Sessions with charging interruptions  
- **Opportunity Charged Cycles** – Partial charging sessions  
- **Full Charged Cycles** – Charging sessions reaching 100% SOC  
- **Max Battery Pack Temperatures** (Pack A, B, C, D)

---

##  Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- FastAPI
- Python
- Pandas
- SQLite

### LLM & Orchestration
- Groq AI (LLaMA 3.1)
- LangChain

---


---

##  How to Run the Project

###  Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

GROQ_API_KEY=your_groq_api_key

python app/data/generate_data.py

uvicorn app.main:app --reload

cd frontend
npm install
npm run dev
```

##  Sample Output
KPI summary cards
LLM-generated business insights
Detailed charge analysis table (city and vehicle-type wise)

<img width="1856" height="886" alt="Screenshot 2026-01-27 123807" src="https://github.com/user-attachments/assets/12b486ff-dc47-4f53-aacb-ff4ab127ea1d" />
<img width="1586" height="872" alt="Screenshot 2026-01-27 123820" src="https://github.com/user-attachments/assets/036f380a-b5c4-49bd-964d-4d56017e40ad" />



## Why This Project Stands Out
Safe and controlled LLM usage
No SQL hallucination
Clear separation of concerns
Real-world EV charging analytics
Scalable and extensible design

## Future Enhancements
Data visualizations (charts & graphs)
Authentication and role-based access
Query caching
Cloud deployment
Multi-tenant analytics support

## Author

Gargi Patil
Computer Science Engineering (AI & ML)
Focused on AI-powered analytics, backend systems, and full-stack development
