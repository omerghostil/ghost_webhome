"use client";

import { Plus, AlertTriangle } from "lucide-react";
import type { Conversation } from "./types";

interface ConversationsPanelProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewConversation: () => void;
  isMobile?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500",
  paused: "bg-yellow-500",
  idle: "bg-neutral-400",
};

const STATUS_LABELS: Record<string, string> = {
  active: "פעיל",
  paused: "מושהה",
  idle: "ממתין",
};

export function ConversationsPanel({
  conversations,
  selectedId,
  onSelect,
  onNewConversation,
  isMobile,
}: ConversationsPanelProps) {
  return (
    <div className={`${isMobile ? "w-full" : "w-[280px]"} border-l border-neutral-800 bg-neutral-950 flex flex-col h-full`}>
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
          שיחות
        </h2>
        <button
          onClick={onNewConversation}
          className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-950 bg-white rounded-full px-3 py-1.5 hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-3 h-3" />
          חדש
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-neutral-600 text-xs">
            אין שיחות עדיין. לחץ על &quot;חדש&quot; ליצירת שיחה ראשונה.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/50">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-right px-4 py-3 transition-colors ${
                  selectedId === conv.id
                    ? "bg-neutral-800/80"
                    : "hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      STATUS_COLORS[conv.status]
                    } ${conv.status === "active" ? "animate-pulse" : ""}`}
                  />
                  <span className="text-sm font-bold text-white truncate">
                    {conv.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-500 mr-4">
                  <span>{STATUS_LABELS[conv.status]}</span>
                  <span>·</span>
                  <span>{conv.frameIntervalSeconds}s</span>
                  <span>·</span>
                  <span>${conv.totalCost.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600 mr-4 mt-0.5">
                  <span>{conv.totalTokens.toLocaleString()} tokens</span>
                  {conv.alertCondition && (
                    <AlertTriangle className="w-3 h-3 text-yellow-500/60" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
