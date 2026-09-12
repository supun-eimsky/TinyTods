import { AdminService } from "@/services/adminService";
import { signAdminSession } from "@/lib/auth";
import { AdminUser } from "@/types";

export class AuthError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message);
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ admin: AdminUser; token: string }> {
  if (!email || !password) {
    throw new AuthError("Email and password are required.");
  }

  const admin = await AdminService.verifyCredentials(email, password);
  if (!admin) {
    throw new AuthError("Incorrect email or password.", 401);
  }

  const token = await signAdminSession({ adminId: admin.id, email: admin.email, name: admin.name });
  return { admin: admin.toJSON(), token };
}

export async function signupAdmin(input: {
  name: string;
  email: string;
  password: string;
  inviteCode: string;
}): Promise<{ admin: AdminUser; token: string }> {
  const { name, email, password, inviteCode } = input;

  if (!name || !email || !password) {
    throw new AuthError("Name, email and password are all required.");
  }
  if (password.length < 8) {
    throw new AuthError("Password must be at least 8 characters.");
  }

  const requiredCode = process.env.ADMIN_SIGNUP_CODE;
  if (requiredCode && inviteCode !== requiredCode) {
    throw new AuthError("Invalid invite code.", 403);
  }

  const existing = await AdminService.findByEmail(email);
  if (existing) {
    throw new AuthError("An admin account with this email already exists.", 409);
  }

  const admin = await AdminService.create({ name, email, password });
  const token = await signAdminSession({ adminId: admin.id, email: admin.email, name: admin.name });
  return { admin: admin.toJSON(), token };
}
