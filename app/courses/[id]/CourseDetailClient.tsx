"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import { Star, Clock, Users, CheckCircle, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";

const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      instructor {
        id
        name
        email
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
      lessons {
        id
        title
        description
        duration
        order
        resources {
          id
          title
          type
          url
        }
      }
    }
  }
`;

const ENROLL_COURSE = gql`
  mutation EnrollCourse($courseId: ID!) {
    enrollCourse(courseId: $courseId) {
      id
      progress
    }
  }
`;

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const { data, loading, error } = useQuery<{
    course: {
      id: string;
      title: string;
      description: string;
      instructor: { id: string; name: string; email: string };
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
      lessons: Array<{
        id: string;
        title: string;
        description?: string;
        duration: number;
        order: number;
        resources: Array<{
          id: string;
          title: string;
          type: string;
          url: string;
        }>;
      }>;
    };
  }>(GET_COURSE, {
    variables: { id: courseId },
  });
  const [enrollCourse] = useMutation(ENROLL_COURSE);

  const course = data?.course;

  const handleEnroll = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    try {
      await enrollCourse({ variables: { courseId } });
      setEnrolled(true);
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Course not found
        </div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`relative h-64 w-full overflow-hidden rounded-2xl bg-linear-to-br ${course.thumbnailGradient}`}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>
            <p className="mt-2 text-slate-600">{course.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">
                {course.rating.toFixed(1)}
              </span>
              <span>({course.ratingCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.enrolledCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {course.difficulty}
            </span>
          </div>

          {/* Curriculum */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Curriculum</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:border-indigo-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{lesson.title}</h3>
                      {lesson.description && (
                        <p className="text-sm text-slate-600">{lesson.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">
                      {formatDuration(lesson.duration)}
                    </span>
                    {enrolled ? (
                      <Link
                        href={`/learn/${courseId}/lesson/${lesson.id}`}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        <Play className="inline h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-400">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">
                {course.oldPrice ? (
                  <>
                    <span className="text-slate-500 line-through">
                      ${course.oldPrice.toFixed(2)}
                    </span>{" "}
                    <span>${course.price.toFixed(2)}</span>
                  </>
                ) : (
                  `$${course.price.toFixed(2)}`
                )}
              </div>
            </div>

            {enrolled ? (
              <Link
                href={`/learn/${courseId}`}
                className="block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Continue Learning
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Enroll Now
              </button>
            )}

            <div className="space-y-3 border-t border-slate-200 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-xs font-semibold text-slate-700">Instructor</p>
              <p className="mt-1 text-sm text-slate-900">{course.instructor.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

