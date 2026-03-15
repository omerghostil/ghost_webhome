"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, Send, ChevronDown, ChevronLeft, Users, Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const SEARCH_RESULTS = [
  { time: "02:14:22", camera: "CAM-FL03" },
];

const TYPING_SPEED_MS = 35;
const PHASE_DELAYS = { startTyping: 800, afterTyping: 400, thinking: 1200, response: 800, results: 500 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
} as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 120 } },
};

const mockupVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 22, stiffness: 100, delay: 0.2 } },
};

const resultCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 150 } },
};

export function SearchDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const { t } = useTranslation();

  const searchQuery = t("components.searchDemo.searchQuery");
  const ghostResponse = t("components.searchDemo.response");
  const resultLabel = t("components.searchDemo.resultLabel");

  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isInView || phase !== 0) return;
    const timeout = setTimeout(() => setPhase(1), PHASE_DELAYS.startTyping);
    return () => clearTimeout(timeout);
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(searchQuery.slice(0, i));
      if (i >= searchQuery.length) {
        clearInterval(interval);
        setTimeout(() => setPhase(2), PHASE_DELAYS.afterTyping);
      }
    }, TYPING_SPEED_MS);
    return () => clearInterval(interval);
  }, [phase, searchQuery]);

  useEffect(() => {
    if (phase === 2) {
      const timer = setTimeout(() => setPhase(3), 100);
      return () => clearTimeout(timer);
    }
    if (phase === 3) {
      const timer = setTimeout(() => setPhase(4), PHASE_DELAYS.thinking);
      return () => clearTimeout(timer);
    }
    if (phase === 4) {
      const timer = setTimeout(() => setPhase(5), PHASE_DELAYS.response);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const isTyping = phase === 1;
  const showUserMessage = phase >= 2;
  const showThinking = phase === 3;
  const showResponse = phase >= 4;
  const showResults = phase >= 5;

  const sidebarGroups = [
    { name: t("components.chatMockup.offices"), count: 3, active: true },
    { name: t("components.chatMockup.production"), count: 5, active: false },
    { name: t("components.chatMockup.parking"), count: 2, active: false },
  ];

  return (
    <>
      <section
        id="msg2"
        ref={sectionRef}
        className="bg-neutral-950 text-white relative overflow-hidden"
      >
        <div className="dot-grid-dark absolute inset-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 relative z-10">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUpVariants}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{t("components.searchDemo.number")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                {t("components.searchDemo.title")}
                <br />
                <span className="text-neutral-500">{t("components.searchDemo.titleHighlight")}</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6 max-w-lg">
                {t("components.searchDemo.description")}
              </p>
              <Link
                href="/past-search"
                className="inline-flex items-center text-xs font-bold text-white border border-neutral-700 rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors"
              >
                {t("components.searchDemo.linkText")} &larr;
              </Link>
            </motion.div>

            <motion.div variants={mockupVariants}>
              <div className="border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                {/* Browser chrome */}
                <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2.5 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  </div>
                  <div className="flex-1 bg-neutral-800 rounded-md px-3 py-1 text-[11px] text-neutral-500 font-mono text-center border border-neutral-700">
                    app.ghost.ai
                  </div>
                </div>

                <div className="flex h-[420px] lg:h-[460px] bg-neutral-950">
                  {/* Sidebar */}
                  <div className="w-44 border-l border-neutral-800 bg-neutral-900/50 p-3 hidden lg:block">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-bold mb-3 px-2">
                      {t("components.chatMockup.cameraNavigation")}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-neutral-400">
                        <ChevronDown className="w-3 h-3 text-neutral-600" />
                        <span>{t("components.chatMockup.factoryGroup")}</span>
                      </div>
                      <div className="pr-4 space-y-0.5">
                        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-neutral-500">
                          <ChevronDown className="w-3 h-3 text-neutral-600" />
                          <span>{t("components.chatMockup.factoryBarlev")}</span>
                        </div>
                        <div className="pr-4 space-y-0.5">
                          {sidebarGroups.map((g, i) => (
                            <div
                              key={i}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                                g.active
                                  ? "bg-neutral-800 border border-neutral-700 text-white font-bold"
                                  : "text-neutral-600"
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <Camera className="w-3 h-3" />
                                {g.name}
                              </div>
                              <span className="text-[10px] text-neutral-700">{g.count}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-neutral-600">
                          <ChevronLeft className="w-3 h-3" />
                          <span>{t("components.chatMockup.factoryHaifa")}</span>
                          <span className="text-[10px] text-neutral-700 mr-auto">8</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-800">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-bold mb-2 px-2">
                        {t("components.chatMockup.groupChats")}
                      </div>
                      <div className="px-2.5 py-1.5 text-xs text-neutral-600 flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        {t("components.chatMockup.allBarlevCameras")}
                      </div>
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="border-b border-neutral-800">
                      <div className="px-4 pt-2 text-[10px] text-neutral-700 font-mono">
                        {t("components.chatMockup.breadcrumb")}
                      </div>
                      <div className="px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                            <Camera className="w-3 h-3 text-neutral-950" />
                          </div>
                          <div>
                            <div className="font-bold text-[11px] text-white">{t("components.chatMockup.mainLobbyCamera")}</div>
                            <div className="text-[10px] text-neutral-600">{t("components.searchDemo.pastSearch")}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Search className="w-3 h-3 text-neutral-600" />
                          <span className="text-[10px] text-neutral-600">{t("components.searchDemo.search")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-3 overflow-hidden flex flex-col justify-end">
                      {showUserMessage && (
                        <motion.div
                          className="flex gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-neutral-500">
                            {t("components.chatMockup.userInitial")}
                          </div>
                          <div>
                            <div className="bg-neutral-800 border border-neutral-700 rounded-xl rounded-tr-none px-3 py-2 max-w-xs">
                              <p className="text-[11px] leading-relaxed text-neutral-200">{searchQuery}</p>
                            </div>
                            <div className="text-[9px] text-neutral-700 mt-1 px-1">{t("components.searchDemo.now")}</div>
                          </div>
                        </motion.div>
                      )}

                      {showThinking && (
                        <motion.div
                          className="flex gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 overflow-hidden">
                            <Image src="/ICON_GHOST.jpg" alt="" width={20} height={20} className="w-full h-full object-cover" />
                          </div>
                          <div className="bg-neutral-800 border border-neutral-700 rounded-xl rounded-tr-none px-3 py-2.5">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse-slow" />
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse-slow [animation-delay:0.3s]" />
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse-slow [animation-delay:0.6s]" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {showResponse && (
                        <motion.div
                          className="flex gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 overflow-hidden">
                            <Image src="/ICON_GHOST.jpg" alt="" width={20} height={20} className="w-full h-full object-cover" />
                          </div>
                          <div className="max-w-xs">
                            <div className="bg-white text-neutral-950 rounded-xl rounded-tr-none px-3 py-2">
                              <p className="text-[11px] leading-relaxed">{ghostResponse}</p>
                            </div>

                            {showResults && (
                              <motion.div
                                className="mt-2 space-y-1.5"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
                              >
                                {SEARCH_RESULTS.map((r, i) => (
                                  <motion.div
                                    key={i}
                                    variants={resultCardVariants}
                                    className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden"
                                  >
                                    <div className="h-16 bg-neutral-800 flex items-center justify-center border-b border-neutral-700">
                                      <span className="text-[10px] font-mono text-neutral-600">
                                        {r.camera} &middot; {r.time}
                                      </span>
                                    </div>
                                    <div className="px-2.5 py-1.5 flex items-center justify-between">
                                      <span className="text-[10px] text-neutral-400">{resultLabel}</span>
                                      <div className="w-1 h-1 rounded-full bg-neutral-600" />
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                            <div className="text-[9px] text-neutral-700 mt-1 px-1">{t("components.searchDemo.now")}</div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-neutral-800">
                      <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2">
                        <span className="flex-1 text-[11px] text-neutral-600 min-h-[1.2em]">
                          {isTyping ? (
                            <>
                              <span className="text-neutral-300">{typedText}</span>
                              <span className="animate-blink text-white">|</span>
                            </>
                          ) : phase === 0 ? (
                            <>
                              {t("components.chatMockup.askGhost")}
                              <span className="animate-blink text-neutral-500">|</span>
                            </>
                          ) : (
                            t("components.chatMockup.askGhost")
                          )}
                        </span>
                        <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center flex-shrink-0">
                          <Send className="w-2.5 h-2.5 text-neutral-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
