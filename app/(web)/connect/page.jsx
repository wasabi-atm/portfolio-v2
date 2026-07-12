"use client";

import { useRef } from "react";

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
  { name: "HTML 5", icon: "/assets/Tech Stack/HTML%205%20Icon.png" },
  { name: "CSS", icon: "/assets/Tech Stack/CSS%20Icon.png" },
  { name: "JavaScript", icon: "/assets/Tech Stack/Javascript%20Icon.png" },
  { name: "Tailwind CSS", icon: "/assets/Tech Stack/Tailwind%20CSS%20Logo.png" },
  { name: "Next.js", icon: "/assets/Tech Stack/Next.js%20Icon.png" },
  { name: "Swift", icon: "/assets/Tech Stack/Swift%20Icon.png" },
];

const STACK_MGMT = [
  { name: "Notion", icon: "/assets/Management Stack/Notion%20Icon.png" },
  { name: "Slack", icon: "/assets/Management Stack/Slack%20Icon.png" },
  { name: "Jira", icon: "/assets/Management Stack/Jira%20Icon.png" },
  { name: "Confluence", icon: "/assets/Management Stack/Confluence%20Icon.png" },
  { name: "Miro", icon: "/assets/Management Stack/Miro%20Logo%20Icon.png" },
  { name: "ClickUp", icon: "/assets/Management Stack/ClickUp%20Icon.avif" },
];

const TESTIMONIALS = [
  {
    quote: "Wira works really well with coders because he understands tech limitations and feasibility.",
    avatarBg: "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-600 dark:text-blue-200",
    role: "iOS Developer",
  },
  {
    quote: "He captured the authentic Japanese aesthetic perfectly but optimized it for the Singaporean crowd.",
    avatarBg: "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 text-red-600 dark:text-red-200",
    role: "Creative Director (SG)",
  },
  {
    quote: "I'm glad Wira could translate the design I had in mind into actionable specs for the coders.",
    avatarBg: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-600 dark:text-purple-200",
    role: "Product Manager",
  },
  {
    quote: "Japanese F&B clients are particular about details. Wira’s eye for layout satisfied even our strictest owners.",
    avatarBg: "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 text-amber-600 dark:text-amber-200",
    role: "Restaurant Manager",
  },
  {
    quote: "Wira is able to adapt to tight deadlines and sudden scope changes without breaking the user flow.",
    avatarBg: "from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-200",
    role: "UX Lead",
  },
  {
    quote: "His campaigns didn't just look good; they filled seats. He knows how to position seasonal menus.",
    avatarBg: "from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 text-orange-600 dark:text-orange-200",
    role: "Marketing Head",
  },
  {
    quote: "He eliminates the friction between design and engineering by validating designs early.",
    avatarBg: "from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/40 text-cyan-600 dark:text-cyan-200",
    role: "Senior Engineer",
  },
  {
    quote: "Agency life in Singapore is intense. Wira handled the pressure and delivered high-quality assets.",
    avatarBg: "from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/40 dark:to-fuchsia-800/40 text-fuchsia-600 dark:text-fuchsia-200",
    role: "Art Director",
  },
];

export default function ConnectPage() {
  const containerRef = useRef(null);

  const getScrollAmount = () => {
    if (!containerRef.current) return 320;
    const firstCard = containerRef.current.querySelector(".snap-start");
    if (!firstCard) return 320;
    return firstCard.offsetWidth + 16; // card width + gap-4 (16px)
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const renderBullet = () => (
    <svg className="w-1.5 h-1.5 mt-2.5 shrink-0 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3" />
    </svg>
  );

  const renderIconGroup = (items) => (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="relative group aspect-square flex items-center justify-center bg-white dark:bg-zinc-950 rounded-xl p-2.5 border border-zinc-200/60 dark:border-zinc-800 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-600"
        >
          <img src={item.icon} alt={item.name} className="w-full h-full object-contain" loading="lazy" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="w-full max-w-[1600px] px-6 md:px-12 pt-24 pb-12 lg:py-12 space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
        {/* 1. What I solve */}
        <div className="md:col-span-2 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">What I solve</h2>
          <ul className="space-y-3.5 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Reduce UX friction in consumer apps.</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Bridge product thinking + visual execution.</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Gaps between design intent and development reality.</span>
            </li>
          </ul>
        </div>

        {/* 2. How I work */}
        <div className="md:col-span-1 md:row-span-2 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-6 min-h-[300px]">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">How I work</h2>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-700/50 p-4 rounded-2xl flex flex-col gap-3 justify-start">
              <div className="text-3xl">💡</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Why First</p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">Start with the why, not the UI</p>
            </div>
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-700/50 p-4 rounded-2xl flex flex-col gap-3 justify-start">
              <div className="text-3xl">🔒</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Constraints</p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">Design for real constraints, not ideal scenarios</p>
            </div>
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-700/50 p-4 rounded-2xl flex flex-col gap-3 justify-start">
              <div className="text-3xl">🔍</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Clarity</p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">Prefer clarity over decoration</p>
            </div>
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-700/50 p-4 rounded-2xl flex flex-col gap-3 justify-start">
              <div className="text-3xl">🚀</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Velocity</p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">Ship, learn, and iterate fast</p>
            </div>
          </div>
        </div>

        {/* 3. My Impacts */}
        <div className="md:col-span-2 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">My Impacts</h2>
          <ul className="space-y-3.5 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Shipped a consumer app to the App Store as Product Design Lead.</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Worked in a fast paced Singapore & Bali Agency environment for 2+ years.</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Balanced speed, brand consistency, and usability in live projects.</span>
            </li>
          </ul>
        </div>

        {/* 4. My Working Stack */}
        <div className="md:col-span-2 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">My Working Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Design</h3>
              {renderIconGroup(STACK_DESIGN)}
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Tech</h3>
              {renderIconGroup(STACK_TECH)}
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Management</h3>
              {renderIconGroup(STACK_MGMT)}
            </div>
          </div>
        </div>

        {/* 5. Roles I Fit */}
        <div className="md:col-span-1 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">Roles I Fit</h2>
          <ul className="space-y-3.5 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Product Designer</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>UI/UX Designer</span>
            </li>
            <li className="flex items-start gap-3">
              {renderBullet()}
              <span>Marketing Specialist</span>
            </li>
          </ul>
        </div>

        {/* 6. What Teammates Say */}
        <div className="md:col-span-2 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white tracking-tight">What they say</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm focus:outline-none cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-zinc-600 dark:text-zinc-300 transform rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm focus:outline-none cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-zinc-600 dark:text-zinc-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar -mr-8 pr-8"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="snap-start min-w-[280px] md:min-w-[320px] bg-white dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/60 p-5 rounded-2xl flex flex-col gap-4"
              >
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px]">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Ready to work! */}
        <a
          href="mailto:atmanawiera@gmail.com"
          className="md:col-span-1 bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-4 min-h-[200px] group transition-all duration-300 ease-out hover:bg-zinc-900 hover:border-zinc-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black hover:scale-[1.01]"
        >
          <div className="flex justify-between items-start w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors tracking-tight">
              Ready to work!
            </h2>
            <img
              src="/assets/Sidebar Icons/Arrow Up Icon.svg"
              className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert group-hover:invert dark:group-hover:invert-0"
              alt="Contact arrow"
            />
          </div>
          <p className="text-base text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600 transition-colors mt-auto">
            Drop me an email.
          </p>
        </a>
      </section>
    </main>
  );
}
