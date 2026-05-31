# Task 007 — RAG Chatbot Integration

**Status:** Completed  
**Priority:** High  
**Time Estimate:** 4 hours

## Description
Implement a RAG-powered travel chatbot with FastAPI backend, Qdrant vector search, OpenAI LLM, and Neon Postgres chat history.

## Acceptance Criteria
- [x] FastAPI `POST /chat` endpoint
- [x] RAG pipeline: retrieve context → generate with OpenAI → save to Postgres
- [x] Qdrant vector search (with seed script)
- [x] Keyword fallback when APIs not configured
- [x] Frontend floating chat widget with loading indicator
- [x] Session ID for chat history tracking
- [x] Mobile-responsive chat panel
