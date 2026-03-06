// content/reports/hartwell-grade6/config.ts
// Single source of truth for this student.
// Duplicate this folder for each new student. Edit only this file and the page files.

export const student = {
  firstName: "Eleanor",
  lastName: "Hartwell",
  fullName: "Eleanor Hartwell",
  grade: "Grade 6",
  course: "Pre-Algebra",
  reportDate: "March 2026",
  parentEmail: "hartwell@email.com",

  // This becomes the URL segment: /report/hartwell-grade6/...
  slug: "hartwell-grade6",

  // One password per family. Store in .env.local as REPORT_PASSWORD_HARTWELL_GRADE6
  // Never commit the actual password here — this is just a reminder of the env var name.
  passwordEnvKey: "REPORT_PASSWORD_HARTWELL_GRADE6",
};

// The four deliverable slugs — these form the final URL segment.
// e.g. /report/hartwell-grade6/example-problems
export const sections = {
  gapAnalysis:      "gap-analysis",
  masteryBlueprint: "mastery-blueprint",
  exampleProblems:  "example-problems",
  pedagogyGuide:    "pedagogy-guide",
} as const;
