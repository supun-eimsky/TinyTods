import { query, execute } from "@/lib/db";
import { Admin, AdminRow } from "@/models/Admin";
import { hashPassword, verifyPassword } from "@/lib/auth";

export const AdminService = {
  async findByEmail(email: string): Promise<Admin | null> {
    const rows = await query<AdminRow>("SELECT * FROM admins WHERE email = ? LIMIT 1", [
      email.trim().toLowerCase(),
    ]);
    return rows[0] ? new Admin(rows[0]) : null;
  },

  async findById(id: number): Promise<Admin | null> {
    const rows = await query<AdminRow>("SELECT * FROM admins WHERE id = ? LIMIT 1", [id]);
    return rows[0] ? new Admin(rows[0]) : null;
  },

  async create(input: { name: string; email: string; password: string }): Promise<Admin> {
    const passwordHash = await hashPassword(input.password);
    const email = input.email.trim().toLowerCase();
    const result = await execute(
      "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)",
      [input.name.trim(), email, passwordHash]
    );
    const created = await this.findById(result.insertId);
    if (!created) throw new Error("Failed to load newly created admin account.");
    return created;
  },

  /** Returns the admin on success, or null on a bad email/password —
   *  callers should show the same generic error either way, so a login
   *  form never reveals whether an email exists. */
  async verifyCredentials(email: string, password: string): Promise<Admin | null> {
    const admin = await this.findByEmail(email);
    if (!admin) return null;
    const valid = await verifyPassword(password, admin.getPasswordHash());
    return valid ? admin : null;
  },
};
