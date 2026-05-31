"""RAG retrieval service.

Uses Qdrant Cloud for vector search when configured, otherwise falls back
to keyword-based retrieval over the local destination knowledge base.
"""
import os
import re

from services.content import DESTINATIONS, GENERAL_CONTEXT

_qdrant_client = None


def _get_qdrant():
    global _qdrant_client
    url = os.getenv("QDRANT_URL")
    key = os.getenv("QDRANT_API_KEY")
    if not url or not key or key == "your_qdrant_api_key_here":
        return None
    if _qdrant_client is None:
        from qdrant_client import QdrantClient
        _qdrant_client = QdrantClient(url=url, api_key=key)
    return _qdrant_client


def _keyword_retrieve(query: str, top_k: int = 3) -> list[str]:
    """Score destinations by keyword overlap — works without any API keys."""
    tokens = set(re.findall(r"\w+", query.lower()))
    scored = []
    for dest in DESTINATIONS:
        text = dest["text"].lower()
        score = sum(1 for t in tokens if t in text)
        # Boost on title/country matches
        title_lower = dest["title"].lower()
        score += sum(3 for t in tokens if t in title_lower)
        if score > 0:
            scored.append((score, dest["text"]))
    scored.sort(key=lambda x: x[0], reverse=True)
    results = [text for _, text in scored[:top_k]]
    if not results:
        results = [d["text"] for d in DESTINATIONS[:2]]
    return results


def _qdrant_retrieve(query: str, top_k: int = 3) -> list[str] | None:
    """Retrieve from Qdrant vector store when OpenAI embeddings are available."""
    client = _get_qdrant()
    api_key = os.getenv("OPENAI_API_KEY")
    if not client or not api_key or api_key == "your_openai_key_here":
        return None

    try:
        from openai import OpenAI
        collection = os.getenv("QDRANT_COLLECTION", "wandervista_destinations")
        oai = OpenAI(api_key=api_key)
        embedding = oai.embeddings.create(
            model="text-embedding-3-small",
            input=query,
        ).data[0].embedding

        hits = client.search(collection_name=collection, query_vector=embedding, limit=top_k)
        return [hit.payload["text"] for hit in hits if hit.payload and "text" in hit.payload]
    except Exception:
        return None


def retrieve_context(query: str, top_k: int = 3) -> str:
    """Return relevant destination content for the RAG prompt."""
    chunks = _qdrant_retrieve(query, top_k)
    if not chunks:
        chunks = _keyword_retrieve(query, top_k)
    context = "\n\n".join(chunks)
    return f"{GENERAL_CONTEXT}\n\nRelevant destination information:\n{context}"
