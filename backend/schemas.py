from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class EmailBase(BaseModel):
    sender: str
    subject: str
    body: str
    timestamp: Optional[datetime] = None
    category: Optional[str] = "Uncategorized"
    is_read: Optional[bool] = False
    action_items: Optional[str] = "[]"

class EmailCreate(EmailBase):
    pass

class Email(EmailBase):
    id: int

    class Config:
        orm_mode = True

class PromptBase(BaseModel):
    name: str
    template: str
    description: Optional[str] = None

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int

    class Config:
        orm_mode = True

class DraftBase(BaseModel):
    email_id: Optional[int] = None
    subject: str
    body: str
    status: Optional[str] = "draft"

class DraftCreate(DraftBase):
    pass

class Draft(DraftBase):
    id: int

    class Config:
        orm_mode = True

class ChatRequest(BaseModel):
    query: str
    email_id: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
