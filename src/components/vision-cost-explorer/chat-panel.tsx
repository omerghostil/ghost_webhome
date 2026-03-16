"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, AlertTriangle, Info, XCircle } from "lucide-react";
import type { Conversation, VisionMessage } from "./types";

interface ChatPanelProps {
  conversation: Conversation | null;
  messages: VisionMessage[];
}

function MetricsBar({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-center gap-4 px-5 py-2.5 border-b border-neutral-800 bg-neutral-900/50 text-[11px] font-mono text-neutral-400 flex-wrap">
      <div>
        <span className="text-neutral-600">Cost: </span>
        <span className="text-white font-bold">${conversation.totalCost.toFixed(4)}</span>
      </div>
      <div>
        <span className="text-neutral-600">Frames: </span>
        <span className="text-white">{conversation.framesSent}</span>
      </div>
      <div>
        <span className="text-neutral-600">Input: </span>
        <span className="text-white">{conversation.totalInputTokens.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-neutral-600">Output: </span>
        <span className="text-white">{conversation.totalOutputTokens.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-neutral-600">Avg/Frame: </span>
        <span className="text-white">${conversation.avgCostPerFrame.toFixed(5)}</span>
      </div>
    </div>
  );
}

function MessageIcon({ type }: { type: VisionMessage["type"] }) {
  switch (type) {
    case "system":
      return <Info className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5" />;
    case "ai":
      return <MessageSquare className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />;
    case "alert":
      return <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />;
    case "error":
      return <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />;
  }
}

const MESSAGE_STYLES: Record<string, string> = {
  system: "border-neutral-800/50 bg-neutral-900/30",
  ai: "border-blue-900/30 bg-blue-950/20",
  alert: "border-yellow-900/40 bg-yellow-950/20",
  error: "border-red-900/40 bg-red-950/20",
};

function ChatMessage({ message }: { message: VisionMessage }) {
  const time = new Date(message.timestamp).toLocaleTimeString("he-IL");

  return (
    <div className={`border rounded-lg px-3 py-2 ${MESSAGE_STYLES[message.type]}`}>
      <div className="flex items-start gap-2">
        <MessageIcon type={message.type} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] text-neutral-500 font-mono">{time}</span>
            {message.type === "alert" && (
              <span className="text-[9px] uppercase tracking-wider font-bold text-yellow-400">
                ALERT
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed break-words" dir="rtl">
            {message.response}
          </p>
          {message.type === "ai" && message.totalTokens > 0 && (
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-neutral-600 font-mono">
              <span>In: {message.inputTokens}</span>
              <span>Out: {message.outputTokens}</span>
              <span>Cost: ${message.cost.toFixed(5)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChatPanel({ conversation, messages }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <MessageSquare className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">בחר שיחה מהרשימה או צור שיחה חדשה</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 min-w-0">
      <div className="px-5 py-3 border-b border-neutral-800 flex items-center gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            conversation.status === "active"
              ? "bg-green-500 animate-pulse"
              : conversation.status === "paused"
              ? "bg-yellow-500"
              : "bg-neutral-500"
          }`}
        />
        <h2 className="text-sm font-bold text-white truncate">{conversation.name}</h2>
        <span className="text-[10px] text-neutral-600 font-mono">
          {conversation.frameIntervalSeconds}s interval
        </span>
      </div>

      <MetricsBar conversation={conversation} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-neutral-600">
              לחץ &quot;הפעל&quot; בהגדרות כדי להתחיל ניטור
            </p>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
      </div>
    </div>
  );
}
