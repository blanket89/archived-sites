// middleware.ts
// Place this file at the ROOT of your Next.js project (same level as app/).
//
// Protects all /report/* routes with a per-family password.
// Password is stored in .env.local — never in code.
//
// HOW IT WORKS:
// 1. Request hits /report/hartwell-grade6/example-problems
// 2. Middleware checks for a cookie named `auth_hartwell-grade6`
// 3. If the cookie value matches the env var, request passes through
// 4. If not, user is redirected to /report/hartwell-grade6/unlock
//
// The unlock page (app/report/[studentSlug]/unlock/page.tsx) sets the cookie.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Maps student slug → environment variable name holding their password.
// Add one entry per student.
const STUDENT_PASSWORD_KEYS: Record<string, string> = {
  "hartwell-grade6": "REPORT_PASSWORD_HARTWELL_GRADE6",
  // "chen-grade8":   "REPORT_PASSWORD_CHEN_GRADE8",
  // "okafor-grade5": "REPORT_PASSWORD_OKAFOR_GRADE5",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /report/[studentSlug]/[section] — not /unlock pages
  const match = pathname.match(/^\/report\/([^/]+)\/(?!unlock)(.+)$/);
  if (!match) return NextResponse.next();

  const studentSlug = match[1];
  const passwordKey = STUDENT_PASSWORD_KEYS[studentSlug];

  // Unknown student slug → 404
  if (!passwordKey) return NextResponse.next();

  const expectedPassword = process.env[passwordKey];

  // Env var not set → log warning, allow through in dev only
  if (!expectedPassword) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[middleware] No password set for ${studentSlug}. Set ${passwordKey} in .env.local`);
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/404", request.url));
  }

  // Check auth cookie
  const cookieName = `auth_${studentSlug}`;
  const cookie = request.cookies.get(cookieName);

  if (cookie?.value === expectedPassword) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to unlock page
  const unlockUrl = new URL(`/report/${studentSlug}/unlock`, request.url);
  unlockUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/report/:studentSlug/:section*"],
};
