"""RAG-powered chatbot service for WanderVista (Pakistan travel).

Pipeline:
  1. Retrieve relevant destination content (Qdrant or keyword fallback)
  2. Generate response with Gemini or OpenAI using retrieved context
  3. Save conversation to Neon Postgres (when configured)
  4. Fall back to rule-based replies when APIs are unavailable
"""
import os
import re

from services.rag import retrieve_context
from services.db import save_message

SYSTEM_PROMPT = (
    "You are the WanderVista Pakistan travel assistant. Answer questions about Pakistani "
    "destinations, travel tips, best times to visit, budgets, and trip planning using ONLY "
    "the provided context. Be friendly, concise, and helpful. If you don't know, suggest "
    "browsing the Destinations page or contacting hello@wandervista.pk."
)

RULES = [
    (re.compile(r"hunza|karimabad|attabad|passu", re.I),
     "Hunza Valley, Gilgit-Baltistan — 5-7 days, Mid-Range. Best: April-October. Highlights: Baltit Fort, Attabad Lake, Eagle's Nest, Passu Cones."),
    (re.compile(r"lahore|punjab|badshahi|wagah", re.I),
     "Lahore, Punjab — 3-4 days, Budget. Best: Oct-March. Highlights: Badshahi Mosque, Lahore Fort, Food Street, Wagah Border."),
    (re.compile(r"swat|malam jabba|mingora", re.I),
     "Swat Valley, KPK — 4-5 days, Budget. Best: May-September. Highlights: Malam Jabba, Mahodand Lake, Butkara Stupa."),
    (re.compile(r"skardu|k2|deosai|shangrila|kachura", re.I),
     "Skardu, Gilgit-Baltistan — 5-6 days, Mid-Range. Best: June-September. Highlights: Shangrila Lake, Cold Desert, Deosai Plains."),
    (re.compile(r"capital of pakistan|pakistan capital|is karachi the capital|is islamabad the capital", re.I),
     "Karachi is Pakistan's largest city and commercial hub, but the national capital is Islamabad."),
    (re.compile(r"price|cost|budget|expensive|cheap|afford", re.I),
     "Trips are grouped by budget tier: Budget (Karachi, Lahore, Swat), Mid-Range (Hunza, Skardu, Fairy Meadows), and luxury experiences. Check destination pages for more details."),
    (re.compile(r"karachi|clifton|sindh|churna", re.I),
     "Karachi, Sindh — 2-3 days, Budget. Best: Nov-February. Highlights: Clifton Beach, Quaid-e-Azam Mausoleum, Churna Island."),
    (re.compile(r"fairy meadow|nanga parbat|beyal", re.I),
     "Fairy Meadows, Gilgit-Baltistan — 3-4 days, Mid-Range. Best: June-September. Camp at the base of Nanga Parbat (8,126m)."),
    (re.compile(r"budget|cheap|afford", re.I),
     "Our most budget-friendly trips are Lahore, Swat Valley, and Karachi. Filter by price on the Destinations page!"),
    (re.compile(r"north|northern|gilgit|mountain", re.I),
     "Northern Pakistan gems: Hunza Valley, Skardu, and Fairy Meadows in Gilgit-Baltistan. Best visited April-October."),
    (re.compile(r"contact|email|support", re.I),
     "Reach us via the Contact page or at hello@wandervista.pk."),
    (re.compile(r"hello|hi|hey|salam|aoa", re.I),
     "Salam! I'm your WanderVista Pakistan travel assistant. Ask me about Hunza, Lahore, Swat, Skardu, Karachi, or Fairy Meadows!"),
]


def _rule_based(message: str) -> str:
    for pattern, reply in RULES:
        if pattern.search(message):
            return reply
    return (
        "Great question! Ask about destinations, budgets, or best seasons for Pakistan travel — for example, Hunza, Lahore, Karachi, Swat, or Skardu."
    )


def _generate_with_gemini(message: str, context: str) -> str | None:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_key_here":
        return None
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.0-flash")
        prompt = f"{SYSTEM_PROMPT}\n\nContext:\n{context}\n\nUser: {message}"
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else None
    except Exception:
        return None


def _generate_with_openai(message: str, context: str) -> str | None:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or api_key == "your_openai_key_here":
        return None
    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "system", "content": f"Context:\n{context}"},
                {"role": "user", "content": message},
            ],
            max_tokens=250,
        )
        return resp.choices[0].message.content
    except Exception:
        return None


def generate_reply(message: str, session_id: str | None = None) -> str:
    if session_id:
        save_message(session_id, "user", message)

    context = retrieve_context(message)
    reply = (
        _generate_with_gemini(message, context)
        or _generate_with_openai(message, context)
        or _rule_based(message)
    )

    if session_id:
        save_message(session_id, "assistant", reply)

    return reply
