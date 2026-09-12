import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { AdminService } from "@/services/adminService";

export async function GET() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE.name)?.value;
  if (!token) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  const session = await verifyAdminSession(token);
  if (!session) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  const admin = await AdminService.findById(session.adminId);
  if (!admin) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  return NextResponse.json({ admin: admin.toJSON() });
}
