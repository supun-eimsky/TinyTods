"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-mint-light rounded-4xl p-8 text-center">
        <h3 className="font-display text-xl text-teal-800">Message sent!</h3>
        <p className="mt-2 text-teal-700/70 text-sm">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-teal-800 mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky"
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-teal-800 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky resize-none"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-teal-700 text-cream font-semibold px-7 py-3.5 hover:bg-teal-800 transition-colors shadow-soft"
      >
        <Send size={16} /> Send Message
      </button>
    </form>
  );
}
