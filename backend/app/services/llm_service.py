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

# 
# DATE EXTRACTION PROMPT
date_prompt = PromptTemplate(
    input_variables=["user_query"],
    template="""
You are an information extraction assistant.

Extract the start date and end date from the user query.

Rules:
- Return ONLY valid JSON
- Date format must be YYYY-MM-DD
- If a single date range is mentioned, extract it
- Do not add explanations

User Query:
{user_query}

Expected JSON format:
{{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}}
"""
)

def extract_dates(user_query: str):
    response = llm.invoke(
        date_prompt.format(user_query=user_query)
    )

    try:
        return json.loads(response.content)
    except json.JSONDecodeError:
        raise ValueError("LLM failed to extract dates correctly")
    
# -------------------------
# INSIGHT GENERATION PROMPT
# -------------------------
insight_prompt = PromptTemplate(
    input_variables=["metrics", "start_date", "end_date"],
    template="""
You are a data analyst.

Given the following charging analysis metrics between {start_date} and {end_date},
generate 4–5 concise business insights.

Rules:
- Focus on charging behavior, faults, interruptions, and efficiency
- Do NOT invent numbers
- Use only provided data
- Use professional tone

Metrics:
{metrics}
"""
)

def generate_insights(metrics: dict, start_date: str, end_date: str):
    response = llm.invoke(
        insight_prompt.format(
            metrics=json.dumps(metrics, indent=2),
            start_date=start_date,
            end_date=end_date
        )
    )

    return response.content.strip()