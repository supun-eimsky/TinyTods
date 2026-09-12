import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail, Phone, MapPin, FileText } from "lucide-react";
import { getOrderForAdmin } from "@/controllers/adminOrderController";
import { OrderStatusUpdater } from "@/components/admin/OrderStatusUpdater";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Order Details" };

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderForAdmin(Number(id));
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700/70 hover:text-teal-700 transition-colors"
      >
        <ChevronLeft size={16} /> Back to Orders
      </Link>

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-teal-800">{order.orderNumber}</h1>
          <p className="mt-1 text-teal-700/60">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-4xl shadow-card p-6 sm:p-7">
            <h2 className="font-display text-lg text-teal-800 mb-4">Items</h2>
            <div className="divide-y divide-mint-light/60">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-mint-light/50 shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-teal-800">{item.name}</p>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <p className="text-xs text-teal-700/50 mt-0.5">
                        {Object.entries(item.selectedOptions)
                          .map(([label, value]) => `${label}: ${value}`)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="text-sm text-teal-700/60 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-display text-base text-teal-800 whitespace-nowrap">
                    {formatCurrency(item.price * item.quantity, order.currency)}
                  </p>
                </div>
              ))}
            </div>

            <div className="dashed-divider mt-4 pt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-teal-700/70">
                <span>Item total</span>
                <span>{formatCurrency(order.itemTotal, order.currency)}</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex items-center justify-between text-sky font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discountTotal, order.currency)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-teal-700/70">
                <span>Shipping</span>
                <span>{order.shippingTotal === 0 ? "Free" : formatCurrency(order.shippingTotal, order.currency)}</span>
              </div>
              <div className="flex items-center justify-between font-display text-lg text-teal-800 pt-2">
                <span>Total</span>
                <span>{formatCurrency(order.grandTotal, order.currency)}</span>
              </div>
            </div>
          </div>

          <OrderStatusUpdater orderId={order.id} status={order.status} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-4xl shadow-card p-6 sm:p-7">
            <h2 className="font-display text-lg text-teal-800 mb-4">Customer</h2>
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-teal-800">{order.customerName}</p>
              <div className="flex items-center gap-2.5 text-teal-700/70">
                <Mail size={15} className="text-teal-700/40 shrink-0" /> {order.email}
              </div>
              <div className="flex items-center gap-2.5 text-teal-700/70">
                <Phone size={15} className="text-teal-700/40 shrink-0" /> {order.phone}
              </div>
              <div className="flex items-start gap-2.5 text-teal-700/70">
                <MapPin size={15} className="text-teal-700/40 shrink-0 mt-0.5" />
                <span>
                  {order.address}, {order.city}
                  {order.postalCode ? `, ${order.postalCode}` : ""}
                </span>
              </div>
              {order.notes && (
                <div className="flex items-start gap-2.5 text-teal-700/70">
                  <FileText size={15} className="text-teal-700/40 shrink-0 mt-0.5" />
                  <span>{order.notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-4xl shadow-card p-6 sm:p-7">
            <h2 className="font-display text-lg text-teal-800 mb-2">Payment</h2>
            <p className="text-sm text-teal-700/70">Cash on Delivery</p>
            <p className="mt-1 text-xs text-teal-700/50">
              Collect {formatCurrency(order.grandTotal, order.currency)} on delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
