// components/report/sections/PedagogyGuideContent.tsx

"use client";

import { KaTeXBlock, KaTeXInline } from "@/components/report/KaTeX";
import {
  Body,
  Callout,
  Label,
  Rule,
  SectionHeading,
} from "@/components/report/ReportTypography";

interface Props {
  student: { firstName: string };
}

export default function PedagogyGuideContent({ student }: Props) {
  return (
    <div>
      <Body>
        This guide is written for you, not for {student.firstName}. Its
        purpose is to give you the language and approach to support
        practice sessions without inadvertently introducing confusion or
        creating reliance on your explanation rather than her own
        reasoning.
      </Body>

      <Callout>
        The most important rule: ask questions before giving answers.
        &ldquo;What have you tried?&rdquo; and &ldquo;What do you know for
        sure?&rdquo; are more useful than showing the correct method.
      </Callout>

      <Rule />

      {/* ── Concept 1 ──────────────────────────────────────────────── */}
      <SectionHeading>How to Explain: Finding a Common Denominator</SectionHeading>

      <Label>The correct mental model</Label>
      <Body>
        A denominator tells you how many equal parts make up one whole.
        You cannot add fractions with different denominators for the same
        reason you cannot add apples and oranges — they are measuring
        different-sized pieces. Before adding, you must convert everything
        to the same piece size.
      </Body>

      <Label>Language that works</Label>
      <Body>
        &ldquo;If we have <KaTeXInline latex="\frac{1}{4}" /> of a pizza
        and <KaTeXInline latex="\frac{1}{3}" /> of a pizza, the slices are
        different sizes. We need to cut everything into the same size
        before we count them. What size works for both 4 and 3?&rdquo;
      </Body>

      <Label>The error to watch for — and how to address it</Label>
      <Body>
        If {student.firstName} adds the denominators directly — writing{" "}
        <KaTeXInline latex="\frac{1}{4} + \frac{1}{3} = \frac{2}{7}" /> —
        do not simply correct it. Instead ask: &ldquo;Does{" "}
        <KaTeXInline latex="\frac{2}{7}" /> seem reasonable? If you have
        more than a quarter of a pizza and more than a third, could the
        total be less than a third?&rdquo; Let the estimate reveal the
        error.
      </Body>

      <KaTeXBlock latex="\frac{1}{4} + \frac{1}{3} = \frac{3}{12} + \frac{4}{12} = \frac{7}{12} \approx 0.58" />

      <Callout>
        Never say &ldquo;that&rsquo;s wrong.&rdquo; Say &ldquo;let&rsquo;s
        check it.&rdquo; The habit of checking answers is more valuable
        than any single correct answer.
      </Callout>

      <Rule />

      {/* ── Concept 2 ──────────────────────────────────────────────── */}
      <SectionHeading>How to Explain: Proportional Reasoning</SectionHeading>

      <Label>The correct mental model</Label>
      <Body>
        A proportion says that two ratios are equivalent — that two
        situations scale in exactly the same way. The key idea is that
        multiplying or dividing both parts of a ratio by the same number
        preserves the relationship.
      </Body>

      <Label>Language that works</Label>
      <Body>
        Start with unit rate. &ldquo;If 3 apples cost $1.50, one apple
        costs how much? Good — now how much would 7 apples cost?&rdquo;
        This sequence (find one, then scale) is more intuitive than the
        cross-multiplication algorithm and builds genuine understanding.
        Introduce the algebraic form only after the reasoning is solid.
      </Body>

      <Label>When she gets stuck on cross-multiplication</Label>
      <Body>
        If {student.firstName} sets up the proportion correctly but makes
        an arithmetic error, resist the urge to rework it for her.
        Point to the line where the error occurred: &ldquo;Check this step
        — does{" "}
        <KaTeXInline latex="3 \times 2.5" /> equal what you wrote?&rdquo;
        Self-correction builds more durable skill than being shown.
      </Body>

      <Rule />

      {/* ── General principles ─────────────────────────────────────── */}
      <SectionHeading>General Principles for Practice Sessions</SectionHeading>

      <Label>Keep sessions short</Label>
      <Body>
        15 minutes of focused practice is more valuable than 45 minutes of
        distracted work. End the session while {student.firstName} still
        has energy — always stop before frustration sets in.
      </Body>

      <Label>Separate practice from homework help</Label>
      <Body>
        These practice sessions are not the place to redo school homework.
        If school work comes home, handle it separately and at a different
        time. Mixing the two blurs the purpose of each.
      </Body>

      <Label>What to do when she is frustrated</Label>
      <Body>
        Stop the problem. Do not push through frustration. Say: &ldquo;Let&rsquo;s
        come back to this one. Show me a problem you know how to do.&rdquo;
        Ending on success — even a review problem she has already mastered
        — preserves her sense of competence and her willingness to return
        tomorrow.
      </Body>

      <Label>What not to say</Label>
      <Body>
        Avoid &ldquo;this is easy&rdquo; or &ldquo;you already know this.&rdquo;
        If it were easy for her in this moment, she would not be struggling.
        These phrases create shame, not motivation. Prefer: &ldquo;This is
        genuinely tricky. Let&rsquo;s figure it out together.&rdquo;
      </Body>
    </div>
  );
}
