"""Chat history storage using Neon Serverless Postgres.

Falls back silently when DATABASE_URL is not configured.
"""
import os
import uuid
from datetime import datetime, timezone

_table_ready = False


def _get_connection():
    url = os.getenv("DATABASE_URL")
    if not url or url == "your_neon_database_url_here":
        return None
    import psycopg2
    return psycopg2.connect(url)


def _ensure_table(conn):
    global _table_ready
    if _table_ready:
        return
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(64) NOT NULL,
                role VARCHAR(16) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        """)
    conn.commit()
    _table_ready = True


def save_message(session_id: str, role: str, message: str) -> None:
    conn = _get_connection()
    if not conn:
        return
    try:
        _ensure_table(conn)
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_history (session_id, role, message) VALUES (%s, %s, %s)",
                (session_id, role, message),
            )
        conn.commit()
    except Exception:
        pass
    finally:
        conn.close()


def new_session_id() -> str:
    return str(uuid.uuid4())


def get_history(session_id: str, limit: int = 10) -> list[dict]:
    conn = _get_connection()
    if not conn:
        return []
    try:
        _ensure_table(conn)
        with conn.cursor() as cur:
            cur.execute(
                "SELECT role, message FROM chat_history WHERE session_id = %s "
                "ORDER BY created_at DESC LIMIT %s",
                (session_id, limit),
            )
            rows = cur.fetchall()
        return [{"role": r[0], "content": r[1]} for r in reversed(rows)]
    except Exception:
        return []
    finally:
        conn.close()
