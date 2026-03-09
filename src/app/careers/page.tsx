import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Users,
  Flame,
  Clock,
  Star,
  BookOpen,
  ChevronDown,
  Mail,
} from "lucide-react";
import { CareersJobCard } from "@/components/careers-job-card";

const STATS = [
  { value: "2024", label: "שנת הקמה" },
  { value: "AI-First", label: "גישה טכנולוגית" },
  { value: "גלובלי", label: "שוק יעד" },
  { value: "היברידי", label: "מודל עבודה" },
];

const CULTURE_CARDS = [
  {
    icon: Cpu,
    title: "בחזית הטכנולוגיה",
    description:
      "עבודה עם מודלי AI מתקדמים בתחום הבנת וידאו — טכנולוגיה שמשנה את השוק.",
  },
  {
    icon: Users,
    title: "צוות קטן, השפעה גדולה",
    description:
      "כל אחד כאן משפיע ישירות על המוצר, הארכיטקטורה וכיוון הפיתוח. בלי בירוקרטיה.",
  },
  {
    icon: Flame,
    title: "אתגרים אמיתיים",
    description:
      "משימות שאין להן פתרון מוכן — מהנדסים שיוצרים דברים שעדיין לא קיימים.",
  },
  {
    icon: Clock,
    title: "סביבת עבודה גמישה",
    description:
      "פורמט היברידי, לוח זמנים חופשי ואמון מלא. מה שחשוב זה התוצאה, לא הזמן במשרד.",
  },
  {
    icon: Star,
    title: "תרבות של מצוינות",
    description:
      "סטנדרטים גבוהים, code review מעמיק ושאיפה משותפת ליצור מוצר ברמה עולמית.",
  },
  {
    icon: BookOpen,
    title: "למידה מתמדת",
    description:
      "תקציב אישי ללמידה, כנסים והזדמנות לפתח מומחיות ייחודית בתחום ה-AI.",
  },
];

interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  emailSubject: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

const JOB_POSITIONS: JobPosition[] = [
  {
    title: "מהנדס/ת תוכנה",
    department: "פיתוח",
    location: "תל אביב / היברידי",
    type: "משרה מלאה",
    emailSubject: "מועמדות: מהנדס/ת תוכנה",
    description:
      "אנחנו מחפשים מהנדס/ת תוכנה שיבנו את התשתית שמאפשרת לסוכן ה-AI שלנו לנתח וידאו בזמן אמת, לנהל שיחות בשפה טבעית ולהפעיל אוטומציות חכמות — בקנה מידה של אלפי מצלמות בו-זמנית.",
    responsibilities: [
      "פיתוח ותחזוקה של מערכות Backend בעלות ביצועים גבוהים לעיבוד וידאו בזמן אמת",
      "בניית Pipeline לניתוח וידאו על בסיס מודלי שפה ומודלי ראייה ממוחשבת (VLM)",
      "עבודה עם WebSocket, Streaming ו-Event-Driven Architecture",
      "אופטימיזציה של ביצועים, Latency ו-Throughput של מערכות קריטיות",
      "אינטגרציה עם מערכות מצלמות (RTSP, ONVIF) ופרוטוקולי וידאו",
      "כתיבת קוד נקי, מתועד וניתן לבדיקה עם כיסוי מלא של טסטים",
    ],
    requirements: [
      "3+ שנות ניסיון בפיתוח Backend — Python, Node.js או Go",
      "ניסיון בעבודה עם מערכות Distributed ו-Real-Time",
      "ידע מעמיק ב-Docker, Kubernetes ו-Cloud Infrastructure",
      "ניסיון בעבודה עם בסיסי נתונים (PostgreSQL, Redis, TimescaleDB)",
      "הבנה טובה של ארכיטקטורת מערכות ו-System Design",
      "יכולת עבודה עצמאית, קבלת החלטות ומוטיבציה גבוהה",
    ],
    niceToHave: [
      "ניסיון עם Computer Vision או עיבוד וידאו",
      "היכרות עם LLM APIs ו-Prompt Engineering",
      "ניסיון עם FFmpeg, GStreamer או פרוטוקולי Streaming",
      "תרומה לפרויקטי Open Source",
    ],
  },
  {
    title: "Ghost Expert",
    department: "צמיחה",
    location: "תל אביב / מרחוק",
    type: "משרה מלאה",
    emailSubject: "מועמדות: Ghost Expert",
    description:
      "אנחנו מחפשים Ghost Expert שיוביל את הגיוס, הקליטה והתמיכה השוטפת של מפיצים ושגרירי מותג של Ghost — הן בישראל והן בעולם. תהיו הגשר בין המוצר שלנו לרשת השותפים הגדלה שמביאה את Ghost לעולם.",
    responsibilities: [
      "גיוס, קליטה וטיפוח רשת גלובלית של מפיצים ושגרירי Ghost",
      "בניית ותחזוקת קשרים חזקים עם שותפים בשווקים ותרבויות שונות",
      "פיתוח חומרי הדרכה, playbooks וכלי מכירות עבור רשת השותפים",
      "שיתוף פעולה עם צוותי מוצר ושיווק ליישור מסרי השותפים עם אסטרטגיית המותג",
      "מעקב אחר מדדי ביצועים של שותפים ואופטימיזציה של משפך ההפצה",
      "ייצוג Ghost באירועים מקצועיים, תערוכות ופגישות שותפים ברחבי העולם",
    ],
    requirements: [
      "3+ שנות ניסיון בניהול שותפים, מכירות ערוץ או פיתוח עסקי",
      "כישורי תקשורת יוצאי דופן באנגלית ובעברית (שפות נוספות — יתרון משמעותי)",
      "ניסיון בבניית והרחבת רשתות שותפים/מפיצים",
      "הבנה מעמיקה של מחזורי מכירות B2B SaaS ואסטרטגיות ערוצים",
      "עצמאיות ויכולת עבודה באופן בלתי תלוי באזורי זמן שונים",
      "תשוקה לטכנולוגיה ו-AI — במיוחד בתחומי הביטחון וניתוח וידאו",
    ],
    niceToHave: [
      "רקע בתעשיית הביטחון / מעקב",
      "ניסיון עם פלטפורמות CRM וניהול שותפים (HubSpot, PartnerStack וכו׳)",
      "רשת קיימת של אינטגרטורים, מתקינים או אנשי אבטחה",
      "ניסיון בעבודה בסביבת סטארטאפ",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      {/* Navbar */}
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/#msg1" className="hover:text-neutral-950 transition-colors">ניווט</Link>
            <Link href="/#msg2" className="hover:text-neutral-950 transition-colors">שיחה</Link>
            <Link href="/#msg3" className="hover:text-neutral-950 transition-colors">בדיקות</Link>
            <Link href="/#msg4" className="hover:text-neutral-950 transition-colors">התראות</Link>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">הסיפור שלנו</Link>
            <Link href="/careers" className="hover:text-neutral-950 transition-colors">קריירה</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/partners/login">
              <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-9 px-4 text-xs">
                כניסה למפיצים
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
                קבע הדגמה
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="bg-neutral-950 text-white relative overflow-hidden">
          <div className="dot-grid-dark absolute inset-0 opacity-40 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 lg:pt-36 lg:pb-28 text-center relative">
            <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-700 rounded-full px-4 py-1.5 mb-10">
              קריירה ב-Ghost
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              בונים את העתיד
              <br />
              <span className="text-neutral-500">של הבנת וידאו.</span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Ghost הופכת מצלמות אבטחה לסוכני AI שמבינים מה קורה ומגיבים בזמן
              אמת. אנחנו מחפשים אנשים יוצאי דופן שרוצים ליצור טכנולוגיה שמשנה
              את חוקי המשחק.
            </p>
            <div className="flex gap-3 justify-center">
              <a href="#positions">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-12 px-7 text-sm font-bold">
                  משרות פתוחות
                  <ChevronDown className="mr-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-12 px-7 text-sm"
                >
                  תוכנית שותפים
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CULTURE ── */}
        <section className="bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                תרבות
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                למה Ghost?
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                לא סתם עוד סטארטאפ. צוות קטן עם שאיפות גדולות, טכנולוגיה
                פורצת דרך ותרבות של מצוינות.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CULTURE_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="border border-neutral-200 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-5">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{card.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section id="positions" className="border-t border-neutral-100">
          <div className="max-w-4xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                משרות פתוחות
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                הצטרפו לצוות
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                {JOB_POSITIONS.length} משרות פתוחות. מצאתם מתאימה? שלחו קו&rdquo;ח
                ונחזור אליכם תוך 48 שעות.
              </p>
            </div>

            <div className="space-y-4">
              {JOB_POSITIONS.map((job, i) => (
                <CareersJobCard key={i} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-[1.1]">
              לא מצאתם משרה מתאימה?
            </h2>
            <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
              אנחנו תמיד מחפשים אנשים מוכשרים. שלחו לנו קורות חיים ונישאר
              בקשר.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:careers@ghost-ai.com?subject=General%20Application">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
                  שליחת קורות חיים
                  <Mail className="mr-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm"
                >
                  לעמוד הראשי
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/ICON_GHOST.jpg"
              alt="Ghost"
              width={20}
              height={20}
              className="rounded-sm grayscale opacity-40"
            />
            <span className="text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase">
              Ghost
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            &copy; 2026 Ghost AI. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
}
