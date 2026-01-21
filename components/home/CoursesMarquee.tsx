"use client";

import React from "react";

export default function CoursesMarquee() {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Master Full‑Stack Web Development",
      description: "Build modern web applications from frontend to backend",
      icon: "💻",
      gradient: "from-blue-500 to-cyan-500",
      tags: ["React", "Node.js", "APIs"]
    },
    {
      title: "Excel in Data Science & AI",
      description: "Master machine learning and data analysis techniques",
      icon: "📊",
      gradient: "from-purple-500 to-pink-500",
      tags: ["Python", "ML", "Analytics"]
    },
    {
      title: "Become a Pro UI/UX Designer",
      description: "Create beautiful, user-centered digital experiences",
      icon: "🎨",
      gradient: "from-orange-500 to-red-500",
      tags: ["Figma", "Design", "UX"]
    },
    {
      title: "Learn Digital Marketing from Scratch",
      description: "Drive growth with modern marketing strategies",
      icon: "📱",
      gradient: "from-green-500 to-emerald-500",
      tags: ["SEO", "Social", "Ads"]
    },
    {
      title: "Cybersecurity Essentials",
      description: "Protect systems and data from digital threats",
      icon: "🔒",
      gradient: "from-slate-600 to-slate-800",
      tags: ["Security", "Networks", "Ethical Hacking"]
    },
    {
      title: "Cloud Computing Fundamentals",
      description: "Deploy and scale applications in the cloud",
      icon: "☁️",
      gradient: "from-sky-400 to-blue-600",
      tags: ["AWS", "Azure", "DevOps"]
    },
    {
      title: "Mobile App Development Bootcamp",
      description: "Build native and cross-platform mobile apps",
      icon: "📲",
      gradient: "from-indigo-500 to-purple-600",
      tags: ["React Native", "iOS", "Android"]
    },
    {
      title: "Project Management Professional (PMP)",
      description: "Lead projects to success with proven methodologies",
      icon: "📋",
      gradient: "from-amber-500 to-orange-600",
      tags: ["Agile", "Scrum", "Leadership"]
    },
    {
      title: "Creative Writing Workshop",
      description: "Craft compelling stories and engaging content",
      icon: "✍️",
      gradient: "from-rose-500 to-pink-600",
      tags: ["Fiction", "Content", "Storytelling"]
    },
    {
      title: "Photography Masterclass",
      description: "Capture stunning images with professional techniques",
      icon: "📷",
      gradient: "from-violet-500 to-purple-700",
      tags: ["DSLR", "Editing", "Composition"]
    },
    {
      title: "Introduction to Blockchain Technology",
      description: "Understand decentralized systems and cryptocurrencies",
      icon: "⛓️",
      gradient: "from-yellow-500 to-orange-500",
      tags: ["Web3", "Crypto", "Smart Contracts"]
    },
    {
      title: "Artificial Intelligence Basics",
      description: "Explore AI fundamentals and neural networks",
      icon: "🤖",
      gradient: "from-teal-500 to-cyan-600",
      tags: ["Deep Learning", "NLP", "AI Models"]
    },
    {
      title: "Financial Analysis and Modeling",
      description: "Master financial forecasting and valuation techniques",
      icon: "💰",
      gradient: "from-emerald-600 to-green-700",
      tags: ["Excel", "Finance", "Modeling"]
    }
  ];

  return (
    <section className="relative bg-linear-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore Popular Learning Paths
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Curated collections of courses designed to accelerate your career growth
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Hover to pause • {cardData.length} courses available
          </p>
        </div>

        <style>{`
          .marquee-inner {
            animation: marqueeScroll linear infinite;
          }
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .gradient-border {
            position: relative;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 1rem;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }
        `}</style>

        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          {/* Enhanced gradient fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-white via-white/80 to-transparent" />

          <div
            className="marquee-inner flex w-fit py-4"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 3000 + "ms",
            }}
          >
            <div className="flex gap-6">
              {[...cardData, ...cardData].map((card, index) => (
                <div
                  key={index}
                  className="group relative h-80 w-72 shrink-0 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-90`} />
                  
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-between p-6">
                    {/* Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {card.icon}
                      </div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        Popular
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/90 drop-shadow">
                        {card.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button className="mt-4 w-full rounded-lg bg-white/20 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-lg">
                        Explore Course →
                      </button>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                  <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">{cardData.length}+</div>
            <div className="text-sm text-slate-600">Expert-Led Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">50K+</div>
            <div className="text-sm text-slate-600">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">4.8★</div>
            <div className="text-sm text-slate-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">95%</div>
            <div className="text-sm text-slate-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}