"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChatMessage,
  StartScreen,
  MessageBubble,
  TypingIndicator,
  ChatInput,
  SummaryCard,
} from "@/components/ghost-demo-shared";
import { AlertsPanel, TasksPanel, FinalSummary } from "@/components/ghost-demo-steps";
import { useTranslation } from "@/lib/i18n";

type Step =
  | "intro"
  | "location"
  | "camera-view"
  | "alerts"
  | "alert-summary"
  | "tasks"
  | "task-summary"
  | "final";

const TYPING_DELAY = 600;

export function GhostOnboardingDemo() {
  const [step, setStep] = useState<Step>("intro");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userCameraView, setUserCameraView] = useState("");

  const [alertData, setAlertData] = useState<{ trigger: string; channels: string[] } | null>(null);
  const [taskData, setTaskData] = useState<{ schedule: string; action: string } | null>(null);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const channelLabels: Record<string, string> = {
    whatsapp: t("components.demoSteps.channels.whatsapp"),
    sms: t("components.demoSteps.channels.sms"),
    email: t("components.demoSteps.channels.email"),
    push: t("components.demoSteps.channels.push"),
  };

  const scrollToBottom = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, step, scrollToBottom]);

  const ghostSay = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { from: "ghost", text }]);
        resolve();
      }, TYPING_DELAY);
    });
  }, []);

  const userSay = (text: string) => {
    setMessages((prev) => [...prev, { from: "user", text }]);
  };

  const handleStart = async () => {
    setIsStarted(true);
    await ghostSay(t("components.onboarding.greeting"));
    await ghostSay(t("components.onboarding.hasCameras"));
  };

  const handleHasCameras = async (yes: boolean) => {
    userSay(yes ? t("components.onboarding.yes") : t("components.onboarding.notYet"));
    await ghostSay(yes ? t("components.onboarding.whereInstalled") : t("components.onboarding.whereWant"));
    setStep("location");
  };

  const handleLocationSubmit = async () => {
    if (!inputValue.trim()) return;
    const loc = inputValue.trim();
    userSay(loc);
    setUserLocation(loc);
    setInputValue("");
    await ghostSay(t("components.onboarding.whatSees"));
    setStep("camera-view");
  };

  const handleCameraViewSubmit = async () => {
    if (!inputValue.trim()) return;
    const view = inputValue.trim();
    userSay(view);
    setUserCameraView(view);
    setInputValue("");
    await ghostSay(t("components.onboarding.gotIt"));
    await ghostSay(t("components.onboarding.twoThings"));
    await ghostSay(t("components.onboarding.defineAlert"));
    setStep("alerts");
  };

  const handleAlertComplete = async (data: { trigger: string; channels: string[] }) => {
    setAlertData(data);
    setStep("alert-summary");
  };

  const handleAlertConfirm = async () => {
    if (!alertData) return;
    userSay(t("components.onboarding.confirmLabel"));
    await ghostSay(t("components.onboarding.alertActive"));
    setStep("tasks");
  };

  const handleTaskComplete = async (data: { schedule: string; action: string }) => {
    setTaskData(data);
    setStep("task-summary");
  };

  const handleTaskConfirm = async () => {
    if (!taskData) return;
    userSay(t("components.onboarding.confirmLabel"));
    await ghostSay(t("components.onboarding.taskActive"));
    await ghostSay(t("components.onboarding.summary"));
    setStep("final");
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>{t("components.onboarding.badge")}</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
          {t("components.onboarding.title")}
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto">
          {t("components.onboarding.description")}
        </p>
      </div>

      <div className="max-w-2xl mx-auto border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="bg-neutral-950 px-5 py-3.5 flex items-center gap-3">
          <Image src="/ghost-icon.png" alt="Ghost" width={28} height={28} className="rounded-md" />
          <div>
            <p className="text-white text-sm font-bold">Ghost</p>
            <p className="text-neutral-400 text-[11px]">{isTyping ? t("components.onboarding.typing") : t("components.onboarding.connected")}</p>
          </div>
          <div className="mr-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[11px] text-neutral-500">{t("components.onboarding.online")}</span>
          </div>
        </div>

        <div ref={chatBodyRef} className="h-[480px] overflow-y-auto p-5 space-y-4 bg-neutral-50/50">
          {!isStarted ? (
            <StartScreen onStart={handleStart} />
          ) : (
            <>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

              {isTyping && <TypingIndicator />}

              {step === "intro" && messages.length >= 2 && !isTyping && (
                <div className="flex gap-2 justify-end animate-fade-in-up">
                  <button onClick={() => handleHasCameras(true)} className="bg-neutral-950 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                    {t("components.onboarding.yes")}
                  </button>
                  <button onClick={() => handleHasCameras(false)} className="bg-white border border-neutral-200 text-neutral-600 text-sm px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
                    {t("components.onboarding.notYet")}
                  </button>
                </div>
              )}

              {step === "location" && !isTyping && (
                <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleLocationSubmit} placeholder={t("components.onboarding.locationPlaceholder")} />
              )}
              {step === "camera-view" && !isTyping && (
                <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleCameraViewSubmit} placeholder={t("components.onboarding.cameraViewPlaceholder")} />
              )}

              {step === "alerts" && !isTyping && (
                <AlertsPanel cameraView={userCameraView} onComplete={handleAlertComplete} />
              )}
              {step === "alert-summary" && !isTyping && alertData && (
                <SummaryCard
                  title={t("components.onboarding.alertSummaryTitle")}
                  lines={[
                    `${t("components.demoSteps.whenSeen")} ${alertData.trigger} → ${alertData.channels.map((c) => channelLabels[c] ?? c).join(", ")}`,
                  ]}
                  onConfirm={handleAlertConfirm}
                />
              )}

              {step === "tasks" && !isTyping && (
                <TasksPanel cameraView={userCameraView} userLocation={userLocation} onComplete={handleTaskComplete} />
              )}
              {step === "task-summary" && !isTyping && taskData && (
                <SummaryCard
                  title={t("components.onboarding.taskSummaryTitle")}
                  lines={[
                    `${taskData.schedule} → ${taskData.action}`,
                  ]}
                  onConfirm={handleTaskConfirm}
                />
              )}

              {step === "final" && !isTyping && (
                <FinalSummary
                  rules={{ alert: alertData ?? undefined, task: taskData ?? undefined }}
                  cameraView={userCameraView}
                  userLocation={userLocation}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
