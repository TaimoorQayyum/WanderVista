from fastapi import APIRouter
from pydantic import BaseModel, Field
from services.chatbot import generate_reply
from services.db import new_session_id

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str = Field(description="Pass back on subsequent requests for chat history")


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    sid = req.session_id or new_session_id()
    reply = generate_reply(req.message, session_id=sid)
    return ChatResponse(reply=reply, session_id=sid)
