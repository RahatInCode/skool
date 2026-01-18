"use client";

import { useState, useRef } from "react";
import { Menu, Search, ShoppingCart, Bell, LogOut, User, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout, switchRole } = useAuth();

  // Close user menu when clicking outside
  useClickOutside(userMenuRef, () => setUserMenuOpen(false));

  // Handle keyboard navigation (Escape key)
  useKeyboardNavigation(userMenuOpen, () => setUserMenuOpen(false));

  const getRoleBasedNav = () => {
    if (!user) {
      return (
        <>
          <Link href="/catalog" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/login" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Sign in
          </Link>
        </>
      );
    }

    if (user.role === "ADMIN") {
      return (
        <>
          <Link href="/catalog" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/admin" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Admin
          </Link>
        </>
      );
    }

    if (user.role === "INSTRUCTOR") {
      return (
        <>
          <Link href="/catalog" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/instructor/dashboard" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Dashboard
          </Link>
        </>
      );
    }

    // STUDENT
    return (
      <>
        <Link href="/catalog" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
          Browse
        </Link>
        <Link href="/my-learning" className="rounded-full px-3 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
          My learning
        </Link>
      </>
    );
  };

  const getMobileNav = () => {
    if (!user) {
      return (
        <>
          <Link href="/catalog" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/login" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Sign in
          </Link>
        </>
      );
    }

    if (user.role === "ADMIN") {
      return (
        <>
          <Link href="/catalog" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/admin" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Admin
          </Link>
        </>
      );
    }

    if (user.role === "INSTRUCTOR") {
      return (
        <>
          <Link href="/catalog" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Browse
          </Link>
          <Link href="/instructor/dashboard" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
            Dashboard
          </Link>
        </>
      );
    }

    return (
      <>
        <Link href="/catalog" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
          Browse
        </Link>
        <Link href="/my-learning" className="rounded-md px-2 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
          My learning
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <button
          className="mr-1 rounded-md p-1.5 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <nav 
          className="hidden shrink-0 text-sm font-medium text-slate-700 md:flex md:items-center md:gap-3"
          aria-label="Main navigation"
        >
          {getRoleBasedNav()}
        </nav>

        {/* search */}
        <div className="relative hidden flex-1 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search for courses, topics, or instructors"
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 text-sm placeholder:text-slate-500 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
            aria-label="Search for courses"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            className="rounded-full p-2 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Search"
            type="button"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          {user && (
            <>
              <button
                className="rounded-full p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Shopping cart"
                type="button"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="hidden rounded-full p-2 hover:bg-slate-100 sm:inline-flex focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Notifications"
                type="button"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="ml-1 flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`User menu for ${user.name}`}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                type="button"
              >
                <span>{user.avatar || user.name.charAt(0)}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg z-50"
                  role="menu"
                  aria-orientation="vertical"
                  id="user-menu"
                >
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                      {user.role}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:bg-slate-50"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:bg-slate-50"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" aria-hidden="true" />
                      Settings
                    </Link>
                    {user.role !== "STUDENT" && (
                      <div className="border-t border-slate-100 my-1" />
                    )}
                    {user.role === "ADMIN" && (
                      <button
                        onClick={() => {
                          switchRole("INSTRUCTOR");
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:bg-slate-50"
                        role="menuitem"
                        type="button"
                      >
                        Switch to Instructor
                      </button>
                    )}
                    {user.role === "INSTRUCTOR" && (
                      <button
                        onClick={() => {
                          switchRole("STUDENT");
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:bg-slate-50"
                        role="menuitem"
                        type="button"
                      >
                        Switch to Student
                      </button>
                    )}
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
                      role="menuitem"
                      type="button"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div 
          className="border-t border-slate-200 bg-white md:hidden"
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3">
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors"
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 text-sm placeholder:text-slate-500 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
                aria-label="Search for courses"
              />
            </div>
            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-800" aria-label="Mobile menu">
              {getMobileNav()}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}