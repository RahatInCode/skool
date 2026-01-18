import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    avatar: String
  }

  enum UserRole {
    ADMIN
    INSTRUCTOR
    STUDENT
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    instructor: User!
    category: String!
    price: Float!
    oldPrice: Float
    rating: Float!
    ratingCount: Int!
    difficulty: DifficultyLevel!
    duration: Int! # in minutes
    thumbnailUrl: String
    thumbnailGradient: String
    badge: String
    lessons: [Lesson!]!
    enrolledCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  enum DifficultyLevel {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  type Lesson {
    id: ID!
    courseId: ID!
    title: String!
    description: String
    duration: Int! # in minutes
    videoUrl: String
    order: Int!
    resources: [Resource!]!
    completed: Boolean # for enrolled students
  }

  type Resource {
    id: ID!
    lessonId: ID!
    title: String!
    type: ResourceType!
    url: String!
  }

  enum ResourceType {
    PDF
    LINK
    CODE
    VIDEO
  }

  type Enrollment {
    id: ID!
    userId: ID!
    courseId: ID!
    course: Course!
    progress: Float! # percentage 0-100
    completedLessons: [ID!]!
    enrolledAt: String!
  }

  type Query {
    courses(
      category: String
      difficulty: DifficultyLevel
      minRating: Float
      maxPrice: Float
      search: String
    ): [Course!]!
    course(id: ID!): Course
    myEnrollments: [Enrollment!]!
    enrollment(courseId: ID!): Enrollment
    myCourses: [Course!]! # for instructors
    users: [User!]! # for admins
  }

  type Mutation {
    enrollCourse(courseId: ID!): Enrollment!
    completeLesson(lessonId: ID!): Boolean!
    createCourse(input: CreateCourseInput!): Course!
    updateCourse(id: ID!, input: UpdateCourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
  }

  input CreateCourseInput {
    title: String!
    description: String!
    category: String!
    price: Float!
    difficulty: DifficultyLevel!
    thumbnailGradient: String
  }

  input UpdateCourseInput {
    title: String
    description: String
    category: String
    price: Float
    difficulty: DifficultyLevel
    thumbnailGradient: String
  }
`;

// Mock data
const mockInstructor = {
  id: "2",
  name: "Sarah Lin",
  email: "instructor@skool.com",
  role: "INSTRUCTOR",
  avatar: "SL",
};

const mockCourses = [
  {
    id: "1",
    title: "Modern React & TypeScript Bootcamp",
    description:
      "Master React and TypeScript with hands-on projects. Build real-world applications and learn best practices from industry experts.",
    instructor: mockInstructor,
    category: "Web Development",
    price: 14.99,
    oldPrice: 89.99,
    rating: 4.8,
    ratingCount: 12431,
    difficulty: "INTERMEDIATE",
    duration: 1240,
    thumbnailGradient: "from-indigo-500 via-sky-500 to-emerald-400",
    badge: "Bestseller",
    enrolledCount: 45230,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-20T00:00:00Z",
    lessons: [
      {
        id: "1-1",
        courseId: "1",
        title: "Introduction to React",
        description: "Learn the fundamentals of React",
        duration: 45,
        videoUrl: "https://example.com/video1.mp4",
        order: 1,
        resources: [],
        completed: false,
      },
      {
        id: "1-2",
        courseId: "1",
        title: "TypeScript Basics",
        description: "Understanding TypeScript types and interfaces",
        duration: 60,
        videoUrl: "https://example.com/video2.mp4",
        order: 2,
        resources: [
          {
            id: "r1",
            lessonId: "1-2",
            title: "TypeScript Cheat Sheet",
            type: "PDF",
            url: "https://example.com/ts-cheatsheet.pdf",
          },
        ],
        completed: false,
      },
    ],
  },
  {
    id: "2",
    title: "Python for Data & Machine Learning",
    description:
      "Comprehensive course on Python programming for data science and machine learning applications.",
    instructor: {
      id: "4",
      name: "James Cole",
      email: "james@skool.com",
      role: "INSTRUCTOR",
      avatar: "JC",
    },
    category: "Data & AI",
    price: 12.99,
    oldPrice: 79.99,
    rating: 4.7,
    ratingCount: 9872,
    difficulty: "BEGINNER",
    duration: 980,
    thumbnailGradient: "from-rose-500 via-fuchsia-500 to-indigo-500",
    badge: "Highest rated",
    enrolledCount: 32100,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
    lessons: [
      {
        id: "2-1",
        courseId: "2",
        title: "Python Fundamentals",
        description: "Getting started with Python",
        duration: 50,
        videoUrl: "https://example.com/python1.mp4",
        order: 1,
        resources: [],
        completed: false,
      },
    ],
  },
  {
    id: "3",
    title: "Figma to Dev: Product Design Essentials",
    description:
      "Learn how to translate design mockups into production-ready code.",
    instructor: {
      id: "5",
      name: "Anita Roy",
      email: "anita@skool.com",
      role: "INSTRUCTOR",
      avatar: "AR",
    },
    category: "Design",
    price: 9.99,
    oldPrice: 59.99,
    rating: 4.6,
    ratingCount: 3182,
    difficulty: "INTERMEDIATE",
    duration: 720,
    thumbnailGradient: "from-amber-500 via-orange-500 to-rose-500",
    enrolledCount: 12800,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-03-18T00:00:00Z",
    lessons: [],
  },
  {
    id: "4",
    title: "Next.js Full‑Stack Fundamentals",
    description:
      "Build modern full-stack applications with Next.js, React, and TypeScript.",
    instructor: {
      id: "6",
      name: "Carlos Diaz",
      email: "carlos@skool.com",
      role: "INSTRUCTOR",
      avatar: "CD",
    },
    category: "Web Development",
    price: 16.99,
    oldPrice: 99.99,
    rating: 4.8,
    ratingCount: 4510,
    difficulty: "ADVANCED",
    duration: 1560,
    thumbnailGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badge: "New",
    enrolledCount: 18900,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-20T00:00:00Z",
    lessons: [],
  },
];

const mockEnrollments: any[] = [];

const mockUsers: Record<string, any> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@skool.com",
    role: "ADMIN",
    avatar: "A",
  },
  instructor: {
    id: "2",
    name: "Sarah Lin",
    email: "instructor@skool.com",
    role: "INSTRUCTOR",
    avatar: "SL",
  },
  student: {
    id: "3",
    name: "John Doe",
    email: "student@skool.com",
    role: "STUDENT",
    avatar: "JD",
  },
};

export const resolvers = {
  Query: {
    courses: (_: any, args: any) => {
      let filtered = [...mockCourses];

      if (args.category) {
        filtered = filtered.filter((c) => c.category === args.category);
      }
      if (args.difficulty) {
        filtered = filtered.filter((c) => c.difficulty === args.difficulty);
      }
      if (args.minRating) {
        filtered = filtered.filter((c) => c.rating >= args.minRating);
      }
      if (args.maxPrice) {
        filtered = filtered.filter((c) => c.price <= args.maxPrice);
      }
      if (args.search) {
        const searchLower = args.search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.title.toLowerCase().includes(searchLower) ||
            c.description.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    course: (_: any, args: any) => {
      return mockCourses.find((c) => c.id === args.id);
    },
    myEnrollments: () => {
      return mockEnrollments;
    },
    enrollment: (_: any, args: any) => {
      return mockEnrollments.find((e) => e.courseId === args.courseId);
    },
    myCourses: () => {
      // Return courses created by current instructor
      return mockCourses.filter((c) => c.instructor.id === "2");
    },
    users: () => {
      return Object.values(mockUsers);
    },
  },
  Mutation: {
    enrollCourse: (_: any, args: any) => {
      const course = mockCourses.find((c) => c.id === args.courseId);
      if (!course) throw new Error("Course not found");

      const enrollment = {
        id: `enroll-${Date.now()}`,
        userId: "3", // current user
        courseId: args.courseId,
        course,
        progress: 0,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
      };

      mockEnrollments.push(enrollment);
      return enrollment;
    },
    completeLesson: (_: any, args: any) => {
      const enrollment = mockEnrollments[0];
      if (enrollment && !enrollment.completedLessons.includes(args.lessonId)) {
        enrollment.completedLessons.push(args.lessonId);
        const totalLessons = enrollment.course.lessons.length;
        enrollment.progress = Math.min(
          100,
          (enrollment.completedLessons.length / totalLessons) * 100
        );
      }
      return true;
    },
    createCourse: (_: any, args: any) => {
      const newCourse = {
        id: String(mockCourses.length + 1),
        ...args.input,
        instructor: mockInstructor,
        rating: 0,
        ratingCount: 0,
        duration: 0,
        enrolledCount: 0,
        lessons: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockCourses.push(newCourse);
      return newCourse;
    },
    updateCourse: (_: any, args: any) => {
      const course = mockCourses.find((c) => c.id === args.id);
      if (!course) throw new Error("Course not found");

      Object.assign(course, args.input);
      course.updatedAt = new Date().toISOString();
      return course;
    },
    deleteCourse: (_: any, args: any) => {
      const index = mockCourses.findIndex((c) => c.id === args.id);
      if (index === -1) return false;
      mockCourses.splice(index, 1);
      return true;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

