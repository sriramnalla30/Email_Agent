# Ocean AI - Prompt-Driven Email Productivity Agent

An intelligent, prompt-driven email agent that categorizes emails, extracts action items, and drafts replies using LLMs (Gemini/Groq). Built with **FastAPI** (Backend) and **React + Vite** (Frontend).

## 🚀 Features

*   **Inbox Ingestion:** Load mock emails to simulate a real inbox environment.
*   **Prompt-Driven Architecture:** The "Brain" of the agent. Configure prompts for categorization, action extraction, and drafting.
*   **Automated Processing:**
    *   **Categorization:** Automatically tags emails (Important, Newsletter, Spam, To-Do).
    *   **Action Items:** Extracts tasks and deadlines into structured JSON.
    *   **Auto-Drafting:** Generates draft replies for "Important" and "To-Do" emails.
*   **Agent Chat:** Chat with your inbox! Ask questions like "Summarize my unread emails" or "What tasks are due today?".
*   **Draft Management:** Review, edit, and "send" (simulate) generated drafts.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS, Vite, Axios.
*   **Backend:** Python, FastAPI, SQLAlchemy, Pydantic.
*   **Database:** SQLite (Local), easily swappable for PostgreSQL.
*   **AI/LLM:** Modular service layer supporting Gemini, Groq, or OpenAI.

## 📂 Project Structure

```
├── backend/
│   ├── main.py                 # API Entry point
│   ├── models.py               # Database Models (Email, Prompt, Draft)
│   ├── services/
│   │   ├── ingestion_service.py # Core logic for processing emails
│   │   ├── llm_service.py      # LLM Adapter (Gemini/Groq)
│   │   └── mock_data.py        # Mock data generator
│   └── database.py             # DB Connection
├── frontend/
│   ├── src/
│   │   ├── components/         # React Components (Inbox, Drafts, etc.)
│   │   ├── api/                # API Client
│   │   └── App.tsx             # Main App Component
├── seed_db.py                  # Script to seed database with mock data
└── README.md                   # This file
```

## ⚡ Setup Instructions

### Prerequisites
*   Python 3.9+
*   Node.js 16+
*   API Key for Gemini or Groq

### 1. Backend Setup

1.  Navigate to the root directory.
2.  Create a virtual environment:
    ```bash
    python -m venv .venv
    # Windows
    .venv\Scripts\activate
    # Mac/Linux
    source .venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r backend/requirements.txt
    ```
4.  **Configure Environment:**
    Create a `.env` file in the `backend/` folder (or root) with your API key:
    ```env
    # backend/.env
    GROQ_API_KEY=your_api_key_here
    # OR
    GEMINI_API_KEY=your_api_key_here
    ```
5.  **Seed the Database:**
    Load the mock inbox and default prompts:
    ```bash
    python seed_db.py
    ```
6.  Run the Server:
    ```bash
    uvicorn backend.main:app --reload --port 8001
    ```

### 2. Frontend Setup

1.  Open a new terminal and navigate to `frontend/`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to `http://localhost:5173`.

## 📖 Usage Guide

### 1. Loading the Mock Inbox
*   Go to the **Inbox** tab.
*   Click **"Load Mock Data"**. This injects 10-15 sample emails (Work, Newsletters, Spam) into the system.

### 2. Running the Agent
*   Click **"Run Agent"**.
*   The system will:
    1.  Fetch the "Categorization" prompt from the DB.
    2.  Send each email to the LLM.
    3.  Tag the email (e.g., "Important").
    4.  Extract action items (e.g., "Submit report by Friday").
    5.  Generate a draft reply if the email is Important.

### 3. Configuring Prompts ("The Brain")
*   Go to the **Prompt Brain** tab.
*   Here you can edit the instructions the agent uses.
*   *Example:* Change the "Auto-Reply" prompt to "Be very casual and use emojis".
*   Save the prompt and re-run the agent to see the behavior change!

### 4. Chatting with your Inbox
*   Go to **Email Agent**.
*   Ask: "What is the most urgent task today?" or "Summarize the email from the Boss".

### 5. Managing Drafts
*   Go to **Drafts**.
*   Select a generated draft.
*   Edit the content and click "Send" (simulates sending).

## 🧪 Evaluation Criteria Checklist

*   ✅ **Functionality:** Ingestion, Categorization, Action Extraction, Drafting all working.
*   ✅ **Prompt-Driven:** All logic uses stored prompts editable via UI.
*   ✅ **Code Quality:** Modular Service/Controller pattern.
*   ✅ **UX:** Clean Tailwind UI with distinct sections.
*   ✅ **Safety:** Emails are drafted, never auto-sent.

## 📜 License
MIT

A prompt-driven, intelligent email agent built for Ocean AI. This application allows users to manage their inbox, categorize emails using LLMs, extract action items, and generate draft replies via a chat interface.

## Features

- **Prompt-Driven Architecture**: Customize the "Brain" of the agent by editing prompts for categorization, action extraction, and drafting.
- **Mock Inbox**: Instantly load sample data to test the agent.
- **Intelligent Ingestion**: Automatically categorizes emails and extracts tasks using Groq/Gemini.
- **Agent Chat**: Chat with your inbox to summarize emails or ask for specific information.
- **Draft Management**: Review and edit AI-generated drafts.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, SQLite, SQLAlchemy
- **AI**: Google Gemini / Groq (Llama 3)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (v3.10+)
- API Keys for Gemini and Groq (configured in `.env`)

### Backend Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage Guide

1. **Load Data**: Go to the **Inbox** tab and click "Load Mock Data".
2. **Process Emails**: Click "Run Agent" to trigger the LLM processing pipeline. Watch as categories and action items appear.
3. **Configure Prompts**: Visit **Prompt Brain** to tweak how the agent categorizes or replies.
4. **Chat**: Use **Email Agent** to ask "What are my urgent tasks?" or "Summarize the newsletter".
5. **Drafts**: Go to **Drafts** to view and edit generated replies.

## Project Structure

- `backend/`: FastAPI application and database models.
- `frontend/`: React application with Ocean AI branding.
