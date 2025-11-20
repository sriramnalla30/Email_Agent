from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Ocean AI Email Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Ocean AI Email Agent Backend is running"}

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/emails", response_model=List[schemas.Email])
def get_emails(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    emails = db.query(models.Email).offset(skip).limit(limit).all()
    return emails

@app.get("/prompts", response_model=List[schemas.Prompt])
def get_prompts(db: Session = Depends(get_db)):
    prompts = db.query(models.Prompt).all()
    return prompts

@app.post("/prompts", response_model=schemas.Prompt)
def create_prompt(prompt: schemas.PromptCreate, db: Session = Depends(get_db)):
    db_prompt = db.query(models.Prompt).filter(models.Prompt.name == prompt.name).first()
    if db_prompt:
        # Update existing
        db_prompt.template = prompt.template
        db_prompt.description = prompt.description
        db.commit()
        db.refresh(db_prompt)
        return db_prompt
    
    db.add(new_prompt)
    db.commit()
    db.refresh(new_prompt)
    return new_prompt

@app.post("/ingest/mock")
def load_mock_data(db: Session = Depends(get_db)):
    from .services import mock_data
    mock_data.create_mock_emails(db)
    mock_data.create_default_prompts(db)
    return {"message": "Mock data loaded"}

@app.post("/ingest/process")
def process_inbox(db: Session = Depends(get_db)):
    from .services import ingestion_service
    return ingestion_service.process_all_emails(db)

@app.post("/chat", response_model=schemas.ChatResponse)
def chat_agent(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    from .services import llm_service
    
    context = ""
    if request.email_id:
        email = db.query(models.Email).filter(models.Email.id == request.email_id).first()
        if email:
            context = f"Email Context:\nSender: {email.sender}\nSubject: {email.subject}\nBody: {email.body}\nCategory: {email.category}\nAction Items: {email.action_items}\n\n"
    else:
        # Simple context: list of unread emails or high priority
        emails = db.query(models.Email).limit(5).all()
        email_list = "\n".join([f"- [{e.id}] {e.subject} (from {e.sender})" for e in emails])
        context = f"Recent Emails:\n{email_list}\n\n"

    system_prompt = "You are an intelligent Email Productivity Agent for Ocean AI. Help the user manage their inbox. Use the provided context to answer questions. If asked to draft a reply, suggest one based on the context."
    full_prompt = f"{system_prompt}\n\n{context}User Query: {request.query}\n\nAgent Response:"
    
    response_text = llm_service.run_llm(full_prompt)
    return {"response": response_text}

@app.get("/drafts", response_model=List[schemas.Draft])
def get_drafts(db: Session = Depends(get_db)):
    return db.query(models.Draft).all()

@app.post("/drafts", response_model=schemas.Draft)
def create_draft(draft: schemas.DraftCreate, db: Session = Depends(get_db)):
    db_draft = models.Draft(**draft.dict())
    db.add(db_draft)
    db.commit()
    db.refresh(db_draft)
    return db_draft
