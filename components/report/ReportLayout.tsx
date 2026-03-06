// components/report/ReportLayout.tsx
// Shared layout for all student report pages.
// Wraps content with Northbound brand chrome: topbar, serif heading block, footer.

import type { ReactNode } from "react";

interface ReportLayoutProps {
  studentName: string;       // e.g. "Eleanor Hartwell"
  grade: string;             // e.g. "Grade 6"
  course: string;            // e.g. "Pre-Algebra"
  reportDate: string;        // e.g. "March 2026"
  sectionTitle: string;      // e.g. "Example Problem Sets"
  sectionTag: string;        // e.g. "Practice"
  children: ReactNode;
}

export default function ReportLayout({
  studentName,
  grade,
  course,
  reportDate,
  sectionTitle,
  sectionTag,
  children,
}: ReportLayoutProps) {
  return (
    <div style={s.page}>
      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={s.topbar}>
        <span style={s.topbarLeft}>Northbound Tutoring</span>
        <span style={s.topbarRight}>Secured Report</span>
      </div>

      <main style={s.main}>
        {/* ── Header block ────────────────────────────────── */}
        <header style={s.header}>
          <div style={s.kicker}>
            {sectionTag}&ensp;&middot;&ensp;{reportDate}
          </div>

          <h1 style={s.studentName}>{studentName}</h1>

          <div style={s.meta}>
            {grade}&ensp;&mdash;&ensp;{course}
          </div>

          <div style={s.accentRule} />

          <h2 style={s.sectionTitle}>{sectionTitle}</h2>
        </header>

        <hr style={s.divider} />

        {/* ── Page-specific content ───────────────────────── */}
        <article style={s.article}>{children}</article>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer style={s.footer}>
          <span>
            Questions?{" "}
            <a href="mailto:hello@northboundtutoring.com" style={s.footerLink}>
              hello@northboundtutoring.com
            </a>
          </span>
          <span style={s.footerConf}>
            Confidential&ensp;&middot;&ensp;Northbound Tutoring
          </span>
        </footer>
      </main>
    </div>
  );
}

// ── Inline styles — all tokens from globals.css ──────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--page-bg)",
    fontFamily: "var(--font-sans)",
    color: "var(--text)",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 48px",
    borderBottom: "1px solid var(--border)",
    background: "var(--surface)",
  },
  topbarLeft: {
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "var(--text-muted)",
  },
  topbarRight: {
    fontSize: 11,
    letterSpacing: "0.10em",
    color: "var(--text-muted)",
  },
  main: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "72px 32px 80px",
  },
  header: {
    marginBottom: 0,
  },
  kicker: {
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "var(--accent)",
    marginBottom: 18,
    fontFamily: "var(--font-sans)",
  },
  studentName: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(34px, 5vw, 48px)",
    fontWeight: 400,
    color: "var(--heading)",
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
    marginBottom: 6,
  },
  meta: {
    fontFamily: "var(--font-serif)",
    fontSize: 17,
    fontStyle: "italic",
    color: "var(--text-muted)",
    marginBottom: 28,
  },
  accentRule: {
    width: 32,
    height: 2,
    background: "var(--accent)",
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(22px, 3vw, 28px)",
    fontWeight: 400,
    color: "var(--heading)",
    letterSpacing: "-0.015em",
    marginBottom: 0,
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--border)",
    margin: "36px 0",
  },
  article: {
    // children style themselves — see content components
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: 12,
    paddingTop: 28,
    borderTop: "1px solid var(--border)",
    marginTop: 64,
    fontSize: 12,
    color: "var(--text-muted)",
    fontFamily: "var(--font-sans)",
  },
  footerLink: {
    color: "var(--text-secondary)",
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
  footerConf: {
    fontSize: 11,
    letterSpacing: "0.06em",
    color: "var(--text-muted)",
  },
};
