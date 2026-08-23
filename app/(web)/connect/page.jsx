"use client";

import ScrollReveal from "@/components/ScrollReveal";

const STACK_DESIGN = [
  { name: "Figma", icon: "/assets/Design Stack/Figma icon.png" },
  { name: "Lottie", icon: "/assets/Design Stack/Lottie Icon%20Download.webp" },
  { name: "Affinity", icon: "/assets/Design Stack/Affinity Icon.webp" },
  { name: "Photoshop", icon: "/assets/Design Stack/Photoshop%20Icon.png" },
  { name: "Illustrator", icon: "/assets/Design Stack/Illustrator%20Icon.png" },
  { name: "InDesign", icon: "/assets/Design Stack/Indesign%20Icon.png" },
  { name: "After Effects", icon: "/assets/Design Stack/After%20Effects%20Icon.png" },
  { name: "Premiere Pro", icon: "/assets/Design Stack/Premiere%20Pro%20Icon.png" },
];

const STACK_TECH = [
  { name: "Swift / SwiftUI", icon: "/assets/Tech Stack/Swift%20Icon.png" },
  { name: "Next.js", icon: "/assets/Tech Stack/Next.js%20Icon.png" },
  { name: "React", icon: "/assets/Tech Stack/Javascript%20Icon.png" },
  { name: "Tailwind CSS", icon: "/assets/Tech Stack/Tailwind%20CSS%20Logo.png" },
  { name: "JavaScript", icon: "/assets/Tech Stack/Javascript%20Icon.png" },
  { name: "HTML / CSS", icon: "/assets/Tech Stack/HTML%205%20Icon.png" },
];

const STACK_MGMT = [
  { name: "Notion", icon: "/assets/Management Stack/Notion%20Icon.png" },
  { name: "Jira", icon: "/assets/Management Stack/Jira%20Icon.png" },
  { name: "Slack", icon: "/assets/Management Stack/Slack%20Icon.png" },
  { name: "Miro", icon: "/assets/Management Stack/Miro%20Logo%20Icon.png" },
  { name: "ClickUp", icon: "/assets/Management Stack/ClickUp%20Icon.avif" },
  { name: "Confluence", icon: "/assets/Management Stack/Confluence%20Icon.png" },
];

const TESTIMONIALS = [
  {
    quote: "Wira works seamlessly with engineers because he codes. He knows what's feasible before he draws a line.",
    role: "iOS Developer",
    context: "Engineering",
  },
  {
    quote: "He doesn't just make things look good—he designs with conversion, retention, and growth in mind.",
    role: "Creative Director",
    context: "Agency Leadership",
  },
  {
    quote: "Wira takes messy product requirements and turns them into working interactive prototypes in days.",
    role: "Product Manager",
    context: "Product Team",
  },
  {
    quote: "Zero handoff friction. His UI specs and components drop right into our codebase without rework.",
    role: "Senior Engineer",
    context: "Frontend Engineering",
  },
];

const PRINCIPLES = [
  {
    roman: "I",
    title: "Prototype in Code",
    summary: "Static mockups hide edge cases. Prototyping in Swift and React proves interaction physics and technical feasibility immediately.",
  },
  {
    roman: "II",
    title: "Design for Real Friction",
    summary: "Apps live on spotty connections, small screens, and divided attention. Good design works under real-world constraints.",
  },
  {
    roman: "III",
    title: "Production-Ready in Figma",
    summary: "Deep proficiency in Figma auto-layout, design tokens, and components ensures designs translate 1:1 to code without guesswork.",
  },
  {
    roman: "IV",
    title: "Full-Funnel Distribution",
    summary: "A great product needs distribution. I design the marketing collaterals, app previews, and landing pages needed to launch and acquire users.",
  },
];

export default function ConnectPage() {
  return (
    <main className="w-full max-w-[1600px] px-6 md:px-12 pt-24 pb-16 lg:py-16 space-y-20 lg:space-y-24 overflow-x-hidden">
      {/* ── 1. Hero: Design Engineer + Marketing ── */}
      <header className="space-y-8">
        <ScrollReveal>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.06]">
              Why Hire Me
            </h1>

            <p className="text-xl md:text-2xl font-serif text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
              I&apos;m a <strong className="font-semibold text-zinc-950 dark:text-white">Design Engineer with a marketing background</strong>. I craft high-fidelity interfaces in Figma, write production code in Swift and React, and design marketing collaterals that drive growth.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Tier 1: Two Clean Proof Cards (No Fluff) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          {/* Card 1: 5 Years Cross-Functional Craft */}
          <ScrollReveal delay={40} className="lg:col-span-6 h-full">
            <div className="relative overflow-hidden rounded-3xl min-h-[300px] p-8 md:p-10 flex flex-col justify-between group bg-zinc-900 text-white h-full">
              <div className="absolute inset-0 z-0">
                <img
                  src="/assets/BG Placeholder.avif"
                  alt="Background Craft"
                  className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-900/50" />
              </div>

              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  5 YEARS EXPERIENCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                  Figma + Code + Marketing
                </h3>
                <p className="text-base text-zinc-300 leading-relaxed max-w-lg">
                  I bridge the gap most teams struggle with. I design in Figma, code frontend in Swift and React, and create the marketing collaterals that bring products to market.
                </p>
              </div>

              <div className="relative z-10 pt-6 flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>FIGMA</span>
                <span>&bull;</span>
                <span>SWIFT</span>
                <span>&bull;</span>
                <span>REACT</span>
                <span>&bull;</span>
                <span>MARKETING</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: App Store Track Record */}
          <ScrollReveal delay={80} className="lg:col-span-6 h-full">
            <div className="rounded-3xl p-8 md:p-10 flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 h-full">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                  TRACK RECORD
                </span>

                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-serif font-bold text-zinc-950 dark:text-white">
                    3 Native Apps Shipped
                  </div>
                  <div className="text-xl sm:text-2xl font-serif text-zinc-800 dark:text-zinc-200">
                    Peaked at <strong className="font-bold text-zinc-950 dark:text-white underline decoration-zinc-400 underline-offset-4">#4 in App Store Business</strong>
                  </div>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                    Hands-on native iOS product design in Figma and production development from initial wireframe to App Store release.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span>APP STORE RELEASED</span>
                <span>&bull;</span>
                <span>ACTIVE USERS</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </header>

      {/* ── 2. What I Bring to a Team ── */}
      <section className="space-y-8">
        <ScrollReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
            WHAT I BRING TO A TEAM
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          <ScrollReveal delay={40}>
            <div className="space-y-3">
              <span className="text-2xl font-serif font-bold text-zinc-400 dark:text-zinc-600 block">01.</span>
              <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white leading-snug">
                Figma & Design Engineering
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I build structured, tokenized Figma files and functional UI directly in React, Next.js, and Swift. Your engineering team won&apos;t have to guess layout behaviors, responsive breakpoints, or interaction curves.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="space-y-3">
              <span className="text-2xl font-serif font-bold text-zinc-400 dark:text-zinc-600 block">02.</span>
              <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white leading-snug">
                Marketing Strategy & Collaterals
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A great product needs clear distribution. Working in marketing, I strategize with cross-functional teams and design high-impact marketing collaterals, ad visuals, and landing pages that drive user acquisition.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="space-y-3">
              <span className="text-2xl font-serif font-bold text-zinc-400 dark:text-zinc-600 block">03.</span>
              <h3 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white leading-snug">
                End-to-End Execution
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Because I design marketing assets, architect Figma systems, and write frontend code, ideas move from initial concept to live release without multi-team handoff bottlenecks.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. How I Work (Operating Principles) ── */}
      <section className="space-y-8">
        <ScrollReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
            HOW I WORK
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PRINCIPLES.map((p, idx) => (
            <ScrollReveal key={p.roman} delay={idx * 40}>
              <div className="space-y-3">
                <span className="text-3xl font-serif font-bold text-zinc-950 dark:text-white">
                  {p.roman}.
                </span>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {p.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 4. Working Toolkit (Completely Unboxed) ── */}
      <section className="space-y-8">
        <ScrollReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
            WORKING TOOLKIT
          </span>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Design & Motion */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                DESIGN & MOTION
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {STACK_DESIGN.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                CODE
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {STACK_TECH.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ops & Workflow */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                OPS & WORKFLOW
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {STACK_MGMT.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 5. Endorsements ── */}
      <section className="space-y-8">
        <ScrollReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
            WHAT PEOPLE SAY
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-serif italic text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="font-semibold text-xs text-zinc-950 dark:text-white">{t.role}</span>
                  <span className="text-zinc-400 text-xs">&bull;</span>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">{t.context}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 6. Direct Contact CTA ── */}
      <section className="pt-8">
        <ScrollReveal delay={80}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white">
                Want to build something fast?
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                Available for design engineering contracts, full-time product roles, and mobile launches.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="mailto:atmanawiera@gmail.com"
                className="px-6 py-3.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                EMAIL ME &rarr;
              </a>
              <a
                href="https://linkedin.com/in/wira29"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
