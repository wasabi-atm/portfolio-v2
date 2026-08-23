"use client";

import { useEffect, useRef, useState } from "react";

/* ─── SVG Silhouette Placeholders ─── */
const SILHOUETTES = [
  // Person with bun hairstyle, arms crossed
  (
    <svg viewBox="0 0 100 120" className="w-full h-full" key="s1">
      <circle cx="50" cy="22" r="16" fill="currentColor" />
      <circle cx="50" cy="10" r="8" fill="currentColor" />
      <ellipse cx="50" cy="85" rx="32" ry="35" fill="currentColor" />
      <rect x="22" y="58" rx="6" width="56" height="20" fill="currentColor" />
    </svg>
  ),
  // Person with glasses, hand raised
  (
    <svg viewBox="0 0 100 120" className="w-full h-full" key="s2">
      <circle cx="50" cy="24" r="16" fill="currentColor" />
      <ellipse cx="50" cy="85" rx="30" ry="35" fill="currentColor" />
      <rect x="18" y="50" rx="4" width="12" height="35" fill="currentColor" transform="rotate(-20 24 50)" />
      <rect x="25" y="60" rx="6" width="50" height="18" fill="currentColor" />
    </svg>
  ),
  // Person with short hair, relaxed
  (
    <svg viewBox="0 0 100 120" className="w-full h-full" key="s3">
      <circle cx="50" cy="24" r="15" fill="currentColor" />
      <rect x="42" cy="16" width="16" height="10" rx="4" fill="currentColor" />
      <ellipse cx="50" cy="82" rx="28" ry="38" fill="currentColor" />
    </svg>
  ),
  // Person with curly hair
  (
    <svg viewBox="0 0 100 120" className="w-full h-full" key="s4">
      <circle cx="50" cy="26" r="18" fill="currentColor" />
      <circle cx="38" cy="16" r="8" fill="currentColor" />
      <circle cx="62" cy="16" r="8" fill="currentColor" />
      <circle cx="50" cy="12" r="7" fill="currentColor" />
      <ellipse cx="50" cy="85" rx="30" ry="35" fill="currentColor" />
    </svg>
  ),
];

/* ─── Decorative Quotation Mark ─── */
function QuoteMark({ flip = false }) {
  return (
    <span
      className={`text-zinc-200 dark:text-zinc-700 select-none leading-none font-serif ${
        flip ? "self-end" : "self-start"
      }`}
      style={{ fontSize: "4rem", lineHeight: 0.8 }}
      aria-hidden="true"
    >
      {flip ? "\u201D" : "\u201C"}
    </span>
  );
}

/* ─── ProblemQuote Component ─── */
function ProblemQuote({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [silhouetteIdx] = useState(() => Math.floor(Math.random() * SILHOUETTES.length));
  const [isRight] = useState(() => Math.random() > 0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const silhouette = (
    <div className="flex-shrink-0 w-16 h-20 md:w-20 md:h-24 text-zinc-300 dark:text-zinc-600">
      {SILHOUETTES[silhouetteIdx]}
    </div>
  );

  return (
    <div
      ref={ref}
      className="my-10 md:my-14 not-prose"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/70 p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-6 md:gap-8">
          {/* Quote marks */}
          <QuoteMark />

          {/* Character (left) */}
          {!isRight && silhouette}

          {/* Quote text */}
          <p className="flex-1 text-lg md:text-2xl font-serif text-zinc-800 dark:text-zinc-200 italic leading-relaxed font-normal">
            {children}
          </p>

          {/* Character (right) */}
          {isRight && silhouette}

          <QuoteMark flip />
        </div>
      </div>
    </div>
  );
}

export { ProblemQuote };
