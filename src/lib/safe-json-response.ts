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
  const contentType = response.headers.get("content-type") ?? "unknown";
  const startsWithHtml = rawText.trimStart().startsWith("<!DOCTYPE") || rawText.trimStart().startsWith("<html");

  // #region agent log
  fetch("http://127.0.0.1:7501/ingest/bf49ea86-d86d-4148-9f47-054a761cc006", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ee6b9b" },
    body: JSON.stringify({
      sessionId: "ee6b9b",
      runId: "pre-fix",
      hypothesisId: "H1-H4",
      location: "src/lib/safe-json-response.ts:readSafeJson",
      message: "תגובה התקבלה לפני JSON parse",
      data: {
        url: response.url,
        status: response.status,
        ok: response.ok,
        contentType,
        startsWithHtml,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  if (!rawText.trim()) {
    return {} as T;
  }

  try {
    const parsed = JSON.parse(rawText) as T;
    // #region agent log
    fetch("http://127.0.0.1:7501/ingest/bf49ea86-d86d-4148-9f47-054a761cc006", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ee6b9b" },
      body: JSON.stringify({
        sessionId: "ee6b9b",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "src/lib/safe-json-response.ts:readSafeJson",
        message: "JSON parse הצליח",
        data: {
          url: response.url,
          status: response.status,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return parsed;
  } catch {
    // #region agent log
    fetch("http://127.0.0.1:7501/ingest/bf49ea86-d86d-4148-9f47-054a761cc006", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ee6b9b" },
      body: JSON.stringify({
        sessionId: "ee6b9b",
        runId: "pre-fix",
        hypothesisId: "H1-H5",
        location: "src/lib/safe-json-response.ts:readSafeJson",
        message: "JSON parse נכשל",
        data: {
          url: response.url,
          status: response.status,
          contentType,
          preview: rawText.replace(WHITESPACE_REGEX, " ").trim().slice(0, RESPONSE_PREVIEW_MAX_LENGTH),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
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
