# WanderVista — Development Plan

## Project Domain
**Travel & Tourism** — destination guides, trip planning, and RAG travel assistant.

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS  |
| Icons    | lucide-react                                    |
| Backend  | FastAPI, Pydantic, Uvicorn                      |
| RAG      | Qdrant Cloud (vector search)                    |
| LLM      | OpenAI GPT-4o-mini                              |
| Database | Neon Serverless Postgres (chat history)         |
| Deploy   | Vercel (FE), Render / Railway (BE)              |
| AI Tools | Cursor AI + Spec-Kit Plus                       |

## File Structure

```
wandervista/
├── .spec/
│   ├── constitution.md
│   ├── plan.md
│   └── tasks/           # 8 task files
├── app/
│   ├── layout.tsx
│   ├── page.tsx         # Homepage
│   ├── globals.css
│   ├── about/
│   ├── destinations/
│   │   └── [id]/        # Dynamic destination detail
│   ├── contact/
│   └── faq/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── DestinationCard.tsx
│   ├── SearchBar.tsx
│   ├── ChatWidget.tsx
│   └── DarkModeToggle.tsx
├── lib/
│   ├── data.ts          # Destination data
│   └── utils.ts
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── routers/chat.py
│   ├── services/
│   │   ├── chatbot.py   # RAG pipeline orchestrator
│   │   ├── rag.py       # Qdrant + keyword retrieval
│   │   ├── db.py        # Neon Postgres chat history
│   │   └── content.py   # Destination knowledge base
│   └── scripts/seed_qdrant.py
├── .env.local
├── package.json
└── README.md
```

## Phase Breakdown

### Phase 1 — Setup & Planning (Day 1)
- [x] Initialize Next.js 14 + TypeScript + Tailwind
- [x] Create `.spec/` documentation (constitution, plan, 8 tasks)
- [x] Define destination data model

### Phase 2 — Core Pages (Days 2–3)
- [x] Navbar + Footer + Dark mode
- [x] Homepage (hero, featured destinations, testimonials, CTA)
- [x] Destinations listing with search & region filter
- [x] Dynamic destination detail pages with SSG
- [x] About, Contact, FAQ pages

### Phase 3 — RAG Chatbot (Days 4–5)
- [x] FastAPI `/chat` endpoint
- [x] Keyword retrieval fallback (no API keys needed)
- [x] Qdrant vector search integration
- [x] OpenAI LLM with retrieved context
- [x] Neon Postgres chat history
- [x] Frontend chat widget with loading states

### Phase 4 — Polish & Testing (Day 6)
- [x] Responsive testing (mobile + desktop)
- [x] Dark mode verification
- [x] Chatbot fallback chain testing
- [x] Build verification (`npm run build`)

### Phase 5 — Deployment (Day 7)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render/Railway
- [ ] Configure environment variables
- [ ] Record 2–3 minute demo video

## Feature Checklist

- [x] Homepage with hero, featured content, CTA
- [x] Content listing page with search/filter
- [x] Individual content pages with related items
- [x] About page with project info
- [x] Contact page with form
- [x] FAQ page
- [x] RAG chatbot (Qdrant + OpenAI + Neon)
- [x] Dark mode
- [x] Responsive design
- [x] Spec-Kit Plus documentation

## Timeline
Estimated: 7 days (university assignment scope)
