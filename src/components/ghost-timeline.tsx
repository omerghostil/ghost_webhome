"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { History, Radio, Rocket } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const STAGE_ICONS = [History, Radio, Rocket];
const STAGE_IDS = ["past", "present", "future"] as const;
const CYCLE_DURATION = 7000;

export function GhostTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { tArray } = useTranslation();

  const stageData = tArray<{ label: string; title: string; example: string }>("components.ghostTimeline.stages");

  const stages = stageData.map((s, i) => ({
    id: STAGE_IDS[i],
    icon: STAGE_ICONS[i],
    label: s.label,
    title: s.title,
    example: s.example,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, CYCLE_DURATION);
  }, [stages.length]);

  useEffect(() => {
    if (!isVisible || isPaused) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible, isPaused, startTimer]);

  const handleStageClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => setIsPaused(false), CYCLE_DURATION * 2);
  };

  const activeStage = stages[activeIndex];

  if (stages.length === 0) return null;

  return (
    <div ref={containerRef} className="mt-16">
      {/* Stage Selector */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {stages.map((stage, i) => {
          const isActive = i === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex items-center">
              <button
                onClick={() => handleStageClick(i)}
                className={`
                  relative flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-500 cursor-pointer
                  ${isActive
                    ? "bg-neutral-950 text-white shadow-lg shadow-neutral-950/20"
                    : "bg-transparent text-neutral-400 hover:text-neutral-600"
                  }
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 150 + 200}ms`,
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold">{stage.label}</span>

                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2">
                    <div className="w-px h-4 bg-neutral-300" />
                  </div>
                )}
              </button>

              {i < stages.length - 1 && (
                <div
                  className="w-12 h-px mx-1 transition-all duration-700"
                  style={{
                    background: i < activeIndex
                      ? "rgb(10,10,10)"
                      : "rgb(229,229,229)",
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${i * 150 + 300}ms`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Content Card */}
      <div
        className="relative max-w-2xl mx-auto overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.6s",
        }}
      >
        <div className="border border-neutral-200 rounded-2xl bg-white p-8 lg:p-10 min-h-[220px]">
          {/* Title */}
          <h4
            key={`title-${activeStage.id}`}
            className="text-xl lg:text-2xl font-bold text-neutral-950 mb-5 animate-fade-in-up"
          >
            {activeStage.title}
          </h4>

          {/* Example */}
          <div
            key={`example-${activeStage.id}`}
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-neutral-500 leading-relaxed text-[15px]">
              {activeStage.example}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-8 flex gap-2">
            {stages.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    i === activeIndex
                      ? "bg-neutral-950"
                      : i < activeIndex
                        ? "bg-neutral-300"
                        : "bg-transparent"
                  }`}
                  style={{
                    width: i === activeIndex ? "100%" : i < activeIndex ? "100%" : "0%",
                    transition: i === activeIndex
                      ? `width ${CYCLE_DURATION}ms linear`
                      : "width 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
