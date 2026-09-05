"use client";

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

interface CheckoutFormProps {
  data: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const inputClass =
  "w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky";

export function CheckoutForm({ data, onChange }: CheckoutFormProps) {
  return (
    <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8">
      <h2 className="font-display text-xl text-teal-800">Delivery Details</h2>
      <p className="mt-1 text-sm text-teal-700/60">
        Where should we send your little things?
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              required
              value={data.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={inputClass}
              placeholder="For delivery updates"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Delivery Address
          </label>
          <input
            id="address"
            required
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={inputClass}
            placeholder="House number, street, area"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-teal-800 mb-1.5">
              City
            </label>
            <input
              id="city"
              required
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={inputClass}
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Postal Code
            </label>
            <input
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              className={inputClass}
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Order Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            value={data.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Delivery instructions, gift notes, etc. (optional)"
          />
        </div>
      </div>
    </div>
  );
}
