import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/signup"];
const PUBLIC_ADMIN_API_PATHS = [
  "/api/admin/auth/login",
  "/api/admin/auth/signup",
  "/api/admin/auth/logout",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPage = PUBLIC_ADMIN_PATHS.some((path) => pathname.startsWith(path));
  const isPublicApi = PUBLIC_ADMIN_API_PATHS.some((path) => pathname.startsWith(path));
  if (isPublicPage || isPublicApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE.name)?.value;
  const session = token ? await verifyAdminSession(token) : null;

  if (!session) {
    // API routes get a JSON 401 (a fetch() call can't follow a redirect
    // to an HTML login page usefully); admin pages get redirected to the
    // login screen with the originally-requested page preserved.
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
