import type { Metadata } from "next";
import { SignupForm } from "@/components/admin/SignupForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <SignupForm />
    </div>
  );
}
