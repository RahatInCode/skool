import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Catalog - Skool",
  description: "Browse thousands of courses across multiple categories. Find the perfect course to advance your career.",
  openGraph: {
    title: "Course Catalog - Skool",
    description: "Browse thousands of courses across multiple categories.",
    type: "website",
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

