"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, User, ShieldCheck, Terminal, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { verifyCredentials, setAuthSession, isAuthenticated } from "@/lib/local-auth";

const TERMINAL_LINES = [
  { text: "GHOST VISION TERMINAL v1.0.0", delay: 0 },
  { text: "Initializing secure channel...", delay: 400 },
  { text: "Connection established — AES-256", delay: 900 },
  { text: "Awaiting operator credentials_", delay: 1500 },
];

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/vision-cost-explorer");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage(t("login.errorEmpty"));
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      if (verifyCredentials(username, password)) {
        setAuthSession();
        router.push("/vision-cost-explorer");
      } else {
        setErrorMessage(t("login.errorInvalid"));
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col selection:bg-neutral-700 relative overflow-hidden pb-16 md:pb-0">
      <div className="dot-grid-dark absolute inset-0 pointer-events-none opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
        }}
      />

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
              Ghost Vision — Cost Explorer
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] text-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="tracking-[0.15em] uppercase">{t("login.secure")}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-20 px-6 py-16">
        <div className="w-full max-w-md">
          <div className="border border-neutral-800 rounded-t-xl bg-neutral-900/80 px-4 py-2.5 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Ghost Vision Terminal
            </span>
            <div className="mr-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse-slow" />
            </div>
          </div>

          <div className="border border-t-0 border-neutral-800 bg-neutral-950/90 px-5 pt-4 pb-2">
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

            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/ghost-icon.png"
                  alt="Ghost"
                  width={64}
                  height={64}
                  className="rounded-2xl"
                />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-green-500/80 border-2 border-neutral-950 animate-pulse-slow" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1.5 block">
                  {t("login.username")}
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("login.usernamePlaceholder")}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pr-10 pl-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono transition-colors"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1.5 block">
                  {t("login.password")}
                </label>
                <div className="relative">
                  <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pr-10 pl-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono transition-colors"
                    autoComplete="current-password"
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
                    <span>{t("login.authenticating")}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t("login.loginButton")}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="border border-t-0 border-neutral-800 rounded-b-xl bg-neutral-900/60 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse-slow" />
                <span className="text-[10px] text-neutral-600 font-mono">TLS 1.3 / SECURE</span>
              </div>
              <span className="text-[10px] text-neutral-700 font-mono">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-neutral-800/60 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("common.buttons.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
