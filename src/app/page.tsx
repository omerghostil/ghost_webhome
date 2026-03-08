import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatMockup } from "@/components/chat-mockup";
import { SearchDemoSection } from "@/components/search-demo-section";
import { EvolutionTimeline } from "@/components/evolution-timeline";
import { GhostTimeline } from "@/components/ghost-timeline";
import { GhostOnboardingDemo } from "@/components/ghost-onboarding-demo";
import {
  MessageSquare,
  Radio,
  Bell,
  Calendar,
  ArrowLeft,
  Users,
  Smartphone,
  Mail,
  Phone,
  Volume2,
  Check,
} from "lucide-react";

const REALTIME_QUERIES = [
  "האם מול ארון החשמל הראשי מונח סולם פתוח או עגלת ציוד שחוסמים גישה?",
  "האם על רצפת אזור ההעמסה נראית שלולית נוזל ליד משטח עץ עם קרטונים?",
  "האם השער ההיקפי סגור ונעול בשרשרת מסביב לשני צדי השער לפי הנוהל?",
  "האם באזור היציע נראה עשן או חפץ בוער נראה לעין?",
  "האם אחת מדלתות יציאת החירום חסומה על ידי עגלת שינוע ועליה ארגזים?",
];

const ALERT_CHANNELS = [
  { name: "אפליקציית Ghost", icon: Smartphone },
  { name: "WhatsApp", icon: MessageSquare },
  { name: "אימייל", icon: Mail },
  { name: "שיחה טלפונית", icon: Phone },
  { name: "אזעקה במתחם", icon: Volume2 },
];

const USE_CASES = [
  { title: "קמעונאות", desc: "בדיקת סדר מדפים, איתור פריטים זרים על הרצפה, מניעת מפגעי בטיחות בשטח המכירה." },
  { title: "מסעדות ואירועים", desc: "אכיפת ניקיון מטבח, בקרת סגירה לילית, בדיקת מפגעי החלקה ותקינות ציוד." },
  { title: "בתי חולים ומוסדות", desc: "יציאות חירום פנויות, מניעת חסימת מסדרונות, גילוי מפגעי בטיחות." },
  { title: "רשויות מקומיות", desc: "בדיקת תקינות גדרות, איתור נזק ויזואלי במרחב הציבורי, אכיפת סדר." },
  { title: "תעשייה ולוגיסטיקה", desc: "בקרת נהלי בטיחות, גילוי מפגעי גישה, בדיקת נעילת שערים ותקינות ציוד." },
];

const TEAM_MEMBERS = [
  {
    name: "יבגני וישנבסקי",
    role: "שותף ויו״ר דירקטוריון",
    bio: "יזם ואיש טכנולוגיה בעל ניסיון רב בהקמת חברות ופיתוח מערכות מתקדמות.",
    image: "/eivgeni_portrait.jpeg",
    imagePosition: "center 45%",
  },
  {
    name: "עומר אלפסי",
    role: "שותף מייסד ומנכ״ל Ghost Israel",
    bio: "יזם וטכנולוג אשר מוביל את חזון החברה לפיתוח מערכות בינה מלאכותית מתקדמות לניתוח וידאו בזמן אמת ולהפיכת מערכות מצלמות מורכבות לנגישות ופשוטות לשימוש.",
    image: "/omer_portrait.png",
    imagePosition: "center 22%",
  },
];

const AI_CAPABILITIES = [
  "להבין מה מתרחש בווידאו בזמן אמת",
  "לענות על שאלות על אירועים שהתרחשו בעבר",
  "לבצע חיפוש חכם בווידאו",
  "להגדיר התראות מותאמות אישית",
  "לבצע בדיקות מתוזמנות וסריקות",
  "לפעול על בסיס טריגרים חכמים או לוחות זמנים",
];

const ADVISORS = [
  "חברי כנסת",
  "קצינים בכירים בצה״ל ובמשטרה",
  "ראשי שב״כ ומשרד החוץ לשעבר",
  "בוגרי יחידות טכנולוגיות מובחרות",
  'מנכ"לים של חברות מובילות בישראל',
  "יועצים אסטרטגיים בכירים",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      {/* Navbar */}
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <a href="#msg1" className="hover:text-neutral-950 transition-colors">ניווט</a>
            <a href="#msg2" className="hover:text-neutral-950 transition-colors">שיחה</a>
            <a href="#msg3" className="hover:text-neutral-950 transition-colors">בדיקות</a>
            <a href="#msg4" className="hover:text-neutral-950 transition-colors">התראות</a>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">הסיפור שלנו</Link>
          </div>
          <Link href="/demo">
            <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
              קבע הדגמה
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden">
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                Natural Language Camera Interface
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                דברו עם המצלמות.
                <br />
                <span className="text-neutral-400">בשפה טבעית.</span>
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10">
                Ghost הוא שכבת הפעלה חדשה למצלמות ארגוניות. תארו במילים מה חשוב לכם לבדוק, לאכוף או להתריע עליו — Ghost יעשה את השאר. בלי רשימת יכולות סגורה מראש. בלי אימון מודלים. בלי להחליף ציוד.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/demo">
                  <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-12 px-7 text-sm font-bold">
                    הדגמה חינם
                    <ArrowLeft className="mr-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-12 px-7 text-sm">
                  איך זה עובד
                </Button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <ChatMockup />
            </div>
          </div>
        </section>

        {/* ── ONBOARDING DEMO ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <GhostOnboardingDemo />
          </div>
        </section>

        {/* ── GHOST TIMELINE ── */}
        <section className="bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <GhostTimeline />
          </div>
        </section>

        {/* ── MESSAGE 2: History Search (Dark Animated) ── */}
        <SearchDemoSection />

        {/* ── MESSAGE 3: Real-time checks ── */}
        <section id="msg3" className="bg-neutral-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">03</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                  תארו במילים מה לבדוק.
                  <br />
                  <span className="text-neutral-500">Ghost יענה תוך שניות.</span>
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  שלחו הודעה לכל מצלמה או קבוצת מצלמות ותארו את מה שחשוב לכם לבדוק — בטיחות, סדר, תחזוקה, אבטחה. Ghost מנתח את הסצנה הנוכחית ומחזיר תשובה מיידית עם צילום רלוונטי. בלי רשימת זיהויים סגורה. בלי חוקים קשיחים.
                </p>
              </div>
              <div className="space-y-2.5">
                {REALTIME_QUERIES.map((q, i) => (
                  <div key={i} className="flex items-center gap-3 border border-neutral-700 rounded-xl px-4 py-3 bg-neutral-800/50 hover:border-neutral-600 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow flex-shrink-0" />
                    <p className="text-xs text-neutral-300">&ldquo;{q}&rdquo;</p>
                    <span className="text-[10px] text-neutral-600 mr-auto whitespace-nowrap">LIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MESSAGE 4: Tasks, Checks & Alerts ── */}
        <section id="msg4" className="border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">04</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                משימות, בדיקות והתראות
                <br />
                <span className="text-neutral-400">בשפה טבעית.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                הגדירו בדיקות קבועות, בדיקות לפי טריגר, משימות מותאמות אישית וניטור רציף — הכל במילים. Ghost לא דורש אימון מודלים לכל צורך חדש. המשתמש מגדיר, Ghost מבצע.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Continuous monitoring */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Bell className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">ניטור רציף</h3>
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed mb-4">
                  &ldquo;בדוק רציף אם נראים עשן, אש גלויה או חפץ בוער במתחם. בכל זיהוי — התראה קריטית מיידית.&rdquo;
                </div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2.5">ערוצי התראה:</p>
                <div className="flex flex-wrap gap-2">
                  {ALERT_CHANNELS.map((ch, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-1">
                      <ch.icon className="w-3 h-3" />
                      {ch.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduled check */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Calendar className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">בדיקה מתוזמנת</h3>
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed">
                  &ldquo;בכל יום בשעה 21:00 בדוק האם במטבח כל דלתות המקררים סגורות, אין ציוד חם נראה דולק, השיש פנוי ממפגעים והרצפה נקייה ממפגעי החלקה.&rdquo;
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-400">
                  <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">כל יום</div>
                  <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">21:00</div>
                  <div className="bg-neutral-100 rounded-md px-2 py-1">חוזר</div>
                </div>
              </div>

              {/* Smart trigger */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Radio className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">בדיקה לפי טריגר</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">טריגר</div>
                    <span className="text-xs text-neutral-500">דלת ארון חשמל ראשי נפתחת</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200 mr-4" />
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">בדיקה</div>
                    <span className="text-xs text-neutral-500">לבוש לפי #מדי_עבודה_חשמלאי_מורשה</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200 mr-4" />
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">פעולה</div>
                    <span className="text-xs text-neutral-500">התראה אם לא עומד בנוהל</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES — Part 4: No fixed capability list ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-4">אין רשימת יכולות סגורה</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">הגבול הוא הצרכים שלכם.</h2>
            <p className="text-neutral-500 leading-relaxed mb-10 max-w-2xl">
              Ghost לא מוגבל לקטלוג ישן של זיהויים. הארגון מגדיר במילים מה חשוב לו — לפי הנהלים, הצרכים המבצעיים והדמיון של מי שמגדיר את הבדיקות. הנה כמה סביבות שכבר עובדות עם Ghost:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {USE_CASES.map((uc, i) => (
                <div key={i} className="border border-neutral-200 rounded-xl p-5 bg-white hover:border-neutral-300 transition-colors">
                  <h3 className="font-bold text-sm mb-1.5">{uc.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVOLUTION TIMELINE ── */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <EvolutionTimeline />
          </div>
        </section>

        {/* ── PRODUCT ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1 mb-6">
                המוצר
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                תקשורת ישירה עם המצלמות.
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-12">
                Ghost היא מערכת המאפשרת לתקשר עם מערך המצלמות שלך באמצעות ממשק צ׳אט. במקום מערכות מורכבות ותפריטים מסובכים, המשתמש פשוט מדבר עם המצלמות שלו.
              </p>

              <div className="text-right max-w-lg mx-auto mb-12">
                <p className="text-sm font-bold text-neutral-300 mb-4">סוכן הבינה המלאכותית מסוגל</p>
                <div className="space-y-3">
                  {AI_CAPABILITIES.map((cap, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-400">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-neutral-400 leading-relaxed mb-2">
                כל זאת באמצעות שפה טבעית וללא צורך בהכשרה.
              </p>
              <p className="text-white font-bold text-lg">
                התוצאה היא מערכת שמאפשרת לנהל מערכי מצלמות מורכבים בפשטות חסרת תקדים.
              </p>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                <Users className="w-3 h-3" />
                <span>הנהלת החברה</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                הצוות שמוביל את Ghost.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="group border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                  {member.image ? (
                    <div className="aspect-[4/5] relative bg-neutral-200 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectPosition: member.imagePosition ?? "center" }}
                        className="object-cover grayscale scale-100 brightness-[0.75] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] bg-neutral-200" />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-neutral-400 font-bold mb-3">{member.role}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADVISORS ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                יועצים ושותפים אסטרטגיים
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                הידע שמאחורי Ghost.
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                לאורך דרכה גייסה Ghost צוות יועצים מבכירי המשק הישראלי, העסקי והממשלתי.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {ADVISORS.map((advisor, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full px-4 py-2">
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                  {advisor}
                </div>
              ))}
            </div>

            <p className="text-center text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              הידע והניסיון של צוות היועצים מסייעים לחברה לפתח פתרונות מתקדמים העונים על אתגרים אמיתיים בתחומי הביטחון, התפעול והניהול של מערכות וידאו בקנה מידה גדול.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-neutral-200 bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              אנחנו לא יודעים מראש
              <br />
              מה תרצו לבדוק.
              <br />
              <span className="text-neutral-500">וזה בדיוק העניין.</span>
            </h2>
            <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
              Ghost מאפשר למערכת להסתגל למה שחשוב לכם — בשפה טבעית. הדגמה אישית של 15 דקות, ותראו את התוצאות מיד.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
                  הדגמה חינם
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:hello@ghost-ai.com">
                <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm">
                  צרו קשר
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/ghost-icon.png" alt="Ghost" width={20} height={20} className="rounded-sm grayscale opacity-40" />
            <span className="text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase">Ghost</span>
          </div>
          <p className="text-xs text-neutral-300">&copy; 2026 Ghost AI. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
