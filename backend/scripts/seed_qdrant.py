"""Seed Qdrant collection with destination embeddings.

Run once after setting QDRANT_URL, QDRANT_API_KEY, and OPENAI_API_KEY:
    cd backend && source .venv/bin/activate
    python scripts/seed_qdrant.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv

load_dotenv()

from services.content import DESTINATIONS, GENERAL_CONTEXT


def main():
    url = os.getenv("QDRANT_URL")
    key = os.getenv("QDRANT_API_KEY")
    oai_key = os.getenv("OPENAI_API_KEY")
    collection = os.getenv("QDRANT_COLLECTION", "wandervista_destinations")

    if not all([url, key, oai_key]):
        print("Set QDRANT_URL, QDRANT_API_KEY, and OPENAI_API_KEY in .env.local")
        sys.exit(1)

    from openai import OpenAI
    from qdrant_client import QdrantClient
    from qdrant_client.models import Distance, VectorParams, PointStruct

    client = QdrantClient(url=url, api_key=key)
    oai = OpenAI(api_key=oai_key)

    docs = [{"id": "general", "text": GENERAL_CONTEXT}] + [
        {"id": d["id"], "text": d["text"]} for d in DESTINATIONS
    ]

    sample = oai.embeddings.create(model="text-embedding-3-small", input="test").data[0].embedding
    dim = len(sample)

    if not client.collection_exists(collection):
        client.create_collection(
            collection_name=collection,
            vectors_config=VectorParams(size=dim, distance=Distance.COSINE),
        )

    points = []
    for i, doc in enumerate(docs):
        emb = oai.embeddings.create(model="text-embedding-3-small", input=doc["text"]).data[0].embedding
        points.append(PointStruct(id=i, vector=emb, payload={"id": doc["id"], "text": doc["text"]}))

    client.upsert(collection_name=collection, points=points)
    print(f"Seeded {len(points)} documents into '{collection}'")


if __name__ == "__main__":
    main()
