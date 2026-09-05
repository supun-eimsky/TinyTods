import { Truck, BadgeCheck } from "lucide-react";

/**
 * TinyTods currently only supports Cash on Delivery — no card or online
 * payment integration. This is presented as a single, already-selected
 * option rather than a real choice between methods.
 */
export function PaymentMethod() {
  return (
    <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8">
      <h2 className="font-display text-xl text-teal-800">Payment Method</h2>
      <p className="mt-1 text-sm text-teal-700/60">{"How you'd like to pay for your order."}</p>

      <div className="mt-5 rounded-3xl border-2 border-teal-700 bg-mint-light/50 p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-card">
          <Truck size={22} className="text-teal-700" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display text-base text-teal-800">Cash on Delivery</p>
            <BadgeCheck size={18} className="text-sky" />
          </div>
          <p className="mt-1 text-sm text-teal-700/70">
            Pay with cash when your order arrives at your door. No card or online payment needed.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-teal-700/50">
        TinyTods currently accepts Cash on Delivery only — please have the total amount ready for our delivery partner.
      </p>
    </div>
  );
}
