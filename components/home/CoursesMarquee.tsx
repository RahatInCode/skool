"use client";

import Image from "next/image";
import React from "react";

export default function CoursesMarquee() {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Master Full‑Stack Web Development",
      image: "/assets/marquee-web-dev.jpg",
    },
    {
      title: "Excel in Data Science & AI",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Become a Pro UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1604079628040-a7b6a5cb0c46?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Learn Digital Marketing from Scratch",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Explore popular learning paths
            </h2>
            <p className="text-sm text-slate-600">
              Curated collections of courses to help you reach your goals faster.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Hover to pause • Scroll horizontally to browse
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
        `}</style>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          {/* Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-slate-50 via-slate-50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-slate-50 via-slate-50 to-transparent" />

          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 2600 + "ms",
            }}
          >
            <div className="flex">
              {[...cardData, ...cardData].map((card, index) => (
                <div
                  key={index}
                  className="group relative mx-4 h-72 w-64 overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100/40 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={256}
                    height={288}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                  <div className="absolute inset-0 flex items-end p-4">
                    <p className="max-w-[16rem] text-sm font-semibold text-white drop-shadow">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}