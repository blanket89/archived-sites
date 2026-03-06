// components/report/sections/ExampleProblemsContent.tsx
// ── TEMPLATE FILE ──
// This is the master example. Replace problem content for each student.
// KaTeX strings use standard LaTeX syntax.

"use client";

import { KaTeXBlock, KaTeXInline } from "@/components/report/KaTeX";
import {
  Body,
  Callout,
  Label,
  ProblemCard,
  Rule,
  SectionHeading,
  Solution,
} from "@/components/report/ReportTypography";

interface Props {
  student: { firstName: string };
}

export default function ExampleProblemsContent({ student }: Props) {
  return (
    <div>
      <Body>
        The problems below address the three priority gaps identified in{" "}
        {student.firstName}&rsquo;s diagnostic. Each worked solution models
        the reasoning process, not just the answer. Work through each
        problem before reading the solution.
      </Body>

      <Callout>
        These problems are sequenced intentionally. Complete them in order
        during a single sitting of no more than 20 minutes.
      </Callout>

      {/* ── Topic 1: Fractions ─────────────────────────────────────── */}
      <SectionHeading>Topic 1 — Operations with Fractions</SectionHeading>

      <Label>Skill targeted</Label>
      <Body>
        Adding and subtracting fractions with unlike denominators, including
        mixed numbers. This was the highest-priority gap from the diagnostic.
      </Body>

      <ProblemCard number={1}>
        <Body>Simplify the following expression:</Body>
        <KaTeXBlock latex="\frac{3}{4} + \frac{5}{6}" />
        <Solution>
          <Body>
            Step 1 — find the least common denominator of 4 and 6.
          </Body>
          <KaTeXBlock latex="\text{LCM}(4, 6) = 12" />
          <Body>Step 2 — rewrite each fraction with denominator 12.</Body>
          <KaTeXBlock latex="\frac{3}{4} = \frac{9}{12} \qquad \frac{5}{6} = \frac{10}{12}" />
          <Body>Step 3 — add the numerators.</Body>
          <KaTeXBlock latex="\frac{9}{12} + \frac{10}{12} = \frac{19}{12} = 1\frac{7}{12}" />
          <Callout>
            The key move here is always finding the LCM before touching the
            numerators. Eleanor tends to add denominators directly — watch
            for this and redirect immediately.
          </Callout>
        </Solution>
      </ProblemCard>

      <ProblemCard number={2}>
        <Body>Subtract the following mixed numbers:</Body>
        <KaTeXBlock latex="3\frac{1}{3} - 1\frac{3}{4}" />
        <Solution>
          <Body>
            Step 1 — convert both mixed numbers to improper fractions.
          </Body>
          <KaTeXBlock latex="3\frac{1}{3} = \frac{10}{3} \qquad 1\frac{3}{4} = \frac{7}{4}" />
          <Body>Step 2 — find the LCD (12) and rewrite.</Body>
          <KaTeXBlock latex="\frac{10}{3} = \frac{40}{12} \qquad \frac{7}{4} = \frac{21}{12}" />
          <Body>Step 3 — subtract.</Body>
          <KaTeXBlock latex="\frac{40}{12} - \frac{21}{12} = \frac{19}{12} = 1\frac{7}{12}" />
        </Solution>
      </ProblemCard>

      <Rule />

      {/* ── Topic 2: Ratios & Proportions ─────────────────────────── */}
      <SectionHeading>Topic 2 — Ratios and Proportional Reasoning</SectionHeading>

      <Label>Skill targeted</Label>
      <Body>
        Setting up and solving proportions. Secondary gap from the
        diagnostic — {student.firstName} understands the concept but makes
        cross-multiplication errors under time pressure.
      </Body>

      <ProblemCard number={3}>
        <Body>
          A recipe calls for 2 cups of flour for every 3 cups of oats.
          How many cups of flour are needed for 7.5 cups of oats?
        </Body>
        <Solution>
          <Body>Set up the proportion:</Body>
          <KaTeXBlock latex="\frac{2}{3} = \frac{x}{7.5}" />
          <Body>Cross-multiply:</Body>
          <KaTeXBlock latex="3x = 2 \times 7.5 = 15" />
          <KaTeXBlock latex="x = \frac{15}{3} = 5 \text{ cups of flour}" />
        </Solution>
      </ProblemCard>

      <ProblemCard number={4}>
        <Body>
          A car travels 156 miles in 3 hours. At the same rate, how far
          will it travel in{" "}
          <KaTeXInline latex="4\tfrac{1}{2}" /> hours?
        </Body>
        <Solution>
          <Body>Find the unit rate first:</Body>
          <KaTeXBlock latex="\frac{156 \text{ mi}}{3 \text{ hr}} = 52 \text{ mph}" />
          <Body>Multiply by the new time:</Body>
          <KaTeXBlock latex="52 \times 4.5 = 234 \text{ miles}" />
          <Callout>
            Encourage {student.firstName} to always find the unit rate as
            an intermediate step rather than jumping straight to a proportion.
            It builds number sense alongside the algebraic method.
          </Callout>
        </Solution>
      </ProblemCard>

      <Rule />

      {/* ── Topic 3: Negative Numbers ──────────────────────────────── */}
      <SectionHeading>Topic 3 — Integer Operations</SectionHeading>

      <Label>Skill targeted</Label>
      <Body>
        Multiplication and division with negative integers. This gap
        appears at the Grade 5 level — foundational for the algebra work
        ahead.
      </Body>

      <ProblemCard number={5}>
        <Body>Evaluate:</Body>
        <KaTeXBlock latex="(-3) \times (-4) + (-2) \times 7" />
        <Solution>
          <Body>Apply order of operations — multiply first:</Body>
          <KaTeXBlock latex="(-3) \times (-4) = 12" />
          <KaTeXBlock latex="(-2) \times 7 = -14" />
          <Body>Then add:</Body>
          <KaTeXBlock latex="12 + (-14) = 12 - 14 = -2" />
          <Callout>
            The most common error here is sign confusion on{" "}
            <KaTeXInline latex="(-3)(-4)" />. Reinforce: negative times
            negative is always positive, and have {student.firstName} say
            it aloud before writing the answer.
          </Callout>
        </Solution>
      </ProblemCard>

      <Rule />

      <Label>A note on practice</Label>
      <Body>
        These five problems represent one day&rsquo;s practice set. Do not
        assign more than this in a single sitting. Mastery comes from
        quality of attention, not volume of problems.
      </Body>
    </div>
  );
}
