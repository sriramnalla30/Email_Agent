from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
import json

class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, index=True)
    subject = Column(String)
    body = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    category = Column(String, default="Uncategorized")
    is_read = Column(Boolean, default=False)
    action_items = Column(Text, default="[]") # JSON string of action items

class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    template = Column(Text)
    description = Column(String)

class Draft(Base):
    __tablename__ = "drafts"

    id = Column(Integer, primary_key=True, index=True)
    email_id = Column(Integer, ForeignKey("emails.id"), nullable=True)
    subject = Column(String)
    body = Column(Text)
    status = Column(String, default="draft") # draft, sent (simulated)
    
    email = relationship("Email")
