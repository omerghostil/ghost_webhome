"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { StepBadge, ConfirmButton } from "@/components/ghost-demo-shared";

const NOTIFICATION_CHANNELS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "אימייל" },
  { id: "push", label: "Ghost App" },
];

export function AlertsPanel({
  cameraView,
  onComplete,
}: {
  cameraView: string;
  onComplete: (data: { trigger: string; channels: string[] }) => void;
}) {
  const [trigger, setTrigger] = useState("");
  const [channels, setChannels] = useState<string[]>([]);

  const toggleChannel = (id: string) => {
    setChannels((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const isValid = trigger.trim().length > 0 && channels.length > 0;

  return (
    <div className="animate-fade-in-up space-y-4">
      <StepBadge current={1} total={2} label="התראה מיידית" />

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">על מה להתריע?</p>
        <div className="flex items-center gap-2 flex-wrap text-[15px] leading-loose" dir="rtl">
          <span className="text-neutral-700 font-medium">״כשתראה</span>
          <input
            type="text"
            value={trigger}
            onChange={(e) => { if (e.target.value.length <= 25) setTrigger(e.target.value); }}
            placeholder="עשן / אדם חשוד / ..."
            className="border-b-2 border-neutral-950 bg-transparent text-neutral-950 font-bold text-center outline-none px-2 py-0.5 min-w-[130px] max-w-[200px] placeholder:text-neutral-300 placeholder:font-normal"
            dir="rtl"
          />
          <span className="text-neutral-700 font-medium">— תתריע מיד.״</span>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">לאן לשלוח?</p>
        <div className="grid grid-cols-2 gap-2">
          {NOTIFICATION_CHANNELS.map((ch) => {
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
        label="הפעל התראה"
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

  const isValid = schedule.trim().length > 0 && action.trim().length > 0;

  return (
    <div className="animate-fade-in-up space-y-4">
      <StepBadge current={2} total={2} label="בדיקה מתוזמנת" />

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-neutral-400" />
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">מתי?</p>
        </div>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="כל שעה / כל יום ב-08:00 / כל 10 דקות..."
          className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2.5 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
          dir="rtl"
        />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">מה לבדוק?</p>
        <textarea
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder={`למשל: "הרצפה נקייה?" / "הדלת נעולה?" / "יש מפגע בטיחותי?"`}
          className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2.5 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300 resize-none h-16"
          dir="rtl"
        />
      </div>

      <ConfirmButton
        label="הפעל בדיקה"
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
  const channelNames = (rules.alert?.channels ?? []).map((c) =>
    NOTIFICATION_CHANNELS.find((ch) => ch.id === c)?.label ?? c,
  );

  return (
    <div className="animate-fade-in-up space-y-3">
      <div className="bg-white border-2 border-neutral-950 rounded-xl p-5">
        <p className="text-sm font-bold text-neutral-950 mb-4">Ghost פעיל על המצלמה שצופה על {location}:</p>

        <div className="space-y-3 text-sm">
          {rules.alert && (
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">❶</span>
              <div>
                <p className="font-bold text-neutral-950">התראה מיידית</p>
                <p className="text-neutral-500">כשנראה <span className="font-bold text-neutral-700">{rules.alert.trigger}</span> → {channelNames.join(", ")}</p>
              </div>
            </div>
          )}

          {rules.task && (
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">❷</span>
              <div>
                <p className="font-bold text-neutral-950">בדיקה מתוזמנת</p>
                <p className="text-neutral-500">{rules.task.schedule} → {rules.task.action}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-neutral-100 text-center">
          <p className="text-sm font-bold text-neutral-950">Ghost עובד. 🎯</p>
          <p className="text-xs text-neutral-400 mt-1">הכל פעיל — מודיעין מהשטח בזמן אמת.</p>
        </div>
      </div>
    </div>
  );
}
