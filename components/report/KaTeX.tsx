"use client";

import { useEffect, useRef } from "react";

// Renders a LaTeX string using KaTeX loaded from CDN.
// Use <KaTeXBlock> for display math, <KaTeXInline> for inline math.

declare global {
  interface Window {
    katex: {
      render: (
        latex: string,
        element: HTMLElement,
        options?: Record<string, unknown>
      ) => void;
    };
  }
}

function useKaTeX(latex: string, displayMode: boolean, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const render = () => {
      if (!window.katex) return;
      try {
        window.katex.render(latex, ref.current!, {
          displayMode,
          throwOnError: false,
          errorColor: "#b87a6c",
        });
      } catch {
        if (ref.current) ref.current.textContent = latex;
      }
    };

    if (window.katex) {
      render();
    } else {
      // KaTeX loaded via <Script> in layout — poll briefly
      const interval = setInterval(() => {
        if (window.katex) {
          clearInterval(interval);
          render();
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [latex, displayMode, ref]);
}

export function KaTeXBlock({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useKaTeX(latex, true, ref);
  return (
    <div
      ref={ref}
      className="katex-block"
      style={{
        overflowX: "auto",
        margin: "24px 0",
        padding: "20px 24px",
        background: "#f5f3ef",
        borderLeft: "3px solid #b87a6c",
      }}
    />
  );
}

export function KaTeXInline({ latex }: { latex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useKaTeX(latex, false, ref);
  return <span ref={ref} style={{ display: "inline" }} />;
}
