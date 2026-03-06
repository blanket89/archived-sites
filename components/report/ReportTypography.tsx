// components/report/ReportTypography.tsx
// Semantic content components for use inside report pages.
// Each maps to a specific visual treatment consistent with Northbound brand.

import type { ReactNode } from "react";

// ── Section heading (H3-level within the article) ────────────────────────────
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-serif)",
      fontSize: 22,
      fontWeight: 400,
      color: "var(--heading)",
      letterSpacing: "-0.015em",
      marginTop: 48,
      marginBottom: 12,
    }}>
      {children}
    </h3>
  );
}

// ── Body paragraph ───────────────────────────────────────────────────────────
export function Body({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-secondary)",
      lineHeight: 1.85,
      marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

// ── Label — 10px uppercase, used for field names and annotations ─────────────
export function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

// ── Callout — used for key observations, warnings, coach notes ───────────────
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      borderLeft: "3px solid var(--accent)",
      padding: "16px 20px",
      background: "var(--section-alt-bg)",
      marginBottom: 24,
      marginTop: 8,
    }}>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.75,
        margin: 0,
      }}>
        {children}
      </p>
    </div>
  );
}

// ── Problem card — wraps a single numbered problem ───────────────────────────
export function ProblemCard({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      paddingTop: 28,
      marginTop: 28,
    }}>
      <div style={{
        fontFamily: "var(--font-serif)",
        fontSize: 13,
        letterSpacing: "0.04em",
        color: "var(--accent)",
        marginBottom: 12,
        fontStyle: "italic",
      }}>
        Problem {number}
      </div>
      {children}
    </div>
  );
}

// ── Solution block — appears below a problem ─────────────────────────────────
export function Solution({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: 10,
      }}>
        Worked Solution
      </div>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.8,
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Divider — thin rule between sections ─────────────────────────────────────
export function Rule() {
  return (
    <hr style={{
      border: "none",
      borderTop: "1px solid var(--border)",
      margin: "40px 0",
    }} />
  );
}

// ── Gap row — used in gap analysis tables ────────────────────────────────────
export function GapRow({
  skill,
  status,
  priority,
}: {
  skill: string;
  status: "gap" | "partial" | "mastered";
  priority: "high" | "medium" | "low";
}) {
  const statusColors = {
    gap:      { bg: "#fdf5f4", text: "#a06959" },
    partial:  { bg: "#f5f3ef", text: "#4a4845" },
    mastered: { bg: "#f0f4f2", text: "#2c5f4f" },
  };
  const statusLabels = { gap: "Gap", partial: "Partial", mastered: "Mastered" };
  const priorityLabels = { high: "High Priority", medium: "Medium", low: "Low" };

  const sc = statusColors[status];

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid var(--border)",
      gap: 16,
    }}>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        color: "var(--text-secondary)",
        flex: 1,
      }}>
        {skill}
      </span>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: sc.text,
        background: sc.bg,
        padding: "3px 8px",
        minWidth: 72,
        textAlign: "center",
      }}>
        {statusLabels[status]}
      </span>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        minWidth: 96,
        textAlign: "right",
      }}>
        {priorityLabels[priority]}
      </span>
    </div>
  );
}
