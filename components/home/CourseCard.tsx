import type { Course } from "@/app/page";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="w-60 shrink-0 rounded-xl border border-slate-200/70 bg-white/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-t-xl bg-slate-800 bg-linear-to-br ${course.thumbnailGradient}`}
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-soft-light" />
      </div>

      <div className="space-y-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          {course.title}
        </h3>

        <p className="text-xs text-slate-600">{course.instructor}</p>

        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold text-amber-500">
            {course.rating.toFixed(1)}
          </span>
          <span className="text-amber-500">★</span>
          <span className="text-slate-500">
            ({course.ratingCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>{course.price}</span>
          {course.oldPrice && (
            <span className="text-xs font-normal text-slate-500 line-through">
              {course.oldPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
            {course.category}
          </span>

          {course.badge && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              {course.badge}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}