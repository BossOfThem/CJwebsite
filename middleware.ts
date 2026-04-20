import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const role = (session?.user as { role?: string } | undefined)?.role;
  const { pathname } = nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (role !== "admin_creator" && role !== "admin_manager") {
      const url = new URL("/admin/login", nextUrl);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/account") && !session?.user) {
    const url = new URL("/login", nextUrl);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
