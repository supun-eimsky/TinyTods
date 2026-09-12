import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TinyTods Admin",
    template: "%s | TinyTods Admin",
  },
  description: "TinyTods admin portal — manage products and orders.",
  robots: { index: false, follow: false },
};

// Deliberately minimal: no storefront header/footer/cart/WhatsApp button
// here. The authenticated area's sidebar+topbar chrome lives one level
// down, in app/admin/(dashboard)/layout.tsx, so the public login/signup
// pages stay chrome-free too.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sage/30">{children}</div>;
}
