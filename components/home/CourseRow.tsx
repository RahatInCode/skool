"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CourseCard from "./CourseCard";
import type { Course } from "@/app/page";

interface Props {
  title: string;
  subtitle?: string;
  courses: Course[];
}

export default function CourseRow({ title, subtitle, courses }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".row-header", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });

      gsap.from(".row-card", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-slate-200/80">
        <div className="row-header mb-4 flex items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
          </div>
          <button className="text-xs font-semibold text-violet-700 hover:text-violet-800">
            View all
          </button>
        </div>

        <div className="-mx-4 overflow-x-auto pb-2">
          <div className="flex gap-4 px-4">
            {courses.map((course) => (
              <div key={course.id} className="row-card">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}