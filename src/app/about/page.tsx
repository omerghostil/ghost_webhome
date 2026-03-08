import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MessageCircle,
  BrainCircuit,
  Check,
  Users,
} from "lucide-react";
import { EvolutionTimeline } from "@/components/evolution-timeline";
import { GhostTimeline } from "@/components/ghost-timeline";
import { GhostOnboardingDemo } from "@/components/ghost-onboarding-demo";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      {/* Navbar */}
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/ICON_GHOST.jpg" alt="Ghost" width={28} height={28} className="rounded-md" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Ghost</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-950 transition-colors">עמוד הבית</Link>
          </div>
          <Link href="/demo">
            <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
              קבע הדגמה
              <ArrowLeft className="mr-2 w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 lg:pt-36 lg:pb-32 text-center">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-700 rounded-full px-4 py-1.5 mb-10">
              <span>אודות Ghost</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              טכנולוגיה ישראלית
              <br />
              שמבינה וידאו.
            </h1>
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Ghost היא חברת טכנולוגיה ישראלית המפתחת מערכות בינה מלאכותית לניתוח והבנה של וידאו בזמן אמת.
            </p>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                  הסיפור שלנו
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                  מנקודת מפנה
                  <br />
                  לחזון ברור.
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-neutral-500 leading-relaxed">
                  החברה נוסדה בתחילת שנת 2023 תחת השם BLCKBX8™, מתוך מטרה לפתח מודלים מתקדמים לזיהוי סיטואציות מורכבות בוידאו באמצעות אלגוריתמיקה מתקדמת וזיהוי מנחים.
                </p>
                <p className="text-neutral-500 leading-relaxed">
                  אירועי ה-7 באוקטובר 2023 בישראל סימנו נקודת מפנה עבור החברה. במהלך מתקפת הטרור, כאשר צוות המייסדים יצא להילחם לצד אלפי אזרחים ישראלים, התחדדה ההבנה לגבי הפוטנציאל העצום של מערכות ניתוח וידאו בזמן אמת — להצלת חיים, למניעת מצבי חירום ולשיפור הביטחון האישי והציבורי.
                </p>
              </div>
            </div>
            <EvolutionTimeline />

            {/* Quote */}
            <div className="mt-20 border-t border-neutral-100 pt-12 text-center">
              <blockquote className="text-xl lg:text-2xl font-bold text-neutral-950 max-w-3xl mx-auto leading-relaxed">
                &ldquo;להפוך מערכות וידאו מורכבות למערכת פשוטה, נגישה וחכמה, שכל אדם יכול להשתמש בה.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── VISION ── */}
        <section className="bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                <span>החזון</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                החזון של Ghost
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                לפתח את מערכת הבנת הוידאו החכמה בעולם, שגם ילדים בני 10 יצליחו להפעיל.
              </p>
            </div>

            {/* How */}
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                איך?
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-0">
              {/* Chat Interface */}
              <div className="border border-neutral-200 rounded-2xl p-8 bg-white">
                <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-6">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">ממשק צ׳אט במקום VMS מורכב</h3>
                <p className="text-neutral-500 leading-relaxed mb-4">
                  במקום מערכת ניהול וידאו מסורתית עם תפריטים מורכבים והכשרות —
                </p>
                <p className="font-bold text-neutral-950">
                  ממשק צ׳אט מוכר לניהול שיחה בשפה חופשית, מול כל מצלמה או קבוצת מצלמות.
                </p>
              </div>

              {/* AI Agent */}
              <div className="border border-neutral-200 rounded-2xl p-8 bg-white">
                <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">סוכן AI שמבין, זוכר ופועל</h3>
                <p className="text-neutral-500 leading-relaxed mb-4">
                  סוכן בינה מלאכותית שמבין את המתרחש בוידאו, זוכר אירועים, ומבצע פעולות בהתאמה אישית — ללא הגבלות.
                </p>
                <p className="font-bold text-neutral-950">
                  עבר &middot; הווה &middot; עתיד — הכל בשליטתך.
                </p>
              </div>
            </div>

            <GhostTimeline />

            <GhostOnboardingDemo />
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
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              מוכן לראות את Ghost בפעולה?
            </h2>
            <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
              הדגמה אישית של 15 דקות — נחבר את Ghost למצלמות שלך ותראה תוצאות מיידיות.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
                  קבע הדגמה חינם
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="https://www.ghost-il.com/careers">
                <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm">
                  הצטרף לצוות
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
            <Image src="/ICON_GHOST.jpg" alt="Ghost" width={20} height={20} className="rounded-sm grayscale opacity-40" />
            <span className="text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase">Ghost</span>
          </div>
          <p className="text-xs text-neutral-300">&copy; 2026 Ghost AI. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
