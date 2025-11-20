from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Prompt

# Create tables
Base.metadata.create_all(bind=engine)

def seed_prompts(db: Session):
    prompts = [
        {
            "name": "categorization",
            "template": "Categorize the following email into one of these categories: Important, Newsletter, Spam, To-Do, Project, Personal. Return ONLY the category name.",
            "description": "Determines the category of the email."
        },
        {
            "name": "action_extraction",
            "template": "Extract tasks from the email. Return a JSON list of objects with 'task' and 'deadline' keys. If no deadline is mentioned, use 'None'. Example: [{\"task\": \"Submit report\", \"deadline\": \"Friday\"}]. Return ONLY the JSON.",
            "description": "Extracts actionable tasks from the email body."
        },
        {
            "name": "auto_reply",
            "template": "Draft a polite and professional reply to this email. Use a helpful tone.",
            "description": "Template for generating email replies."
        }
    ]

    for p_data in prompts:
        existing = db.query(Prompt).filter(Prompt.name == p_data["name"]).first()
        if not existing:
            prompt = Prompt(**p_data)
            db.add(prompt)
    
    db.commit()
    print("Prompts seeded.")

if __name__ == "__main__":
    db = SessionLocal()
    seed_prompts(db)
    db.close()
