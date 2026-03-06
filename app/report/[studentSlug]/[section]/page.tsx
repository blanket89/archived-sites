// app/report/[studentSlug]/[section]/page.tsx
//
// Dynamic route that handles all four report sections for any student.
// URL shape: /report/hartwell-grade6/example-problems
//
// To add a new student: duplicate /content/reports/hartwell-grade6,
// update config.ts, add their password to .env.local, done.

import { notFound } from "next/navigation";
import Script from "next/script";
import ReportLayout from "@/components/report/ReportLayout";
import ExampleProblemsContent from "@/components/report/sections/ExampleProblemsContent";
import GapAnalysisContent from "@/components/report/sections/GapAnalysisContent";
import MasteryBlueprintContent from "@/components/report/sections/MasteryBlueprintContent";
import PedagogyGuideContent from "@/components/report/sections/PedagogyGuideContent";

// ── Student registry ─────────────────────────────────────────────────────────
// Add each new student here by importing their config.
import { student as hartwell, sections as hartwellSections } from "@/content/reports/hartwell-grade6/config";

const STUDENTS = [
  { config: hartwell, sections: hartwellSections },
];

const SECTION_META: Record<string, { title: string; tag: string }> = {
  "gap-analysis":      { title: "Gap Analysis Report",     tag: "Diagnostic" },
  "mastery-blueprint": { title: "4-Week Mastery Blueprint", tag: "Plan"       },
  "example-problems":  { title: "Example Problem Sets",     tag: "Practice"   },
  "pedagogy-guide":    { title: "Parent Pedagogy Guide",    tag: "Guide"      },
};

// ── Auth check ───────────────────────────────────────────────────────────────
// Password check happens in middleware.ts (see middleware-example/).
// By the time this page renders, the request is already authenticated.

interface PageProps {
  params: Promise<{ studentSlug: string; section: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { studentSlug, section } = await params;

  const studentEntry = STUDENTS.find((s) => s.config.slug === studentSlug);
  if (!studentEntry) notFound();

  const meta = SECTION_META[section];
  if (!meta) notFound();

  const { config } = studentEntry;

  return (
    <>
      {/* KaTeX loaded from CDN — no npm install needed */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
        strategy="beforeInteractive"
      />

      <ReportLayout
        studentName={config.fullName}
        grade={config.grade}
        course={config.course}
        reportDate={config.reportDate}
        sectionTitle={meta.title}
        sectionTag={meta.tag}
      >
        {section === "example-problems"  && <ExampleProblemsContent  student={config} />}
        {section === "gap-analysis"      && <GapAnalysisContent      student={config} />}
        {section === "mastery-blueprint" && <MasteryBlueprintContent student={config} />}
        {section === "pedagogy-guide"    && <PedagogyGuideContent    student={config} />}
      </ReportLayout>
    </>
  );
}

// Static params — tells Next.js which URLs to pre-render.
// Add entries here as you add students.
export async function generateStaticParams() {
  const params = [];
  for (const { config, sections } of STUDENTS) {
    for (const slug of Object.values(sections)) {
      params.push({ studentSlug: config.slug, section: slug });
    }
  }
  return params;
}
