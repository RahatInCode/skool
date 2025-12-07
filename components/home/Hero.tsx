"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { gsap } from "gsap";

const heroCategories = [
  "Web Development",
  "Data & AI",
  "Design",
  "Business",
  "Cloud & DevOps",
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.7 },
      });

      tl.from(".hero-badge", { y: 20, opacity: 0 })
        .from(".hero-title", { y: 24, opacity: 0 }, "-=0.45")
        .from(".hero-subtitle", { y: 20, opacity: 0 }, "-=0.4")
        .from(".hero-search", { y: 20, opacity: 0 }, "-=0.35")
        .from(".hero-chip", { y: 18, opacity: 0, stagger: 0.06 }, "-=0.35")
        .from(".hero-card", { x: 40, opacity: 0 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-b border-slate-200/70 bg-slate-900 text-slate-50"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-violet-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-[-120px] h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-10 lg:flex-row lg:py-14">
        {/* Left content */}
        <div className="relative z-10 max-w-xl space-y-5">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            New courses every week • Join 40k+ learners
          </div>

          <h1 className="hero-title text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Learning that <span className="text-violet-300">gets you hired</span>
          </h1>

          <p className="hero-subtitle text-base text-slate-200 sm:text-lg">
            Build practical, portfolio‑ready skills with project‑based courses
            led by industry experts. Learn on your schedule, from anywhere.
          </p>

          {/* Search bar */}
          <div className="hero-search">
            <div className="relative flex items-center gap-2 rounded-full bg-white/95 p-1.5 shadow-lg shadow-slate-950/20">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="w-full rounded-full border border-transparent bg-transparent py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none"
                />
              </div>
              <button className="whitespace-nowrap rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">
                Search
              </button>
            </div>
          </div>

          {/* Popular topics */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-200/90">
            <span className="text-[11px] uppercase tracking-wide text-slate-400">
              Popular topics:
            </span>
            {heroCategories.map((cat) => (
              <button
                key={cat}
                className="hero-chip rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium hover:border-violet-400/60 hover:bg-violet-500/20"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-2 text-xs text-slate-300">
            <div>
              <p className="text-base font-semibold text-white">4.8/5</p>
              <p className="mt-0.5 text-xs text-slate-400">Average course rating</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">1,200+</p>
              <p className="mt-0.5 text-xs text-slate-400">Hands‑on lessons</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">40k+</p>
              <p className="mt-0.5 text-xs text-slate-400">Active learners</p>
            </div>
          </div>
        </div>

        {/* Right side “continue learning” card */}
        <div className="hero-card relative w-full max-w-md flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold">
                SK
              </div>
              <div>
                <p className="text-xs text-slate-400">Welcome back</p>
                <p className="text-sm font-semibold text-white">
                  Continue learning, Ahmed
                </p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                45% complete
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/60 p-3">
                <div className="h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                  <Image
                    src="/assets/fallback_banner_image_udlite.webp"
                    alt="Featured course"
                    width={160}
                    height={90}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">
                    Next.js Full‑Stack Fundamentals
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Carlos Diaz • 26 of 54 lessons
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700">
                    <div className="h-1.5 w-1/2 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-slate-300">
                <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Learning streak
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">7 days</p>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Time this week
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">3h 24m</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-3xl bg-violet-500/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
}