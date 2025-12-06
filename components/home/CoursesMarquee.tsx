"use client";
import Image from "next/image";
import React from "react";

export default function CoursesMarquee() {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Master Full-Stack Web Development",
      image: "/assets/marquee-web-dev.jpg", // ✅ local image fixed
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
    <section className="w-full py-16">
      {/* Animation styles */}
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
        className="overflow-hidden w-full relative max-w-7xl mx-auto"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Left Gradient */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />

        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: cardData.length * 2500 + "ms",
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-60 mx-4 h-80 relative group hover:scale-95 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={240}
                  height={320}
                  className="object-cover w-full h-full"
                />

                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/30">
                  <p className="text-white text-lg font-semibold text-center">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Gradient */}
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
