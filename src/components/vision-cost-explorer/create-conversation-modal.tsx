"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { ConversationFormData, ImageQualityLevel } from "./types";
import { DEFAULT_FORM_DATA } from "./types";

interface CreateConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ConversationFormData) => void;
}

const QUALITY_OPTIONS: { value: ImageQualityLevel; label: string }[] = [
  { value: "low", label: "Low (640px)" },
  { value: "medium", label: "Medium (1024px)" },
  { value: "high", label: "High (1920px)" },
];

export function CreateConversationModal({
  isOpen,
  onClose,
  onCreate,
}: CreateConversationModalProps) {
  const [form, setForm] = useState<ConversationFormData>({ ...DEFAULT_FORM_DATA });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    setForm({ ...DEFAULT_FORM_DATA });
    onClose();
  };

  const update = <K extends keyof ConversationFormData>(
    key: K,
    value: ConversationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h2 className="text-sm font-bold text-white">יצירת שיחה חדשה</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              שם שיחה
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Entrance Monitor"
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600"
              dir="rtl"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              מקור מצלמה
            </label>
            <select
              value={form.cameraDeviceId}
              onChange={(e) => update("cameraDeviceId", e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="front">מצלמה קדמית</option>
              <option value="back">מצלמה אחורית</option>
              <option value="builtin">מצלמה מובנית</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              תדירות דגימה (שניות): {form.frameIntervalSeconds}s
            </label>
            <input
              type="range"
              min={2}
              max={300}
              step={1}
              value={form.frameIntervalSeconds}
              onChange={(e) => update("frameIntervalSeconds", Number(e.target.value))}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-[9px] text-neutral-600 mt-0.5">
              <span>2s</span>
              <span>300s</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              Prompt
            </label>
            <textarea
              value={form.promptText}
              onChange={(e) => update("promptText", e.target.value)}
              rows={3}
              placeholder="האם יש אדם בתמונה? ענה במשפט קצר בלבד."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 resize-none"
              dir="rtl"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              תנאי התראה
            </label>
            <input
              type="text"
              value={form.alertCondition}
              onChange={(e) => update("alertCondition", e.target.value)}
              placeholder="אדם, עשן, כן (מופרד בפסיק)"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600"
              dir="rtl"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              איכות תמונה
            </label>
            <div className="flex gap-2">
              {QUALITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update("imageQualityLevel", opt.value)}
                  className={`flex-1 rounded-lg py-2 text-xs text-center transition-colors ${
                    form.imageQualityLevel === opt.value
                      ? "bg-white text-neutral-950 font-bold"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5 block">
              אורך תגובה מקסימלי
            </label>
            <input
              type="number"
              min={50}
              max={500}
              value={form.maxResponseChars}
              onChange={(e) =>
                update(
                  "maxResponseChars",
                  Math.min(500, Math.max(50, Number(e.target.value)))
                )
              }
              className="w-20 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-600 font-mono text-center"
            />
            <span className="text-[10px] text-neutral-600 mr-2">תווים</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-sm rounded-lg py-3 hover:border-neutral-600 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="flex-1 bg-white text-neutral-950 font-bold text-sm rounded-lg py-3 hover:bg-neutral-200 transition-colors"
            >
              צור והפעל
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
