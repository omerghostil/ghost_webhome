# Ghost — Design System & Guidelines

## מקור אמת יחיד לעיצוב

> מסמך זה מגדיר את **כל** שפת העיצוב של Ghost.
> כל ממשק, מצגת, פרינט ומדיה דיגיטלית חייבים לעמוד בהנחיות אלו.

---

## 1. סקירה כללית

| שדה | ערך |
|---|---|
| **שם מותג** | Ghost \| Camera Intelligence |
| **סטאק טכנולוגי** | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (new-york), Framer Motion |
| **סגנון shadcn** | `new-york`, בסיס `neutral`, CSS Variables מופעל |
| **כיוון ברירת מחדל** | RTL (עברית) עם תמיכה ב-LTR |
| **ספריית אייקונים** | Lucide React |

### פילוסופיית עיצוב

Ghost מאמץ שפה **מינימליסטית-מבצעית**: ניקיון קיצוני, מונוכרומטיות (שחור/לבן/אפור), טיפוגרפיה ברורה, ומרחב לבן נדיב. האווירה היא **צבאית-חכמה** — מדויקת, תכליתית, ללא עיצוב מיותר. כל אלמנט משרת מטרה.

### טון חזותי

- **אווירה**: מינימליסטי, מקצועי, מבצעי
- **צפיפות**: מרווח לבן נדיב, סקשנים מרווחים
- **סימטריה**: רשת מסודרת עם מרכוז, כיוון RTL ברירת מחדל
- **ניגודיות**: סקשנים לבנים מתחלפים עם סקשנים כהים (neutral-950)
- **מצב כהה**: אין Dark Mode גלובלי — סקשנים כהים מופיעים כנגדיות מכוונת

---

## 2. פלטת צבעים

### 2.1 צבעי מותג ראשיים (Primary)

| שם | CSS Variable | OKLCH | HEX | RGB | שימוש |
|---|---|---|---|---|---|
| **Primary** | `--primary` | `oklch(0.145 0 0)` | `#0A0A0A` | `10, 10, 10` | כפתורים ראשיים, טקסט ראשי, רקע כהה |
| **Primary Foreground** | `--primary-foreground` | `oklch(1 0 0)` | `#FFFFFF` | `255, 255, 255` | טקסט על רקע ראשי |

### 2.2 צבעים משניים (Secondary)

| שם | CSS Variable | OKLCH | HEX | RGB | שימוש |
|---|---|---|---|---|---|
| **Secondary** | `--secondary` | `oklch(0.97 0 0)` | `#F5F5F5` | `245, 245, 245` | רקע כפתורים משניים, רקע חלופי |
| **Secondary Foreground** | `--secondary-foreground` | `oklch(0.205 0 0)` | `#171717` | `23, 23, 23` | טקסט על רקע משני |

### 2.3 צבעי הדגשה (Accent)

| שם | CSS Variable | OKLCH | HEX | RGB | שימוש |
|---|---|---|---|---|---|
| **Accent** | `--accent` | `oklch(0.97 0 0)` | `#F5F5F5` | `245, 245, 245` | מצב hover, רקע אינטראקטיבי |
| **Accent Foreground** | `--accent-foreground` | `oklch(0.205 0 0)` | `#171717` | `23, 23, 23` | טקסט על accent |

### 2.4 צבעי רקע (Backgrounds)

| שם | HEX | שימוש |
|---|---|---|
| `bg-white` | `#FFFFFF` | רקע ראשי של דפים וכרטיסים |
| `bg-neutral-50` / `bg-neutral-50/50` | `#FAFAFA` | רקע סקשנים חלופיים |
| `bg-neutral-100` | `#F5F5F5` | רקע אלמנטים פנימיים, tags |
| `bg-neutral-900` | `#171717` | סקשנים כהים |
| `bg-neutral-950` | `#0A0A0A` | סקשנים כהים (CTA, product), מודלים, צ'אט |
| `bg-black` | `#000000` | וידאו, overlay |

### 2.5 צבעי טקסט

| רמה | מחלקת Tailwind | HEX | שימוש |
|---|---|---|---|
| **ראשי** | `text-neutral-950` | `#0A0A0A` | כותרות, טקסט גוף ראשי |
| **משני** | `text-neutral-700` | `#404040` | ניווט מובייל, טקסט משני |
| **תיאור** | `text-neutral-500` | `#737373` | תיאורים, פסקאות משנה |
| **מושתק (Muted)** | `text-neutral-400` | `#A3A3A3` | badges, מטא-דאטה, תגיות |
| **חיוור** | `text-neutral-300` | `#D4D4D4` | timestamps, footer, breadcrumbs |
| **לבן** | `text-white` | `#FFFFFF` | טקסט על רקע כהה |
| **לבן על כהה (משני)** | `text-neutral-400` | `#A3A3A3` | תיאורים בסקשנים כהים |
| **לבן על כהה (מושתק)** | `text-neutral-500` | `#737373` | badges בסקשנים כהים |

### 2.6 צבעי מצב (Status)

| מצב | מחלקת Tailwind | HEX | שימוש |
|---|---|---|---|
| **הצלחה** | `text-emerald-400` | `#34D399` | "ONLINE", סטטוס פעיל |
| **שגיאה / סכנה** | `text-red-500` / `text-red-400/80` | `#EF4444` | שגיאת מצלמה, Live indicator |
| **אזהרה** | `text-amber-500/80` | `#F59E0B` | הגבלת הודעות |
| **Destructive** | `--destructive` | `oklch(0.577 0.245 27.325)` ≈ `#DC2626` | פעולות הרסניות |

### 2.7 צבעי גבולות וקווים

| מחלקת Tailwind | HEX | שימוש |
|---|---|---|
| `border-neutral-100` | `#F5F5F5` | מפרידים בין סקשנים, borders פנימיים |
| `border-neutral-200` | `#E5E5E5` | כרטיסים, שדות קלט, borders ראשיים |
| `border-neutral-300` | `#D4D4D4` | כפתורי outline |
| `border-neutral-700` | `#404040` | borders בסקשנים כהים |
| `border-neutral-800` | `#262626` | borders בממשק כהה (צ'אט, מודלים) |

### 2.8 שקיפות (Opacity)

| דפוס | שימוש |
|---|---|
| `bg-white/80` | Navbar (עם backdrop-blur) |
| `bg-white/95` | ניווט תחתון מובייל |
| `bg-black/60` | Overlay מודלים |
| `bg-black/50` | Backdrop של drawer |
| `bg-black/70` | Overlay אישור יציאה |
| `bg-black/80` | Overlay הגבלת הודעות |
| `bg-white/10` | רקע אייקונים על כהה |
| `opacity-40` | dot-grid רקע, לוגו footer |

### 2.9 Dot Grid (טקסטורת רקע)

```css
/* רקע בהיר */
.dot-grid {
  background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px);
  background-size: 32px 32px;
}

/* רקע כהה */
.dot-grid-dark {
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### 2.10 CSS Variables — מוכן להטמעה

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.145 0 0);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.90 0 0);
  --input: oklch(0.90 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
```

---

## 3. טיפוגרפיה

### 3.1 משפחות פונטים

| פונט | משקלים | כיוון | CSS Variable | מקור |
|---|---|---|---|---|
| **Miriam Libre** | 400 (Regular), 700 (Bold) | RTL (עברית) | `--font-miriam-libre` | Google Fonts via `next/font` |
| **Rubik** | 400, 500, 700 | LTR (אנגלית) | `--font-rubik` | Google Fonts via `next/font` |
| **Fira Code** | 300–700 | Monospace (טרמינל) | — | Google Fonts (ייבוא ישיר) |
| **System Mono** | — | קוד, timestamps | `--font-mono` | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace` |

### החלפת פונט לפי כיוון

```css
html[dir="ltr"] { --font-sans: var(--font-rubik); }
html[dir="rtl"] { --font-sans: var(--font-miriam-libre); }
```

### 3.2 סולם טיפוגרפי

| רמה | Tailwind Classes | גודל | משקל | Line Height | Letter Spacing | שימוש |
|---|---|---|---|---|---|---|
| **Display** | `text-4xl md:text-5xl` | 36px / 48px | 700 (bold) | `leading-[1.1]` | `tracking-tight` | CTA גדול |
| **H1** | `text-4xl lg:text-6xl` | 36px / 60px | 700 (bold) | `leading-[1.08]` | `tracking-tight` | כותרת Hero |
| **H2** | `text-3xl lg:text-4xl` | 30px / 36px | 700 (bold) | default | `tracking-tight` | כותרות סקשנים |
| **H3** | `text-lg` | 18px | 700 (bold) | default | — | כותרות כרטיסים, שמות צוות |
| **H3 Small** | `text-sm` | 14px | 700 (bold) | default | — | כותרות רכיבים פנימיים |
| **Body Large** | `text-lg` | 18px | 400 | `leading-relaxed` | — | פסקאות Hero, CTA |
| **Body** | `text-sm` | 14px | 400 | `leading-relaxed` | — | טקסט גוף, ביוגרפיות |
| **Body Small** | `text-xs` | 12px | 400 | `leading-relaxed` | — | הודעות צ'אט, תיאורים |
| **Caption** | `text-[10px]` | 10px | 700 (bold) | — | `tracking-[0.2em]` | Badges, labels, קטגוריות |
| **Micro** | `text-[9px]` | 9px | 400 | — | — | Timestamps |

### 3.3 סגנונות טקסט מיוחדים

| סגנון | Classes | דוגמה |
|---|---|---|
| **Badge / Label** | `text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold` | קטגוריות סקשנים |
| **Badge עם גבול** | Badge + `border border-neutral-200 rounded-full px-3 py-1` | "Ghost הוא שכבה חדשה" |
| **קישורי ניווט** | `text-sm text-neutral-500 hover:text-neutral-950 transition-colors` | Navbar links |
| **Monospace** | `font-mono text-[10px]` | תזמון, ערכים טכניים |
| **Highlight (muted)** | `text-neutral-400` (בתוך H1/H2) | שורה שנייה בכותרות |

### 3.4 הירארכיית טקסט — דפוס חוזר

```
[badge - 10px uppercase tracking-wide]
[H2 - 30-36px bold tracking-tight]
[H2 line 2 - same size, text-neutral-400]
[body - 14-18px text-neutral-500 leading-relaxed]
```

---

## 4. מערכת ריווח

### 4.1 יחידת בסיס

יחידת הבסיס: **4px** (Tailwind default: `1 = 4px`)

### 4.2 סולם ריווחים

| Token | ערך | שימוש נפוץ |
|---|---|---|
| `gap-1` | 4px | רווח בין נקודות typing indicator |
| `gap-1.5` | 6px | רווח בין אייקון לטקסט קטן |
| `gap-2` | 8px | רווח בין כפתורים, אלמנטים צמודים |
| `gap-2.5` | 10px | רווח בין הודעות צ'אט |
| `gap-3` | 12px | רווח בין כפתורי CTA, כרטיסי grid |
| `gap-4` | 16px | רווח בין שורות בסקשנים |
| `gap-6` | 24px | רווח פנימי בכרטיסים, רווח בין עמודות grid |
| `gap-8` | 32px | ניווט desktop |
| `gap-10` | 40px | רווח בין תוכן לייאאוט |
| `gap-16` | 64px | רווח בין עמודות grid גדולות |

### 4.3 Padding / Margin דפוסים חוזרים

| דפוס | ערכים | שימוש |
|---|---|---|
| **Section Padding** | `py-24 lg:py-32` (96px / 128px) | ריווח אנכי בין סקשנים |
| **Container Padding** | `px-6` (24px) | ריווח אופקי קבוע |
| **Card Padding** | `p-6` (24px) | padding פנימי בכרטיסים |
| **Card Inner** | `p-3.5` / `p-4` (14px / 16px) | padding באלמנטים פנימיים |
| **Button Padding** | `px-4 py-2` עד `px-7 py-3` | לפי גודל הכפתור |
| **Input Padding** | `px-3 py-1.5` עד `px-4 py-3` | שדות קלט |
| **Badge Padding** | `px-3 py-1` | תגיות, labels |
| **Navbar Height** | `h-14 sm:h-16` | 56px / 64px |

---

## 5. רשת ולייאאוט

### 5.1 Container

```
max-w-6xl mx-auto px-6
```

| Token | ערך |
|---|---|
| `max-w-6xl` | `1152px` |
| `max-w-4xl` | `896px` (CTA sections) |
| `max-w-3xl` | `768px` (צוות) |
| `max-w-2xl` | `672px` (טקסט מרכזי) |
| `max-w-xl` | `576px` (טקסט מוגבל) |
| `max-w-sm` | `384px` (מודלים) |

### 5.2 Grid

| דפוס | Classes | שימוש |
|---|---|---|
| **2 עמודות** | `grid lg:grid-cols-2 gap-16` | סקשנים ראשיים (תוכן + ויזואל) |
| **2 עמודות צוות** | `grid md:grid-cols-2 gap-6` | כרטיסי צוות |
| **3 עמודות** | `grid lg:grid-cols-3 gap-4` | כרטיסי פיצ'רים |
| **5 עמודות** | `grid sm:grid-cols-2 lg:grid-cols-5 gap-3` | כרטיסי use-cases |
| **צ'אט Mockup** | `flex` sidebar `w-52` + chat `flex-1` | ממשק צ'אט |
| **מודל צ'אט** | `flex flex-col lg:flex-row` video `lg:w-[55%]` + chat `lg:w-[45%]` | TryGhost modal |

### 5.3 Breakpoints רספונסיביים

| Breakpoint | ערך | שימוש |
|---|---|---|
| **Mobile (default)** | `< 640px` | עמודה אחת, font-size: 16px לשדות |
| **sm** | `≥ 640px` | כפתורים נוספים, grid 2-col |
| **md** | `≥ 768px` | ניווט desktop, הסתרת mobile nav |
| **lg** | `≥ 1024px` | grid layouts מלאים, font-sizes מוגדלים |

---

## 6. רכיבי UI

### 6.1 כפתורים (Buttons)

#### Primary Button

```
bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-12 px-7 text-sm font-bold
```

| מאפיין | ערך |
|---|---|
| רקע | `#0A0A0A` (neutral-950) |
| טקסט | `#FFFFFF` (white) |
| Hover | `bg-neutral-800` (`#262626`) |
| Active | `scale-[0.97]` |
| Border Radius | `rounded-full` (9999px) |
| גובה | `h-12` (48px) — CTA, `h-9` (36px) — navbar |
| Font | `text-sm font-bold` (14px, 700) |

#### Outline Button

```
border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-12 px-7 text-sm
```

| מאפיין | ערך |
|---|---|
| גבול | `border-neutral-300` (`#D4D4D4`) |
| טקסט | `text-neutral-600` (`#525252`) |
| Hover | `bg-neutral-50` |
| Border Radius | `rounded-full` |

#### CTA Inverted (על רקע כהה)

```
bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold
```

#### Ghost Button (Navbar Hamburger)

```
w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all
```

#### Disabled State

```
disabled:pointer-events-none disabled:opacity-50
```

#### כל הגדלים (shadcn Button)

| Size | Height | Padding |
|---|---|---|
| `xs` | `h-6` (24px) | `px-2` |
| `sm` | `h-8` (32px) | `px-3` |
| `default` | `h-9` (36px) | `px-4` |
| `lg` | `h-10` (40px) | `px-6` |
| `icon` | `size-9` (36px) | — |
| `icon-xs` | `size-6` (24px) | — |
| `icon-sm` | `size-8` (32px) | — |
| `icon-lg` | `size-10` (40px) | — |

### 6.2 שדות קלט (Inputs)

#### Light Mode Input

```
bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs
```

#### Dark Mode Input (צ'אט)

```
bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-sm text-white placeholder:text-neutral-600
```

#### Focus State

```
focus:border-neutral-500 transition-colors outline-none
```

### 6.3 כרטיסים (Cards)

#### Standard Card

```
border border-neutral-200 rounded-2xl p-6 bg-white
```

| מאפיין | ערך |
|---|---|
| גבול | `1px solid #E5E5E5` |
| Border Radius | `rounded-2xl` (16px) |
| Padding | `24px` |
| רקע | `white` |
| Hover | `hover:border-neutral-300 transition-colors` |

#### shadcn Card

```
flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm
```

#### Use Case Card

```
border border-neutral-200 rounded-xl p-5 bg-white hover:border-neutral-300 transition-colors
```

#### Team Card

```
group border border-neutral-200 rounded-2xl overflow-hidden bg-white
```

עם תמונה:
```
aspect-[4/5] grayscale brightness-[0.75]
group-hover:scale-[1.04] group-hover:brightness-100
transition-all duration-700 ease-out
```

#### Dark Card (Product Section)

```
rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 lg:p-7
```

#### Inner Dark Card

```
rounded-2xl border border-neutral-800 bg-neutral-950 p-4
```

### 6.4 ניווט (Navbar)

```
border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50
```

| מאפיין | ערך |
|---|---|
| רקע | `white/80` + `backdrop-blur-md` |
| גבול תחתון | `1px solid neutral-100` |
| מיקום | `sticky top-0 z-50` |
| גובה | `h-14` (mobile) / `h-16` (sm+) |
| Container | `max-w-6xl mx-auto px-4 sm:px-6` |
| לוגו | `rounded-lg` 34x34 / sm: 38x38 |
| קישורים | `text-sm text-neutral-500 hover:text-neutral-950` |
| רווח קישורים | `gap-8` |

### 6.5 Mobile Drawer

```
fixed inset-0 z-[100]
backdrop: bg-black/50 backdrop-blur-sm
panel: w-[280px] max-w-[85vw] bg-white shadow-2xl
animation: slide-in-right 0.25s ease-out (RTL)
```

#### Mobile Nav Link

```
px-5 py-3.5 text-sm text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors
```

#### Section Header (בתוך drawer)

```
px-5 py-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold
```

### 6.6 Mobile Bottom Nav

```
bg-white/95 backdrop-blur-lg border-t border-neutral-100 fixed bottom-0 inset-x-0 z-50
```

### 6.7 Chat Mockup (Browser Frame)

#### Browser Chrome

```
bg-neutral-50 border-b border-neutral-200 px-4 py-2.5
dots: w-2.5 h-2.5 rounded-full bg-neutral-300
url-bar: bg-white rounded-md px-3 py-1 text-[11px] text-neutral-400 font-mono border border-neutral-100
```

#### Chat Messages

| סוג | סגנון |
|---|---|
| **הודעת משתמש** | `bg-neutral-50 border border-neutral-100 rounded-xl rounded-tr-none px-3.5 py-2.5` |
| **הודעת Ghost** | `bg-neutral-950 text-white rounded-xl rounded-tr-none px-3.5 py-2.5` |
| **Typing Indicator** | 3x `w-1.5 h-1.5 rounded-full animate-bounce` עם delay מדורג |
| **User Avatar** | `w-6 h-6 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-400` |
| **Ghost Avatar** | `w-6 h-6 rounded-full bg-neutral-950` + ghost-icon.png |

### 6.8 Badges & Tags

#### Section Badge

```
inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1
```

#### Badge with Icon

```
inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1
```

#### Advisor Tag

```
text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full px-4 py-2
```

#### Alert Channel Tag

```
text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-1
```

#### Dark Badge

```
text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1
```

#### Action Badge

```
bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1
```

### 6.9 Modals / Dialogs

#### Overlay

```
fixed inset-0 z-[110] flex items-center justify-center
backdrop: bg-black/60 backdrop-blur-md
```

#### Modal Container

```
bg-neutral-950 sm:rounded-2xl overflow-hidden
w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[95vh]
shadow-2xl sm:border border-neutral-800
```

#### Confirmation Dialog

```
bg-neutral-950 border border-neutral-800 rounded-2xl p-6 max-w-sm
text-center
```

#### Dialog Buttons

```
/* Primary */
bg-white text-neutral-950 font-bold text-sm py-3 rounded-xl hover:bg-neutral-200

/* Secondary */
bg-neutral-800 text-neutral-400 font-bold text-sm py-3 rounded-xl hover:bg-neutral-700
```

### 6.10 Floating Action Button (FAB)

```
fixed bottom-6 left-6 z-40
bg-neutral-950 text-white font-bold text-sm rounded-full pl-5 pr-6 py-3.5
shadow-2xl shadow-neutral-950/30
hover:bg-neutral-800 hover:scale-[1.03] active:scale-[0.97]
transition-all
```

#### Ping Animation (על FAB)

```
absolute w-9 h-9 rounded-full bg-white/10 animate-ping
```

### 6.11 Live Indicator

```
flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1
dot: w-2 h-2 rounded-full bg-red-500 animate-pulse
text: text-[10px] font-bold text-white tracking-wider uppercase
```

### 6.12 Footer

```
border-t border-neutral-200 py-8 pb-24 md:pb-8
container: max-w-6xl mx-auto px-6
logo: rounded-sm grayscale opacity-40 (20x20)
brand: text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase
rights: text-xs text-neutral-300
```

### 6.13 Section Dividers

```
/* קו דק */
border-t border-neutral-100

/* רקע חלופי */
bg-neutral-50/50

/* סקשן כהה */
bg-neutral-900 text-white
bg-neutral-950 text-white
```

---

## 7. אייקונוגרפיה

### 7.1 ספרייה

**Lucide React** — כפי שמוגדר ב-`components.json`

### 7.2 סגנון

| מאפיין | ערך |
|---|---|
| סוג | Outline (stroke-based) |
| Stroke Width | 1.5 (רכיבי feature) / 2 (ברירת מחדל) |
| גודל ברירת מחדל | `w-4 h-4` (16px) |
| גודל קטן | `w-3 h-3` / `w-3.5 h-3.5` (12-14px) |
| גודל בינוני | `w-5 h-5` (20px) |
| גודל גדול | `w-8 h-8` (32px) — loading states |
| צבע | `text-neutral-400` (בהיר), `text-neutral-500` / `text-neutral-700` |

### 7.3 אייקונים בשימוש

| אייקון | שימוש |
|---|---|
| `Menu` | Hamburger menu (mobile) |
| `X` | סגירת drawer/modal |
| `Camera` | ניווט מצלמות, צ'אט |
| `Send` | שליחת הודעה |
| `ArrowLeft` | CTA כיוון (RTL) |
| `Check` | רשימות יכולות, יועצים |
| `Bell` | ניטור רציף |
| `Calendar` | בדיקות מתוזמנות |
| `Radio` | טריגרים חכמים |
| `MessageSquare` | ערוץ הודעות |
| `Users` | צוות |
| `Download` | הורדת PDF |
| `Lock` | מגבלת הודעות |
| `Video` | מצלמה loading |
| `RefreshCw` | ניסיון חוזר |
| `ChevronDown` / `ChevronLeft` | ניווט עץ מצלמות |

---

## 8. תמונות ומדיה

### 8.1 סגנון צילום

| מאפיין | ערך |
|---|---|
| פילטר ברירת מחדל | `grayscale` + `brightness-[0.75]` |
| Hover | שחרור ל-full color + `brightness-100` + `scale-[1.04]` |
| מעבר | `transition-all duration-700 ease-out` |
| יחס תמונה (צוות) | `aspect-[4/5]` |
| Object Fit | `object-cover` |
| Object Position | מותאם אישית (`center 45%`, `center 22%`) |

### 8.2 לוגו

| הקשר | גודל | סגנון |
|---|---|---|
| Navbar | 34x34 / sm: 38x38 | `rounded-lg` |
| צ'אט header | 28x28 | `rounded-md` |
| צ'אט הודעה | 20x20 | `rounded-md` |
| Footer | 20x20 | `rounded-sm grayscale opacity-40` |
| צ'אט avatar | 24x24 | `rounded-full` |

---

## 9. אנימציות ומעברים

### 9.1 CSS Keyframes

| שם | Duration | Easing | שימוש |
|---|---|---|---|
| `blink` | 1.2s | `step-end` | קורסור הקלדה |
| `pulse-slow` | 2s | `ease-in-out` | נקודת Live, מצב מחובר |
| `fade-in-up` | 0.5s | `ease-out` | הופעת אלמנטים |
| `fade-in` | 0.6s | `ease-out` | backdrop, אלמנטים |
| `terminal-boot` | 1.2s | `ease-out` | אפקט הפעלה |
| `slide-in-right` | 0.25s | `ease-out` | mobile drawer (RTL) |
| `slide-in-left` | 0.25s | `ease-out` | mobile drawer (LTR) |
| `bounce` | Tailwind default | — | typing indicator |
| `ping` | Tailwind default | — | FAB pulse |

### 9.2 Framer Motion — דפוסים

#### Fade In Up (סטנדרטי)

```typescript
initial: { opacity: 0, y: 24 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, amount: 0.3 }
transition: { duration: 0.55, ease: "easeOut" }
```

#### Staggered Children

```typescript
transition: {
  duration: 0.55,
  ease: "easeOut",
  delay: 0.2 + index * 0.12
}
```

#### Scale In

```typescript
initial: { opacity: 0, scale: 0.98 }
whileInView: { opacity: 1, scale: 1 }
transition: { duration: 0.6, ease: "easeOut", delay: 0.08 }
```

#### Slide In X

```typescript
initial: { opacity: 0, x: 16 }
whileInView: { opacity: 1, x: 0 }
transition: { duration: 0.45, ease: "easeOut", delay: index * 0.08 }
```

#### Infinite Pulse (טקסט)

```typescript
animate: { opacity: [0.45, 1, 0.45] }
transition: { duration: 2.4, repeat: Infinity, delay: index * 0.35 }
```

#### Infinite Border Color

```typescript
animate: { borderColor: ["#404040", "#ffffff", "#404040"] }
transition: { duration: 2.2, repeat: Infinity, delay: index * 0.25 }
```

#### Progress Line

```typescript
animate: { scaleX: [0, 1] }
transition: { duration: 1.25, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8 }
```

### 9.3 Transitions — CSS

| דפוס | Classes |
|---|---|
| **צבע** | `transition-colors` |
| **כללי** | `transition-all` |
| **Mobile Tap** | `transition: transform 100ms ease-out` + `active: scale(0.97)` |
| **תמונות צוות** | `transition-all duration-700 ease-out` |

### 9.4 Hover Effects

| אלמנט | אפקט |
|---|---|
| **כפתור Primary** | `hover:bg-neutral-800` |
| **כפתור Outline** | `hover:bg-neutral-50` |
| **קישורי ניווט** | `hover:text-neutral-950` |
| **כרטיסים** | `hover:border-neutral-300` |
| **תמונות צוות** | `group-hover:scale-[1.04] group-hover:brightness-100` |
| **FAB** | `hover:bg-neutral-800 hover:scale-[1.03]` |
| **Mobile Tap** | `active:scale-[0.97]` / `active:scale-95` |

### 9.5 Scroll Animations

כל אנימציות Framer Motion מפעילות `viewport: { once: true }` — כלומר, מונפשות פעם אחת בלבד כשהאלמנט נכנס ל-viewport.

---

## 10. אפקטים חזותיים

### 10.1 צללים (Shadows)

| שם | ערך | שימוש |
|---|---|---|
| **shadow-sm** | Tailwind default | כרטיסי shadcn |
| **shadow-2xl** | Tailwind default | מודלים, drawer, FAB |
| **Custom Hero** | `0 20px 60px rgba(0,0,0,0.08)` | Chat mockup בהירו |
| **FAB Shadow** | `shadow-2xl shadow-neutral-950/30` | כפתור צף |

### 10.2 Border Radius

| Token | ערך מחושב (radius = 0.625rem) | שימוש |
|---|---|---|
| `rounded-sm` | `0.375rem` (6px) | אלמנטים קטנים |
| `rounded-md` | `0.5rem` (8px) | כפתורים, אייקונים |
| `rounded-lg` | `0.625rem` (10px) | לוגו, כפתורים |
| `rounded-xl` | `1.025rem` (16.4px) | כרטיסים פנימיים, inputs |
| `rounded-2xl` | `1.625rem` (26px) | כרטיסים, מודלים |
| `rounded-3xl` | `2.225rem` (35.6px) | כרטיס Product |
| `rounded-full` | `9999px` | כפתורים, badges, avatars |

### 10.3 Blur / Backdrop

| אפקט | שימוש |
|---|---|
| `backdrop-blur-md` | Navbar |
| `backdrop-blur-lg` | Mobile bottom nav |
| `backdrop-blur-sm` | Overlay drawer, confirmation |
| `backdrop-blur-[3px]` | Overlay ספציפי |

---

## 11. Do's & Don'ts

### Do's — מותר ומומלץ

- **כן** — להשתמש במונוכרום (neutral scale) כצבע בסיס יחיד
- **כן** — `rounded-full` לכל כפתורי CTA
- **כן** — `tracking-tight` בכל כותרת H1/H2
- **כן** — `text-[10px] uppercase tracking-[0.2em] font-bold` לכל badge/label
- **כן** — סקשנים מתחלפים: לבן → neutral-50/50 → לבן → neutral-950
- **כן** — `max-w-6xl mx-auto px-6` כ-container קבוע
- **כן** — `leading-relaxed` בכל פסקת תוכן
- **כן** — `transition-colors` על כל hover state
- **כן** — `active:scale-[0.97]` על כל כפתור במובייל
- **כן** — `border-neutral-100` כמפריד סקשנים
- **כן** — grayscale + low brightness כברירת מחדל לתמונות צוות
- **כן** — Framer Motion עם `once: true` ל-scroll animations

### Don'ts — אסור

- **לא** — להשתמש בצבעים מחוץ לסקאלת neutral (למעט status colors)
- **לא** — להוסיף gradient צבעוני (רק dot-grid ו-radial-gradient מונוכרום)
- **לא** — להשתמש ב-Dark Mode גלובלי (הנגדיות היא per-section)
- **לא** — `rounded-none` או `rounded-sm` על כרטיסים (מינימום `rounded-xl`)
- **לא** — טקסט גוף מעל 18px (למעט כותרות)
- **לא** — כפתורים עם `rounded-md` (כפתורי CTA תמיד `rounded-full`)
- **לא** — box-shadow כבד על כרטיסים רגילים (מקסימום `shadow-sm`)
- **לא** — אנימציות שנמשכות מעל 0.7s (למעט infinite loops)
- **לא** — לערבב פונטים — Miriam Libre ל-RTL, Rubik ל-LTR, אין שלישי
- **לא** — להשתמש באייקונים מספרייה שאינה Lucide
- **לא** — border עבה מ-1px (למעט focus ring)
- **לא** — להוסיף emojis לממשק

---

## 12. דוגמאות יישום

### 12.1 Section Layout — בהיר

```tsx
<section className="border-t border-neutral-100 bg-neutral-50/50">
  <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
    <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
      Badge Text
    </div>
    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
      כותרת סקשן
    </h2>
    <p className="text-neutral-500 leading-relaxed mb-10 max-w-2xl">
      תיאור הסקשן כאן.
    </p>
    {/* תוכן */}
  </div>
</section>
```

### 12.2 Section Layout — כהה

```tsx
<section className="bg-neutral-950 text-white">
  <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
    <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1 mb-6">
      Badge Text
    </div>
    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
      כותרת סקשן
    </h2>
    <p className="text-neutral-400 leading-relaxed mb-8 max-w-xl">
      תיאור הסקשן כאן.
    </p>
  </div>
</section>
```

### 12.3 Feature Card

```tsx
<div className="border border-neutral-200 rounded-2xl p-6 bg-white">
  <Bell className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
  <h3 className="font-bold text-sm mb-3">כותרת הפיצ'ר</h3>
  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed">
    תוכן פנימי כאן
  </div>
</div>
```

### 12.4 CTA Section

```tsx
<section className="border-t border-neutral-200 bg-neutral-950 text-white">
  <div className="max-w-4xl mx-auto px-6 py-28 text-center">
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
      שורה ראשונה
      <br />
      <span className="text-neutral-500">שורה מודגשת-מושתקת</span>
    </h2>
    <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
      תיאור ה-CTA
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
        Primary CTA
      </Button>
      <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm">
        Secondary CTA
      </Button>
    </div>
  </div>
</section>
```

### 12.5 Team Card

```tsx
<div className="group border border-neutral-200 rounded-2xl overflow-hidden bg-white">
  <div className="aspect-[4/5] relative bg-neutral-200 overflow-hidden">
    <Image
      src={imageSrc}
      alt={name}
      fill
      className="object-cover grayscale scale-100 brightness-[0.75] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100"
    />
  </div>
  <div className="p-6">
    <h3 className="text-lg font-bold mb-1">{name}</h3>
    <p className="text-sm text-neutral-400 font-bold mb-3">{role}</p>
    <p className="text-sm text-neutral-500 leading-relaxed">{bio}</p>
  </div>
</div>
```

---

## 13. Tailwind Theme Tokens

### @theme inline (globals.css)

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-miriam-libre);
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}
```

### shadcn/ui Configuration (components.json)

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## 14. תמיכה ב-PWA ומובייל

### Safe Area

```css
@supports (padding: env(safe-area-inset-bottom)) {
  .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
  .safe-top { padding-top: env(safe-area-inset-top); }
}
```

### Standalone Mode

```css
@media (display-mode: standalone) {
  body {
    -webkit-user-select: none;
    user-select: none;
    overscroll-behavior: none;
  }
  body p, body span, body h1, body h2, body h3, body input, body textarea {
    -webkit-user-select: text;
    user-select: text;
  }
}
```

### Mobile Input Fix

```css
@media (max-width: 767px) {
  input, textarea, select { font-size: 16px; }
}
```

### Mobile Tap

```css
.mobile-tap {
  transition: transform 100ms ease-out;
}
.mobile-tap:active {
  transform: scale(0.97);
}
```

### Viewport Meta

```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};
```

---

## 15. Print Styles

```css
.print-only { display: none; }

@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  body {
    background: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

## 16. כללי יישום (Implementation Rules)

1. **התאמה מוחלטת** — כל רכיב חייב להתאים 1:1 למסמך זה
2. **עקביות** — אם רכיב דומה קיים במסמך, יש להשתמש בו ולא ליצור חדש
3. **הרחבה ברוח** — רכיב חדש שאינו מכוסה יעוצב ברוח הקיים ויתועד כאן
4. **אין חריגות** — סטייה מהקו העיצובי רק באישור מפורש
5. **כל פלט** — קוד, מוקאפ או הנחיה — עובר דרך הפילטר של מסמך זה
6. **Utility Function** — תמיד להשתמש ב-`cn()` מ-`@/lib/utils` למיזוג מחלקות

---

*מסמך זה מהווה את מקור האמת היחיד לעיצוב Ghost.*
*עדכון אחרון: מרץ 2026*
