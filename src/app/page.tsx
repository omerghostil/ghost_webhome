"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Eye, Scan, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCameraStream, captureFrameAsBase64 } from "@/components/neweb/use-camera-stream";
import { CameraFeed } from "@/components/neweb/camera-feed";

type GreetingState = "idle" | "loading" | "shown";

const MAX_GREETINGS_PER_SESSION = 8;
const API_TIMEOUT_MS = 15_000;

const STATUS_ITEMS = [
  { icon: Camera, label: "מצלמה" },
  { icon: Scan, label: "זיהוי" },
  { icon: Eye, label: "מצב" },
];

export default function Home() {
  const { videoRef, motionLevelRef, regionsRef, isReady, hasError, isPersonDetected, start } =
    useCameraStream();
  const [greeting, setGreeting] = useState<string | null>(null);
  const [greetingState, setGreetingState] = useState<GreetingState>("idle");
  const [greetingCount, setGreetingCount] = useState(0);
  const greetingCountRef = useRef(0);
  const wasPersonDetectedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const [frameCount, setFrameCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    start().then((dispose) => {
      cleanup = dispose;
    });
    return () => cleanup?.();
  }, [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameCount((c) => c + Math.floor(Math.random() * 30) + 60);
      const now = new Date();
      setCurrentTime(
        [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((v) => String(v).padStart(2, "0"))
          .join(":"),
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wasDetected = wasPersonDetectedRef.current;
    wasPersonDetectedRef.current = isPersonDetected;

    if (!isPersonDetected || wasDetected) return;
    if (greetingCountRef.current >= MAX_GREETINGS_PER_SESSION) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setGreetingState("loading");
    setGreeting(null);

    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    const run = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        setGreetingState("idle");
        return;
      }

      const base64 = captureFrameAsBase64(video);
      if (!base64) {
        setGreetingState("idle");
        return;
      }

      try {
        const res = await fetch("/api/ghost-greeting", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const data = await res.json();
        if (data.message) {
          setGreeting(data.message);
          setGreetingState("shown");
          greetingCountRef.current += 1;
          setGreetingCount(greetingCountRef.current);
        } else {
          setGreetingState("idle");
        }
      } catch {
        if (!controller.signal.aborted) {
          setGreetingState("idle");
        }
      }
    };

    run();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [isPersonDetected, videoRef]);

  const isSessionExhausted = greetingCount >= MAX_GREETINGS_PER_SESSION;

  const statusValues = [
    isReady ? "מחוברת" : "ממתין...",
    isPersonDetected ? "אדם זוהה" : "סריקה...",
    "ניתוח בזמן אמת",
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden">
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-8 lg:pt-28 lg:pb-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                <Eye className="w-3 h-3" />
                <span>Ghost Vision — Live</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                ראה את Ghost
                <br />
                <span className="text-neutral-400">בפעולה.</span>
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
                המצלמה שלך מחוברת ל-Ghost בזמן אמת. המערכת מנתחת את הסצנה, מזהה
                אובייקטים, ומגיבה בשפה טבעית.
              </p>
            </div>
          </div>
        </section>

        {/* ── CAMERA FEED ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 overflow-hidden">
              <div className="aspect-video relative bg-black">
                <CameraFeed
                  videoRef={videoRef}
                  motionLevelRef={motionLevelRef}
                  regionsRef={regionsRef}
                />

                {isReady && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse-slow" />
                      <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                        Live
                      </span>
                    </span>
                  </div>
                )}

                {!isReady && !hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <Camera className="w-8 h-8 text-neutral-600 animate-pulse" />
                    <p className="text-sm text-neutral-500">מחבר מצלמה...</p>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
                    <Camera className="w-8 h-8 text-neutral-600" />
                    <p className="text-sm text-neutral-400 text-center max-w-xs">
                      לא ניתן לגשת למצלמה. אנא אשר הרשאות מצלמה בדפדפן.
                    </p>
                  </div>
                )}

                {isReady && !isPersonDetected && greetingState !== "shown" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center"
                    >
                      <Scan className="w-10 h-10 text-neutral-500 mx-auto mb-4" strokeWidth={1.5} />
                      {isSessionExhausted ? (
                        <>
                          <p className="text-xl font-bold text-white mb-2">הסשן הסתיים.</p>
                          <p className="text-sm text-neutral-500">
                            רענן את הדף כדי להתחיל סשן חדש.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-bold text-white mb-2">Ghost מחפש אותך.</p>
                          <p className="text-sm text-neutral-500">
                            הצג את עצמך למצלמה כדי להתחיל.
                          </p>
                        </>
                      )}
                    </motion.div>
                  </div>
                )}

                {greetingState === "loading" && (
                  <div className="absolute bottom-6 right-6 z-20" dir="rtl">
                    <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-2xl px-5 py-4 flex items-center gap-3">
                      <Image src="/ghost-icon.png" alt="" width={20} height={20} className="rounded-md" />
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {greetingState === "shown" && greeting && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-sm z-20"
                    dir="rtl"
                  >
                    <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-5">
                      <div className="flex items-center gap-2.5 mb-3">
                        <Image src="/ghost-icon.png" alt="Ghost" width={24} height={24} className="rounded-md" />
                        <span className="text-xs font-bold text-white">Ghost</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed">{greeting}</p>
                      <p className="text-[10px] text-neutral-600 mt-3">
                        פריים אחד. ככה Ghost עובד.
                      </p>
                      <button
                        onClick={() => setGreetingState("idle")}
                        className="mt-4 w-full py-2.5 text-xs font-bold bg-white text-neutral-950 rounded-xl hover:bg-neutral-200 transition-colors"
                      >
                        {isSessionExhausted
                          ? "סיום"
                          : `צא וחזור לסריקה נוספת (${greetingCount}/${MAX_GREETINGS_PER_SESSION})`}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ── Status Bar ── */}
              <div className="border-t border-neutral-800 px-5 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isReady ? "bg-white animate-pulse-slow" : "bg-neutral-700"}`}
                    />
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${isReady ? "text-white" : "text-neutral-600"}`}
                    >
                      {isReady ? "ACTIVE" : "OFFLINE"}
                    </span>
                  </span>
                  <span className="text-[10px] text-neutral-600 font-mono">GHOST v4.2.1</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-neutral-600 font-mono">
                  <span className={greetingCount > 0 ? "text-neutral-400" : ""}>
                    SCAN {greetingCount}/{MAX_GREETINGS_PER_SESSION}
                  </span>
                  <span>{frameCount.toLocaleString()} frames</span>
                  <span>{currentTime}</span>
                </div>
              </div>
            </div>

            {/* ── Detection Info Cards ── */}
            {isReady && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-3 gap-3 mt-6"
              >
                {STATUS_ITEMS.map((item, i) => (
                  <div
                    key={item.label}
                    className="border border-neutral-800 rounded-xl px-4 py-3 bg-neutral-900/50"
                  >
                    <item.icon className="w-4 h-4 text-neutral-500 mb-2" strokeWidth={1.5} />
                    <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-bold">
                      {item.label}
                    </p>
                    <p className="text-xs text-neutral-300 mt-1">{statusValues[i]}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              רוצה לראות את התמונה המלאה?
            </h2>
            <p className="text-neutral-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Ghost מנתח סצנות, עונה על שאלות, ומבצע בדיקות אוטומטיות — הכל בשפה
              טבעית.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo">
                <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-12 px-7 text-sm font-bold">
                  קבע הדגמה
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/overview">
                <Button
                  variant="outline"
                  className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-12 px-7 text-sm"
                >
                  סקירת המוצר
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
