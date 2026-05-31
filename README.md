# WanderVista

> Modern travel & tourism platform built with Next.js 14, TypeScript, Tailwind CSS, and a RAG-powered FastAPI chatbot backend.

A university-assignment-ready full-stack project: explore world-class destinations, read detailed travel guides, search & filter by region, contact the team, and chat with a built-in AI travel assistant.

---

## Features

- **Homepage** with hero, featured destinations, testimonials, and CTA
- **Destinations listing** with live search and region filters
- **Dynamic destination details** at `/destinations/[id]` with highlights & related places
- **About page** with mission, tech stack, and project info
- **Contact page** with form + email & socials
- **FAQ page**
- **RAG travel chatbot** (Qdrant + OpenAI + Neon Postgres, with offline fallback)
- **Dark mode** (persisted, system-preference aware)
- **Fully responsive**, mobile-first design
- **Spec-Kit Plus** documentation in `.spec/`

---

## Technologies

| Layer    | Tech                                              |
|----------|---------------------------------------------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS    |
| Icons    | lucide-react                                      |
| Backend  | FastAPI, Pydantic, Uvicorn                        |
| RAG      | Qdrant Cloud (vector search)                      |
| LLM      | OpenAI GPT-4o-mini                                |
| Database | Neon Serverless Postgres (chat history)           |
| AI Tools | Cursor AI + Spec-Kit Plus                         |
| Deploy   | Vercel (FE), Render / Railway (BE)               |

---

## Project Structure

```
wandervista/
├── .spec/                 # Spec-Kit Plus documentation
│   ├── constitution.md
│   ├── plan.md
│   └── tasks/             # 8 task files
├── app/                   # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx           # Homepage
│   ├── globals.css
│   ├── about/
│   ├── destinations/
│   │   └── [id]/          # Dynamic destination detail
│   ├── contact/
│   └── faq/
├── components/            # Reusable React components
├── lib/
│   └── data.ts            # Destination data
├── backend/               # FastAPI RAG chatbot backend
│   ├── main.py
│   ├── requirements.txt
│   ├── routers/chat.py
│   ├── services/
│   │   ├── chatbot.py
│   │   ├── rag.py
│   │   ├── db.py
│   │   └── content.py
│   └── scripts/seed_qdrant.py
├── .env.local
├── package.json
└── README.md
```

---

## Installation

### Prerequisites
- Node.js 18.17+
- Python 3.11+ (for the backend — **not** 3.14)

### 1. Frontend

```bash
git clone <your-repo-url>
cd ai-learning-hub
npm install
npm run dev
```

App runs at **http://localhost:3000**.

### 2. Backend (RAG chatbot)

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API runs at **http://localhost:8000** with `/chat` endpoint.

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Backend — Google Gemini (primary LLM)
GEMINI_API_KEY=your_gemini_key_here

# Backend — OpenAI (optional fallback)
OPENAI_API_KEY=your_openai_key_here

# Backend — Qdrant Cloud (optional; falls back to keyword search)
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key_here
QDRANT_COLLECTION=wandervista_destinations

# Backend — Neon Postgres (optional; skips chat history if unset)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

**Without any API keys**, the chatbot still works using keyword-based retrieval and rule-based responses — perfect for local demos.

### Seed Qdrant (optional, for full RAG)

```bash
cd backend && source .venv/bin/activate
python scripts/seed_qdrant.py
```

---

## RAG Chatbot Pipeline

```
User message
    ↓
1. Retrieve relevant destination content (Qdrant vector search OR keyword fallback)
    ↓
2. Generate response with OpenAI using retrieved context
    ↓
3. Save conversation to Neon Postgres
    ↓
4. Return response to frontend chat widget
```

---

## Deployment

### Frontend → Vercel
1. Push the repo to GitHub.
2. Go to **vercel.com → New Project → Import**.
3. Framework preset: **Next.js** (auto-detected).
4. Add env var `NEXT_PUBLIC_API_URL` pointing to your deployed backend.
5. Click **Deploy**.

### Backend → Render (free)
1. Push the repo to GitHub.
2. **Render → New Web Service → connect repo**.
3. Root: `backend/`, Build: `pip install -r requirements.txt`, Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Add environment variables: `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.

---

## Destinations (Pakistan)

| Destination | Region | Budget | Duration |
|-------------|--------|--------|----------|
| Hunza Valley | Gilgit-Baltistan | Mid-Range | 5–7 Days |
| Lahore | Punjab | Budget | 3–4 Days |
| Swat Valley | KPK | Budget | 4–5 Days |
| Skardu | Gilgit-Baltistan | Mid-Range | 5–6 Days |
| Karachi | Sindh | Budget | 2–3 Days |
| Fairy Meadows | Gilgit-Baltistan | Mid-Range | 3–4 Days |

---

## Development Process

This project was built using:
- **Cursor AI** for AI-assisted development (assignment equivalent to Claude Code)
- **Spec-Kit Plus** for structured planning (`.spec/` folder)
- Phase-wise development documented in `.spec/plan.md`
- 8 task files tracking progress in `.spec/tasks/`

---

## License

Built for educational purposes as a university web development assignment. Free to use and adapt.
