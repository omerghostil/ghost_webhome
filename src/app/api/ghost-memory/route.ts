import { NextRequest, NextResponse } from "next/server";

const QUICK_PROMPT = "תאר בקצרה בעברית מה השתנה בסצנה מאז הפעם הקודמת. משפט אחד עד שניים.";

const FULL_PROMPT = `תאר בפרטי פרטים בעברית מה קורה בתמונה. בסגנון דו"ח ניטור מבצעי:
- אנשים: מספר, מיקום, לבוש, תנוחה, פעולות
- חפצים בולטים: ריהוט, ציוד, חפצים על שולחן
- תנועות ושינויים: כניסה/יציאה, תזוזה
- תאורה ומצב כללי: טבעי/מלאכותי, בהיר/כהה
- חריגות: כל דבר יוצא דופן`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
  }

  try {
    const { image, mode, previousContext } = await request.json();
    if (!image) {
      return NextResponse.json({ error: "image required" }, { status: 400 });
    }

    const isQuick = mode === "quick";
    const model = isQuick ? "gpt-4o-mini" : "gpt-4o";
    const prompt = isQuick ? QUICK_PROMPT : FULL_PROMPT;
    const maxTokens = isQuick ? 150 : 400;

    const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];

    if (previousContext && isQuick) {
      userContent.push({ type: "text", text: `סצנה קודמת: ${previousContext}\n\n${prompt}` });
    } else {
      userContent.push({ type: "text", text: prompt });
    }

    userContent.push({ type: "image_url", image_url: { url: image } });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: userContent }],
        max_tokens: maxTokens,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `OpenAI error: ${response.status}`, details: err }, { status: 502 });
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim();
    if (!description) {
      return NextResponse.json({ error: "No response" }, { status: 502 });
    }

    return NextResponse.json({ description });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
