"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { AdminUser } from "@/types";
import { AdminMobileNav } from "./AdminMobileNav";

export function AdminTopbar({ admin }: { admin: AdminUser }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-card">
      <div className="flex items-center justify-between px-5 sm:px-8 py-4">
        <button
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open admin menu"
          className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-mint-light text-teal-700"
        >
          <Menu size={20} />
        </button>

        <div className="hidden lg:block">
          <p className="text-sm text-teal-700/50">Welcome back,</p>
          <p className="font-display text-lg text-teal-800">{admin.name}</p>
        </div>

        <button
          onClick={handleLogout}
          disabled={signingOut}
          className="inline-flex items-center gap-2 rounded-full border-2 border-mint-light text-teal-700 hover:bg-mint-light font-semibold text-sm px-4 py-2 transition-colors disabled:opacity-60"
        >
          <LogOut size={15} />
          {signingOut ? "Signing out..." : "Log Out"}
        </button>
      </div>

      <AdminMobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
}
