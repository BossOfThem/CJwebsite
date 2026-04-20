import fs from "node:fs/promises";
import path from "node:path";
import type { StoredUser } from "@/lib/users";
import { roleLabel } from "@/lib/users";

export const metadata = {
  title: "Users",
  robots: { index: false, follow: false },
};

async function loadUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "users.json"), "utf8");
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

export default async function UsersAdminPage() {
  const users = await loadUsers();
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">Users</h1>
      <p className="text-[var(--ink-soft)] mt-1">{users.length} accounts on file</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-[var(--ink-mute)] bg-[var(--bg)]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-semibold">{u.name}</td>
                <td className="px-4 py-3 font-mono text-[0.85rem]">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold bg-[var(--brand)]/10 text-[var(--brand)]">
                    {roleLabel(u.role)}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--ink-mute)]">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[var(--ink-mute)]">
        Placeholder UI — add/disable/edit coming in beta.
      </p>
    </div>
  );
}
