import { NextRequest, NextResponse } from "next/server";
import { GHOST_SYSTEM_PROMPT } from "@/lib/ghost-prompt";

interface CameraInput {
  name: string;
  watchesOn: string;
}

interface AnalyzeRequest {
  sector: string;
  orgType: string;
  cameras: CameraInput[];
}

function formatUserMessage(data: AnalyzeRequest): string {
  let msg = `סקטור: ${data.sector}\nסוג ארגון: ${data.orgType}\nמספר מצלמות: ${data.cameras.length}\n\n`;

  data.cameras.forEach((cam, i) => {
    msg += `מצלמה ${i + 1}:\nשם: ${cam.name}\nצופה על: ${cam.watchesOn}\n\n`;
  });

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
    const body: AnalyzeRequest = await request.json();
    const userMessage = formatUserMessage(body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: GHOST_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
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
