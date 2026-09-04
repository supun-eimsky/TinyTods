import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the TinyTods team for questions about orders, shipping or our products.",
};

const details = [
  { icon: Phone, label: "Phone", value: "0094-779955222" },
  { icon: Mail, label: "Email", value: "hello@tinytods.lk" },
  { icon: MapPin, label: "Location", value: "Colombo, Sri Lanka" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9am – 6pm" },
];

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <section className="relative py-14 sm:py-20 overflow-hidden">
        <DecoStar className="absolute top-8 left-[10%] w-5 h-5 hidden sm:block" />
        <DecoHeart className="absolute bottom-8 right-[12%] w-5 h-5 hidden sm:block" color="#F5B78F" />
        <div className="container-content text-center">
          <h1 className="font-display text-3xl sm:text-5xl text-teal-800">{"We'd Love to Hear From You"}</h1>
          <p className="mt-4 text-teal-700/70 max-w-lg mx-auto">
            Questions about an order, a product, or just want to say hi? Send us a message.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-content grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center shrink-0">
                    <d.icon size={18} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/50">{d.label}</p>
                    <p className="text-sm font-semibold text-teal-800 mt-0.5">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-4xl overflow-hidden bg-mint-light aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-teal-700/60 px-6">
                <MapPin size={28} className="mx-auto" />
                <p className="mt-2 text-sm font-semibold">Map placeholder</p>
                <p className="text-xs mt-1">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
