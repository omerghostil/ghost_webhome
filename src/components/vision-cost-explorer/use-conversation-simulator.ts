"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Conversation,
  ConversationFormData,
  VisionMessage,
} from "./types";

const SIMULATED_RESPONSES = [
  "זוהה אדם אחד עומד ליד הכניסה הראשית.",
  "האזור ריק, אין תנועה מזוהה.",
  "רכב חונה בחניה הימנית, אין פעילות חריגה.",
  "זוהו שני אנשים עוברים ברחוב.",
  "דלת הכניסה פתוחה, אין אדם בסביבה.",
  "עשן קל מזוהה באזור הפינה השמאלית.",
  "חתול עובר ליד המצלמה.",
  "תאורה ירודה, קשה לזהות פרטים.",
  "הכל תקין, אין אירועים חריגים.",
  "זוהה רכב נכנס לחניה.",
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Token cost simulation: ~145 input tokens per frame, response length proportional output */
function simulateTokens(responseLength: number) {
  const inputTokens = 140 + Math.floor(Math.random() * 20);
  const outputTokens = Math.max(5, Math.floor(responseLength / 4));
  const totalTokens = inputTokens + outputTokens;
  const cost = inputTokens * 0.00001 + outputTokens * 0.00003;
  return { inputTokens, outputTokens, totalTokens, cost: Math.round(cost * 100000) / 100000 };
}

function checkAlert(response: string, alertCondition: string): boolean {
  if (!alertCondition.trim()) return false;
  const keywords = alertCondition.split(",").map((k) => k.trim().toLowerCase());
  const lowerResponse = response.toLowerCase();
  return keywords.some((kw) => kw && lowerResponse.includes(kw));
}

export function useConversationSimulator() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, VisionMessage[]>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null;
  const selectedMessages = selectedId ? messages[selectedId] ?? [] : [];

  const createConversation = useCallback((form: ConversationFormData): string => {
    const id = generateId();
    const now = Date.now();

    const conversation: Conversation = {
      id,
      name: form.name || `שיחה ${Date.now()}`,
      status: "idle",
      cameraDeviceId: form.cameraDeviceId,
      frameIntervalSeconds: form.frameIntervalSeconds,
      promptText: form.promptText,
      alertCondition: form.alertCondition,
      imageQualityLevel: form.imageQualityLevel,
      maxResponseChars: form.maxResponseChars,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalTokens: 0,
      totalCost: 0,
      framesSent: 0,
      avgCostPerFrame: 0,
      createdAt: now,
      updatedAt: now,
    };

    setConversations((prev) => [...prev, conversation]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
    setSelectedId(id);
    return id;
  }, []);

  const runFrame = useCallback((convId: string) => {
    setConversations((prev) => {
      const conv = prev.find((c) => c.id === convId);
      if (!conv || conv.status !== "active") return prev;

      const responseText =
        SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
      const trimmed = responseText.slice(0, conv.maxResponseChars);
      const { inputTokens, outputTokens, totalTokens, cost } = simulateTokens(trimmed.length);
      const alertTriggered = checkAlert(trimmed, conv.alertCondition);
      const now = Date.now();

      const systemMsg: VisionMessage = {
        id: generateId(),
        conversationId: convId,
        type: "system",
        timestamp: now,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        cost: 0,
        alertTriggered: false,
        response: `Frame captured at ${new Date(now).toLocaleTimeString("he-IL")} — Sending to OpenAI...`,
      };

      const aiMsg: VisionMessage = {
        id: generateId(),
        conversationId: convId,
        type: "ai",
        timestamp: now + 500,
        prompt: conv.promptText,
        response: trimmed,
        inputTokens,
        outputTokens,
        totalTokens,
        cost,
        alertTriggered,
      };

      const newMessages: VisionMessage[] = [systemMsg, aiMsg];

      if (alertTriggered) {
        newMessages.push({
          id: generateId(),
          conversationId: convId,
          type: "alert",
          timestamp: now + 600,
          response: `⚠ ALERT — ${conv.alertCondition} זוהה בתגובה`,
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          cost: 0,
          alertTriggered: true,
        });
      }

      setMessages((prevMsgs) => ({
        ...prevMsgs,
        [convId]: [...(prevMsgs[convId] ?? []), ...newMessages],
      }));

      const newFramesSent = conv.framesSent + 1;
      const newTotalCost = conv.totalCost + cost;

      return prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              totalInputTokens: c.totalInputTokens + inputTokens,
              totalOutputTokens: c.totalOutputTokens + outputTokens,
              totalTokens: c.totalTokens + totalTokens,
              totalCost: newTotalCost,
              framesSent: newFramesSent,
              avgCostPerFrame: newFramesSent > 0 ? newTotalCost / newFramesSent : 0,
              updatedAt: now,
            }
          : c
      );
    });
  }, []);

  const startConversation = useCallback(
    (id: string) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "active" as const, updatedAt: Date.now() } : c))
      );

      const conv = conversations.find((c) => c.id === id);
      if (!conv) return;

      if (intervalsRef.current[id]) {
        clearInterval(intervalsRef.current[id]);
      }

      runFrame(id);

      intervalsRef.current[id] = setInterval(
        () => runFrame(id),
        conv.frameIntervalSeconds * 1000
      );
    },
    [conversations, runFrame]
  );

  const pauseConversation = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "paused" as const, updatedAt: Date.now() } : c))
    );
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      if (intervalsRef.current[id]) {
        clearInterval(intervalsRef.current[id]);
        delete intervalsRef.current[id];
      }
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setMessages((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (selectedId === id) {
        setSelectedId(null);
      }
    },
    [selectedId]
  );

  const duplicateConversation = useCallback(
    (id: string) => {
      const conv = conversations.find((c) => c.id === id);
      if (!conv) return;
      createConversation({
        name: `${conv.name} (עותק)`,
        cameraDeviceId: conv.cameraDeviceId,
        frameIntervalSeconds: conv.frameIntervalSeconds,
        promptText: conv.promptText,
        alertCondition: conv.alertCondition,
        imageQualityLevel: conv.imageQualityLevel,
        maxResponseChars: conv.maxResponseChars,
      });
    },
    [conversations, createConversation]
  );

  const resetCounters = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              totalInputTokens: 0,
              totalOutputTokens: 0,
              totalTokens: 0,
              totalCost: 0,
              framesSent: 0,
              avgCostPerFrame: 0,
              updatedAt: Date.now(),
            }
          : c
      )
    );
    setMessages((prev) => ({ ...prev, [id]: [] }));
  }, []);

  const updateConversation = useCallback(
    (id: string, updates: Partial<ConversationFormData>) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
        )
      );
    },
    []
  );

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  return {
    conversations,
    messages: selectedMessages,
    selectedId,
    selectedConversation,
    setSelectedId,
    createConversation,
    startConversation,
    pauseConversation,
    deleteConversation,
    duplicateConversation,
    resetCounters,
    updateConversation,
  };
}
