"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Download, Send, Video, RefreshCw, Lock } from "lucide-react";
import {
  classifyIntent,
  createInitialState,
  buildPromptPayload,
  updateSessionState,
  validateResponse,
  type SessionState,
  type MemoryEntry,
  type ChatMsg,
} from "@/lib/ghost-brain";
import {
  captureFrame,
  computePixelDiff,
  formatTimestamp,
  CHANGE_THRESHOLD,
  QUICK_INTERVAL_MS,
  FULL_INTERVAL_MS,
} from "@/lib/ghost-memory-engine";
import { generateGhostPdf } from "@/lib/generate-ghost-pdf";
import { ghostLive, ghostMemory } from "@/lib/openai-client";

const MESSAGE_LIMIT = 8;
const INVITE_CODE = "1553";

interface TryGhostModalProps {
  onClose: (redirectToAcademy?: boolean) => void;
}

export function TryGhostModal({ onClose }: TryGhostModalProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraLoading, setCameraLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "ghost", text: "שלום! אני Ghost Brain. המצלמה שלך מחוברת — שאל אותי כל שאלה על מה שאני רואה." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memoryLog, setMemoryLog] = useState<MemoryEntry[]>([]);
  const [sessionState, setSessionState] = useState<SessionState>(createInitialState);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLimitReached, setShowLimitReached] = useState(false);
  const [inviteInput, setInviteInput] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevFrameRef = useRef<ImageData | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const quickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fullIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const memoryLogRef = useRef<MemoryEntry[]>([]);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    startCamera();
    return () => stopEverything();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startCamera() {
    setCameraLoading(true);
    setCameraError("");

    const constraints = [
      { video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } },
      { video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } } },
      { video: true },
    ];

    for (const constraint of constraints) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraint);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.setAttribute("webkit-playsinline", "true");
          await videoRef.current.play();
          setCameraReady(true);
          setCameraLoading(false);
          startMemoryIntervals();
          return;
        }
      } catch {
        continue;
      }
    }

    setCameraLoading(false);
    setCameraError("לא ניתן לגשת למצלמה. אנא אשר הרשאות מצלמה בדפדפן ונסה שוב.");
  }

  function stopEverything() {
    if (quickIntervalRef.current) clearInterval(quickIntervalRef.current);
    if (fullIntervalRef.current) clearInterval(fullIntervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  function startMemoryIntervals() {
    quickIntervalRef.current = setInterval(() => quickScan(), QUICK_INTERVAL_MS);
    fullIntervalRef.current = setInterval(() => fullScan(), FULL_INTERVAL_MS);
    setTimeout(() => fullScan(), 2000);
  }

  async function quickScan() {
    if (!videoRef.current || !canvasRef.current) return;
    const result = captureFrame(videoRef.current, canvasRef.current);
    if (!result) return;

    if (prevFrameRef.current) {
      const diff = computePixelDiff(
        prevFrameRef.current.data,
        result.imageData.data,
        result.imageData.width,
        result.imageData.height
      );
      if (diff > CHANGE_THRESHOLD) {
        const lastDesc = memoryLogRef.current[memoryLogRef.current.length - 1]?.description ?? "";
        try {
          const description = await ghostMemory(result.dataUrl, "quick", lastDesc);
          if (description) {
            const entry: MemoryEntry = { timestamp: formatTimestamp(), type: "change_detected", description };
            memoryLogRef.current = [...memoryLogRef.current, entry];
            setMemoryLog((prev) => [...prev, entry]);
          }
        } catch { /* silent */ }
      }
    }
    prevFrameRef.current = result.imageData;
  }

  async function fullScan() {
    if (!videoRef.current || !canvasRef.current) return;
    const result = captureFrame(videoRef.current, canvasRef.current);
    if (!result) return;
    prevFrameRef.current = result.imageData;

    try {
      const description = await ghostMemory(result.dataUrl, "full");
      if (description) {
        const entry: MemoryEntry = { timestamp: formatTimestamp(), type: "routine", description };
        memoryLogRef.current = [...memoryLogRef.current, entry];
        setMemoryLog((prev) => [...prev, entry]);
      }
    } catch { /* silent */ }
  }

  const isLimitReached = !isUnlocked && userMessageCount >= MESSAGE_LIMIT;

  function handleUnlock() {
    if (inviteInput.trim() === INVITE_CODE) {
      setIsUnlocked(true);
      setShowLimitReached(false);
    }
  }

  async function handleSend() {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    if (isLimitReached) {
      setShowLimitReached(true);
      return;
    }

    const newCount = userMessageCount + 1;
    setUserMessageCount(newCount);
    setInputValue("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setIsTyping(true);
    // #region agent log
    fetch('http://127.0.0.1:7501/ingest/bf49ea86-d86d-4148-9f47-054a761cc006',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1bc67f'},body:JSON.stringify({sessionId:'1bc67f',location:'try-ghost-modal.tsx:handleSend',message:'message sent',data:{newCount,MESSAGE_LIMIT,isUnlocked,isLimitReached,userMessageCount},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    try {
      const intent = classifyIntent(text);
      let frame: string | null = null;
      if (intent !== "past" && videoRef.current && canvasRef.current) {
        const result = captureFrame(videoRef.current, canvasRef.current);
        frame = result?.dataUrl ?? null;
      }

      const payload = buildPromptPayload(sessionState, intent, memoryLogRef.current, frame, text);

      let answer: string;
      try {
        answer = await ghostLive(payload);
        if (!answer) answer = "שגיאה בתקשורת עם Ghost Brain. נסה שוב.";
      } catch {
        answer = "שגיאה בתקשורת עם Ghost Brain. נסה שוב.";
      }

      answer = validateResponse(answer, sessionState);
      const newState = updateSessionState(sessionState, text, answer, memoryLogRef.current);
      setSessionState(newState);
      setMessages((prev) => [...prev, { from: "ghost", text: answer }]);

      if (!isUnlocked && newCount >= MESSAGE_LIMIT) {
        // #region agent log
        fetch('http://127.0.0.1:7501/ingest/bf49ea86-d86d-4148-9f47-054a761cc006',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1bc67f'},body:JSON.stringify({sessionId:'1bc67f',location:'try-ghost-modal.tsx:limitCheck',message:'LIMIT REACHED - showing overlay',data:{newCount,MESSAGE_LIMIT},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setShowLimitReached(true);
      }
    } catch {
      setMessages((prev) => [...prev, { from: "ghost", text: "שגיאה בלתי צפויה. נסה שוב." }]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleClose() {
    if (memoryLog.length > 0) {
      setShowExitConfirm(true);
    } else {
      stopEverything();
      onClose(true);
    }
  }

  function downloadPdf() {
    const blob = generateGhostPdf(memoryLogRef.current);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ghost-report-${new Date().toISOString().slice(0, 10)}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

      <div className="relative z-10 bg-neutral-950 sm:rounded-2xl overflow-hidden w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[95vh] flex flex-col lg:flex-row shadow-2xl sm:border border-neutral-800 safe-top">
        {/* Video panel */}
        <div className="relative w-full lg:w-[55%] bg-black aspect-video lg:aspect-auto lg:min-h-[500px] flex-shrink-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${cameraReady ? "opacity-100" : "opacity-0"}`}
            style={{ transform: "scaleX(-1)" }}
          />
          <canvas ref={canvasRef} className="hidden" />

          {cameraLoading && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950">
              <Video className="w-8 h-8 text-neutral-600 animate-pulse" />
              <p className="text-sm text-neutral-500">מחבר מצלמה...</p>
            </div>
          )}

          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950 px-6">
              <Video className="w-8 h-8 text-red-500/70" />
              <p className="text-sm text-red-400/80 text-center max-w-xs">{cameraError}</p>
              <button
                onClick={() => startCamera()}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg px-4 py-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                נסה שוב
              </button>
            </div>
          )}

          {cameraReady && (
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-wider uppercase">Live</span>
              </span>
              {memoryLog.length > 0 && (
                <span className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] text-neutral-400 font-mono">
                  {memoryLog.length} entries
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chat panel */}
        <div className="w-full lg:w-[45%] flex flex-col bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 min-h-0 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Image src="/ghost-icon.png" alt="Ghost" width={28} height={28} className="rounded-md" />
              <div>
                <p className="text-sm font-bold text-white">Ghost Brain</p>
                <p className="text-[10px] text-neutral-500">ניתוח וידאו בזמן אמת</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {memoryLog.length > 0 && (
                <button
                  onClick={downloadPdf}
                  className="flex items-center gap-1.5 text-[10px] text-neutral-500 hover:text-white transition-colors rounded-lg px-2.5 py-1.5 hover:bg-neutral-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              )}
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800 active:scale-95 transition-all text-neutral-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]" dir="rtl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "ghost" ? "justify-start" : "justify-end"}`}>
                <div className={`flex items-end gap-2 max-w-[90%] ${msg.from === "ghost" ? "" : "flex-row-reverse"}`}>
                  {msg.from === "ghost" && (
                    <Image src="/ghost-icon.png" alt="" width={20} height={20} className="rounded-md flex-shrink-0 mb-0.5" />
                  )}
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.from === "ghost"
                        ? "bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-br-2xl rounded-bl-md"
                        : "bg-white text-neutral-950 rounded-bl-2xl rounded-br-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <Image src="/ghost-icon.png" alt="" width={20} height={20} className="rounded-md flex-shrink-0 mb-0.5" />
                  <div className="bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-neutral-800 flex-shrink-0 safe-bottom">
            {!isUnlocked && (
              <div className="flex justify-between items-center mb-1.5 px-1">
                <span className="text-[10px] text-neutral-600 font-mono">
                  {userMessageCount}/{MESSAGE_LIMIT} הודעות
                </span>
                {isLimitReached && (
                  <span className="text-[10px] text-amber-500/80">הזן קוד הזמנה להמשך</span>
                )}
              </div>
            )}
            <div className="flex gap-2 items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isLimitReached ? "הגבלת הודעות — הזן קוד הזמנה" : "שאל את Ghost..."}
                className="flex-1 text-sm text-white placeholder:text-neutral-600 outline-none bg-transparent py-1.5"
                dir="rtl"
                disabled={!cameraReady || isLimitReached}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || !cameraReady || isLimitReached}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-neutral-950 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLimitReached && !isUnlocked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <p className="text-white font-bold text-lg mb-2">הגעת למגבלת ההודעות</p>
            <p className="text-neutral-400 text-sm mb-5">
              הזן קוד הזמנה כדי לפתוח שימוש ללא הגבלה
            </p>
            <div className="flex gap-2 items-center mb-4">
              <input
                type="text"
                value={inviteInput}
                onChange={(e) => setInviteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="קוד הזמנה"
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white text-center placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition-colors"
                dir="ltr"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUnlock}
                className="flex-1 bg-white text-neutral-950 font-bold text-sm py-3 rounded-xl hover:bg-neutral-200 transition-colors"
              >
                פתח
              </button>
              <button
                onClick={() => { stopEverything(); onClose(true); }}
                className="flex-1 bg-neutral-800 text-neutral-400 font-bold text-sm py-3 rounded-xl hover:bg-neutral-700 transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}

      {showExitConfirm && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 max-w-sm mx-4 text-center">
            <p className="text-white font-bold text-lg mb-2">לפני שיוצאים</p>
            <p className="text-neutral-400 text-sm mb-6">
              נאספו {memoryLog.length} רשומות זיכרון. רוצה להוריד דו&quot;ח PDF?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { downloadPdf(); stopEverything(); onClose(true); }}
                className="flex-1 bg-white text-neutral-950 font-bold text-sm py-3 rounded-xl hover:bg-neutral-200 transition-colors"
              >
                הורד והמשך
              </button>
              <button
                onClick={() => { stopEverything(); onClose(true); }}
                className="flex-1 bg-neutral-800 text-neutral-400 font-bold text-sm py-3 rounded-xl hover:bg-neutral-700 transition-colors"
              >
                המשך בלי
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
