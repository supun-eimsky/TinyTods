import { NextRequest, NextResponse } from "next/server";
import { signupAdmin, AuthError } from "@/controllers/authController";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { admin, token } = await signupAdmin({
      name: body?.name,
      email: body?.email,
      password: body?.password,
      inviteCode: body?.inviteCode,
    });

    const response = NextResponse.json({ admin });
    response.cookies.set(ADMIN_SESSION_COOKIE.name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_COOKIE.maxAge,
    });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin signup failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
