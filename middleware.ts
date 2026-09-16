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
  const responseHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "CDN-Cache-Control": "no-store",
    "Cloudflare-CDN-Cache-Control": "no-store",
  };
  const withNoStore = (response: NextResponse) => {
    for (const [name, value] of Object.entries(responseHeaders)) {
      response.headers.set(name, value);
    }
    return response;
  };

  const isPublicPage = PUBLIC_ADMIN_PATHS.some((path) => pathname.startsWith(path));
  const isPublicApi = PUBLIC_ADMIN_API_PATHS.some((path) => pathname.startsWith(path));
  if (isPublicPage || isPublicApi) {
    return withNoStore(NextResponse.next());
  }

  const isAdminRequest = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminRequest) {
    const response = NextResponse.next();
    const acceptsDynamicResponse =
      pathname.startsWith("/api/") ||
      request.headers.get("accept")?.includes("text/html") ||
      request.headers.get("accept")?.includes("text/x-component");

    return acceptsDynamicResponse ? withNoStore(response) : response;
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE.name)?.value;
  const session = token ? await verifyAdminSession(token) : null;

  if (!session) {
    // API routes get a JSON 401 (a fetch() call can't follow a redirect
    // to an HTML login page usefully); admin pages get redirected to the
    // login screen with the originally-requested page preserved.
    if (pathname.startsWith("/api/admin")) {
      return withNoStore(NextResponse.json({ error: "Not authenticated." }, { status: 401 }));
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return withNoStore(NextResponse.redirect(loginUrl));
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
