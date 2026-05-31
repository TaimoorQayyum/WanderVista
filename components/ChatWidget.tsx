"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Msg { role: "user" | "bot"; text: string }

const FALLBACK_RESPONSES: { match: RegExp; reply: string }[] = [
  { match: /capital of pakistan|pakistan capital|is karachi the capital|is islamabad the capital/i, reply: "Karachi is Pakistan's largest city and commercial hub, while the national capital is Islamabad." },
  { match: /budget|cheap|afford|price|cost|expensive/i, reply: "Budget trips are Lahore, Swat Valley, and Karachi. Mid-range trips are Hunza, Skardu, and Fairy Meadows. Check destination pages for exact comparisons." },
  { match: /hunza|karimabad|attabad|passu/i, reply: "Hunza Valley, Gilgit-Baltistan — 5–7 days, Mid-Range. Best: April–October. Highlights: Baltit Fort, Attabad Lake, Eagle's Nest, Passu Cones." },
  { match: /lahore|punjab|badshahi|wagah/i, reply: "Lahore, Punjab — 3–4 days, Budget. Best: Oct–March. Must-sees: Badshahi Mosque, Lahore Fort, Food Street, Wagah Border ceremony." },
  { match: /karachi|clifton|sindh|churna/i, reply: "Karachi, Sindh — 2–3 days, Budget. Best: Nov–February. Highlights: Clifton Beach, Quaid-e-Azam Mausoleum, Churna Island snorkeling." },
  { match: /swat|malam jabba|mingora/i, reply: "Swat Valley, KPK — 4–5 days, Budget. Best: May–September. Highlights: Malam Jabba ski resort, Mahodand Lake, Butkara Stupa." },
  { match: /skardu|k2|deosai|shangrila|kachura/i, reply: "Skardu, Gilgit-Baltistan — 5–6 days, Mid-Range. Best: June–September. Highlights: Shangrila Lake, Cold Desert, Deosai Plains." },
  { match: /fairy meadow|nanga parbat|beyal/i, reply: "Fairy Meadows, Gilgit-Baltistan — 3–4 days, Mid-Range. Best: June–September. Camp at the base of Nanga Parbat (8,126 m)." },
  { match: /why|what|how|when/i, reply: "Ask me for destination highlights, best season, budget advice, or how to travel between cities in Pakistan." },
  { match: /contact|email|support/i, reply: "Reach us via the Contact page, email hello@wandervista.pk, or call +92 300 123 4567." },
  { match: /hello|hi|hey|salam|aoa/i, reply: "Salam! 👋 I'm your WanderVista Pakistan travel assistant. Ask me about Hunza, Lahore, Swat, Skardu, Karachi, or Fairy Meadows!" },
];

function mockReply(input: string): string {
  for (const r of FALLBACK_RESPONSES) if (r.match.test(input)) return r.reply;
  return "Great question! Ask about destinations, budgets, or best seasons for Pakistan travel — for example, Hunza, Lahore, Karachi, Swat, or Skardu.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Salam! I'm your WanderVista Pakistan travel assistant. Ask me about any destination!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput(""); setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let reply = "";
    try {
      if (apiUrl) {
        const r = await fetch(`${apiUrl}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        if (r.ok) reply = (await r.json()).reply ?? "";
      }
    } catch { /* fall through */ }
    if (!reply) reply = mockReply(text);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply }]);
      setLoading(false);
    }, 400);
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 via-sky-500 to-cyan-400 text-white shadow-xl transition hover:scale-110"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 px-4 py-3 text-white">
            <p className="text-sm font-semibold">Travel Assistant</p>
            <p className="text-xs opacity-80">Powered by Pakistan destination content</p>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    "inline-block max-w-[85%] rounded-2xl px-3 py-2 " +
                    (m.role === "user"
                      ? "bg-brand-500 text-white"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100")
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-slate-500 dark:bg-slate-800">
                  <Loader2 size={14} className="animate-spin" /> thinking…
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-slate-200 p-2 dark:border-slate-800"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a destination…"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:opacity-50"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
