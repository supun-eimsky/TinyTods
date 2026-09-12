import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "tinytods_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET. Set it in your .env.local (see .env.example).");
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSessionPayload {
  adminId: number;
  email: string;
  name: string;
}

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 10);
}

export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

export async function signAdminSession(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

/** Returns null instead of throwing on an invalid/expired token, since
 *  every caller just wants a yes/no answer plus the payload when valid. */
export async function verifyAdminSession(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.adminId === "number" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string"
    ) {
      return { adminId: payload.adminId, email: payload.email, name: payload.name };
    }
    return null;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_COOKIE = {
  name: SESSION_COOKIE_NAME,
  maxAge: SESSION_DURATION_SECONDS,
};
