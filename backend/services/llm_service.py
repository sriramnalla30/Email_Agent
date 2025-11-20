import os
import google.generativeai as genai
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Configure Groq
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def run_llm(prompt_text: str, model_provider: str = "groq"):
    try:
        if model_provider == "gemini":
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(prompt_text)
            return response.text
        else:
            # Default to Groq (Llama 3 usually faster/cheaper for this)
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": prompt_text,
                    }
                ],
                model="llama-3.1-8b-instant",
            )
            return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"LLM Error: {e}")
        return f"Error processing request: {str(e)}"
