"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { DollarSign, Users, BookOpen, TrendingUp, Edit, Trash2, Plus } from "lucide-react";

const GET_MY_COURSES = gql`
  query GetMyCourses {
    myCourses {
      id
      title
      description
      category
      price
      rating
      ratingCount
      enrolledCount
      difficulty
      thumbnailGradient
      createdAt
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_MY_COURSES }],
  });

  const { data, loading, error } = useQuery<{
    myCourses: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      rating: number;
      ratingCount: number;
      enrolledCount: number;
      difficulty: string;
      thumbnailGradient: string;
      createdAt: string;
    }>;
  }>(GET_MY_COURSES);

  // Mock revenue data
  const totalRevenue = 45230;
  const totalStudents = 1250;
  const totalCourses = data?.myCourses?.length || 0;
  const averageRating = 4.7;

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse({ variables: { id: courseId } });
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  if (!user || user.role !== "INSTRUCTOR") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-slate-600">Access denied. Instructor access required.</p>
        <Link href="/login" className="mt-4 text-indigo-600 hover:underline">
          Sign in as Instructor
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Instructor Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage your courses and track performance</p>
        </div>
        <Link
          href="/instructor/courses/new"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Create Course
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-100 p-3">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            <span className="text-emerald-600">+12.5%</span> from last month
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Students</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {totalStudents.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-sky-100 p-3">
              <Users className="h-6 w-6 text-sky-600" />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            <span className="text-emerald-600">+8.2%</span> from last month
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Courses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{totalCourses}</p>
            </div>
            <div className="rounded-lg bg-emerald-100 p-3">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">Active courses</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Average Rating</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <div className="rounded-lg bg-amber-100 p-3">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">Across all courses</p>
        </div>
      </div>

      {/* Courses List */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">My Courses</h2>
        </div>

        {error && (
          <div className="p-6 text-sm text-red-600">
            Error loading courses: {error.message}
          </div>
        )}

        {!loading && !error && (!data?.myCourses || data.myCourses.length === 0) && (
          <div className="p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-slate-600">No courses yet</p>
            <Link
              href="/instructor/courses/new"
              className="mt-4 inline-block text-indigo-600 hover:underline"
            >
              Create your first course
            </Link>
          </div>
        )}

        {data?.myCourses && data.myCourses.length > 0 && (
          <div className="divide-y divide-slate-200">
            {data.myCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-6 p-6 hover:bg-slate-50 transition"
              >
                <div
                  className={`h-20 w-32 shrink-0 rounded-lg bg-gradient-to-br ${course.thumbnailGradient}`}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-1">
                    {course.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.enrolledCount} students</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      ⭐ {course.rating.toFixed(1)} ({course.ratingCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/instructor/courses/${course.id}/edit`}
                    className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50"
                    aria-label="Edit course"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="rounded-lg border border-red-300 bg-white p-2 text-red-600 hover:bg-red-50"
                    aria-label="Delete course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

