// components/report/sections/GapAnalysisContent.tsx
// Replace all content between comments for each student.

"use client";

import { KaTeXInline } from "@/components/report/KaTeX";
import {
  Body,
  Callout,
  GapRow,
  Label,
  Rule,
  SectionHeading,
} from "@/components/report/ReportTypography";

interface Props {
  student: { firstName: string; grade: string; course: string };
}

export default function GapAnalysisContent({ student }: Props) {
  return (
    <div>
      <Body>
        This analysis is based on {student.firstName}&rsquo;s diagnostic
        assessment completed in {student.course}. Skills are evaluated
        across a two-grade band — one level below and one above current
        placement — to surface both foundational gaps and readiness for
        acceleration.
      </Body>

      {/* ── Skill map ──────────────────────────────────────────────── */}
      <SectionHeading>Skill Assessment Map</SectionHeading>

      <Label>Grade 5 skills (foundational)</Label>

      {/* REPLACE: edit status and priority per student */}
      <GapRow skill="Operations with fractions (unlike denominators)" status="gap"      priority="high"   />
      <GapRow skill="Integer operations — multiplication and division"  status="gap"      priority="high"   />
      <GapRow skill="Place value and decimal operations"                status="mastered" priority="low"    />
      <GapRow skill="Coordinate plane — plotting and reading points"    status="partial"  priority="medium" />

      <div style={{ marginTop: 28 }} />
      <Label>Grade 6 skills (current placement)</Label>

      <GapRow skill="Ratio and proportional reasoning"              status="partial"  priority="high"   />
      <GapRow skill="Percent — conversions and applications"        status="partial"  priority="medium" />
      <GapRow skill="Statistical measures (mean, median, mode)"     status="mastered" priority="low"    />
      <GapRow skill="Expressions and equations — one-step"         status="mastered" priority="low"    />
      <GapRow skill="Expressions and equations — two-step"         status="gap"      priority="medium" />

      <div style={{ marginTop: 28 }} />
      <Label>Grade 7 skills (readiness check)</Label>

      <GapRow skill="Proportional relationships and unit rate"      status="partial"  priority="medium" />
      <GapRow skill="Operations with rational numbers"              status="gap"      priority="high"   />
      <GapRow skill="Algebraic expressions — simplifying"          status="gap"      priority="medium" />

      <Rule />

      {/* ── Primary gap narrative ───────────────────────────────────── */}
      <SectionHeading>Primary Gap — Rational Number Operations</SectionHeading>

      <Body>
        {student.firstName}&rsquo;s most significant gap is in operations
        with fractions and rational numbers. Specifically, she applies an
        incorrect procedure when adding fractions with unlike denominators
        — adding the denominators directly rather than finding a common
        denominator first. This error is consistent and suggests the
        conceptual model of what a denominator represents has not been
        fully internalized.
      </Body>

      <Body>
        This gap is grade-5 level but has significant forward consequence:
        rational number fluency underlies proportional reasoning, algebraic
        fractions, and eventually the entire Pre-Algebra sequence. It must
        be addressed before any acceleration work.
      </Body>

      <Callout>
        The procedural error{" "}
        <KaTeXInline latex="\frac{a}{b} + \frac{c}{d} = \frac{a+c}{b+d}" />{" "}
        is extremely common at this stage. It resolves quickly with
        targeted conceptual work — typically 2–3 weeks of daily practice
        once the underlying model is corrected.
      </Callout>

      <Rule />

      {/* ── Secondary gap narrative ─────────────────────────────────── */}
      <SectionHeading>Secondary Gap — Proportional Reasoning</SectionHeading>

      <Body>
        {student.firstName} understands the concept of a proportion and
        can set one up correctly. The gap appears in execution —
        specifically, sign and arithmetic errors during cross-multiplication
        when decimals or mixed numbers are involved. This is a fluency gap,
        not a conceptual one, and will close with targeted practice.
      </Body>

      <Rule />

      <Label>Priority sequence</Label>
      <Body>
        Address rational number operations first, completely, before
        introducing proportion work. Attempting both simultaneously will
        create interference. The 4-Week Mastery Blueprint sequences this
        correctly.
      </Body>
    </div>
  );
}
