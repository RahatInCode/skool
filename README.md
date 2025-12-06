Skool

A modern, SEO-friendly Learning Management System (LMS) built with Next.js, TypeScript, Tailwind CSS, and GraphQL, optimized for performance, accessibility, and personalized course delivery.

Table of Contents

Overview

Features

Tech Stack

Setup & Installation

Folder Structure

Usage

Accessibility

Contributing

License

Overview

Skool is a modern Learning Management System designed for seamless course browsing and personalized learning experiences. It leverages server-side rendering (SSR) and static site generation (SSG) for SEO-critical content while providing a responsive, fast, and accessible interface.

Features

SEO-optimized home page and course listings

Personalized course recommendations

Responsive and dark-mode-ready design

Fast and efficient data fetching with GraphQL

Optimized images using Next.js Image component or S3/CloudFront

Keyboard navigation and semantic markup for accessibility

Easy-to-extend component architecture using Tailwind CSS + shadcn/ui

Tech Stack

Framework: Next.js (TypeScript)

Styling: Tailwind CSS + shadcn/ui

Data: GraphQL (Apollo Client / URQL)

State Management: Local component state + React Context + Apollo/URQL caching

Media: Next.js Image optimization or S3/CloudFront signed URLs

Accessibility: ARIA, semantic HTML, keyboard navigation

Setup & Installation

Clone the repository:

git clone https://github.com/yourusername/skool.git
cd skool


Install dependencies:

npm install


Configure environment variables:

NEXT_PUBLIC_GRAPHQL_ENDPOINT=<your_graphql_endpoint>
NEXT_PUBLIC_S3_URL=<your_s3_url_if_any>


Run the development server:

npm run dev


Open http://localhost:3000
 to view it in the browser.

Folder Structure
/skool
├─ /components    # Reusable UI components
├─ /pages         # Next.js pages
├─ /graphql       # GraphQL queries and mutations
├─ /context       # React context for auth, theme, etc.
├─ /styles        # Tailwind configuration & design tokens
├─ /public        # Static assets (images, icons)

Usage

Browse courses on the home page

View course details with optimized images and content

Personalized recommendations appear for logged-in users

Supports dark mode and responsive layouts

Accessibility

Keyboard navigation for carousels and menus

Semantic HTML elements for better screen reader support

ARIA attributes added where necessary

Contributing

Contributions are welcome!

Fork the repository

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -m 'Add new feature'

Push to the branch: git push origin feature-name

Open a pull request

License

This project is licensed under the MIT License.
