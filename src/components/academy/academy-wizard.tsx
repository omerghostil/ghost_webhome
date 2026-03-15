"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ChatMessage {
  from: "ghost" | "user";
  text: string;
}

interface ChatStep {
  messages: ChatMessage[];
  responses?: { label: string; nextStep: string }[];
}

const TYPING_MS = 1400;
const PAUSE_AFTER_USER_MS = 700;
const PAUSE_AFTER_GHOST_MS = 500;

const STEPS: Record<string, ChatStep> = {
  intro: {
    messages: [
      { from: "ghost", text: "היי, אני Ghost." },
      {
        from: "ghost",
        text: "אני מערכת AI שמנתחת וידאו ממצלמות — בזמן אמת ובהיסטוריה.\nבוא אראה לך מה אני יודע לעשות.",
      },
    ],
    responses: [{ label: "בוא נתחיל", nextStep: "history" }],
  },
  history: {
    messages: [
      { from: "ghost", text: "יכולת ראשונה — חיפוש בהיסטוריה." },
      { from: "ghost", text: "אפשר לשאול אותי כל שאלה על מה שהמצלמות ראו. למשל:" },
      {
        from: "user",
        text: "מתי חנה בחניון איסוזו דימקס עם כיסאות פלסטיק לבנים בתא מטען?",
      },
      {
        from: "ghost",
        text: "סורק 8 חודשי וידאו...\n\nנמצאה התאמה — איסוזו דימקס כסוף, תא מטען פתוח עם כיסאות פלסטיק.\nעמוד 7, אזור B · 15.01.2026 — 14:23",
      },
    ],
    responses: [{ label: "מרשים. מה עוד?", nextStep: "realtime" }],
  },
  realtime: {
    messages: [
      { from: "ghost", text: "יכולת שנייה — ניתוח בזמן אמת." },
      { from: "ghost", text: "אני סורק את כל המצלמות בו-זמנית ועונה מיד." },
      { from: "user", text: "חפש באצטדיון ילד בן 8 עם גלידה וסנדלי שורש" },
      {
        from: "ghost",
        text: "סורק...\n\nנמצא — טריבונה מזרחית, שורה 12.\nילד בגיל 7-9, גלידה בגביע, סנדלים חומים.",
      },
    ],
    responses: [{ label: "ומשהו אוטומטי?", nextStep: "tasks" }],
  },
  tasks: {
    messages: [
      { from: "ghost", text: "יכולת שלישית — משימות והתראות." },
      { from: "ghost", text: "הגדר כלל בשפה חופשית ואני אפעל 24/7." },
      { from: "user", text: "כל פעם שזיהית מעשן בתחנת דלק — התראה קריטית" },
      { from: "ghost", text: "הופעל. מעשן בתחנת דלק → התראה מיידית." },
      {
        from: "user",
        text: "כל יום ב-19:00 בדוק שהמסעדה ערוכה בסטנדרט מישלן",
      },
      { from: "ghost", text: 'בדיקה מתוזמנת הופעלה.\n19:00 → סריקה + דו"ח.' },
    ],
    responses: [{ label: "עכשיו אני מבין", nextStep: "complete" }],
  },
  complete: {
    messages: [
      {
        from: "ghost",
        text: "זה Ghost.\nצופה, מנתח, זוכר ומבצע — 24/7.\nכל מה שצריך זה מצלמות ושפה טבעית.",
      },
    ],
  },
};

const STEP_ORDER = ["intro", "history", "realtime", "tasks", "complete"];

type Phase = "welcome" | "chat" | "skipped";

export function AcademyWizard() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [step, setStep] = useState("intro");
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [btns, setBtns] = useState(false);
  const [chatDone, setChatDone] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const scroll = useCallback(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(scroll, [msgs, typing, btns, scroll]);

  function play(key: string) {
    const s = STEPS[key];
    if (!s) return;
    setBtns(false);
    let i = 0;

    function next() {
      if (i >= s.messages.length) {
        if (s.responses) {
          timerRef.current = setTimeout(() => setBtns(true), 300);
        } else {
          timerRef.current = setTimeout(() => setChatDone(true), 800);
        }
        return;
      }
      const m = s.messages[i]!;
      i++;

      if (m.from === "user") {
        setMsgs((p) => [...p, m]);
        timerRef.current = setTimeout(next, PAUSE_AFTER_USER_MS);
      } else {
        setTyping(true);
        timerRef.current = setTimeout(() => {
          setTyping(false);
          setMsgs((p) => [...p, m]);
          timerRef.current = setTimeout(next, PAUSE_AFTER_GHOST_MS);
        }, TYPING_MS);
      }
    }

    next();
  }

  function begin() {
    setPhase("chat");
    play("intro");
  }

  function respond(nextKey: string) {
    setStep(nextKey);
    play(nextKey);
  }

  const idx = STEP_ORDER.indexOf(step);
  const pct =
    chatDone || phase === "skipped"
      ? 100
      : (idx / (STEP_ORDER.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      {/* Progress */}
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-neutral-100">
        <motion.div
          className="h-full bg-neutral-900"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Welcome modal */}
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="h-1 bg-neutral-100" />

              <div className="px-8 pt-10 pb-8 text-center" dir="rtl">
                <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/ghost-icon.png"
                    alt="Ghost"
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  ברוכים הבאים ל-Ghost Academy
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  בוא נכיר את Ghost דרך שיחה קצרה.
                  <br />
                  אראה לך 3 יכולות — ב-2 דקות.
                </p>
              </div>

              <div className="px-8 pb-8 space-y-3" dir="rtl">
                <button
                  onClick={begin}
                  className="w-full bg-neutral-950 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  בוא נתחיל
                </button>
                <button
                  onClick={() => setPhase("skipped")}
                  className="w-full text-neutral-400 text-sm py-2 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  דלג על ההדרכה
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat */}
      {phase === "chat" && (
        <div className="h-screen flex flex-col pt-1">
          <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Image
                src="/ghost-icon.png"
                alt="Ghost"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <div>
                <p className="text-sm font-bold">Ghost</p>
                <p className="text-[11px] text-neutral-400">הדרכה</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              חזרה לאתר
            </Link>
          </header>

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
            dir="rtl"
          >
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${m.from === "ghost" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex items-end gap-2.5 max-w-[80%] ${m.from === "ghost" ? "" : "flex-row-reverse"}`}
                >
                  {m.from === "ghost" && (
                    <Image
                      src="/ghost-icon.png"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-lg flex-shrink-0 mb-0.5"
                    />
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                      m.from === "ghost"
                        ? "bg-neutral-100 text-neutral-800 rounded-br-2xl rounded-bl-md"
                        : "bg-neutral-900 text-white rounded-bl-2xl rounded-br-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2.5">
                    <Image
                      src="/ghost-icon.png"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-lg flex-shrink-0 mb-0.5"
                    />
                    <div className="bg-neutral-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {btns && !chatDone && STEPS[step]?.responses && (
              <motion.div
                key="btns"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-6 pb-6 pt-2 flex-shrink-0"
                dir="rtl"
              >
                {STEPS[step]!.responses!.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => respond(r.nextStep)}
                    className="w-full bg-neutral-950 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {r.label}
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ))}
              </motion.div>
            )}

            {chatDone && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-6 pt-2 space-y-3 flex-shrink-0"
                dir="rtl"
              >
                <Link href="/demo" className="block">
                  <button className="w-full bg-neutral-950 text-white font-semibold text-sm py-4 rounded-2xl hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
                    רוצה להתחיל — הדגמה חינם
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/" className="block">
                  <button className="w-full text-neutral-400 text-sm py-3 hover:text-neutral-600 transition-colors cursor-pointer">
                    חזרה לאתר
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Skipped → centered CTA */}
      {phase === "skipped" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-md text-center space-y-8" dir="rtl">
            <div className="w-20 h-20 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto">
              <Image
                src="/ghost-icon.png"
                alt="Ghost"
                width={48}
                height={48}
                className="rounded-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Ghost</h2>
              <p className="text-neutral-500 leading-relaxed">
                צופה, מנתח, זוכר ומבצע — 24/7.
                <br />
                כל מה שצריך זה מצלמות ושפה טבעית.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/demo" className="block">
                <button className="w-full bg-neutral-950 text-white font-semibold text-sm py-4 rounded-2xl hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  רוצה להתחיל — הדגמה חינם
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/" className="block">
                <button className="w-full text-neutral-400 text-sm py-3 hover:text-neutral-600 transition-colors cursor-pointer">
                  חזרה לאתר
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
