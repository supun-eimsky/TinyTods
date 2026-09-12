"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, KeyRound, Loader2 } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, inviteCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Sign up failed.");

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center mb-8">
        <Image src="/logo.png" alt="TinyTods logo" width={64} height={64} className="rounded-full" />
        <h1 className="mt-4 font-display text-2xl text-teal-800">Create Admin Account</h1>
        <p className="mt-1 text-sm text-teal-700/60">Set up access to the TinyTods admin portal.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Full Name
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
            <User size={16} className="text-teal-700/50" />
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-sm text-teal-800 outline-none"
              placeholder="Your name"
            />
          </div>
        </div>

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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
              <Lock size={16} className="text-teal-700/50 shrink-0" />
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-teal-800 outline-none"
                placeholder="8+ characters"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Confirm
            </label>
            <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
              <Lock size={16} className="text-teal-700/50 shrink-0" />
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-teal-800 outline-none"
                placeholder="Repeat"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="inviteCode" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Invite Code
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3">
            <KeyRound size={16} className="text-teal-700/50" />
            <input
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full bg-transparent text-sm text-teal-800 outline-none"
              placeholder="Provided by your store owner"
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
          {submitting ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-teal-700/60">
          Already have an account?{" "}
          <Link href="/admin/login" className="font-semibold text-sky hover:text-teal-700">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
