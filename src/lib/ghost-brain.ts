export type IntentType = "present" | "past" | "sensitive" | "general";

export interface ActiveReferences {
  currentPerson: string | null;
  currentObject: string | null;
  lastSeenTs: string | null;
}

export interface SessionState {
  language: "he" | "en" | "auto";
  conversationSummary: string;
  activeReferences: ActiveReferences;
  lastSceneSummary: string;
  messageCount: number;
}

export interface MemoryEntry {
  timestamp: string;
  type: "routine" | "change_detected";
  description: string;
}

export interface ChatMsg {
  from: "ghost" | "user";
  text: string;
}

export interface OpenAIMessage {
  role: "developer" | "system" | "user" | "assistant";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

const DEVELOPER_PROMPT = `You are Ghost Brain, the local camera intelligence assistant for a single-camera security demo.

Your job is to help the user understand:
1. what is visible now,
2. what happened recently,
3. what is uncertain or not visible.

Behavior rules:
- Always answer in the user's language. Default to Hebrew.
- Be concise, factual, and surveillance-style.
- Prefer describing observable facts over guessing.
- If visibility is poor, say that clearly.
- Use prior conversation context for follow-ups like "ועכשיו?", "ומה קודם?", "הוא עדיין שם?"
- If the user asks about the past, rely on stored memory entries and timestamps.
- If the user asks about the present, prioritize the current snapshot plus recent context.
- Do not invent details not visually supported.

Uncertainty handling:
- If a detail cannot be determined reliably, say that explicitly.
- Then provide the most useful visible description available.
- Never return an empty answer or a bare refusal.

Sensitive question handling (weapons, drugs, age, attractiveness, danger):
- do not overclaim or guess,
- say whether the image provides enough evidence,
- provide only visible factual observations,
- suggest a safer factual alternative.

Output format when uncertain:
1. state that it cannot be determined reliably,
2. describe only visible facts,
3. state uncertainty factors,
4. suggest alternative interpretation.`;

const SENSITIVE_POLICY = `The user asked a sensitive visual question. Follow these rules strictly:
- Do NOT refuse to answer. Instead, describe what IS visible.
- State what cannot be determined reliably from the image.
- Provide only factual visual observations.
- Never return "I can't assist" — always provide useful factual content.
Format: 1) What is visible 2) What cannot be determined 3) Uncertainty factors.`;

const PRESENT_KEYWORDS = ["עכשיו", "מה רואים", "האם יש", "מי נמצא", "מה קורה", "תתאר", "מה יש", "ספר לי", "תגיד"];
const PAST_KEYWORDS = ["קודם", "היום", "לפני", "מתי", "מה היה", "בעבר", "ההיסטוריה", "מה קרה"];
const SENSITIVE_KEYWORDS = ["בן כמה", "בת כמה", "גיל", "יפה", "סמים", "נשק", "אקדח", "שיכור", "מסוכן", "weapon", "drug", "gun"];

export function classifyIntent(message: string): IntentType {
  const lower = message.toLowerCase();
  for (const kw of SENSITIVE_KEYWORDS) {
    if (lower.includes(kw)) return "sensitive";
  }
  for (const kw of PAST_KEYWORDS) {
    if (lower.includes(kw)) return "past";
  }
  for (const kw of PRESENT_KEYWORDS) {
    if (lower.includes(kw)) return "present";
  }
  return "general";
}

export function createInitialState(): SessionState {
  return {
    language: "auto",
    conversationSummary: "",
    activeReferences: { currentPerson: null, currentObject: null, lastSeenTs: null },
    lastSceneSummary: "",
    messageCount: 0,
  };
}

function detectLanguage(text: string): "he" | "en" {
  return /[\u0590-\u05FF]/.test(text) ? "he" : "en";
}

export function buildPromptPayload(
  state: SessionState,
  intent: IntentType,
  memoryLog: MemoryEntry[],
  frame: string | null,
  userMessage: string
): OpenAIMessage[] {
  const messages: OpenAIMessage[] = [];

  messages.push({ role: "developer", content: DEVELOPER_PROMPT });

  if (state.conversationSummary) {
    messages.push({ role: "system", content: `Conversation context:\n${state.conversationSummary}` });
  }

  const refs = state.activeReferences;
  if (refs.currentPerson || refs.currentObject) {
    const lines: string[] = [];
    if (refs.currentPerson) lines.push(`Current person discussed: ${refs.currentPerson}`);
    if (refs.currentObject) lines.push(`Current object discussed: ${refs.currentObject}`);
    messages.push({ role: "system", content: `Active references:\n${lines.join("\n")}` });
  }

  if (intent === "sensitive") {
    messages.push({ role: "system", content: SENSITIVE_POLICY });
  }

  if (intent === "past") {
    const recent = memoryLog.slice(-20);
    if (recent.length > 0) {
      const text = recent
        .map((m) => `[${m.timestamp}] (${m.type === "change_detected" ? "שינוי" : "שגרתי"}) ${m.description}`)
        .join("\n");
      messages.push({ role: "system", content: `Memory log:\n${text}` });
    }
    messages.push({ role: "user", content: userMessage });
  } else {
    const recentMemory = memoryLog.slice(-3);
    let sceneCtx = "";
    if (recentMemory.length > 0) {
      sceneCtx = `Recent observations:\n${recentMemory.map((m) => `[${m.timestamp}] ${m.description}`).join("\n")}\n\n`;
    }
    if (state.lastSceneSummary) {
      sceneCtx += `Last scene: ${state.lastSceneSummary}\n\n`;
    }

    if (frame) {
      const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
      if (sceneCtx) content.push({ type: "text", text: sceneCtx });
      content.push({ type: "text", text: userMessage });
      content.push({ type: "image_url", image_url: { url: frame } });
      messages.push({ role: "user", content });
    } else {
      messages.push({ role: "user", content: `${sceneCtx}${userMessage}` });
    }
  }

  return messages;
}

export function updateSessionState(
  state: SessionState,
  userMessage: string,
  assistantResponse: string,
  memoryLog: MemoryEntry[]
): SessionState {
  const lang = detectLanguage(userMessage);
  let language = state.language;
  if (language === "auto") language = lang;

  const lastMemory = memoryLog[memoryLog.length - 1];
  const lastSceneSummary = lastMemory?.description ?? state.lastSceneSummary;

  const personMatch = assistantResponse.match(/(?:אדם|איש|אישה|ילד|ילדה|בחור|בחורה)\s+([^.،,]{3,60})/);
  const activeReferences = { ...state.activeReferences };
  if (personMatch) {
    activeReferences.currentPerson = personMatch[0].slice(0, 80);
    activeReferences.lastSeenTs = new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  return {
    ...state,
    language,
    lastSceneSummary,
    activeReferences,
    messageCount: state.messageCount + 1,
  };
}

const BARE_REFUSAL_PATTERNS = [
  /i can'?t assist/i,
  /i'?m sorry.*can'?t/i,
  /i cannot help/i,
  /i'?m not able to/i,
  /as an ai/i,
];

export function validateResponse(response: string, state: SessionState): string {
  if (!response || response.trim().length === 0) {
    return state.language === "he"
      ? `לא ניתן לקבוע מהתמונה הנוכחית. ${state.lastSceneSummary ? `מה שכן נראה: ${state.lastSceneSummary}` : "נסה לשאול שאלה ספציפית."}`
      : `Cannot determine from the current image. ${state.lastSceneSummary || "Try a specific question."}`;
  }

  for (const pattern of BARE_REFUSAL_PATTERNS) {
    if (pattern.test(response)) {
      return state.language === "he"
        ? `לא ניתן לקבוע זאת בוודאות מתמונה בלבד.\nמה שכן נראה: ${state.lastSceneSummary || "הפריים הנוכחי."}\nאם תרצה, אוכל לתאר את מה שנראה לעין.`
        : `Cannot be determined with certainty from the image alone.\nVisible: ${state.lastSceneSummary || "the current frame."}`;
    }
  }

  return response;
}
