"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Search } from "lucide-react";
import Image from "next/image";

const TOPICS = [
  "web development",
  "data & AI",
  "design",
  "product management",
  "cloud & DevOps",
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [topicIndex, setTopicIndex] = useState(0);

  // Simple rotating topic text
  useEffect(() => {
    const id = setInterval(
      () => setTopicIndex((i) => (i + 1) % TOPICS.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-heading", { y: 28, opacity: 0, duration: 0.7 })
        .from(".hero-subtitle", { y: 24, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-search", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-chip", { y: 16, opacity: 0, stagger: 0.06, duration: 0.4 }, "-=0.25")
        .from(".hero-right", { x: 40, opacity: 0, duration: 0.8 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const activeTopic = TOPICS[topicIndex];

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-slate-900 text-slate-50"
    >
      {/* Soft gradient background like Udemy */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] bottom-[-120px] h-96 w-96 rounded-full bg-sky-500/35 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 lg:flex-row lg:py-16">
        {/* Left side: marketing message */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            New courses every week • Join 40k+ learners
          </div>

          <h1 className="hero-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Learning that{" "}
            <span className="bg-linear-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent">
              moves you forward
            </span>
            .
          </h1>

          <p className="hero-subtitle text-base text-slate-200 sm:text-lg">
            Build job‑ready skills in{" "}
            <span className="font-semibold text-slate-50">
              {activeTopic}
            </span>{" "}
            and beyond with expert‑led courses you can watch anytime, on any
            device.
          </p>

          {/* Search bar */}
          <div className="hero-search">
            <div className="relative mt-2 flex items-center gap-2 rounded-full bg-white/95 p-1.5 text-slate-900 shadow-xl shadow-slate-900/30">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or instructors"
                  className="w-full rounded-full border border-transparent bg-transparent py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none"
                />
              </div>
              <button className="whitespace-nowrap rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">
                Search
              </button>
            </div>
          </div>

          {/* Popular topics */}
          <div className="mt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Popular topics
            </p>
            <div className="flex flex-wrap gap-2">
              {["Web Development", "Data & AI", "Design", "Business", "DevOps"].map(
                (topic) => (
                  <button
                    key={topic}
                    className="hero-chip rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-slate-700/90"
                  >
                    {topic}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Trusted stats */}
          <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-300">
            <div>
              <p className="text-base font-semibold text-white">4.8 / 5</p>
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

        {/* Right side: hero promo card */}
        <div className="hero-right relative w-full max-w-md flex-1">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 backdrop-blur">
            <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-slate-800">
              <Image
                src="/assets/fallback_banner_image_udlite.webp"
                alt="Learn online"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1 text-sm text-slate-50">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Start here
                </p>
                <p className="text-base font-semibold">
                  New to online learning? Explore our most popular beginner
                  courses.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-200">
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Learn at your own pace
                </p>
                <p className="text-sm font-semibold text-white">On‑demand video</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Lifetime access
                </p>
                <p className="text-sm font-semibold text-white">Learn forever</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Certificates
                </p>
                <p className="text-sm font-semibold text-white">
                  Show your progress
                </p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-3xl bg-violet-500/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
}