"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { KeyRound, LogIn, ArrowLeft, ShieldCheck, Terminal } from "lucide-react";

const TERMINAL_LINES = [
  { text: "GHOST SECURE TERMINAL v3.2.1", delay: 0 },
  { text: "Initializing encrypted channel...", delay: 400 },
  { text: "Connection established — AES-256", delay: 900 },
  { text: "Awaiting distributor credentials_", delay: 1500 },
];

export default function PartnersLoginPage() {
  const [accessKey, setAccessKey] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim() || !inviteCode.trim()) {
      setErrorMessage("נדרש מפתח גישה וקוד הזמנה");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("מפתח גישה שגוי או קוד הזמנה לא תקף");
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col selection:bg-neutral-700 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="dot-grid-dark absolute inset-0 pointer-events-none opacity-40" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-20 border-b border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/ghost-icon.png"
              alt="Ghost"
              width={28}
              height={28}
              className="rounded-md opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
              Ghost Partner Portal
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] text-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="tracking-[0.15em] uppercase">Encrypted</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-6 py-16">
        <div className="w-full max-w-md">
          {/* Terminal header */}
          <div className="border border-neutral-800 rounded-t-xl bg-neutral-900/80 px-4 py-2.5 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Ghost Distributor Terminal
            </span>
            <div className="mr-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse-slow" />
            </div>
          </div>

          {/* Terminal body */}
          <div className="border border-t-0 border-neutral-800 bg-neutral-950/90 px-5 pt-4 pb-2">
            {/* Terminal boot lines */}
            <div className="font-mono text-[11px] space-y-1 mb-6">
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className="text-neutral-600 animate-fade-in-up"
                  style={{ animationDelay: `${line.delay}ms` }}
                >
                  <span className="text-neutral-700 ml-2">$</span> {line.text}
                </div>
              ))}
            </div>

            {/* Ghost icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/blackicon_whitebg.png"
                  alt="Ghost"
                  width={80}
                  height={80}
                  className="rounded-2xl"
                />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-green-500/80 border-2 border-neutral-950 animate-pulse-slow" />
              </div>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1.5 block">
                  מפתח גישה
                </label>
                <div className="relative">
                  <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <input
                    type="password"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pr-10 pl-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1.5 block">
                  Login Invite Code
                </label>
                <div className="relative">
                  <LogIn className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="GHOST-XXXX-XXXX"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pr-10 pl-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono tracking-wider transition-colors"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-[11px] text-red-400/80 bg-red-950/20 border border-red-900/30 rounded-lg px-3 py-2 font-mono">
                  ⚠ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-neutral-950 font-bold text-sm rounded-lg py-3 mt-2 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" />
                    <span>מאמת...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>כניסה לפורטל</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Terminal footer */}
          <div className="border border-t-0 border-neutral-800 rounded-b-xl bg-neutral-900/60 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse-slow" />
                <span className="text-[10px] text-neutral-600 font-mono">TLS 1.3 / SECURE</span>
              </div>
              <span className="text-[10px] text-neutral-700 font-mono">v3.2.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom invitation bar */}
      <div className="relative z-20 border-t border-neutral-800/60 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-right">
            <p className="text-sm text-neutral-400">
              עדיין לא מפיץ רשמי?{" "}
              <span className="text-white font-bold">הצטרפו לרשת המפיצים של Ghost</span>
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              עמלות קבועות, ליווי מלא, הכשרה מקצועית ופורטל ניהול ייעודי
            </p>
          </div>
          <Link
            href="/partners/join"
            className="flex items-center gap-2 bg-white text-neutral-950 font-bold text-xs rounded-full px-5 py-2.5 hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            הצטרפות כמפיץ
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
