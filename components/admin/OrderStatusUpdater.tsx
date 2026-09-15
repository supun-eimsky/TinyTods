"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { OrderStatus } from "@/types";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrderStatusUpdater({ orderId, status }: { orderId: number; status: OrderStatus }) {
  const router = useRouter();
  const [selected, setSelected] = useState<OrderStatus>(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Failed to update status.");

      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-4xl shadow-card p-6 sm:p-7">
      <h2 className="font-display text-lg text-teal-800">Order Status</h2>
      <p className="mt-1 text-sm text-teal-700/60">Update delivery progress for this order.</p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value as OrderStatus);
            setSaved(false);
          }}
          className="flex-1 rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={saving || selected === status}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-6 py-3 transition-colors shadow-soft disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Update Status"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-peach font-semibold">{error}</p>}
      {saved && !error && <p className="mt-3 text-sm text-mint-dark font-semibold">Status updated.</p>}
    </div>
  );
}
