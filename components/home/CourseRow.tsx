// components/home/CourseRow.tsx
import CourseCard from "./CourseCard";
import type { Course } from "@/app/page";

interface Props {
  title: string;
  subtitle?: string;
  courses: Course[];
}

export default function CourseRow({ title, subtitle, courses }: Props) {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-sm text-slate-600">{subtitle}</p>
            )}
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
            View all
          </button>
        </div>

        <div className="-mx-4 overflow-x-auto pb-2">
          <div className="flex gap-4 px-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}