import { Metadata } from "next";
import CourseDetailClient from "./CourseDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  // In a real app, fetch course data here using the course ID
  // For now, we'll use dynamic metadata
  const courseTitle = "Course Title"; // Would be fetched from API
  const courseDescription = "Learn practical skills with expert-led courses";
  
  return {
    title: `${courseTitle} - Skool`,
    description: courseDescription,
    openGraph: {
      title: `${courseTitle} - Skool`,
      description: courseDescription,
      type: "website",
      url: `https://skool.com/courses/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${courseTitle} - Skool`,
      description: courseDescription,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CourseDetailClient courseId={id} />;
}

