"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Play, Star, Users, TrendingUp, Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const TOPICS = [
  "web development",
  "data science & AI",
  "UX/UI design",
  "product management",
  "cloud engineering",
];

const STATS = [
  { icon: Star, value: "4.9/5", label: "Course rating", color: "text-amber-400" },
  { icon: Users, value: "50k+", label: "Active students", color: "text-sky-400" },
  { icon: TrendingUp, value: "95%", label: "Completion rate", color: "text-emerald-400" },
];

const FEATURES = [
  { icon: Play, text: "On-demand video content" },
  { icon: Award, text: "Industry-recognized certificates" },
  { icon: CheckCircle2, text: "Hands-on projects & quizzes" },
];

export default function ImprovedHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [topicIndex, setTopicIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Rotating topics with smooth transition
  useEffect(() => {
    const id = setInterval(() => setTopicIndex((i) => (i + 1) % TOPICS.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      {/* Animated linear orbs */}
      <div 
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-3xl transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <div 
        className="pointer-events-none absolute right-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-sky-500/25 blur-3xl transition-transform duration-1000"
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      />
      <div 
        className="pointer-events-none absolute bottom-[-100px] left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-500/20 blur-3xl transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size mask-[radial-linear(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-600/20 to-sky-600/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/10">
              <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
              <span className="bg-linear-to-r from-violet-200 to-sky-200 bg-clip-text text-transparent">
                Join 50,000+ learners worldwide
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Master{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent animate-linear">
                    {TOPICS[topicIndex]}
                  </span>
                  <span className="absolute bottom-2 left-0 h-3 w-full bg-linear-to-r from-violet-600/40 to-sky-600/40 blur-lg" />
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 sm:text-xl leading-relaxed">
                Learn from industry experts with interactive courses designed to help you build real-world skills and advance your career.
              </p>
            </div>

            {/* Search Bar */}
            <div className="group">
              <div className={`relative flex items-center gap-3 rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-violet-500 shadow-violet-500/20' : 'shadow-slate-900/50'}`}>
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full rounded-xl border-0 bg-transparent py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-none text-base"
                  />
                </div>
                <button className="group/btn flex items-center gap-2 whitespace-nowrap rounded-xl bg-linear-to-r from-violet-600 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:shadow-violet-600/50 hover:scale-105">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4">
              {FEATURES.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-full bg-slate-800/60 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm ring-1 ring-white/5 transition-all hover:bg-slate-800/80 hover:scale-105"
                >
                  <feature.icon className="h-4 w-4 text-emerald-400" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Course Preview Card */}
          <div className="relative animate-fade-in-delayed">
            {/* Floating elements */}
            <div className="absolute -right-4 -top-4 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-4 shadow-2xl shadow-emerald-500/40 animate-float">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -left-4 top-1/3 rounded-2xl bg-linear-to-br from-violet-500 to-violet-600 p-4 shadow-2xl shadow-violet-500/40 animate-float-delayed">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-800/80 to-slate-900/80 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              {/* Course Thumbnail */}
              <div className="relative h-64 overflow-hidden rounded-2xl bg-linear-to-br from-violet-900 to-slate-900">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group/play rounded-full bg-white/95 p-6 shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white">
                    <Play className="h-8 w-8 fill-violet-600 text-violet-600 transition-transform group-hover/play:scale-110" />
                  </button>
                </div>

                {/* Course Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    LIVE COURSE
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    Full Stack Development Masterclass
                  </h3>
                </div>
              </div>

              {/* Course Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full bg-linear-to-br from-violet-400 to-sky-400 ring-2 ring-slate-900" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">+2.4k students</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-3 py-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-400">4.9</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-semibold text-white">68%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full w-[68%] rounded-full bg-linear-to-r from-violet-500 to-sky-500 animate-pulse" />
                  </div>
                </div>

                <button className="w-full rounded-xl bg-linear-to-r from-violet-600 to-violet-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:shadow-violet-600/50 hover:scale-[1.02]">
                  Continue Learning
                </button>
              </div>
            </div>

            {/* Decorative blur */}
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-violet-500/30 blur-3xl" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes linear {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-linear {
          background-size: 200% auto;
          animation: linear 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.3s forwards;
        }
      `}</style>
    </section>
  );
}