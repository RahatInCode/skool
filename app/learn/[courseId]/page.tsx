"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Play, CheckCircle, FileText, ExternalLink, Code, Video } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      lessons {
        id
        title
        description
        duration
        order
        videoUrl
        resources {
          id
          title
          type
          url
        }
      }
    }
    enrollment(courseId: $id) {
      id
      progress
      completedLessons
    }
  }
`;

const COMPLETE_LESSON = gql`
  mutation CompleteLesson($lessonId: ID!) {
    completeLesson(lessonId: $lessonId)
  }
`;

export default function LearningPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"resources" | "qa">("resources");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string>("");

  // Resolve params
  useEffect(() => {
    params.then((p) => setCourseId(p.courseId));
  }, [params]);

  const { data, loading, error } = useQuery<{
    course: {
      id: string;
      title: string;
      lessons: Array<{
        id: string;
        title: string;
        description?: string;
        duration: number;
        order: number;
        videoUrl?: string;
        resources: Array<{
          id: string;
          title: string;
          type: string;
          url: string;
        }>;
      }>;
    };
    enrollment?: {
      id: string;
      progress: number;
      completedLessons: string[];
    };
  }>(GET_COURSE, {
    variables: { id: courseId },
    skip: !courseId,
  });
  
  const [completeLesson] = useMutation(COMPLETE_LESSON, {
    refetchQueries: [{ query: GET_COURSE, variables: { id: courseId } }],
  });

  const course = data?.course;
  const enrollment = data?.enrollment;
  const lessons = course?.lessons || [];
  const currentLesson = lessons.find((l) => l.id === selectedLesson) || lessons[0];

  const handleCompleteLesson = async (lessonId: string) => {
    try {
      await completeLesson({ variables: { lessonId } });
    } catch (err) {
      console.error("Error completing lesson:", err);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return enrollment?.completedLessons?.includes(lessonId) || false;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "LINK":
        return <ExternalLink className="h-4 w-4" />;
      case "CODE":
        return <Code className="h-4 w-4" />;
      case "VIDEO":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 animate-pulse bg-slate-200" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Course not found</p>
          <Link href="/catalog" className="mt-4 text-indigo-600 hover:underline">
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Please sign in to access this course</p>
          <Link href="/login" className="mt-4 text-indigo-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Video Player Area */}
      <div className="flex flex-1 flex-col bg-slate-900">
        <div className="relative flex-1 bg-black">
          {currentLesson?.videoUrl ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-white">
                <Play className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <p className="text-sm text-slate-400">Video Player</p>
                <p className="mt-2 text-xs text-slate-500">
                  {currentLesson.videoUrl}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <p className="text-sm text-slate-400">No video available</p>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="border-t border-slate-800 bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-semibold">{currentLesson?.title}</h2>
          {currentLesson?.description && (
            <p className="mt-2 text-sm text-slate-400">{currentLesson.description}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-800 bg-slate-900">
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab("resources")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition ${
                activeTab === "resources"
                  ? "border-b-2 border-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition ${
                activeTab === "qa"
                  ? "border-b-2 border-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Q&A
            </button>
          </div>

          <div className="p-6">
            {activeTab === "resources" && (
              <div className="space-y-3">
                {currentLesson?.resources?.length > 0 ? (
                  currentLesson.resources.map((resource: any) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4 text-white hover:border-indigo-500 transition"
                    >
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-xs text-slate-400">{resource.type}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No resources available</p>
                )}
              </div>
            )}

            {activeTab === "qa" && (
              <div className="text-center text-slate-400">
                <p className="text-sm">Q&A section coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-80 border-l border-slate-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-slate-200">
          <Link
            href={`/courses/${courseId}`}
            className="text-sm font-semibold text-slate-900 hover:text-indigo-600"
          >
            ← Back to course
          </Link>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h3>
          {enrollment && (
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-600">
                {enrollment.progress.toFixed(0)}% complete
              </p>
            </div>
          )}
        </div>

        <div className="p-4 space-y-1">
          {lessons.map((lesson: any, index: number) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isActive = lesson.id === (selectedLesson || lessons[0]?.id);

            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`w-full rounded-lg p-3 text-left transition ${
                  isActive
                    ? "bg-indigo-50 border border-indigo-200"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      isActive ? "text-indigo-900" : "text-slate-900"
                    }`}>
                      {index + 1}. {lesson.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {formatDuration(lesson.duration)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {currentLesson && !isLessonCompleted(currentLesson.id) && (
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => handleCompleteLesson(currentLesson.id)}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Mark as Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

