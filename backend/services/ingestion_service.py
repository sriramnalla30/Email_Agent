from sqlalchemy.orm import Session
from .. import models
from . import llm_service
import json

def process_email(db: Session, email_id: int):
    email = db.query(models.Email).filter(models.Email.id == email_id).first()
    if not email:
        return
    
    # 1. Categorization
    cat_prompt = db.query(models.Prompt).filter(models.Prompt.name == "categorization").first()
    if cat_prompt:
        prompt_text = cat_prompt.template.replace("{email_body}", email.body)
        category = llm_service.run_llm(prompt_text).strip()
        # Basic cleanup if LLM is chatty
        if "Important" in category: email.category = "Important"
        elif "Newsletter" in category: email.category = "Newsletter"
        elif "Spam" in category: email.category = "Spam"
        elif "To-Do" in category: email.category = "To-Do"
        else: email.category = "Uncategorized"

    # 2. Action Extraction
    action_prompt = db.query(models.Prompt).filter(models.Prompt.name == "action_extraction").first()
    if action_prompt:
        prompt_text = action_prompt.template.replace("{email_body}", email.body)
        actions_json_str = llm_service.run_llm(prompt_text)
        # Try to parse JSON, store as string
        try:
            # Find JSON substring if wrapped in markdown
            start = actions_json_str.find('[')
            end = actions_json_str.rfind(']') + 1
            if start != -1 and end != -1:
                clean_json = actions_json_str[start:end]
                email.action_items = clean_json
            else:
                email.action_items = "[]"
        except:
            email.action_items = "[]"

    # 3. Draft Generation (for Important or To-Do emails)
    if email.category in ["Important", "To-Do"]:
        reply_prompt = db.query(models.Prompt).filter(models.Prompt.name == "auto_reply").first()
        if reply_prompt:
            prompt_text = reply_prompt.template.replace("{email_body}", email.body)
            draft_body = llm_service.run_llm(prompt_text)
            
            # Create Draft object
            new_draft = models.Draft(
                email_id=email.id,
                subject=f"Re: {email.subject}",
                body=draft_body,
                status="draft"
            )
            db.add(new_draft)

    db.commit()
    db.refresh(email)
    return email

def process_all_emails(db: Session):
    emails = db.query(models.Email).filter(models.Email.category == "Uncategorized").all()
    for email in emails:
        process_email(db, email.id)
    return {"processed": len(emails)}
