"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Login failed.");

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center mb-8">
        <Image src="/logo.png" alt="TinyTods logo" width={64} height={64} className="rounded-full" />
        <h1 className="mt-4 font-display text-2xl text-teal-800">Admin Login</h1>
        <p className="mt-1 text-sm text-teal-700/60">Manage TinyTods products and orders.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Email
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
            <Mail size={16} className="text-teal-700/50" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-teal-800 outline-none"
              placeholder="you@tinytods.lk"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Password
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
            <Lock size={16} className="text-teal-700/50" />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-teal-800 outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="text-sm text-peach font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold py-3.5 transition-colors disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-teal-700/60">
          Need an account?{" "}
          <Link href="/admin/signup" className="font-semibold text-sky hover:text-teal-700">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
