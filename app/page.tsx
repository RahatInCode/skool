import CourseRow from "@/components/home/CourseRow";
import CoursesMarquee from "@/components/home/CoursesMarquee";
import Hero from "@/components/home/Hero";

export type Course = {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  ratingCount: number;
  price: string;
  oldPrice?: string;
  badge?: string;
  category: string;
  thumbnailGradient: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Modern React & TypeScript Bootcamp",
    instructor: "Sarah Lin",
    rating: 4.8,
    ratingCount: 12431,
    price: "$14.99",
    oldPrice: "$89.99",
    badge: "Bestseller",
    category: "Web Development",
    thumbnailGradient: "from-indigo-500 via-sky-500 to-emerald-400",
  },
  {
    id: 2,
    title: "Python for Data & Machine Learning",
    instructor: "James Cole",
    rating: 4.7,
    ratingCount: 9872,
    price: "$12.99",
    oldPrice: "$79.99",
    badge: "Highest rated",
    category: "Data & AI",
    thumbnailGradient: "from-rose-500 via-fuchsia-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Figma to Dev: Product Design Essentials",
    instructor: "Anita Roy",
    rating: 4.6,
    ratingCount: 3182,
    price: "$9.99",
    oldPrice: "$59.99",
    category: "Design",
    thumbnailGradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: 4,
    title: "Next.js Full‑Stack Fundamentals",
    instructor: "Carlos Diaz",
    rating: 4.8,
    ratingCount: 4510,
    price: "$16.99",
    oldPrice: "$99.99",
    badge: "New",
    category: "Web Development",
    thumbnailGradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: 5,
    title: "Practical SQL & Database Design",
    instructor: "Mia Novak",
    rating: 4.5,
    ratingCount: 2841,
    price: "$11.99",
    oldPrice: "$59.99",
    category: "Data",
    thumbnailGradient: "from-sky-500 via-indigo-500 to-purple-500",
  },
  {
    id: 6,
    title: "Intro to Cloud with Docker & Kubernetes",
    instructor: "Alex Green",
    rating: 4.6,
    ratingCount: 5230,
    price: "$15.99",
    oldPrice: "$89.99",
    category: "DevOps",
    thumbnailGradient: "from-slate-700 via-slate-500 to-sky-500",
  },
  {
    id: 7,
    title: "JavaScript From Zero to Hero",
    instructor: "Priya Shah",
    rating: 4.7,
    ratingCount: 16341,
    price: "$13.99",
    oldPrice: "$84.99",
    badge: "Bestseller",
    category: "Web Development",
    thumbnailGradient: "from-purple-500 via-violet-500 to-indigo-500",
  },
  {
    id: 8,
    title: "Foundations of Product Management",
    instructor: "Mark Liu",
    rating: 4.5,
    ratingCount: 2104,
    price: "$10.99",
    oldPrice: "$69.99",
    category: "Business",
    thumbnailGradient: "from-lime-500 via-emerald-500 to-cyan-500",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trusted by / stats */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Trusted by teams at
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
              <span>Acme Corp</span>
              <span>Nova Labs</span>
              <span>DevHub</span>
              <span>Cloudify</span>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <div>
              <p className="text-base font-semibold text-slate-900">10k+</p>
              <p>Learners enrolled</p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">1,200+</p>
              <p>Expert‑led lessons</p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">4.8 / 5</p>
              <p>Average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top categories */}
      <section className="bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Top categories</h2>
              <p className="text-sm text-slate-600">
                Choose a category to start exploring courses.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Web Development",
              "Data & AI",
              "Design",
              "Business",
              "Cloud & DevOps",
              "Productivity",
              "Marketing",
              "Personal Development",
            ].map((cat) => (
              <button
                key={cat}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span>{cat}</span>
                <span className="text-xs text-slate-400">›</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CoursesMarquee />

      <CourseRow
        title="Students are viewing"
        subtitle="The most popular courses on Skool right now."
        courses={courses}
      />

      <CourseRow
        title="Recommended for you"
        subtitle="Hand‑picked courses across categories."
        courses={courses}
      />

      <CourseRow
        title="Popular in Web Development"
        subtitle="Stay up‑to‑date with modern web stacks."
        courses={courses.filter((c) => c.category === "Web Development")}
      />

      <CourseRow
        title="Short and practical courses"
        subtitle="Bite‑sized content you can finish this week."
        courses={courses.slice(2, 8)}
      />
    </>
  );
}