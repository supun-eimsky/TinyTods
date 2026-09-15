import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: "mint" | "sky" | "peach" | "sunshine";
}

const accentBg: Record<string, string> = {
  mint: "bg-mint-light text-teal-700",
  sky: "bg-sky-light text-teal-700",
  peach: "bg-peach-light text-teal-700",
  sunshine: "bg-sunshine-light text-teal-700",
};

export function StatCard({ label, value, icon: Icon, accent = "mint" }: StatCardProps) {
  return (
    <div className="bg-white rounded-4xl shadow-card p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${accentBg[accent]}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/50">{label}</p>
        <p className="font-display text-2xl text-teal-800 truncate">{value}</p>
      </div>
    </div>
  );
}
