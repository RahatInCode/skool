import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructor Dashboard - Skool",
  description: "Manage your courses, track performance, and engage with your students.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InstructorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

