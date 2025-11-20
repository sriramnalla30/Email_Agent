from backend.database import SessionLocal
from backend import models

def reset_demo_state():
    db = SessionLocal()
    try:
        print("Resetting demo state...")
        
        # Delete all drafts
        num_drafts = db.query(models.Draft).delete()
        print(f"Deleted {num_drafts} drafts.")
        
        # Delete all emails
        num_emails = db.query(models.Email).delete()
        print(f"Deleted {num_emails} emails.")
        
        # Ensure prompts exist (in case they were deleted or never created)
        from backend.services import mock_data
        mock_data.create_default_prompts(db)
        print("Ensured default prompts exist.")
        
        db.commit()
        print("Reset complete. The Inbox is now empty and ready for the demo.")
        
    except Exception as e:
        print(f"Error resetting state: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_demo_state()
