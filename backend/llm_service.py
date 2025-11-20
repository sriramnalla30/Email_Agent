import os
import json
import google.generativeai as genai
from groq import Groq
from dotenv import load_dotenv
from typing import List, Dict, Any

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Configure Groq
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

class LLMService:
    def __init__(self):
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash') if GEMINI_API_KEY else None

    def _call_gemini(self, prompt: str) -> str:
        if not self.gemini_model:
            raise Exception("Gemini API Key not found")
        response = self.gemini_model.generate_content(prompt)
        return response.text

    def _call_groq(self, prompt: str, model="llama3-8b-8192") -> str:
        if not groq_client:
            raise Exception("Groq API Key not found")
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model=model,
        )
        return chat_completion.choices[0].message.content

    def call_llm(self, prompt: str) -> str:
        # Fallback logic: Try Gemini, then Groq
        try:
            return self._call_gemini(prompt)
        except Exception as e:
            print(f"Gemini failed: {e}. Trying Groq...")
            try:
                return self._call_groq(prompt)
            except Exception as e2:
                return f"Error calling LLM: {e2}"

    def categorize_email(self, email_body: str, prompt_template: str) -> str:
        full_prompt = f"{prompt_template}\n\nEmail Body:\n{email_body}"
        return self.call_llm(full_prompt).strip()

    def extract_action_items(self, email_body: str, prompt_template: str) -> List[Dict]:
        full_prompt = f"{prompt_template}\n\nEmail Body:\n{email_body}"
        response_text = self.call_llm(full_prompt)
        # Attempt to parse JSON from the response
        try:
            # Clean up potential markdown code blocks
            cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            print(f"Failed to parse JSON from LLM response: {response_text}")
            return []

    def generate_draft(self, email_body: str, instructions: str, prompt_template: str) -> str:
        full_prompt = f"{prompt_template}\n\nUser Instructions: {instructions}\n\nOriginal Email:\n{email_body}"
        return self.call_llm(full_prompt)

    def chat_with_agent(self, query: str, context: str) -> str:
        prompt = f"You are a helpful Email Productivity Agent. Answer the user's question based on the provided context (emails).\n\nContext:\n{context}\n\nUser Question: {query}"
        return self.call_llm(prompt)
