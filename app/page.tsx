// app/page.tsx
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
    category: "Data Science",
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
      <div className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <section className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Let&apos;s start learning
                </h2>
                <p className="text-sm text-slate-600">
                  Jump back into your current courses or explore something new.
                </p>
              </div>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                My learning
              </button>
            </div>
          </section>
        </div>
      </div>
<CoursesMarquee />
      <CourseRow
        title="Keep learning where you left off"
        subtitle="Continue your active courses."
        courses={courses.slice(0, 4)}
      />

      <CourseRow
        title="Recommended for you"
        subtitle="Personalized picks based on your interests."
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