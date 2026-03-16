"use client";

import {
  Play,
  Pause,
  Trash2,
  Copy,
  RotateCcw,
} from "lucide-react";
import type { Conversation, ImageQualityLevel, ConversationFormData } from "./types";

interface SettingsPanelProps {
  conversation: Conversation | null;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onResetCounters: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ConversationFormData>) => void;
  isMobile?: boolean;
}

const QUALITY_OPTIONS: { value: ImageQualityLevel; label: string; desc: string }[] = [
  { value: "low", label: "Low", desc: "640px" },
  { value: "medium", label: "Medium", desc: "1024px" },
  { value: "high", label: "High", desc: "1920px" },
];

export function SettingsPanel({
  conversation,
  onStart,
  onPause,
  onDelete,
  onDuplicate,
  onResetCounters,
  onUpdate,
  isMobile,
}: SettingsPanelProps) {
  if (!conversation) {
    return (
      <div className={`${isMobile ? "w-full" : "w-[320px]"} border-r border-neutral-800 bg-neutral-950 flex items-center justify-center`}>
        <p className="text-xs text-neutral-600 text-center px-4">
          בחר שיחה כדי לצפות בהגדרות
        </p>
      </div>
    );
  }

  const isActive = conversation.status === "active";
  const canEdit = conversation.status !== "active";

  return (
    <div className={`${isMobile ? "w-full" : "w-[320px]"} border-r border-neutral-800 bg-neutral-950 flex flex-col h-full overflow-y-auto`}>
      {/* Section 1: Info & Controls */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
          שם שיחה
        </label>
        <input
          type="text"
          value={conversation.name}
          onChange={(e) => onUpdate(conversation.id, { name: e.target.value })}
          disabled={!canEdit}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono disabled:opacity-50 transition-colors"
          dir="rtl"
        />
        <div className="flex gap-2 mt-3">
          {isActive ? (
            <button
              onClick={() => onPause(conversation.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 text-white font-bold text-xs rounded-lg py-2.5 hover:bg-yellow-500 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              השהה
            </button>
          ) : (
            <button
              onClick={() => onStart(conversation.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold text-xs rounded-lg py-2.5 hover:bg-green-500 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              הפעל
            </button>
          )}
        </div>
      </div>

      {/* Section 2: Camera & Interval */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <h3 className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-3">
          מצלמה ותדירות
        </h3>
        <label className="text-[10px] text-neutral-600 mb-1 block">מקור מצלמה</label>
        <select
          value={conversation.cameraDeviceId}
          onChange={(e) => onUpdate(conversation.id, { cameraDeviceId: e.target.value })}
          disabled={!canEdit}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 disabled:opacity-50 mb-3"
        >
          <option value="front">מצלמה קדמית</option>
          <option value="back">מצלמה אחורית</option>
          <option value="builtin">מצלמה מובנית</option>
        </select>

        <label className="text-[10px] text-neutral-600 mb-1 block">
          תדירות דגימה (שניות): {conversation.frameIntervalSeconds}s
        </label>
        <input
          type="range"
          min={2}
          max={300}
          step={1}
          value={conversation.frameIntervalSeconds}
          onChange={(e) =>
            onUpdate(conversation.id, {
              frameIntervalSeconds: Number(e.target.value),
            })
          }
          disabled={!canEdit}
          className="w-full accent-white disabled:opacity-50"
        />
        <div className="flex justify-between text-[9px] text-neutral-600 mt-0.5">
          <span>2s</span>
          <span>300s</span>
        </div>
      </div>

      {/* Section 3: Prompt */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <h3 className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-2">
          Prompt
        </h3>
        <textarea
          value={conversation.promptText}
          onChange={(e) => onUpdate(conversation.id, { promptText: e.target.value })}
          disabled={!canEdit}
          rows={3}
          placeholder="האם יש אדם בתמונה? ענה במשפט קצר בלבד."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 disabled:opacity-50 resize-none transition-colors"
          dir="rtl"
        />
      </div>

      {/* Section 4: Alert */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <h3 className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-2">
          תנאי התראה
        </h3>
        <input
          type="text"
          value={conversation.alertCondition}
          onChange={(e) => onUpdate(conversation.id, { alertCondition: e.target.value })}
          disabled={!canEdit}
          placeholder="אדם, עשן, כן (מילות מפתח מופרדות בפסיק)"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 disabled:opacity-50 transition-colors"
          dir="rtl"
        />
      </div>

      {/* Section 5: Image Quality */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <h3 className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-2">
          איכות תמונה
        </h3>
        <div className="flex gap-2">
          {QUALITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                canEdit && onUpdate(conversation.id, { imageQualityLevel: opt.value })
              }
              disabled={!canEdit}
              className={`flex-1 rounded-lg py-2 text-center transition-colors ${
                conversation.imageQualityLevel === opt.value
                  ? "bg-white text-neutral-950 font-bold"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-600"
              } disabled:opacity-50 text-xs`}
            >
              <div>{opt.label}</div>
              <div className="text-[9px] opacity-60">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 6: Response Length */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <h3 className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-2">
          אורך תגובה מקסימלי
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={50}
            max={500}
            value={conversation.maxResponseChars}
            onChange={(e) =>
              onUpdate(conversation.id, {
                maxResponseChars: Math.min(500, Math.max(50, Number(e.target.value))),
              })
            }
            disabled={!canEdit}
            className="w-20 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 disabled:opacity-50 font-mono text-center"
          />
          <span className="text-[10px] text-neutral-600">תווים</span>
        </div>
      </div>

      {/* Section 7: Actions */}
      <div className="px-4 py-3 space-y-2">
        <button
          onClick={() => onResetCounters(conversation.id)}
          className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-xs rounded-lg py-2.5 hover:border-neutral-600 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          אפס מונים
        </button>
        <button
          onClick={() => onDuplicate(conversation.id)}
          className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-xs rounded-lg py-2.5 hover:border-neutral-600 hover:text-white transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          שכפל שיחה
        </button>
        <button
          onClick={() => onDelete(conversation.id)}
          className="w-full flex items-center justify-center gap-2 bg-red-950/30 border border-red-900/30 text-red-400 font-bold text-xs rounded-lg py-2.5 hover:bg-red-950/50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          מחק שיחה
        </button>
      </div>
    </div>
  );
}
