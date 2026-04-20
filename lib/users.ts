/**
 * Placeholder user store. In production this lives in a DB.
 *
 * Seeded admin accounts are defined here so the creator and the manager can
 * log in against the stealth /admin/login route today. Swap the seed for a
 * real users table when ready.
 *
 * Passwords are bcrypt hashes of the literal string shown in the comment.
 * Change them immediately on first deploy, or — better — move admins to a DB.
 */

import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";

export type Role = "user" | "admin_manager" | "admin_creator";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
};

// Seed admins — bcrypt hashes pre-computed for the placeholder passwords shown.
// You MUST rotate these before any public deploy. Password: "change-me-now"
const SEED_PASSWORD_HASH = "$2b$10$rXUsso4Omavtu0Uw4Zk1Mea3xUYzq6qW.MSUT5w8pEN55rHUntDpa";

// NOTE: the hash above is a placeholder — regenerate locally with:
//   node -e "require('bcryptjs').hash('your-password',10).then(console.log)"
// Then paste the result.

const SEED_USERS: StoredUser[] = [
  {
    id: "admin-creator-0",
    email: "creator@cj.local.dev",
    name: "Creator",
    role: "admin_creator",
    passwordHash: SEED_PASSWORD_HASH,
    createdAt: new Date("2026-04-20").toISOString(),
  },
  {
    id: "admin-manager-0",
    email: "manager@cj.local.dev",
    name: "Manager",
    role: "admin_manager",
    passwordHash: SEED_PASSWORD_HASH,
    createdAt: new Date("2026-04-20").toISOString(),
  },
  {
    id: "demo-user-0",
    email: "demo@cj.local.dev",
    name: "Demo User",
    role: "user",
    passwordHash: SEED_PASSWORD_HASH,
    createdAt: new Date("2026-04-20").toISOString(),
  },
];

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify(SEED_USERS, null, 2));
  }
}

async function readAll(): Promise<StoredUser[]> {
  await ensureFile();
  const raw = await fs.readFile(USERS_FILE, "utf8");
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return SEED_USERS;
  }
}

async function writeAll(users: StoredUser[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const all = await readAll();
  return all.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const all = await readAll();
  return all.find((u) => u.id === id) ?? null;
}

export async function verifyPassword(user: StoredUser, password: string): Promise<boolean> {
  if (!user.passwordHash) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
}): Promise<StoredUser> {
  const all = await readAll();
  if (all.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }
  const user: StoredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email: input.email.toLowerCase(),
    name: input.name,
    role: "user",
    passwordHash: await bcrypt.hash(input.password, 10),
    createdAt: new Date().toISOString(),
  };
  all.push(user);
  await writeAll(all);
  return user;
}

export function isAdmin(role: Role | undefined | null): boolean {
  return role === "admin_manager" || role === "admin_creator";
}

export function isCreator(role: Role | undefined | null): boolean {
  return role === "admin_creator";
}

export function roleLabel(role: Role | undefined | null): string {
  switch (role) {
    case "admin_creator":
      return "Creator";
    case "admin_manager":
      return "Manager";
    case "user":
      return "Member";
    default:
      return "Guest";
  }
}

// Exposed only for seeding/reset tooling.
export const __seed = SEED_USERS;
