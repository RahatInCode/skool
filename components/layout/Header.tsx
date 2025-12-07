"use client";

import { useState } from "react";
import { Menu, Search, ShoppingCart, Bell } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <button
          className="mr-1 rounded-md p-1.5 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <nav className="hidden shrink-0 text-sm font-medium text-slate-700 md:flex md:items-center md:gap-3">
          <button className="rounded-full px-3 py-1 hover:bg-slate-100">
            Browse
          </button>
          <button className="rounded-full px-3 py-1 hover:bg-slate-100">
            My learning
          </button>
          <button className="rounded-full px-3 py-1 hover:bg-slate-100">
            Teach on Skool
          </button>
        </nav>

        {/* search */}
        <div className="relative hidden flex-1 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search for courses, topics, or instructors"
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 text-sm placeholder:text-slate-500 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button className="rounded-full p-2 hover:bg-slate-100 md:hidden">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-slate-100">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="hidden rounded-full p-2 hover:bg-slate-100 sm:inline-flex">
            <Bell className="h-5 w-5" />
          </button>
          <button className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            SK
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="px-4 py-3">
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors"
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 text-sm placeholder:text-slate-500 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
              />
            </div>
            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-800">
              <Link href="#" className="rounded-md px-2 py-2 hover:bg-slate-50">
                Browse
              </Link>
              <Link href="#" className="rounded-md px-2 py-2 hover:bg-slate-50">
                My learning
              </Link>
              <Link href="#" className="rounded-md px-2 py-2 hover:bg-slate-50">
                Teach on Skool
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}