"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Camera, Send, ChevronDown, ChevronLeft, Users } from "lucide-react";

const TREE = [
  {
    name: "קבוצת מפעלים IL",
    open: true,
    children: [
      {
        name: "מפעל ברלב",
        open: true,
        children: [
          { name: "משרדים", count: 3, active: true },
          { name: "ייצור", count: 5 },
          { name: "חניון", count: 2 },
        ],
      },
      { name: "מפעל חיפה", count: 8 },
    ],
  },
];

type AnimPhase = "idle" | "typing-user" | "user-sent" | "typing-ghost" | "done";

export function ChatMockup() {
  const [phase, setPhase] = useState<AnimPhase>("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          scrollToBottom();
          startAnimation();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [phase, scrollToBottom]);

  const startAnimation = () => {
    setPhase("typing-user");
    setTimeout(() => setPhase("user-sent"), 1200);
    setTimeout(() => setPhase("typing-ghost"), 1800);
    setTimeout(() => setPhase("done"), 3400);
  };

  const showUserQuestion = phase === "user-sent" || phase === "typing-ghost" || phase === "done";
  const showGhostTyping = phase === "typing-ghost";
  const showGhostResponse = phase === "done";

  return (
    <div ref={containerRef} className="border border-neutral-200 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-neutral-400 font-mono text-center border border-neutral-100">
          app.ghost.ai
        </div>
      </div>

      <div className="flex h-[480px] bg-white">
        {/* Sidebar */}
        <div className="w-52 border-l border-neutral-100 bg-neutral-50/50 p-3 hidden lg:block overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-3 px-2">
            ניווט מצלמות
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-neutral-700">
              <ChevronDown className="w-3 h-3 text-neutral-400" />
              <span>{TREE[0].name}</span>
            </div>
            <div className="pr-4 space-y-0.5">
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-neutral-600">
                <ChevronDown className="w-3 h-3 text-neutral-400" />
                <span>מפעל ברלב</span>
              </div>
              <div className="pr-4 space-y-0.5">
                {TREE[0].children![0].children!.map((group, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                      group.active
                        ? "bg-white border border-neutral-200 text-neutral-950 font-bold shadow-sm"
                        : "text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Camera className="w-3 h-3" />
                      {group.name}
                    </div>
                    <span className="text-[10px] text-neutral-300">{group.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-neutral-400">
                <ChevronLeft className="w-3 h-3" />
                <span>מפעל חיפה</span>
                <span className="text-[10px] text-neutral-300 mr-auto">8</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100">
            <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2 px-2">
              צ&apos;אטים קבוצתיים
            </div>
            <div className="px-2.5 py-1.5 text-xs text-neutral-400 flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              כל מצלמות ברלב
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-neutral-100">
            <div className="px-5 pt-2 text-[10px] text-neutral-300 font-mono">
              קבוצת מפעלים IL &rsaquo; מפעל ברלב &rsaquo; משרדים &rsaquo; לובי ראשי
            </div>
            <div className="px-5 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-neutral-950 flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xs text-neutral-950">מצלמת לובי ראשי</div>
                  <div className="text-[10px] text-neutral-400">Ghost פעיל</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse-slow" />
                <span className="text-[10px] text-neutral-400">LIVE</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* History message 1 */}
            <UserMsg text="מה הסטטוס של הלובי עכשיו?" time="14:18" />
            <GhostMsg text="הלובי פנוי. שני אנשים יושבים באזור ההמתנה. תאורה תקינה, אין מפגעים נראים לעין." time="14:18" />

            {/* History message 2 */}
            <UserMsg text="האם כל שלטי הבטיחות באזור הכניסה נראים ותקינים?" time="14:19" />
            <GhostMsg text="כן. שלט יציאת חירום מואר, שלט מטפה תקין, שילוט כיוון מדרגות נראה. לא זוהו שלטים חסרים או פגומים." time="14:20" />

            {/* Typing user indicator */}
            {phase === "typing-user" && (
              <div className="flex gap-2.5 animate-fade-in-up">
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-neutral-400">א</div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl rounded-tr-none px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Current user question */}
            {showUserQuestion && (
              <div className="animate-fade-in-up">
                <UserMsg text="האם מול דלת יציאת החירום בלובי מונחת עגלת ציוד או חפץ שחוסם את המעבר?" time="14:22" />
              </div>
            )}

            {/* Ghost typing indicator */}
            {showGhostTyping && (
              <div className="flex gap-2.5 animate-fade-in-up">
                <div className="w-6 h-6 rounded-full bg-neutral-950 flex-shrink-0 overflow-hidden">
                  <Image src="/ghost-icon.png" alt="" width={24} height={24} className="w-full h-full object-cover" />
                </div>
                <div className="bg-neutral-950 rounded-xl rounded-tr-none px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Ghost response with image */}
            {showGhostResponse && (
              <div className="flex gap-2.5 animate-fade-in-up">
                <div className="w-6 h-6 rounded-full bg-neutral-950 flex-shrink-0 overflow-hidden">
                  <Image src="/ghost-icon.png" alt="" width={24} height={24} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="bg-neutral-950 text-white rounded-xl rounded-tr-none px-3.5 py-2.5 max-w-sm">
                    <p className="text-xs leading-relaxed mb-2">
                      כן. מול דלת יציאת חירום B2 מונחת עגלת שינוע מתכת ועליה שני ארגזי קרטון פתוחים, חוסמים כ-60% מרוחב הפתח.
                    </p>
                    <div className="rounded-md overflow-hidden">
                      <Image src="/exitdoorblocked.jpg" alt="צילום מצלמה - דלת חירום חסומה" width={356} height={200} className="w-full h-auto object-cover" />
                    </div>
                  </div>
                  <div className="text-[9px] text-neutral-300 mt-1 px-1">14:22</div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-neutral-100">
            <div className="flex items-center gap-2.5 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2">
              <span className="flex-1 text-xs text-neutral-300">
                שאל את Ghost...
                <span className="animate-blink">|</span>
              </span>
              <div className="w-6 h-6 rounded-md bg-neutral-950 flex items-center justify-center">
                <Send className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMsg({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-6 h-6 rounded-full bg-neutral-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-neutral-400">א</div>
      <div>
        <div className="bg-neutral-50 border border-neutral-100 rounded-xl rounded-tr-none px-3.5 py-2.5 max-w-sm">
          <p className="text-xs leading-relaxed">{text}</p>
        </div>
        <div className="text-[9px] text-neutral-300 mt-1 px-1">{time}</div>
      </div>
    </div>
  );
}

function GhostMsg({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-6 h-6 rounded-full bg-neutral-950 flex-shrink-0 overflow-hidden">
        <Image src="/ghost-icon.png" alt="" width={24} height={24} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="bg-neutral-950 text-white rounded-xl rounded-tr-none px-3.5 py-2.5 max-w-sm">
          <p className="text-xs leading-relaxed">{text}</p>
        </div>
        <div className="text-[9px] text-neutral-300 mt-1 px-1">{time}</div>
      </div>
    </div>
  );
}
