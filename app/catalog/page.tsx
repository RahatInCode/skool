"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { Filter, Star, Clock, Users } from "lucide-react";
import CourseCard from "@/components/home/CourseCard";
import { CourseCardSkeleton } from "@/components/ui/CourseCardSkeleton";
import type { Course } from "@/app/page";

const GET_COURSES = gql`
  query GetCourses(
    $category: String
    $difficulty: DifficultyLevel
    $minRating: Float
    $maxPrice: Float
    $search: String
  ) {
    courses(
      category: $category
      difficulty: $difficulty
      minRating: $minRating
      maxPrice: $maxPrice
      search: $search
    ) {
      id
      title
      description
      instructor {
        name
      }
      category
      price
      oldPrice
      rating
      ratingCount
      difficulty
      duration
      thumbnailGradient
      badge
      enrolledCount
    }
  }
`;

export default function CatalogPage() {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery<{
    courses: Array<{
      id: string;
      title: string;
      description: string;
      instructor: { name: string };
      category: string;
      price: number;
      oldPrice?: number;
      rating: number;
      ratingCount: number;
      difficulty: string;
      duration: number;
      thumbnailGradient: string;
      badge?: string;
      enrolledCount: number;
    }>;
  }>(GET_COURSES, {
    variables: {
      category: category || undefined,
      difficulty: difficulty || undefined,
      minRating: minRating || undefined,
      maxPrice: maxPrice || undefined,
      search: search || undefined,
    },
  });

  const courses: Course[] =
    data?.courses?.map((c) => ({
      id: parseInt(c.id),
      title: c.title,
      instructor: c.instructor.name,
      rating: c.rating,
      ratingCount: c.ratingCount,
      price: `$${c.price.toFixed(2)}`,
      oldPrice: c.oldPrice ? `$${c.oldPrice.toFixed(2)}` : undefined,
      badge: c.badge,
      category: c.category,
      thumbnailGradient: c.thumbnailGradient,
    })) || [];

  const categories = [
    "Web Development",
    "Data & AI",
    "Design",
    "Business",
    "Cloud & DevOps",
    "Productivity",
    "Marketing",
    "Personal Development",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Course Catalog</h1>
        <p className="mt-2 text-slate-600">
          Discover thousands of courses to advance your career
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                aria-label="Filter by difficulty"
              >
                <option value="">All Levels</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={minRating || ""}
                onChange={(e) =>
                  setMinRating(e.target.value ? parseFloat(e.target.value) : null)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                aria-label="Filter by minimum rating"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Price
              </label>
              <select
                value={maxPrice || ""}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                aria-label="Filter by maximum price"
              >
                <option value="">Any Price</option>
                <option value="10">Under $10</option>
                <option value="20">Under $20</option>
                <option value="50">Under $50</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setCategory("");
                setDifficulty("");
                setMinRating(null);
                setMaxPrice(null);
                setSearch("");
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              aria-label="Search courses"
            />
          </div>

          {/* Results */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Error loading courses: {error.message}
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-slate-600">No courses found. Try adjusting your filters.</p>
            </div>
          )}

          {!loading && !error && courses.length > 0 && (
            <>
              <p className="mb-4 text-sm text-slate-600">
                Found {courses.length} course{courses.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <CourseCard course={course} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

