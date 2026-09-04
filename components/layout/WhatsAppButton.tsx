"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

/**
 * A floating WhatsApp chat launcher, fixed to the bottom-right corner on
 * every page. Clicking it opens a small preview card with a "Start Chat"
 * link that deep-links into WhatsApp (web or app) with a prefilled
 * message, via the official https://wa.me link format — no SDK needed.
 *
 * Update WHATSAPP_NUMBER below to change the destination number. It must
 * be in international format with no leading "+", spaces or dashes
 * (e.g. country code + number).
 */
const WHATSAPP_NUMBER = "94715205107";
const DEFAULT_MESSAGE =
  "Hi TinyTods! I have a question about your products.";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const chatHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with TinyTods on WhatsApp"
          className="w-72 sm:w-80 bg-white rounded-4xl shadow-lift overflow-hidden animate-pop"
        >
          <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-display text-sm text-white leading-tight">TinyTods</p>
                <p className="text-[11px] text-white/80">Typically replies within an hour</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp chat preview"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:bg-white/15 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 bg-[#ECE5DD]">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-card max-w-[85%]">
              <p className="text-sm text-teal-800">
                {"Hi there! 👋 Have a question about our little things? Message us and we'll get back to you with a smile."}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fb955] text-white font-semibold py-3 text-sm transition-colors"
            >
              <Send size={16} />
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lift flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 animate-floaty"
      >
        {open ? (
        <img src="/WhatsApp_icon.png" alt="WhatsApp" className="w-14 h-14" />
        ) : (
            <img src="/WhatsApp_icon.png" alt="WhatsApp" className="w-14 h-14" />
        //   <MessageCircle size={28} className="text-white" fill="white" strokeWidth={0} />
        )}
        <span className="sr-only">Chat with TinyTods on WhatsApp</span>
      </button>
    </div>
  );
}
