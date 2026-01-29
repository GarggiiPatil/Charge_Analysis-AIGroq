import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant",
    temperature=0
)

# DATE_CITY EXTRACTION PROMPT

date_city_prompt = PromptTemplate(
    input_variables=["user_query"],
    template="""
You are an information extraction assistant.

Extract the following from the user query:
1. start_date
2. end_date
3. city (if mentioned, else null)

Rules:
- Return ONLY valid JSON
- Date format must be YYYY-MM-DD
- City must be a single word or null
- Do not add explanations

User Query:
{user_query}

Expected JSON format:
{{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "city": "Delhi" | null
}}
"""
)

def extract_query_filters(user_query: str):
    response = llm.invoke(
        date_city_prompt.format(user_query=user_query)
    )

    text = response.content.strip()
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("Invalid LLM extraction output")

    return json.loads(text[start:end + 1])
    
# INSIGHT GENERATION PROMPT

detailed_report_prompt = PromptTemplate(
    input_variables=["table_data", "start_date", "end_date", "city"],
    template="""
You are a senior EV data analyst.

Generate a detailed analytical report for the charging data.

Context:
- Date Range: {start_date} to {end_date}
- City Filter: {city}

Instructions:
- Write in clear paragraphs (not bullets)
- Explain ALL columns from the table
- Compare patterns across vehicle types
- Explain opportunity vs full charging clearly
- Discuss faults and interruptions in reliability context
- Temperature must be discussed as ONE common concept (overall max temperature)
- Do NOT invent numbers
- Use ONLY provided data

Structure the report into sections:
1. Overview of Charging Activity
2. Vehicle Utilization Analysis
3. Charging Completion Behavior
4. Reliability and Fault Analysis
5. Battery Temperature Analysis
6. Key City-Level Findings

Charging Table Data (JSON):
{table_data}
"""
)


def generate_detailed_insights(report_table, start_date, end_date, city):
    response = llm.invoke(
        detailed_report_prompt.format(
            table_data=json.dumps(report_table, indent=2),
            start_date=start_date,
            end_date=end_date,
            city=city if city else "All Cities"
        )
    )
    return response.content.strip()