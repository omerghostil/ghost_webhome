interface ErrorPayload {
  error?: string;
}

const RESPONSE_PREVIEW_MAX_LENGTH = 140;
const WHITESPACE_REGEX = /\s+/g;

function buildNonJsonErrorMessage(response: Response, rawText: string): string {
  const compactText = rawText.replace(WHITESPACE_REGEX, " ").trim();
  const preview = compactText.slice(0, RESPONSE_PREVIEW_MAX_LENGTH) || "empty response";

  if (compactText.startsWith("<!DOCTYPE") || compactText.startsWith("<html")) {
    return `השרת החזיר HTML במקום JSON (status ${response.status}). בדוק שהנתיב /api פעיל בסביבת ההרצה.`;
  }

  return `השרת החזיר תגובה שאינה JSON (status ${response.status}). ${preview}`;
}

/**
 * קורא תגובת HTTP ומוודא שניתן לפרש אותה כ-JSON.
 */
export async function readSafeJson<T>(response: Response): Promise<T> {
  const rawText = await response.text();

  if (!rawText.trim()) {
    return {} as T;
  }

  try {
    return JSON.parse(rawText) as T;
  } catch {
    throw new Error(buildNonJsonErrorMessage(response, rawText));
  }
}

/**
 * מחזיר הודעת שגיאה ידידותית מתוך payload סטנדרטי של API.
 */
export function getApiErrorMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const { error } = payload as ErrorPayload;
  return typeof error === "string" && error.trim() ? error : undefined;
}
