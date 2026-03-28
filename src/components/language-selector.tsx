"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "he", label: "עברית" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export function LanguageSelector() {
  const { setLanguage, isReady, hasChosenLanguage } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(Math.random().toString(36).slice(2, 10));
  }, []);

  if (!isReady) {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-black"
        aria-hidden
      />
    );
  }

  if (hasChosenLanguage) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center animate-terminal-boot">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-900/40 to-transparent" />

      <div className="relative flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-green-500/60 font-mono text-[10px] tracking-[0.4em] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse-slow" />
            <span>ghost sys</span>
          </div>
          <h1 className="text-green-500/90 text-2xl font-mono font-bold tracking-[0.2em] uppercase">
            _ select interface _
          </h1>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-green-900/50 to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-1 w-64">
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group w-full cursor-pointer transition-all duration-200"
            >
              <div className={`
                flex items-center gap-3 px-4 py-3 font-mono text-sm transition-all duration-200
                ${hoveredIndex === index
                  ? "bg-green-500/10 text-green-400 border-l-2 border-green-500"
                  : "text-neutral-600 border-l-2 border-transparent hover:text-green-500/70"
                }
              `}>
                <span className={`
                  text-[10px] transition-all duration-200
                  ${hoveredIndex === index ? "text-green-500" : "text-neutral-700"}
                `}>
                  {hoveredIndex === index ? ">" : "·"}
                </span>
                <span className="tracking-wider">{lang.label}</span>
                {hoveredIndex === index && (
                  <span className="ml-auto text-green-500/40 text-xs animate-blink">_</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-neutral-700 font-mono text-[10px] tracking-[0.3em] uppercase">
            encrypted · secure · classified
          </p>
          <div className="flex items-center gap-3 text-neutral-800 font-mono text-[9px]">
            <span>v0.9.1</span>
            <span>·</span>
            <span>session: {sessionId || "········"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
