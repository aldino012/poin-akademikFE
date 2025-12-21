import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "please-change-this";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  // Kalau tidak ada token → redirect ke /auth
  if (!token && (url.startsWith("/admin") || url.startsWith("/mahasiswa"))) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Kalau ada token → decode role user
  let decoded = null;
  if (token) {
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // Token rusak/expired → hapus token dan lempar ke login
      const res = NextResponse.redirect(new URL("/auth", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  // USER LOGIN → jangan balik lagi ke /auth
  if (decoded && url === "/auth") {
    if (decoded.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/mahasiswa/dashboard", req.url));
    }
  }

  // ADMIN mencegah akses ke /mahasiswa
  if (decoded?.role === "admin" && url.startsWith("/mahasiswa")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // MAHASISWA mencegah akses ke /admin
  if (decoded?.role === "mahasiswa" && url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/mahasiswa/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/mahasiswa/:path*", "/auth"],
};
