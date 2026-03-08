import { NextRequest, NextResponse } from "next/server";

const PROMPT = `תאר בקצרה בעברית מה נראה בתמונה — מה המצלמה צופה עליו. רק תיאור אובייקטיבי של המקום והאובייקטים הנראים (דלתות, מדפים, כלים, רכבים, אנשים וכו'). משפט או שניים בלבד, בלי פרשנות.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file || !file.size) {
      return NextResponse.json({ error: "לא הועלתה תמונה" }, { status: 400 });
    }

    const type = file.type.startsWith("image/") ? file.type : "image/jpeg";
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${type};base64,${base64}`;

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
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `OpenAI API error: ${response.status}`, details: err },
        { status: 502 }
      );
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim();
    if (!description) {
      return NextResponse.json({ error: "לא התקבל תיאור מהמערכת" }, { status: 502 });
    }

    return NextResponse.json({ description });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
