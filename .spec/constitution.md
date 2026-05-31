# WanderVista — Constitution

## Mission Statement
To inspire and empower travelers by providing curated destination guides and an
AI-powered travel assistant that delivers accurate, context-aware trip planning advice.

## Core Principles
1. **Traveler first** — every UI and content decision serves the explorer.
2. **Authentic inspiration** — showcase real destinations with honest, useful details.
3. **Free & accessible** — no paywalls for destination guides.
4. **AI as a guide** — the RAG chatbot augments research, never replaces personal discovery.
5. **Mobile-ready** — plan trips from any device, anywhere.

## Technical Standards
- Next.js 14+ App Router with TypeScript (`strict: true`).
- Tailwind CSS utility-first styling, mobile-first.
- Reusable, typed components under `components/`.
- Server components by default; client components only when needed.
- FastAPI backend with RAG pipeline (Qdrant + OpenAI + Neon Postgres).
- No console errors, no TypeScript errors, builds clean.

## Design Guidelines
- Travel-inspired teal/sky gradients, generous whitespace, rounded-2xl cards.
- Consistent spacing scale (Tailwind defaults).
- Dark mode fully supported via `class` strategy.
- Smooth hover/transition animations — never gratuitous.
- Typography: Inter font, clear hierarchy.

## Development Rules
- Conventional commits.
- One feature = one PR.
- New pages must include `metadata` for SEO.
- Every component must be responsive at sm / md / lg breakpoints.
- Secrets live only in `.env.local` — never committed.
- AI development assisted by Cursor AI (assignment equivalent to Claude Code).
