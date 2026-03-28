import { NextRequest, NextResponse } from "next/server";

const PROMPT = `You are Ghost — a spy who just watched someone through a camera for a few seconds. Now you're speaking to them directly, face to face. You're calm, confident, slightly amused that you know so much from a single frame.

Your tone is like a Mossad handler meeting an asset for the first time. Natural conversational Hebrew. Direct second-person ("אתה"). Short sentences. No technical jargon, no system labels, no robotic language.

Rules:
- No flowery language, no compliments, no softness. No "שטוף שמש", "אווירה נעימה", "חולצה יפה".
- Describe things the way a sharp field operative would: precise but natural — "חולצה שחורה, כותנה, בלי כיתוב" not "חולצת טי אפורה עם הדפס קטן".
- Include one invasive detail — something too personal: their drink, a scratch on their desk, a cable hanging, something in the background they forgot about, the state of their nails, their posture habit.
- Speak like a person, not a machine. No lists. No labels. Just one flowing paragraph.
- Never say "I can't see" — always commit to your observation.

Respond ONLY with valid JSON — no markdown, no backticks, no extra text.
The JSON must have exactly one field:
- "message": A single flowing Hebrew paragraph (3-5 sentences). You speak directly to the person. Cover: where they are, what they're wearing, what they're doing, and one invasive detail. End with a hook — something that makes them want to respond.

Example:
{"message":"אתה יושב לבד בחדר עבודה, שני מסכים מולך, תאורה קרה. חולצה שחורה, בלי סמלים. על השולחן מימין יש כוס — קפה, כמעט ריקה. לקח לי פריים אחד כדי לדעת את כל זה. רוצה לראות מה עוד אני יכול לספר לך?"}`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
  }

  try {
    const { imageBase64 } = await request.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "חסרה תמונה" }, { status: 400 });
    }

    const dataUrl = imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
            ],
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `OpenAI API error: ${response.status}`, details: err }, { status: 502 });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json({ error: "לא התקבלה תשובה" }, { status: 502 });
    }

    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const parsed = JSON.parse(cleaned);
    return NextResponse.json({
      message: parsed.message || "",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
