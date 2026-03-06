// app/report/[studentSlug]/unlock/page.tsx
// The password gate. Sets an httpOnly-equivalent cookie on success.
// Redirect destination comes from ?from= query param set by middleware.

"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function UnlockPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const studentSlug = params.studentSlug as string;

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const destination = searchParams.get("from") || `/report/${studentSlug}/gap-analysis`;

  const attempt = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError(false);

    const res = await fetch("/api/report/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentSlug, password: value }),
    });

    if (res.ok) {
      router.push(destination);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--page-bg, #fdfbf7); }
        .gate {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          font-family: var(--font-sans, 'Inter', sans-serif);
        }
        .inner {
          max-width: 420px;
          width: 100%;
          animation: fadeUp 0.55s ease 0.1s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wordmark {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted, #4a4845);
          margin-bottom: 52px;
        }
        h1 {
          font-family: var(--font-serif, 'Cormorant Garamond', serif);
          font-size: clamp(34px, 6vw, 46px);
          font-weight: 400;
          color: var(--heading, #1f4037);
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .rule {
          width: 32px; height: 2px;
          background: var(--accent, #b87a6c);
          margin-bottom: 28px;
        }
        p {
          font-size: 14px;
          color: var(--text-secondary, #2c5f4f);
          line-height: 1.8;
          margin-bottom: 40px;
        }
        label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted, #4a4845);
          margin-bottom: 8px;
        }
        input {
          width: 100%;
          padding: 13px 16px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text, #1f4037);
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e4e2);
          border-radius: 0;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus { border-color: var(--border-strong, #2c5f4f); }
        input.err   { border-color: var(--accent, #b87a6c); }
        .err-msg {
          font-size: 12px;
          color: var(--accent, #b87a6c);
          margin-top: 8px;
        }
        button {
          display: block;
          width: 100%;
          padding: 14px 24px;
          margin-top: 20px;
          background: var(--primary, #1f4037);
          color: #fdfbf7;
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-family: inherit;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          transition: background 0.25s;
          border-radius: 0;
        }
        button:hover:not(:disabled) { background: var(--primary-hover, #142a23); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        .footnote {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--border, #e5e4e2);
          font-size: 12px;
          color: var(--text-muted, #4a4845);
          line-height: 1.7;
        }
        .footnote a {
          color: var(--text-secondary, #2c5f4f);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>

      <div className="gate">
        <div className="inner">
          <div className="wordmark">Northbound Tutoring</div>

          <h1>
            Your child&rsquo;s report
            <br />
            is ready.
          </h1>

          <div className="rule" />

          <p>
            This report was prepared exclusively for your family. Enter
            the access code from your delivery email to continue.
          </p>

          <label htmlFor="code">Access Code</label>
          <input
            id="code"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Enter your code"
            className={error ? "err" : ""}
            autoComplete="current-password"
          />
          {error && (
            <div className="err-msg">
              That code doesn&rsquo;t match. Check your delivery email.
            </div>
          )}

          <button onClick={attempt} disabled={loading}>
            {loading ? "Checking…" : "Access Report"}
          </button>

          <div className="footnote">
            No code? Reply to your delivery email or contact{" "}
            <a href="mailto:hello@northboundtutoring.com">
              hello@northboundtutoring.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
