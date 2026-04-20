import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config shared by middleware and the full auth.ts.
 * MUST NOT import anything that uses Node APIs (fs, process.cwd, crypto).
 * Providers that need Node (Credentials with DB/file lookup) live in auth.ts.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [], // extended in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role?: string; id?: string };
        if (u.role) token.role = u.role;
        if (u.id) token.uid = u.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const uid = token.uid as string | undefined;
        const role = token.role as string | undefined;
        if (uid) session.user.id = uid;
        if (role) (session.user as { role?: string }).role = role;
      }
      return session;
    },
    async authorized({ auth: sessionAuth, request }) {
      const { pathname } = request.nextUrl;
      const role = (sessionAuth?.user as { role?: string } | undefined)?.role;
      if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") return true;
        return role === "admin_creator" || role === "admin_manager";
      }
      if (pathname.startsWith("/account")) return !!sessionAuth?.user;
      return true;
    },
  },
  trustHost: true,
};
