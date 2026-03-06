# Northbound Report Portal — Integration Guide

## What this is

A set of files you drop into your existing Next.js project to add
password-protected, KaTeX-rendered student report pages at URLs like:

northboundtutoring.com/report/hartwell-grade6/example-problems
northboundtutoring.com/report/hartwell-grade6/gap-analysis
northboundtutoring.com/report/hartwell-grade6/mastery-blueprint
northboundtutoring.com/report/hartwell-grade6/pedagogy-guide

---

## File map — where each file goes in your project

Your Next.js project root
│
├── middleware.ts ← COPY from middleware-example/middleware.ts
│ (must be at root, not inside app/)
├── .env.local ← ADD your passwords (see .env.local.example)
│
├── app/
│ ├── report/
│ │ └── [studentSlug]/
│ │ ├── [section]/
│ │ │ └── page.tsx ← COPY
│ │ └── unlock/
│ │ └── page.tsx ← COPY
│ └── api/
│ └── report/
│ └── unlock/
│ └── route.ts ← COPY
│
├── components/
│ └── report/
│ ├── KaTeX.tsx ← COPY
│ ├── ReportLayout.tsx ← COPY
│ ├── ReportTypography.tsx ← COPY
│ └── sections/
│ ├── ExampleProblemsContent.tsx ← COPY (edit content per student)
│ ├── GapAnalysisContent.tsx ← COPY (edit content per student)
│ ├── MasteryBlueprintContent.tsx← COPY (edit content per student)
│ └── PedagogyGuideContent.tsx ← COPY (edit content per student)
│
└── content/
└── reports/
└── hartwell-grade6/
└── config.ts ← COPY (edit per student)

---

## Setup — first time only (15 minutes)

1. Copy all files above into your project.

2. Copy middleware-example/middleware.ts → middleware.ts at your project root.

3. Create .env.local at your project root and add:
   REPORT_PASSWORD_HARTWELL_GRADE6=nbps

4. Add passwords to Vercel:
   - Go to vercel.com → your project → Settings → Environment Variables
   - Add each REPORT*PASSWORD*\* variable with the same value as .env.local
   - This is how production gets the passwords

5. Run your dev server and visit:
   http://localhost:3000/report/hartwell-grade6/example-problems
   You should be redirected to the unlock page.

6. Enter the password you set in step 3. You should see the report.

---

## Adding a new student (10 minutes per student)

1. Duplicate the folder: content/reports/hartwell-grade6/
   Rename to: content/reports/chen-grade8/ (use lowercase-hyphenated)

2. Edit content/reports/chen-grade8/config.ts
   Update all fields: name, grade, course, slug, passwordEnvKey

3. Add the password to .env.local:
   REPORT_PASSWORD_CHEN_GRADE8=their-password

4. Add the same variable to Vercel environment variables.

5. Duplicate the four section files in components/report/sections/
   Actually — you can reuse the same section components.
   The student-specific content lives in the section files.
   Decide: do you want shared templates (faster) or per-student files (more control)?

   RECOMMENDED AT YOUR SCALE: One set of section files, swapped per student.
   Edit the content directly in the component, deploy, deliver the link, then
   move on to the next student. You're not running concurrent live reports
   for multiple students — you're delivering one at a time.

6. Register the new student in two places:
   - app/report/[studentSlug]/[section]/page.tsx → add to STUDENTS array
   - middleware.ts → add to STUDENT_PASSWORD_KEYS
   - app/api/report/unlock/route.ts → add to STUDENT_PASSWORD_KEYS

7. Deploy to Vercel (push to main). Done.

---

## Writing LaTeX in the report files

KaTeX uses standard LaTeX syntax. Two components are available:

  <KaTeXBlock latex="\frac{3}{4} + \frac{5}{6}" />
  → Renders as a centered display equation with left accent border

  <KaTeXInline latex="\frac{3}{4}" />
  → Renders inline within a sentence

Common patterns you'll use:

Fractions: \frac{numerator}{denominator}
Mixed numbers: 3\frac{1}{4}
Exponents: x^2
Square roots: \sqrt{x}
Multiplication dot: \times
Division: \div
Aligned equations: \begin{align} x &= 3 \\ y &= 4 \end{align}
Text within math: \text{miles per hour}
Spacing in math: \quad (wide) or \, (narrow)

---

## Deploying updates to an existing report

Edit the content in the relevant section file → push to GitHub →
Vercel auto-deploys in ~60 seconds. The parent refreshes their page
and sees the updated content. No manual steps.

---

## Fonts

KaTeX loads its own math fonts from the CDN automatically.
Your body fonts (Cormorant Garamond + Inter) load via your existing
next/font setup in app/layout.tsx — no changes needed there.
The report components reference var(--font-serif) and var(--font-sans)
which your globals.css already defines.

---

## Security notes

- Passwords live only in environment variables, never in code.
- The auth cookie is httpOnly (JS cannot read or steal it).
- Middleware runs at the edge — the report page never renders for
  unauthenticated requests, so content is never in the HTML.
- Student slugs in URLs do not expose sensitive data (last name + grade
  is not personally identifiable in a meaningful way at this scale).
- If you want to invalidate a family's access: change their env var
  in Vercel → redeploy. Their cookie becomes invalid immediately.
