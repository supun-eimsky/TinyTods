import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const careLinks = [
  { label: "Shipping", href: "/contact" },
  { label: "Returns", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-teal-800 text-cream pt-16 pb-8 overflow-hidden">
      {/* <div
        className="absolute -top-1 left-0 right-0 h-4 text-teal-800"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10px 0, transparent 9px, #FFF8EE 9.5px)",
          backgroundSize: "20px 16px",
          backgroundRepeat: "repeat-x",
        }}
        aria-hidden="true"
      /> */}
      <div className="container-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo1.jpeg" alt="TinyTods logo" width={48} height={48} className="rounded-full" />
            <div>
              <p className="font-display text-xl">TinyTods</p>
              <p className="text-xs text-cream/60">little things, big smiles</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-cream/70 max-w-xs">
            Carefully chosen baby products, made for tiny moments and big smiles.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Follow TinyTods on social media"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-sunshine hover:text-teal-800 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-base mb-4 text-sunshine">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base mb-4 text-sunshine">Customer Care</h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {careLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base mb-4 text-sunshine">Contact</h3>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-mint" /> 0094-779955222
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-mint" /> hello@tinytods.lk
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-mint mt-0.5" /> Colombo, Sri Lanka
            </li>
          </ul>
        </div>
      </div>

      <div className="dashed-divider border-cream/20 mt-12 pt-6">
        <p className="container-content text-center text-xs text-cream/50">
          © 2026 TinyTods. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
