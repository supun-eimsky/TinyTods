import { AdminUser } from "@/types";

/** Row shape as it comes back from MySQL — includes the password hash,
 *  which must never leave the server. Only services/adminService.ts
 *  should ever see this type. */
export interface AdminRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

export class Admin {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly createdAt: string;
  /** Kept private-by-convention: use verifyPassword rather than reading this. */
  private readonly passwordHash: string;

  constructor(row: AdminRow) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.role = row.role;
    this.createdAt = row.created_at;
    this.passwordHash = row.password_hash;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  /** Safe to send to the client — never includes the password hash. */
  toJSON(): AdminUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}
