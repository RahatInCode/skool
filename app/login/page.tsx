"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/context/AuthContext";
import Logo from "@/components/layout/Logo";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("STUDENT");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("test@skool.com", "password", selectedRole);
    router.push("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose a role to continue (Mock Authentication)
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Select Role
            </label>
            <div className="mt-2 space-y-2">
              {(["STUDENT", "INSTRUCTOR", "ADMIN"] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    selectedRole === role
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Sign in as {selectedRole}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500">
          This is a mock authentication system for demonstration purposes.
        </p>
      </div>
    </div>
  );
}

