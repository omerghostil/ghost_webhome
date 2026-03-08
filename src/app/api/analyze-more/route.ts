import { NextRequest, NextResponse } from "next/server";
import { GHOST_ADD_MORE_PROMPT } from "@/lib/ghost-prompt";

interface CameraInput {
  name: string;
  watchesOn: string;
}

interface CameraRec {
  name: string;
  recommendations: string[];
}

interface AnalyzeMoreRequest {
  sector: string;
  orgType: string;
  cameras: CameraInput[];
  currentRecommendations: CameraRec[];
  focus: string;
}

function formatAddMoreMessage(data: AnalyzeMoreRequest): string {
  let msg = `סקטור: ${data.sector}\nסוג ארגון: ${data.orgType}\n\n`;
  msg += `המצלמות וההמלצות הקיימות:\n`;
  data.currentRecommendations.forEach((cam) => {
    msg += `מצלמה: ${cam.name}\nהמלצות קיימות: ${cam.recommendations.join(" | ")}\n\n`;
  });
  msg += `מצלמות (שם + צופה על):\n`;
  data.cameras.forEach((c) => {
    msg += `${c.name}: ${c.watchesOn}\n`;
  });
  msg += `\nהתמקד בהמלצות נוספות ב: ${data.focus}\nהחזר עד 4 המלצות חדשות בלבד, באותו פורמט JSON.`;
  return msg;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body: AnalyzeMoreRequest = await request.json();
    const userMessage = formatAddMoreMessage(body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: GHOST_ADD_MORE_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.5,
        response_format: { type: "json_object" },
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
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 });
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
