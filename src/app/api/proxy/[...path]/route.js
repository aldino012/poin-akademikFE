import { NextResponse } from "next/server";

// ⚠️ WAJIB: pakai Node runtime (bukan Edge)
export const runtime = "nodejs";

// URL backend Railway (JANGAN pakai /api di sini)
const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// =================================================
// OPTIONS (PRE-FLIGHT)
// =================================================
export async function OPTIONS() {
  // Cukup balas 204, jangan set header aneh
  return new NextResponse(null, { status: 204 });
}

// =================================================
// PROXY HANDLER
// =================================================
async function proxy(req, method, params) {
  // Tangkap sisa path setelah /api/proxy
  // contoh: /api/proxy/auth/login -> auth/login
  const path = params.path.join("/");

  // Tambahkan /api karena backend pakai prefix /api
  const url = `${BACKEND_URL}/api/${path}`;

  const headers = new Headers();

  // Forward cookie (INI KUNCI AUTH MOBILE)
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }

  // Forward content-type
  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const options = {
    method,
    headers,
    credentials: "include",
  };

  // Kirim body untuk non-GET
  if (method !== "GET" && method !== "HEAD") {
    options.body = await req.text();
  }

  // Request ke backend
  const backendRes = await fetch(url, options);
  const body = await backendRes.text();

  // Balas ke client
  const res = new NextResponse(body, {
    status: backendRes.status,
  });

  // Forward Set-Cookie dari backend
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}

// =================================================
// HTTP METHODS (WAJIB ADA SEMUA)
// =================================================
export async function GET(req, ctx) {
  return proxy(req, "GET", ctx.params);
}

export async function POST(req, ctx) {
  return proxy(req, "POST", ctx.params);
}

export async function PUT(req, ctx) {
  return proxy(req, "PUT", ctx.params);
}

export async function PATCH(req, ctx) {
  return proxy(req, "PATCH", ctx.params);
}

export async function DELETE(req, ctx) {
  return proxy(req, "DELETE", ctx.params);
}
