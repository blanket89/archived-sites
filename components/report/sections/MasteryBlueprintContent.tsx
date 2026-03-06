// components/report/sections/MasteryBlueprintContent.tsx

"use client";

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

// Week block component — one per week of the blueprint
function WeekBlock({
  week,
  focus,
  skills,
  dailyStructure,
  confidence,
}: {
  week: number;
  focus: string;
  skills: string[];
  dailyStructure: string;
  confidence: string;
}) {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      paddingTop: 28,
      marginTop: 28,
    }}>
      <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: 36,
          fontWeight: 400,
          color: "var(--accent)",
          opacity: 0.4,
          lineHeight: 1,
          minWidth: 32,
        }}>
          {String(week).padStart(2, "0")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            color: "var(--heading)",
            marginBottom: 12,
          }}>
            {focus}
          </div>
          <Label>Skills addressed</Label>
          <ul style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            paddingLeft: 20,
            marginBottom: 16,
          }}>
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <Label>Daily structure</Label>
          <Body>{dailyStructure}</Body>
          <Label>Confidence strategy</Label>
          <Body>{confidence}</Body>
        </div>
      </div>
    </div>
  );
}

export default function MasteryBlueprintContent({ student }: Props) {
  return (
    <div>
      <Body>
        This blueprint sequences {student.firstName}&rsquo;s skill-building
        across four weeks. Each week has a single focus. Do not advance
        to the next week until the current focus feels automatic —
        fluency matters more than calendar pace.
      </Body>

      <Callout>
        Daily practice should never exceed 15 minutes. Consistency across
        days matters more than length of any single session.
      </Callout>

      {/* REPLACE: edit focus, skills, and strategies per student */}
      <SectionHeading>4-Week Plan</SectionHeading>

      <WeekBlock
        week={1}
        focus="Fraction Foundations — Conceptual Repair"
        skills={[
          "What a denominator represents (parts of a whole)",
          "Equivalent fractions — visual and numerical",
          "Finding the least common denominator",
        ]}
        dailyStructure="5 minutes of equivalent fraction visualization (use fraction strips or diagrams, not just numbers). 10 minutes of LCD practice — 4 to 6 problems only."
        confidence="Begin every session with two problems Eleanor can solve immediately. Success before challenge."
      />

      <WeekBlock
        week={2}
        focus="Fraction Operations — Addition and Subtraction"
        skills={[
          "Adding fractions with unlike denominators",
          "Subtracting fractions with unlike denominators",
          "Mixed number operations",
        ]}
        dailyStructure="2 review problems from Week 1 (keep the foundation warm). 10 minutes on new operation problems — no more than 5 problems."
        confidence="Have Eleanor explain her LCD step aloud before writing anything. Verbalization catches the common error before it happens."
      />

      <WeekBlock
        week={3}
        focus="Proportional Reasoning — Fluency"
        skills={[
          "Setting up proportions correctly",
          "Cross-multiplication with decimals",
          "Unit rate as an intermediate step",
        ]}
        dailyStructure="2 fraction problems to maintain Week 1–2 gains. 10 minutes on proportion work."
        confidence="Connect proportions to real contexts first (recipes, maps, speed) before abstract numbers. Meaning precedes procedure."
      />

      <WeekBlock
        week={4}
        focus="Integration and Extension"
        skills={[
          "Mixed problem sets combining both skill areas",
          "Introduction to rational number operations (negative fractions)",
          "Grade 7 readiness check",
        ]}
        dailyStructure="Full mixed sets — 5 problems covering all skills from Weeks 1–3. Introduce one new concept per session maximum."
        confidence="Celebrate the distance traveled. Review Week 1 problems together to show how much has changed."
      />

      <Rule />

      <Label>A note on pacing</Label>
      <Body>
        If Week 2 is taking longer than expected, do not rush. Extend it
        to five or six days and compress Week 4. The foundation matters
        more than the timeline.
      </Body>
    </div>
  );
}
