const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const CLIENT_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? "";

interface OpenAIChatMessage {
  role: string;
  content: unknown;
}

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
}

async function callOpenAIDirect(
  model: string,
  messages: OpenAIChatMessage[],
  options: { max_tokens?: number; temperature?: number; response_format?: { type: string } } = {},
): Promise<ChatCompletionResponse> {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${CLIENT_KEY}` },
    body: JSON.stringify({ model, messages, ...options }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  return res.json();
}

function isHtmlResponse(text: string): boolean {
  const trimmed = text.trimStart();
  return trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html");
}

/**
 * קריאה ל-ghost-live: קודם מנסה את ה-API route המקומי, ואם מקבלים HTML (static hosting) — קוראים ישירות.
 */
export async function ghostLive(messages: OpenAIChatMessage[], maxTokens?: number): Promise<string> {
  try {
    const res = await fetch("/api/ghost-live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, maxTokens }),
    });
    const raw = await res.text();
    if (!isHtmlResponse(raw)) {
      const data = JSON.parse(raw);
      if (data.answer) return data.answer;
    }
  } catch { /* fallback below */ }

  if (!CLIENT_KEY) throw new Error("API not available");

  const data = await callOpenAIDirect("gpt-4o", messages, {
    max_tokens: maxTokens ?? 500,
    temperature: 0.3,
  });
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

/**
 * קריאה ל-ghost-memory: קודם מנסה API route, ואם לא זמין — קוראים ישירות.
 */
export async function ghostMemory(
  image: string,
  mode: "quick" | "full",
  previousContext?: string,
): Promise<string> {
  try {
    const res = await fetch("/api/ghost-memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, mode, previousContext }),
    });
    const raw = await res.text();
    if (!isHtmlResponse(raw)) {
      const data = JSON.parse(raw);
      if (data.description) return data.description;
    }
  } catch { /* fallback below */ }

  if (!CLIENT_KEY) return "";

  const isQuick = mode === "quick";
  const prompt = isQuick
    ? "תאר בקצרה בעברית מה השתנה בסצנה מאז הפעם הקודמת. משפט אחד עד שניים."
    : `תאר בפרטי פרטים בעברית מה קורה בתמונה. בסגנון דו"ח ניטור מבצעי:\n- אנשים: מספר, מיקום, לבוש, תנוחה, פעולות\n- חפצים בולטים: ריהוט, ציוד, חפצים על שולחן\n- תנועות ושינויים: כניסה/יציאה, תזוזה\n- תאורה ומצב כללי: טבעי/מלאכותי, בהיר/כהה\n- חריגות: כל דבר יוצא דופן`;

  const userContent: { type: string; text?: string; image_url?: { url: string } }[] = [];
  if (previousContext && isQuick) {
    userContent.push({ type: "text", text: `סצנה קודמת: ${previousContext}\n\n${prompt}` });
  } else {
    userContent.push({ type: "text", text: prompt });
  }
  userContent.push({ type: "image_url", image_url: { url: image } });

  const data = await callOpenAIDirect(isQuick ? "gpt-4o-mini" : "gpt-4o", [{ role: "user", content: userContent }], {
    max_tokens: isQuick ? 150 : 400,
    temperature: 0.2,
  });
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
