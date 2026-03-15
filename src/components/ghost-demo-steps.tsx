"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { StepBadge, ConfirmButton } from "@/components/ghost-demo-shared";
import { useTranslation } from "@/lib/i18n";

export function AlertsPanel({
  cameraView,
  onComplete,
}: {
  cameraView: string;
  onComplete: (data: { trigger: string; channels: string[] }) => void;
}) {
  const [trigger, setTrigger] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const { t } = useTranslation();

  const notificationChannels = [
    { id: "whatsapp", label: t("components.demoSteps.channels.whatsapp") },
    { id: "sms", label: t("components.demoSteps.channels.sms") },
    { id: "email", label: t("components.demoSteps.channels.email") },
    { id: "push", label: t("components.demoSteps.channels.push") },
  ];

  const toggleChannel = (id: string) => {
    setChannels((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const isValid = trigger.trim().length > 0 && channels.length > 0;

  return (
    <div className="animate-fade-in-up space-y-4">
      <StepBadge current={1} total={2} label={t("components.demoSteps.alertStep")} />

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t("components.demoSteps.whatToAlert")}</p>
        <div className="flex items-center gap-2 flex-wrap text-[15px] leading-loose" dir="rtl">
          <span className="text-neutral-700 font-medium">״{t("components.demoSteps.whenSee")}</span>
          <input
            type="text"
            value={trigger}
            onChange={(e) => { if (e.target.value.length <= 25) setTrigger(e.target.value); }}
            placeholder={t("components.demoSteps.triggerPlaceholder")}
            className="border-b-2 border-neutral-950 bg-transparent text-neutral-950 font-bold text-center outline-none px-2 py-0.5 min-w-[130px] max-w-[200px] placeholder:text-neutral-300 placeholder:font-normal"
            dir="rtl"
          />
          <span className="text-neutral-700 font-medium">{t("components.demoSteps.alertImmediately")}״</span>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t("components.demoSteps.whereSend")}</p>
        <div className="grid grid-cols-2 gap-2">
          {notificationChannels.map((ch) => {
            const isOn = channels.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => toggleChannel(ch.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer border ${
                  isOn ? "bg-neutral-950 text-white border-neutral-950" : "bg-neutral-50 text-neutral-500 border-neutral-100 hover:border-neutral-300"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isOn ? "text-white" : "text-neutral-300"}`} />
                <span className="font-medium">{ch.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ConfirmButton
        label={t("components.demoSteps.activateAlert")}
        disabled={!isValid}
        onClick={() => onComplete({ trigger, channels })}
      />
    </div>
  );
}

export function TasksPanel({
  cameraView,
  userLocation,
  onComplete,
}: {
  cameraView: string;
  userLocation: string;
  onComplete: (data: { schedule: string; action: string }) => void;
}) {
  const [schedule, setSchedule] = useState("");
  const [action, setAction] = useState("");
  const { t } = useTranslation();

  const isValid = schedule.trim().length > 0 && action.trim().length > 0;

  return (
    <div className="animate-fade-in-up space-y-4">
      <StepBadge current={2} total={2} label={t("components.demoSteps.taskStep")} />

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-neutral-400" />
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{t("components.demoSteps.when")}</p>
        </div>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder={t("components.demoSteps.schedulePlaceholder")}
          className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2.5 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
          dir="rtl"
        />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t("components.demoSteps.whatToCheck")}</p>
        <textarea
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder={t("components.demoSteps.checkPlaceholder")}
          className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2.5 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300 resize-none h-16"
          dir="rtl"
        />
      </div>

      <ConfirmButton
        label={t("components.demoSteps.activateCheck")}
        disabled={!isValid}
        onClick={() => onComplete({ schedule, action })}
      />
    </div>
  );
}

interface RuleSummary {
  alert?: { trigger: string; channels: string[] };
  task?: { schedule: string; action: string };
}

export function FinalSummary({ rules, cameraView, userLocation }: { rules: RuleSummary; cameraView: string; userLocation: string }) {
  const location = cameraView || userLocation;
  const { t } = useTranslation();

  const notificationChannels = [
    { id: "whatsapp", label: t("components.demoSteps.channels.whatsapp") },
    { id: "sms", label: t("components.demoSteps.channels.sms") },
    { id: "email", label: t("components.demoSteps.channels.email") },
    { id: "push", label: t("components.demoSteps.channels.push") },
  ];

  const channelNames = (rules.alert?.channels ?? []).map((c) =>
    notificationChannels.find((ch) => ch.id === c)?.label ?? c,
  );

  return (
    <div className="animate-fade-in-up space-y-3">
      <div className="bg-white border-2 border-neutral-950 rounded-xl p-5">
        <p className="text-sm font-bold text-neutral-950 mb-4">{t("components.demoSteps.ghostActiveOn")} {location}:</p>

        <div className="space-y-3 text-sm">
          {rules.alert && (
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">❶</span>
              <div>
                <p className="font-bold text-neutral-950">{t("components.demoSteps.immediateAlert")}</p>
                <p className="text-neutral-500">{t("components.demoSteps.whenSeen")} <span className="font-bold text-neutral-700">{rules.alert.trigger}</span> → {channelNames.join(", ")}</p>
              </div>
            </div>
          )}

          {rules.task && (
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">❷</span>
              <div>
                <p className="font-bold text-neutral-950">{t("components.demoSteps.scheduledCheck")}</p>
                <p className="text-neutral-500">{rules.task.schedule} → {rules.task.action}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-neutral-100 text-center">
          <p className="text-sm font-bold text-neutral-950">{t("components.demoSteps.ghostWorking")}</p>
          <p className="text-xs text-neutral-400 mt-1">{t("components.demoSteps.fieldIntel")}</p>
        </div>
      </div>
    </div>
  );
}
