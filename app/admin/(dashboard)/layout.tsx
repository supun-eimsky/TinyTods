import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { AdminService } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

/**
 * middleware.ts already blocks unauthenticated requests from reaching
 * this layout at all, but it can only check that the session token is
 * valid — it can't look up the admin's current name for the topbar
 * without a DB round trip, which isn't worth doing on every request at
 * the edge. So this layout (a Server Component, running per-request on
 * the Node runtime) does that lookup once, here, and redirects in the
 * rare case the token is valid but the account was since deleted.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE.name)?.value;
  const session = token ? await verifyAdminSession(token) : null;
  const admin = session ? await AdminService.findById(session.adminId) : null;

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <AdminTopbar admin={admin.toJSON()} />
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
