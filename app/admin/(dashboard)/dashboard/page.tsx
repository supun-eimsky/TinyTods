import type { Metadata } from "next";
import Link from "next/link";
import { Package, ClipboardList, Clock, Wallet, ArrowRight } from "lucide-react";
import { getDashboardStats, listOrdersForAdmin } from "@/controllers/adminOrderController";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([
    getDashboardStats(),
    listOrdersForAdmin().then((orders) => orders.slice(0, 5)),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-teal-800">Dashboard</h1>
      <p className="mt-1 text-teal-700/60">A quick look at how TinyTods is doing.</p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={String(stats.totalProducts)} icon={Package} accent="mint" />
        <StatCard label="Total Orders" value={String(stats.totalOrders)} icon={ClipboardList} accent="sky" />
        <StatCard label="Pending Orders" value={String(stats.pendingOrders)} icon={Clock} accent="sunshine" />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={Wallet}
          accent="peach"
        />
      </div>

      <div className="mt-8 bg-white rounded-4xl shadow-card p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-teal-800">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-sm font-semibold text-sky hover:text-teal-700 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="mt-6 text-sm text-teal-700/60">No orders yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-teal-700/40">
                  <th className="pb-3 pr-4 font-semibold">Order</th>
                  <th className="pb-3 pr-4 font-semibold">Customer</th>
                  <th className="pb-3 pr-4 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-mint-light/60">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-semibold text-teal-800 hover:text-sky transition-colors"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-teal-700/70">{order.customerName}</td>
                    <td className="py-3 pr-4 text-teal-800 font-semibold">
                      {formatCurrency(order.grandTotal, order.currency)}
                    </td>
                    <td className="py-3">
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
