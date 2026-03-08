"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Download, CheckCircle2, Camera, X, Upload, ImageIcon } from "lucide-react";

interface CameraField {
  name: string;
  watchesOn: string;
  imageFile?: File | null;
  imagePreviewUrl?: string | null;
}

interface CameraRec {
  name: string;
  recommendations: string[];
}

const SECTORS = ["פרטי", "עסקי", "ציבורי", "ממשלתי"];

const FOCUS_OPTIONS = [
  "אבטחה",
  "בטחון",
  "אכיפה",
  "סדר ונקיון",
  "מקרי חירום",
  "אכיפת נהלי עבודה",
] as const;

const MAX_ADDITION_ROUNDS = 2;
const MAX_RECOMMENDATIONS_PER_ROUND = 4;

const STEPS = [
  { id: "contact", label: "פרטי קשר" },
  { id: "cameras", label: "מצלמות" },
  { id: "loading", label: "ניתוח" },
  { id: "results", label: "המלצות" },
];

export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [orgType, setOrgType] = useState("");
  const [cameras, setCameras] = useState<CameraField[]>([{ name: "", watchesOn: "" }]);
  const [results, setResults] = useState<CameraRec[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [additionRoundsLeft, setAdditionRoundsLeft] = useState(MAX_ADDITION_ROUNDS);
  const [addMoreOpen, setAddMoreOpen] = useState(false);
  const [addMoreFocus, setAddMoreFocus] = useState<string>(FOCUS_OPTIONS[0]);
  const [addMoreCustom, setAddMoreCustom] = useState("");
  const [addMoreLoading, setAddMoreLoading] = useState(false);
  const [addMoreError, setAddMoreError] = useState<string | null>(null);
  const [analyzingImageIndex, setAnalyzingImageIndex] = useState<number | null>(null);

  const updateCamera = (index: number, field: keyof CameraField, value: string) => {
    setCameras((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const addCamera = () => setCameras((prev) => [...prev, { name: "", watchesOn: "" }]);

  const removeCamera = (index: number) => {
    setCameras((prev) => {
      if (prev.length <= 1) return prev;
      const cam = prev[index];
      if (cam?.imagePreviewUrl) URL.revokeObjectURL(cam.imagePreviewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const setCameraImage = (index: number, file: File | null) => {
    setCameras((prev) => {
      const next = [...prev];
      const cam = next[index];
      if (cam?.imagePreviewUrl) URL.revokeObjectURL(cam.imagePreviewUrl);
      next[index] = { ...cam, imageFile: file ?? undefined, imagePreviewUrl: file ? URL.createObjectURL(file) : undefined };
      return next;
    });
  };

  const handleAnalyzeImage = async (index: number) => {
    const cam = cameras[index];
    const file = cam?.imageFile;
    if (!file) return;
    setAnalyzingImageIndex(index);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/analyze-camera-image", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה בניתוח התמונה");
      updateCamera(index, "watchesOn", data.description ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בניתוח תמונה");
    } finally {
      setAnalyzingImageIndex(null);
    }
  };

  const isStep1Valid = name && email && phone && sector && orgType;
  const isStep2Valid = cameras.every((c) => c.name && c.watchesOn);

  const handleSubmit = async () => {
    setStep(2);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sector, orgType, cameras: cameras.map(({ name, watchesOn }) => ({ name, watchesOn })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה בניתוח");
      setResults(data.cameras);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא צפויה");
      setStep(1);
    }
  };

  const removeRecommendation = (camIndex: number, recIndex: number) => {
    setResults((prev) => {
      if (!prev) return prev;
      return prev.map((cam, i) =>
        i === camIndex
          ? { ...cam, recommendations: cam.recommendations.filter((_, j) => j !== recIndex) }
          : cam
      );
    });
  };

  const handleAddMore = async () => {
    if (!results || additionRoundsLeft <= 0) return;
    const focusText = addMoreFocus === "התאמה אישית" ? addMoreCustom.trim() : addMoreFocus;
    if (!focusText) {
      setAddMoreError("נא לבחור מיקוד או להזין טקסט.");
      return;
    }
    setAddMoreError(null);
    setAddMoreLoading(true);
    try {
      const res = await fetch("/api/analyze-more", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector,
          orgType,
          cameras: cameras.map(({ name, watchesOn }) => ({ name, watchesOn })),
          currentRecommendations: results,
          focus: focusText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה בהוספת המלצות");
      const newCameras: CameraRec[] = data.cameras ?? [];
      setResults((prev) => {
        if (!prev) return prev;
        return prev.map((cam) => {
          const added = newCameras.find((c) => c.name === cam.name);
          const newRecs = added?.recommendations ?? [];
          if (newRecs.length === 0) return cam;
          return { ...cam, recommendations: [...cam.recommendations, ...newRecs] };
        });
      });
      setAdditionRoundsLeft((r) => r - 1);
      setAddMoreOpen(false);
      setAddMoreCustom("");
    } catch (err) {
      setAddMoreError(err instanceof Error ? err.message : "שגיאה לא צפויה");
    } finally {
      setAddMoreLoading(false);
    }
  };

  const inputClass =
    "w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors bg-white";
  const labelClass = "block text-xs font-bold text-neutral-500 mb-1.5";

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      {/* Navbar */}
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 no-print">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/ICON_GHOST.jpg" alt="Ghost" width={28} height={28} className="rounded-md" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Ghost</span>
          </Link>
          <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
            חזרה לעמוד הבית
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-14 no-print">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                i < step ? "bg-neutral-950 text-white" : i === step ? "border-2 border-neutral-950 text-neutral-950" : "border border-neutral-200 text-neutral-300"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? "font-bold" : "text-neutral-400"}`}>{s.label}</span>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-neutral-200" />}
            </div>
          ))}
        </div>

        {/* Step 0: Contact */}
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">קבע הדגמה</h1>
            <p className="text-neutral-500 text-sm mb-8">מלא את הפרטים שלך ונפיק עבורך המלצות שימוש אישיות למצלמות.</p>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>שם מלא</label>
                  <input type="text" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>טלפון</label>
                  <input type="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className={labelClass}>אימייל</label>
                <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>סקטור</label>
                  <select className={inputClass} value={sector} onChange={(e) => setSector(e.target.value)} required>
                    <option value="">בחר סקטור</option>
                    {SECTORS.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>סוג ארגון / עסק</label>
                  <input type="text" className={inputClass} value={orgType} onChange={(e) => setOrgType(e.target.value)} placeholder="לדוגמה: רשת חנויות, מפעל, בית חולים..." required />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-start">
              <Button disabled={!isStep1Valid} onClick={() => setStep(1)} className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-11 px-8 text-sm font-bold disabled:opacity-30">
                המשך למצלמות
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Cameras */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">המצלמות שלך</h1>
            <p className="text-neutral-500 text-sm mb-8">
              הוסף את המצלמות שלך. לכל מצלמה, ציין את שמה ועל מה היא צופה.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">{error}</div>
            )}

            <div className="space-y-4">
              {cameras.map((cam, i) => (
                <div key={i} className="border border-neutral-200 rounded-xl p-5 relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                      <span className="text-xs font-bold text-neutral-400">מצלמה {i + 1}</span>
                    </div>
                    {cameras.length > 1 && (
                      <button onClick={() => removeCamera(i)} className="text-neutral-300 hover:text-neutral-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>שם המצלמה</label>
                      <input type="text" className={inputClass} value={cam.name} onChange={(e) => updateCamera(i, "name", e.target.value)} placeholder="לדוגמה: כניסה ראשית" />
                    </div>
                    <div>
                      <label className={labelClass}>צופה על</label>
                      <input type="text" className={inputClass} value={cam.watchesOn} onChange={(e) => updateCamera(i, "watchesOn", e.target.value)} placeholder="לדוגמה: דלת הכניסה והקופה או העלה תמונה לניתוח" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-100">
                    <label className={labelClass}>אופציונלי: צילום מסך מהפיד</label>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`camera-image-${i}`}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          setCameraImage(i, f ?? null);
                          e.target.value = "";
                        }}
                      />
                      <label htmlFor={`camera-image-${i}`} className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-700 border border-neutral-200 rounded-lg px-3 py-2 transition-colors">
                        <Upload className="w-4 h-4" /> העלה תמונה
                      </label>
                      {cam.imagePreviewUrl && (
                        <>
                          <div className="relative w-16 h-16 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={cam.imagePreviewUrl} alt="תצוגה מקדימה" className="w-full h-full object-cover" />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={analyzingImageIndex !== null}
                            onClick={() => handleAnalyzeImage(i)}
                            className="rounded-full h-8 px-4 text-xs gap-1.5 border-neutral-300"
                          >
                            {analyzingImageIndex === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                            {analyzingImageIndex === i ? "מנתח..." : "נתח תמונה ומלא אוטומטית"}
                          </Button>
                          <button type="button" onClick={() => setCameraImage(i, null)} className="text-neutral-400 hover:text-neutral-600 text-xs p-1" aria-label="הסר תמונה">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addCamera} className="mt-4 flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-neutral-600 transition-colors">
              <Plus className="w-4 h-4" /> הוסף מצלמה
            </button>

            <div className="mt-8 flex items-center gap-3">
              <Button onClick={() => setStep(0)} variant="outline" className="border-neutral-300 text-neutral-600 rounded-full h-11 px-6 text-sm">
                חזרה
              </Button>
              <Button disabled={!isStep2Valid} onClick={handleSubmit} className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-11 px-8 text-sm font-bold disabled:opacity-30">
                שלח וקבל המלצות
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Loading */}
        {step === 2 && (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-6" />
            <h2 className="text-xl font-bold mb-2">Ghost מנתח את המצלמות שלך</h2>
            <p className="text-sm text-neutral-500">מפיק המלצות שימוש אישיות...</p>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print">
              <div>
                <h1 className="text-2xl font-bold mb-1">המלצות שימוש אישיות</h1>
                <p className="text-sm text-neutral-500">{orgType} &middot; {sector} &middot; {results.length} מצלמות</p>
              </div>
              <div className="flex items-center gap-2">
                {additionRoundsLeft > 0 && (
                  <Button onClick={() => setAddMoreOpen(true)} variant="outline" className="border-neutral-300 rounded-full h-10 px-5 text-xs font-bold gap-2">
                    <Plus className="w-4 h-4" /> הוסף המלצות (נותרו {additionRoundsLeft} סבבים)
                  </Button>
                )}
                <Button onClick={() => window.print()} variant="outline" className="border-neutral-300 rounded-full h-10 px-5 text-xs font-bold gap-2">
                  <Download className="w-4 h-4" /> הורד PDF
                </Button>
              </div>
            </div>

            {/* Add-more modal */}
            {addMoreOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 no-print" role="dialog" aria-modal="true">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">הוסף המלצות (עד {MAX_RECOMMENDATIONS_PER_ROUND} בסבב)</h3>
                    <button onClick={() => { setAddMoreOpen(false); setAddMoreError(null); }} className="p-1 text-neutral-400 hover:text-neutral-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">בחר מיקוד להמלצות הנוספות או הזן בעצמך.</p>
                  <div className="space-y-3 mb-4">
                    <label className={labelClass}>מיקוד</label>
                    <select className={inputClass} value={addMoreFocus} onChange={(e) => setAddMoreFocus(e.target.value)}>
                      {FOCUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      <option value="התאמה אישית">התאמה אישית</option>
                    </select>
                    {addMoreFocus === "התאמה אישית" && (
                      <input type="text" className={inputClass} value={addMoreCustom} onChange={(e) => setAddMoreCustom(e.target.value)} placeholder="במה להתמקד בהמלצות הבאות?" />
                    )}
                  </div>
                  {addMoreError && <p className="text-sm text-red-600 mb-3">{addMoreError}</p>}
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => { setAddMoreOpen(false); setAddMoreError(null); }} className="rounded-full text-sm">ביטול</Button>
                    <Button onClick={handleAddMore} disabled={addMoreLoading} className="bg-neutral-950 text-white rounded-full text-sm gap-2">
                      {addMoreLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      הוסף עד {MAX_RECOMMENDATIONS_PER_ROUND} המלצות
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Print header */}
            <div className="print-only mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/ICON_GHOST.jpg" alt="Ghost" width={32} height={32} className="rounded-md" />
                <span className="text-lg font-bold tracking-[0.2em] uppercase">Ghost</span>
              </div>
              <h1 className="text-xl font-bold mb-1">המלצות שימוש אישיות</h1>
              <p className="text-sm text-neutral-500">{name} &middot; {orgType} &middot; {sector} &middot; {results.length} מצלמות</p>
              <div className="border-b border-neutral-200 mt-4" />
            </div>

            <div className="space-y-6">
              {results.map((cam, ci) => (
                <div key={ci} className="border border-neutral-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold">{cam.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {cam.recommendations.map((rec, ri) => (
                      <div key={ri} className="flex items-start gap-2.5 text-sm group">
                        <div className="w-1 h-1 rounded-full bg-neutral-950 mt-2 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed flex-1">{rec}</span>
                        <button type="button" onClick={() => removeRecommendation(ci, ri)} className="opacity-50 hover:opacity-100 p-1 text-neutral-400 hover:text-red-600 transition-all flex-shrink-0 no-print" aria-label="מחק המלצה">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center no-print">
              <p className="text-sm text-neutral-400 mb-4">הפנייה שלך התקבלה. ניצור קשר בהקדם.</p>
              <Link href="/" className="text-xs font-bold text-neutral-500 hover:text-neutral-950 transition-colors">
                חזרה לעמוד הבית
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
