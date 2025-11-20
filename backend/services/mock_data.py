import json
from datetime import datetime, timedelta
from .. import models, database

def create_mock_emails(db):
    # Check if emails exist
    if db.query(models.Email).first():
        return

    mock_emails = [
        {
            "sender": "boss@oceanai.com",
            "subject": "Urgent: Q4 Report Due",
            "body": "Hi, I need the Q4 report by EOD tomorrow. Please prioritize this.",
            "timestamp": datetime.utcnow() - timedelta(hours=2),
            "category": "Uncategorized"
        },
        {
            "sender": "newsletter@techweekly.com",
            "subject": "Tech Weekly: AI Revolution",
            "body": "Top stories this week: 1. New AI models released. 2. Python 4.0 rumors.",
            "timestamp": datetime.utcnow() - timedelta(days=1),
            "category": "Uncategorized"
        },
        {
            "sender": "hr@oceanai.com",
            "subject": "Open Enrollment",
            "body": "It's that time of year again! Please review your benefits package.",
            "timestamp": datetime.utcnow() - timedelta(days=2),
            "category": "Uncategorized"
        },
        {
            "sender": "client@shipping.com",
            "subject": "Meeting Request: Project Update",
            "body": "Can we meet next Tuesday at 10 AM to discuss the new vessel tracking system?",
            "timestamp": datetime.utcnow() - timedelta(hours=5),
            "category": "Uncategorized"
        },
        {
            "sender": "spam@offers.com",
            "subject": "You won a cruise!",
            "body": "Click here to claim your free ticket to the Bahamas.",
            "timestamp": datetime.utcnow() - timedelta(hours=1),
            "category": "Uncategorized"
        },
        {
            "sender": "team@project.com",
            "subject": "Daily Standup Notes",
            "body": "Here are the notes from today's standup. Action items: @John to fix bug #123, @Sarah to update docs.",
            "timestamp": datetime.utcnow() - timedelta(hours=4),
            "category": "Uncategorized"
        },
        {
            "sender": "security@oceanai.com",
            "subject": "Password Expiry Warning",
            "body": "Your password will expire in 3 days. Please update it immediately.",
            "timestamp": datetime.utcnow() - timedelta(days=3),
            "category": "Uncategorized"
        },
        {
            "sender": "recruiter@linkedin.com",
            "subject": "New Job Opportunity",
            "body": "I saw your profile and thought you'd be a great fit for this Senior AI Engineer role.",
            "timestamp": datetime.utcnow() - timedelta(days=4),
            "category": "Uncategorized"
        },
        {
            "sender": "aws-billing@amazon.com",
            "subject": "Invoice Available",
            "body": "Your invoice for October 2025 is now available. Total: $45.20",
            "timestamp": datetime.utcnow() - timedelta(days=5),
            "category": "Uncategorized"
        },
        {
            "sender": "mom@gmail.com",
            "subject": "Dinner on Sunday?",
            "body": "Are you free for dinner this Sunday? Let me know.",
            "timestamp": datetime.utcnow() - timedelta(hours=6),
            "category": "Uncategorized"
        },
        {
            "sender": "jira@oceanai.com",
            "subject": "[JIRA] Issue Assigned: BE-404",
            "body": "You have been assigned to issue BE-404: API Latency Spike.",
            "timestamp": datetime.utcnow() - timedelta(minutes=30),
            "category": "Uncategorized"
        },
        {
            "sender": "marketing@tools.com",
            "subject": "Last Chance: 50% Off",
            "body": "Our sale ends tonight. Don't miss out on these software deals.",
            "timestamp": datetime.utcnow() - timedelta(hours=8),
            "category": "Uncategorized"
        }
    ]

    for email_data in mock_emails:
        email = models.Email(**email_data)
        db.add(email)
    
    db.commit()

def create_default_prompts(db):
    if db.query(models.Prompt).first():
        return

    prompts = [
        {
            "name": "categorization",
            "template": "Categorize the following email into one of these categories: Important, Newsletter, Spam, To-Do. Return only the category name.\n\nEmail Body:\n{email_body}",
            "description": "Determines the category of an email."
        },
        {
            "name": "action_extraction",
            "template": "Extract action items from the following email. Return a JSON list of objects with 'task' and 'deadline' fields.\n\nEmail Body:\n{email_body}",
            "description": "Extracts tasks and deadlines."
        },
        {
            "name": "auto_reply",
            "template": "Draft a polite reply to this email. If it's a meeting request, ask for an agenda. Keep it professional.\n\nEmail Body:\n{email_body}",
            "description": "Generates a draft reply."
        }
    ]

    for prompt_data in prompts:
        prompt = models.Prompt(**prompt_data)
        db.add(prompt)
    
    db.commit()
