import type { Metadata } from "next";
import Link from "next/link";
import { listOrdersForAdmin } from "@/controllers/adminOrderController";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { OrderStatus } from "@/types";

export const metadata: Metadata = { title: "Orders" };

const STATUS_FILTERS: { label: string; value: OrderStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Out for Delivery", value: "out_for_delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const activeStatus = searchParams.status as OrderStatus | undefined;
  const orders = await listOrdersForAdmin(activeStatus);

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-teal-800">Orders</h1>
      <p className="mt-1 text-teal-700/60">{orders.length} orders{activeStatus ? ` · ${activeStatus.replace("_", " ")}` : ""}.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => {
          const href = filter.value ? `/admin/orders?status=${filter.value}` : "/admin/orders";
          const active = activeStatus === filter.value;
          return (
            <Link
              key={filter.label}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                active ? "bg-teal-700 text-cream" : "bg-white text-teal-700 hover:bg-mint-light"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-4xl shadow-card overflow-hidden">
        {orders.length === 0 ? (
          <p className="p-10 text-center text-teal-700/60">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-teal-700/40 border-b border-mint-light/60">
                  <th className="py-4 px-6 font-semibold">Order</th>
                  <th className="py-4 px-4 font-semibold">Customer</th>
                  <th className="py-4 px-4 font-semibold">Date</th>
                  <th className="py-4 px-4 font-semibold">Total</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-mint-light/40 last:border-0">
                    <td className="py-3 px-6">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-semibold text-teal-800 hover:text-sky transition-colors"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-teal-700/70">
                      <p>{order.customerName}</p>
                      <p className="text-xs text-teal-700/40">{order.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-teal-700/60 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-teal-800 font-semibold whitespace-nowrap">
                      {formatCurrency(order.grandTotal, order.currency)}
                    </td>
                    <td className="py-3 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
