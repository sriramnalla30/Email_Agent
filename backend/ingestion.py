import json
from sqlalchemy.orm import Session
from models import Email, Prompt
from llm_service import LLMService
from database import SessionLocal

def load_mock_data(db: Session, file_path: str = "mock_data/mock_inbox.json"):
    with open(file_path, "r") as f:
        emails_data = json.load(f)
    
    for email_data in emails_data:
        # Check if email already exists to avoid duplicates
        existing = db.query(Email).filter(Email.sender == email_data["sender"], Email.subject == email_data["subject"]).first()
        if not existing:
            email = Email(**email_data)
            db.add(email)
    db.commit()

def process_emails(db: Session):
    llm = LLMService()
    
    # Get prompts
    cat_prompt = db.query(Prompt).filter(Prompt.name == "categorization").first()
    action_prompt = db.query(Prompt).filter(Prompt.name == "action_extraction").first()
    
    if not cat_prompt or not action_prompt:
        print("Prompts not found. Please seed prompts first.")
        return

    emails = db.query(Email).filter(Email.category == "Uncategorized").all()
    
    for email in emails:
        print(f"Processing email: {email.subject}")
        
        # Categorize
        category = llm.categorize_email(email.body, cat_prompt.template)
        email.category = category
        
        # Extract Actions
        actions = llm.extract_action_items(email.body, action_prompt.template)
        email.action_items = actions
        
        db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    load_mock_data(db)
    process_emails(db)
    db.close()
