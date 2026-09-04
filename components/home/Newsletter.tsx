"use client";

import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-16 sm:py-20 bg-sage/50 relative overflow-hidden">
      <DecoStar className="absolute top-8 left-[10%] w-5 h-5 hidden sm:block" />
      <DecoHeart className="absolute bottom-10 right-[12%] w-5 h-5 hidden sm:block" color="#F5B78F" />

      <div className="container-content max-w-xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-teal-800">Join the TinyTods Family</h2>
        <p className="mt-3 text-teal-700/70">
          Get updates about new arrivals, special offers and little surprises.
        </p>

        {submitted ? (
          <p className="mt-6 text-teal-700 font-semibold bg-white rounded-full inline-block px-6 py-3 shadow-card">
            Thanks for joining! 🎉 Watch your inbox for little surprises.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex items-center gap-2 bg-white rounded-full px-5 py-3.5 shadow-card flex-1 max-w-sm">
              <Mail size={18} className="text-teal-700/50 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full bg-transparent outline-none text-sm text-teal-800 placeholder:text-teal-700/40"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-teal-700 text-cream font-semibold px-7 py-3.5 hover:bg-teal-800 transition-colors shadow-soft"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
