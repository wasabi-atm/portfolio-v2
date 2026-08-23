"use client";

import { useState, useRef, useEffect, Children } from "react";

/* ─── Persona sub-components (parsed from children) ─── */
function Goals({ children }) {
  return null; // Marker component, content extracted by parent
}
function Frustrations({ children }) {
  return null; // Marker component, content extracted by parent
}

function extractTextContent(children) {
  let text = "";
  Children.forEach(children, (child) => {
    if (typeof child === "string") text += child;
    else if (child?.props?.children) text += extractTextContent(child.props.children);
  });
  return text.trim();
}

function parsePersonaChildren(children) {
  let bio = "";
  let goals = [];
  let frustrations = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      bio += child;
    } else if (child?.type === Goals || child?.props?.mdxType === "Goals" || child?.type?.name === "Goals") {
      const raw = extractTextContent(child.props.children);
      goals = raw.split(";").map((s) => s.trim()).filter(Boolean);
    } else if (child?.type === Frustrations || child?.props?.mdxType === "Frustrations" || child?.type?.name === "Frustrations") {
      const raw = extractTextContent(child.props.children);
      frustrations = raw.split(";").map((s) => s.trim()).filter(Boolean);
    } else if (child?.props?.children) {
      bio += extractTextContent(child.props.children);
    }
  });

  return { bio: bio.trim(), goals, frustrations };
}

/* ─── Persona Card ─── */
function Persona({ name, image, quote, children }) {
  const { bio, goals, frustrations } = parsePersonaChildren(children);

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start w-full min-w-0 px-2">
      {/* Avatar */}
      <div className="flex-shrink-0 w-36 h-44 md:w-44 md:h-52 mx-auto md:mx-0 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-end justify-center border border-zinc-200/60 dark:border-zinc-700/60">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          /* Placeholder silhouette */
          <svg viewBox="0 0 120 150" className="w-24 h-32 text-zinc-300 dark:text-zinc-600">
            <circle cx="60" cy="40" r="25" fill="currentColor" />
            <ellipse cx="60" cy="130" rx="45" ry="40" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            USER PERSONA
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 dark:text-white mb-2">
          {name}
        </h3>
        {quote && (
          <p className="text-zinc-600 dark:text-zinc-400 font-serif italic text-base md:text-lg mb-4 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        )}
        {bio && (
          <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
            {bio}
          </p>
        )}

        {/* Goals & Frustrations */}
        {(goals.length > 0 || frustrations.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {goals.length > 0 && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                  PRIMARY GOALS
                </h4>
                <ul className="space-y-2">
                  {goals.map((g, i) => (
                    <li key={i} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-0.5">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {frustrations.length > 0 && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 mb-3">
                  KEY FRUSTRATIONS
                </h4>
                <ul className="space-y-2">
                  {frustrations.map((f, i) => (
                    <li key={i} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed flex items-start gap-2">
                      <span className="text-rose-400 font-mono mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PersonaStepper (Carousel) ─── */
function PersonaStepper({ children }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const personas = [];
  Children.forEach(children, (child) => {
    if (child?.type === Persona || child?.props?.mdxType === "Persona" || child?.type?.name === "Persona") {
      personas.push(child);
    }
  });

  const total = personas.length;

  const goTo = (idx) => {
    setCurrent(Math.max(0, Math.min(idx, total - 1)));
  };

  // Touch/swipe support
  const startX = useRef(0);
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < total - 1) goTo(current + 1);
      else if (diff < 0 && current > 0) goTo(current - 1);
    }
  };

  if (total === 0) return null;

  return (
    <div className="my-12 md:my-16 not-prose">
      <div
        className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/60"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {personas.map((persona, i) => (
            <div key={i} className="w-full flex-shrink-0 p-8 md:p-12">
              {persona}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {total > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous persona"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {personas.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-zinc-900 dark:bg-white scale-110"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400"
                }`}
                aria-label={`Go to persona ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next persona"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export { PersonaStepper, Persona, Goals, Frustrations };
