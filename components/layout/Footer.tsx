// components/layout/Footer.tsx
import Link from "next/link";
import Logo from "./Logo";



export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-slate-400">
              Skool helps you learn in‑demand skills with practical,
              project‑based courses.
            </p>
          </div>

          <div className="text-sm space-y-2">
            <p className="font-semibold text-slate-100">Skool</p>
            <Link href="#" className="block hover:underline">
              About
            </Link>
            <Link href="#" className="block hover:underline">
              Careers
            </Link>
            <Link href="#" className="block hover:underline">
              Teach on Skool
            </Link>
          </div>

          <div className="text-sm space-y-2">
            <p className="font-semibold text-slate-100">Discover</p>
            <Link href="#" className="block hover:underline">
              Web Development
            </Link>
            <Link href="#" className="block hover:underline">
              Data &amp; AI
            </Link>
            <Link href="#" className="block hover:underline">
              Design
            </Link>
          </div>

          <div className="text-sm space-y-2">
            <p className="font-semibold text-slate-100">Support</p>
            <Link href="#" className="block hover:underline">
              Help center
            </Link>
            <Link href="#" className="block hover:underline">
              Terms
            </Link>
            <Link href="#" className="block hover:underline">
              Privacy
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Skool, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">
              English
            </Link>
            <Link href="#" className="hover:underline">
              $ USD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}