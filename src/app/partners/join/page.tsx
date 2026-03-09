import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Phone,
  GraduationCap,
  BadgeCheck,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Megaphone,
  Handshake,
  Building2,
  Wrench,
  Globe,
  ChevronLeft,
} from "lucide-react";

const PARTNER_TYPES = [
  {
    title: "Ghost Partner — מפיץ",
    icon: Handshake,
    description:
      "החל מסוכן מכירות שזיהה הזדמנות, מתקין מצלמות עצמאי, טכנאי מתח נמוך, אזעקות ואינטרקומים — ועד חברות עם צוותי התקנה.",
    benefits: [
      "מוצר שכל מי ששומע עליו אומר מיד Wow — חסם מכירה כמעט אפסי",
      "כרטיס כניסה לתחום ניתוח הווידאו — אחד התחומים המתפתחים ביותר בהייטק",
      "הכנסה קבועה ומתמשכת מלקוחות שצירפת בעבר",
      "ליווי שיווקי, הכשרות מכירה וחומרים מקצועיים",
    ],
  },
  {
    title: "Ghost Ambassador — שגריר",
    icon: Globe,
    description:
      "שגרירים מייצרים עסקאות בקנה מידה גדול — מול לקוחות ציבוריים, ממשלתיים, ביטחוניים או Enterprise.",
    benefits: [
      "גישה ישירה לצוות Ghost לתמיכה בעסקאות מורכבות",
      "תנאים ייחודיים לעסקאות בהיקף גדול",
      "שותפות אסטרטגית ארוכת טווח עם Ghost",
      "ייצוג Ghost בפורומים, כנסים ומכרזים",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "שיחת הכרות",
    icon: Phone,
    description:
      "שיחה ראשונית להבנה הדדית — מי אתם, מה הרקע שלכם, ומה אתם מחפשים בשותפות עם Ghost.",
  },
  {
    step: "02",
    title: "פגישה מעמיקה",
    icon: Building2,
    description:
      "פגישה פנים אל פנים במשרדי Ghost בעכו או בתל אביב — הכרות מעמיקה יותר, הצגת המוצר והדגמה חיה.",
  },
  {
    step: "03",
    title: "הכשרה וקבלת תעודה",
    icon: GraduationCap,
    description:
      "יום הדרכה מלא הכולל הכשרת מכירות, הכרת המוצר לעומק, וקבלת תעודת מפיץ מורשה מטעם Ghost.",
  },
  {
    step: "04",
    title: "התחלת פעילות",
    icon: TrendingUp,
    description:
      "אתם מתחילים לבנות את ה-Users Bank שלכם — רשימת הלקוחות שצירפתם. כל מנוי שנוסף = הכנסה קבועה לכם.",
  },
];

const ONGOING_SUPPORT = [
  {
    icon: GraduationCap,
    title: "הכשרות מכירות וליווי",
    description: "הדרכות מעשיות שוטפות כדי לשפר ביצועים ולהתעדכן ביכולות חדשות.",
  },
  {
    icon: Megaphone,
    title: "חומרים שיווקיים",
    description: "מצגות, סרטונים, חומרי מכירה ודפי מוצר — מוכנים לשימוש מיידי.",
  },
  {
    icon: BarChart3,
    title: "קמפיינים ממומנים",
    description: "ניהול קמפיינים דיגיטליים ופרסום פוסטים ברשתות חברתיות בשמכם — ללא עלות.*",
  },
  {
    icon: ShieldCheck,
    title: "פורטל מפיצים רשמי",
    description:
      "גישה לפורטל ניהול ייעודי — צפייה, הוספה, עריכה וניהול של רשימת הלקוחות שלכם.",
  },
];

const PORTAL_FEATURES = [
  "צפייה ועדכון ב-Users Bank שלכם בזמן אמת",
  "נתוני תשלום וגבייה של כל לקוח",
  "עמלות שמגיעות לכם ועמלות ששולמו",
  "סטטוס מפורט לכל לקוח — וותק, חוב, נתוני שימוש",
  "הוספת לקוחות חדשים ישירות מהפורטל",
  "דוחות ביצועים אישיים",
];

export default function PartnersJoinPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      {/* Navbar */}
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-950 transition-colors">ראשי</Link>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">הסיפור שלנו</Link>
            <Link href="/partners/login" className="hover:text-neutral-950 transition-colors font-bold text-neutral-950">
              פורטל מפיצים
            </Link>
          </div>
          <Link href="/demo">
            <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
              קבע הדגמה
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          <div className="dot-grid-dark absolute inset-0 opacity-30 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-20 lg:pt-28 lg:pb-24 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1 mb-6">
                Ghost Partner Program
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                הכל עומד להשתנות.
                <br />
                <span className="text-neutral-500">הצטרפו לצד הנכון של השינוי.</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mb-8">
                Ghost הופך מצלמות אבטחה למערכת אינטליגנטית שאפשר לדבר איתה. מנויים חודשיים החל מ-80 ₪ למצלמה. עמלה קבועה ומתמשכת של עד 20% מכל התשלומים של הלקוחות שצירפתם. תמיד.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#process">
                  <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-12 px-7 text-sm font-bold">
                    איך מצטרפים
                    <ArrowLeft className="mr-2 w-4 h-4" />
                  </Button>
                </a>
                <Link href="/partners/login">
                  <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-12 px-7 text-sm">
                    כניסה למפיצים קיימים
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ghost section */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">למה Ghost</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                מוצר שמוכר את עצמו.
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                Ghost הוא לא עוד מוצר אבטחה. כל מי ששומע עליו לראשונה מיד מבין שזה משהו אחר. חסם המכירה כמעט ואינו קיים — כי ההבטחה של Ghost ברורה, מיידית ומשכנעת: לדבר עם המצלמות שלך ולקבל תשובות.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Wrench className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">למתקינים עצמאיים</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  מתקין מצלמות, טכנאי מתח נמוך, אינטרקומים ואזעקות? הציעו ללקוחות שלכם שירות ייחודי בישראל — בקרה והתראות חכמות. אפיק הכנסה פסיבית חדש בלי לשנות דבר בעבודה היומיומית.
                </p>
              </div>
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">לחברות התקנה</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  יש לכם צוותי התקנה ולקוחות קיימים? Ghost יוצר אפיק הכנסה משמעותי ומתמשך בלי להוסיף עבודה. כל לקוח שמתחבר = עמלה חודשית קבועה לכם.
                </p>
              </div>
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">לאנשי מכירות</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  לא מהתחום? לא משנה. Ghost הוא כרטיס הכניסה שלכם לתחום ניתוח הווידאו — אחד התחומים הצומחים ביותר בהייטק. הכנסה קבועה מלקוחות שצירפתם. עיסוק עיקרי או משני.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free version strategy */}
        <section className="bg-neutral-50/50 border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">אסטרטגיית המפיץ</span>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-3 mb-5">
                לא כל לקוח מוכן לשלם מהיום הראשון? בסדר גמור.
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                התקינו ללקוחות שלכם את אפליקציית Ghost בגרסה החינמית. Ghost ידאג להפוך אותם למנויים משלמים — בזמן הקרוב או הרחוק. ברגע שהלקוח עובר למנוי בתשלום, אתם מתחילים לקבל עמלה.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">80₪</p>
                  <p className="text-xs text-neutral-500">לחודש למצלמה — מחיר התחלתי</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">20%</p>
                  <p className="text-xs text-neutral-500">עמלה קבועה מתמשכת מכל תשלום</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">∞</p>
                  <p className="text-xs text-neutral-500">הכנסה פסיבית — כל עוד הלקוח משלם</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">מסלולי שותפות</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                מפיץ או שגריר — מה מתאים לכם?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {PARTNER_TYPES.map((type, i) => (
                <div key={i} className="border border-neutral-200 rounded-2xl p-7 bg-white hover:border-neutral-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                      <type.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold">{type.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5">{type.description}</p>
                  <div className="space-y-2.5">
                    {type.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <ChevronLeft className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-neutral-600 leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">תהליך ההצטרפות</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                ארבעה שלבים להתחלה.
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/50 hover:border-neutral-700 transition-colors h-full">
                    <span className="text-[10px] text-neutral-600 font-mono font-bold">{step.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center my-4">
                      <step.icon className="w-5 h-5 text-neutral-300" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{step.description}</p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-px bg-neutral-800" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ongoing support */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">ליווי שוטף</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                אתם לא לבד. Ghost לצידכם.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ONGOING_SUPPORT.map((item, i) => (
                <div key={i} className="border border-neutral-200 rounded-2xl p-6 bg-white">
                  <item.icon className="w-5 h-5 text-neutral-400 mb-4" />
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-neutral-400 mt-6">
              * ניהול קמפיינים ופרסום ברשתות חברתיות כפוף לתנאים ולהיקף הפעילות.
            </p>
          </div>
        </section>

        {/* Portal features */}
        <section className="bg-neutral-50/50 border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">פורטל מפיצים</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                  שקיפות מלאה.
                  <br />
                  <span className="text-neutral-400">מהרגע הראשון.</span>
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  קבלו גישה לפורטל מפיצים רשמי המאפשר לכם לצפות, להוסיף, לערוך ולנהל את רשימת ה-Users Bank שלכם. שקיפות והוגנות — מהרגע הראשון ועד שנים ארוכות קדימה.
                </p>
                <div className="space-y-3">
                  {PORTAL_FEATURES.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-200 rounded-2xl bg-white p-8 min-h-[320px] flex items-center justify-center">
                <div className="text-center text-neutral-400">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-neutral-300" />
                  </div>
                  <p className="text-sm font-bold text-neutral-500 mb-1">IMAGE PROMPT</p>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                    צילום מסך של פורטל מפיצים מודרני בסגנון מונוכרום שחור-לבן, עם טבלת לקוחות, גרפים של עמלות, וסטטוס תשלומים. ממשק דאשבורד נקי בעברית עם רקע לבן ואלמנטים בשחור-אפור.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ghost difference */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">מה הופך את Ghost לשונה</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-8">
                Ghost הוא לא עוד מערכת אבטחה.
                <br />
                <span className="text-neutral-500">Ghost משנה את הכללים.</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-right max-w-2xl mx-auto mb-10">
                <div className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50">
                  <p className="font-bold text-sm mb-2">שיחה במקום חיפוש</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    במקום לגלול שעות של וידאו — פשוט שואלים. Ghost עונה תוך שניות.
                  </p>
                </div>
                <div className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50">
                  <p className="font-bold text-sm mb-2">בלי רשימת יכולות סגורה</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Ghost לא מוגבל ל-50 סוגי זיהוי. הוא מבין כל דבר שאפשר לתאר במילים.
                  </p>
                </div>
                <div className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50">
                  <p className="font-bold text-sm mb-2">בלי אימון מודלים</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    אין צורך ב-labeling, דוגמאות או tuning. המשתמש פשוט כותב בשפה חופשית.
                  </p>
                </div>
                <div className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50">
                  <p className="font-bold text-sm mb-2">3CLICKS — כל מצלמה ב-3 קליקים</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    גם בארגון עם אלפי מצלמות — מגיעים לכל מצלמה ב-3 לחיצות. כמו WhatsApp.
                  </p>
                </div>
              </div>

              <div className="border border-neutral-800 rounded-2xl p-8 bg-neutral-900/30 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="border border-neutral-200 rounded-xl overflow-hidden">
                    <Image
                      src="/blackicon_whitebg.png"
                      alt="Ghost"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <p className="text-lg font-bold mb-3">
                  &ldquo;אנחנו לא יודעים מראש מה תרצו לבדוק.
                  <br />
                  <span className="text-neutral-500">וזה בדיוק העניין.&rdquo;</span>
                </p>
                <p className="text-xs text-neutral-600">
                  Ghost מאפשר לכל משתמש להגדיר מה חשוב לו — ברגע שהוא חושב על זה. בלי לחכות לפיתוח, בלי לאמן מודל, בלי מגבלות.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-[1.1]">
              הכל עומד להשתנות.
              <br />
              <span className="text-neutral-400">תהיו חלק מזה.</span>
            </h2>
            <p className="text-neutral-500 text-lg mt-6 mb-10 max-w-xl mx-auto leading-relaxed">
              הצטרפו לרשת המפיצים של Ghost. שיחת הכרות ראשונה — בלי התחייבות.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:partners@ghost-ai.com">
                <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-13 px-8 text-sm font-bold">
                  צרו קשר להצטרפות
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/partners/login">
                <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-13 px-8 text-sm">
                  כניסה למפיצים קיימים
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
            <Image src="/ghost-icon.png" alt="Ghost" width={20} height={20} className="rounded-sm grayscale opacity-40" />
            <span className="text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase">Ghost</span>
          </div>
          <p className="text-xs text-neutral-300">&copy; 2026 Ghost AI. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
