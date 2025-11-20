from backend.database import SessionLocal, engine
from backend import models
from backend.services import mock_data

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    print("Seeding mock data...")
    mock_data.create_mock_emails(db)
    mock_data.create_default_prompts(db)
    print("Seeding complete.")
    
    emails = db.query(models.Email).all()
    print(f"Emails in DB: {len(emails)}")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
