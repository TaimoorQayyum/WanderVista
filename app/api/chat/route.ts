import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the WanderVista Pakistan travel assistant. Answer questions about Pakistani 
destinations, travel tips, best times to visit, budgets, and trip planning. 
Be friendly, concise, and helpful. Keep replies under 80 words.
Key destinations:
- Hunza Valley (Gilgit-Baltistan, best Apr-Oct, mid-range, 5-7 days): Baltit Fort, Attabad Lake, Eagle's Nest, Passu Cones
- Lahore (Punjab, best Oct-Mar, budget, 3-4 days): Badshahi Mosque, Lahore Fort, Food Street, Wagah Border
- Karachi (Sindh, best Nov-Feb, budget, 2-3 days): Clifton Beach, Quaid-e-Azam Mausoleum, Churna Island
- Swat Valley (KPK, best May-Sep, budget, 4-5 days): Malam Jabba, Mahodand Lake, Butkara Stupa
- Skardu (Gilgit-Baltistan, best Jun-Sep, mid-range, 5-6 days): Shangrila Lake, Cold Desert, Deosai Plains
- Fairy Meadows (Gilgit-Baltistan, best Jun-Sep, mid-range, 3-4 days): base of Nanga Parbat 8126m
Pakistan capital is Islamabad. Karachi is the largest city.
If you don't know something, suggest browsing the Destinations page or contacting hello@wandervista.pk.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("[route] GROQ_API_KEY not set");
      return NextResponse.json({ reply: "" }, { status: 500 });
    }

    // Build messages array for Groq (OpenAI-compatible format)
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      // Convert previous history
      ...(history ?? []).map((m: { role: string; content: string }) => ({
        role: m.role === "model" ? "assistant" : m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[route] Groq error:", err);
      return NextResponse.json({ reply: "" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";
    console.log("[route] Groq replied successfully");
    return NextResponse.json({ reply });

  } catch (err) {
    console.error("[route] Unexpected error:", err);
    return NextResponse.json({ reply: "" }, { status: 500 });
  }
}