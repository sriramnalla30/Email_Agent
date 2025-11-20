# Ocean AI Email Productivity Agent

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
