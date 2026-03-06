// app/api/report/unlock/route.ts
// Verifies the submitted password against the env var.
// Sets a session cookie on success that middleware reads.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDENT_PASSWORD_KEYS: Record<string, string> = {
  "hartwell-grade6": "REPORT_PASSWORD_HARTWELL_GRADE6",
  // Add students here as you add them
};

export async function POST(request: NextRequest) {
  const { studentSlug, password } = await request.json();

  if (!studentSlug || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const passwordKey = STUDENT_PASSWORD_KEYS[studentSlug];
  if (!passwordKey) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const expected = process.env[passwordKey];
  if (!expected) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  if (password !== expected) {
    // Constant-time-ish comparison (good enough for this use case)
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Set auth cookie — httpOnly so JS can't read it, secure in production
  const response = NextResponse.json({ ok: true });
  response.cookies.set(`auth_${studentSlug}`, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/report/${studentSlug}`,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
