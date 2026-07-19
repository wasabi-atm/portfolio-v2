"use client";

import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import ScrollReveal from "@/components/ScrollReveal";

const PROJECTS = [
  {
    id: "clamby",
    title: "Clamby",
    description: "An AI powered fashion mix-and-match app.",
    role: "Product Design Lead",
    components: "100+",
    tokens: "30+",
    interviews: "15",
    link: "https://clamby.id",
    caseStudySlug: "carma-case-study",
    videoPreview: "/assets/ClambyCommercial1.webm",
    videoMain: "/assets/Clamby/Clamby%20Achievement.webm",
    video1: "/assets/Clamby/Clamby%20Data%201.webm",
    video2: "/assets/Clamby/Clamby%20Data%202.webm",
    video3: "/assets/Clamby/Clamby%20Data%203.webm",
    video4: "/assets/Clamby/Clamby%20Data%204.webm",
  },
  {
    id: "carte1-1",
    title: "Carte 1.1",
    description: "Improving Notification UX, Camera Control, and unified connection experience.",
    role: "Product Design Lead",
    interviews: "6",
    users: "200+",
    model: "Subscription Model",
    link: "https://carte.wirawibisana.com",
    appStoreLink: "https://apps.apple.com/app/carte-digital-business-card/id6504692823",
    caseStudySlug: "carte-1-1-update",
    videoPreview: "/assets/Carte1point1.webm",
    videoMain: "/assets/Carte_1-1/Carte%201-1%20Achievement.webm",
    video1: "/assets/Carte_1-1/Carte%201-1%20Data%201.webm",
    video2: "/assets/Carte_1-1/Carte%201-1%20Data%202.webm",
    video3: "/assets/Carte_1-1/Carte%201-1%20Data%203.webm",
    video4: "/assets/Carte_1-1/Carte%201-1%20Data%204.webm",
  },
  {
    id: "carte",
    title: "Carte",
    description: "A Private Business Card Scanner with Apple Intelligence.",
    role: "Product Design Lead",
    interviews: "8",
    rank: "#4 in Business",
    timeline: "4 Months",
    link: "https://carte.wirawibisana.com",
    appStoreLink: "https://apps.apple.com/app/carte-digital-business-card/id6504692823",
    caseStudySlug: "carte-case-study",
    videoPreview: "/assets/Carte.webm",
    videoMain: "/assets/Carte/Carte%20Achievement.webm",
    video1: "/assets/Carte/Carte%20Data%201.png",
    video2: "/assets/Carte/Carte%20Data%202.webm",
    video3: "/assets/Carte/Carte%20Data%203.webm",
    video4: "/assets/Carte/Carte%20Data%204.webm",
  },
  {
    id: "stoa",
    title: "Stoa",
    description: "An accessibility-first mindfulness app rooted in Stoic philosophy.",
    role: "UI/UX Designer",
    interviews: "6",
    accessibility: "Reduce Motion",
    timeline: "6 Weeks",
    link: "https://www.figma.com/proto/ccXT3GMwSinknd4kXK7u8q/Challenge-3---Team-8?node-id=1004-4173&t=WpjYElmg4kDvKEqh-1",
    linkLabel: "Prototype",
    caseStudySlug: "stoa-case-study",
    videoPreview: "/assets/Stoa%20Showcase%20Nue.webm",
    videoMain: "/assets/Stoa/Stoa%20Achievement.webm",
    video1: "/assets/Stoa/Stoa%20Data%201.webm",
    video2: "/assets/Stoa/Stoa%20Data%202.webm",
    video3: "/assets/Stoa/Stoa%20Data%203.webm",
    video4: "/assets/Stoa/Stoa%20Data%204.webm",
  },
  {
    id: "swisekai",
    title: "SwiSekai",
    description: "An ultra-responsive macOS companion for learning programming in Swift.",
    role: "Product Designer",
    lessons: "32 Lessons",
    platform: "macOS",
    projects: "20+",
    link: "https://swiftsekai.framer.website",
    caseStudySlug: "swisekai-blog",
    videoPreview: "/assets/Swisekai%20Showcase%20Neu.webm",
    videoMain: "/assets/SwiSekai/SwiSekai%20Achievement.webm",
    video1: "/assets/SwiSekai/SwiSekai%20Data%201.webm",
    video2: "/assets/SwiSekai/SwiSekai%20Data%202.webm",
    video3: "/assets/SwiSekai/SwiSekai%20Data%203.webm",
    video4: "/assets/SwiSekai/SwiSekai%20Data%204.webm",
  },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="w-full max-w-[1600px] px-6 md:px-12 pt-24 pb-12 lg:py-12 space-y-16 lg:space-y-8">
      {/* 1. Featured Project: Clamby */}
      {PROJECTS.filter((p) => p.id === "clamby").map((project) => (
        <ScrollReveal key={project.id}>
          <button
            onClick={() => setSelectedProject(project)}
            className="group block text-left space-y-4 w-full cursor-pointer"
          >
            {/* Media Card */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 w-full aspect-[1028/590] relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none">
              <video
                className="block w-full h-full object-cover"
                src={project.videoPreview}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={`${project.title} commercial demo`}
              />
            </div>
            {/* Text Card */}
            <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col gap-6 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none">
              <div className="flex justify-between items-start w-full">
                <div className="space-y-1">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                    {project.description}
                  </div>
                </div>
                <div className="p-1">
                  <img
                    src="/assets/Sidebar Icons/Arrow Up Icon.svg"
                    className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert"
                    alt="View project"
                  />
                </div>
              </div>
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">My Role</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.role}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Design Components</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.components}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Brand Tokens</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.tokens}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">User Interviews</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.interviews}</span>
                </div>
              </div>
            </div>
          </button>
        </ScrollReveal>
      ))}

      {/* 2. Grid Projects: Row 1 - Carte 1.1 */}
      {PROJECTS.filter((p) => p.id === "carte1-1").map((project) => (
        <ScrollReveal key={project.id}>
          <button
            onClick={() => setSelectedProject(project)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-4 text-left w-full cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 aspect-[1028/590] lg:aspect-square relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none">
              <video className="block w-full h-full object-cover" src={project.videoPreview} autoPlay muted loop playsInline loading="lazy" preload="none" aria-label={`${project.title} demo`} />
            </div>
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none h-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-tight">{project.title}</h3>
                  <img src="/assets/Sidebar Icons/Arrow Up Icon.svg" className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert" alt="View project" />
                </div>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">My Role</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.role}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">User Interviews</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.interviews}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Users Gained</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.users}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Business Model</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.model}</span>
                </div>
              </div>
            </div>
          </button>
        </ScrollReveal>
      ))}

      {/* Row 2 - Carte */}
      {PROJECTS.filter((p) => p.id === "carte").map((project) => (
        <ScrollReveal key={project.id}>
          <button
            onClick={() => setSelectedProject(project)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-4 text-left w-full cursor-pointer"
          >
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none h-full order-2 lg:order-1">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-tight">{project.title}</h3>
                  <img src="/assets/Sidebar Icons/Arrow Up Icon.svg" className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert" alt="View project" />
                </div>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">My Role</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.role}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">User Interviews</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.interviews}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">App Store Rank</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.rank}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Project Timeline</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.timeline}</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 aspect-[1028/590] lg:aspect-square relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none order-1 lg:order-2">
              <video className="block w-full h-full object-cover" src={project.videoPreview} autoPlay muted loop playsInline loading="lazy" preload="none" aria-label={`${project.title} demo`} />
            </div>
          </button>
        </ScrollReveal>
      ))}

      {/* Row 3 - Stoa */}
      {PROJECTS.filter((p) => p.id === "stoa").map((project) => (
        <ScrollReveal key={project.id}>
          <button
            onClick={() => setSelectedProject(project)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-4 text-left w-full cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 aspect-[1028/590] lg:aspect-square relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none">
              <video className="block w-full h-full object-cover" src={project.videoPreview} autoPlay muted loop loading="lazy" playsInline preload="none" aria-label={`${project.title} demo`} />
            </div>
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none h-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-tight">{project.title}</h3>
                  <img src="/assets/Sidebar Icons/Arrow Up Icon.svg" className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert" alt="View project" />
                </div>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">My Role</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.role}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">User Interviews</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.interviews}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Accessibility</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.accessibility}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Project Timeline</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.timeline}</span>
                </div>
              </div>
            </div>
          </button>
        </ScrollReveal>
      ))}

      {/* Row 4 - SwiSekai */}
      {PROJECTS.filter((p) => p.id === "swisekai").map((project) => (
        <ScrollReveal key={project.id}>
          <button
            onClick={() => setSelectedProject(project)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-4 text-left w-full cursor-pointer"
          >
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none h-full order-2 lg:order-1">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-tight">{project.title}</h3>
                  <img src="/assets/Sidebar Icons/Arrow Up Icon.svg" className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 dark:invert" alt="View project" />
                </div>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">My Role</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.role}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Curriculum</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.lessons}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Platform</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.platform}</span>
                </div>
                <div className="p-3 lg:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-start justify-center gap-1 min-h-[90px]">
                  <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">User Projects</span>
                  <span className="text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.projects}</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 aspect-[1028/590] lg:aspect-square relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 motion-reduce:transform-none order-1 lg:order-2">
              <video className="block w-full h-full object-cover" src={project.videoPreview} autoPlay muted loop loading="lazy" playsInline preload="none" poster="/assets/Swisekai.webp" aria-label={`${project.title} demo`} />
            </div>
          </button>
        </ScrollReveal>
      ))}

      {/* Project Quick View Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </main>
  );
}
