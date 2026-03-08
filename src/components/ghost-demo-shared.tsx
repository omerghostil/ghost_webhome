"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Send } from "lucide-react";

export interface ChatMessage {
  from: "ghost" | "user";
  text: string;
}

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6">
      <Image src="/ghost-icon.png" alt="Ghost" width={56} height={56} className="rounded-2xl" />
      <div>
        <p className="text-lg font-bold text-neutral-950 mb-2">Ghost מוכן לדבר איתך.</p>
        <p className="text-sm text-neutral-400">60 שניות — ותבין למה הכל ישתנה.</p>
      </div>
      <button
        onClick={onStart}
        className="bg-neutral-950 text-white font-bold text-sm px-8 py-3 rounded-full hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-neutral-950/20"
      >
        בוא נתחיל
      </button>
    </div>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isGhost = message.from === "ghost";
  return (
    <div className={`flex ${isGhost ? "justify-start" : "justify-end"} animate-fade-in-up`}>
      <div className="flex items-end gap-2 max-w-[85%]">
        {isGhost && (
          <Image src="/ghost-icon.png" alt="Ghost" width={24} height={24} className="rounded-md flex-shrink-0 mb-0.5" />
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isGhost
              ? "bg-white border border-neutral-100 text-neutral-700 rounded-br-2xl rounded-bl-md"
              : "bg-neutral-950 text-white rounded-bl-2xl rounded-br-md"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-2">
        <Image src="/ghost-icon.png" alt="Ghost" width={24} height={24} className="rounded-md flex-shrink-0 mb-0.5" />
        <div className="bg-white border border-neutral-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div className="flex gap-2 items-center bg-white border border-neutral-200 rounded-full px-4 py-1.5 shadow-sm">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder={placeholder}
          className="flex-1 text-sm text-neutral-700 placeholder:text-neutral-300 outline-none bg-transparent py-1.5"
          dir="rtl"
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5 text-white rotate-180" />
        </button>
      </div>
    </div>
  );
}

export function StepBadge({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white bg-neutral-950 rounded-full px-3 py-1">
        שלב {current} מתוך {total}
      </span>
      <span className="text-[11px] text-neutral-400">{label}</span>
    </div>
  );
}

export function ConfirmButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-neutral-950 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
    >
      {label}
    </button>
  );
}

export function SummaryCard({ title, lines, onConfirm }: { title: string; lines: string[]; onConfirm: () => void }) {
  return (
    <div className="animate-fade-in-up bg-white border-2 border-neutral-950 rounded-xl p-5 space-y-4">
      <p className="text-sm font-bold text-neutral-950">{title}</p>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-neutral-600 leading-relaxed">{line}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          className="flex-1 bg-neutral-950 text-white font-bold text-sm py-3 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
        >
          אישור והפעלה
        </button>
      </div>
    </div>
  );
}
