import { Sparkles, ShieldCheck, Gem, Smile } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Benefit } from "@/types";

const benefits: Benefit[] = [
  { id: "b1", title: "Carefully Selected", description: "Every item is chosen for safety, comfort and everyday charm.", icon: "sparkles" },
  { id: "b2", title: "Baby Friendly", description: "Soft materials and gentle formulas made for delicate skin.", icon: "shield" },
  { id: "b3", title: "Quality Products", description: "Built to last through every stage of little adventures.", icon: "heart" },
  { id: "b4", title: "Loved by Parents", description: "Thousands of families trust TinyTods for their little ones.", icon: "smile" },
];

const icons = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  heart: Gem,
  smile: Smile,
};

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-cream">
      <div className="container-content">
        <SectionHeading title="Why Choose TinyTods" subtitle="Little details that make a big difference." />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b) => {
            const Icon = icons[b.icon];
            return (
              <div
                key={b.id}
                className="rounded-4xl bg-mint-light/60 p-6 text-center hover:bg-mint-light transition-colors duration-300"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-card">
                  <Icon size={24} className="text-teal-700" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-base text-teal-800">{b.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-teal-700/60">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
