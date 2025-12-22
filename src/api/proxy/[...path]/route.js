import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// ==========================
// OPTIONS (WAJIB ADA)
// ==========================
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// ==========================
// PROXY
// ==========================
async function proxy(req, method, params) {
  // 🔥 TAMBAHKAN /api DI SINI
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  const headers = new Headers();

  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const options = {
    method,
    headers,
    credentials: "include",
  };

  if (method !== "GET" && method !== "HEAD") {
    options.body = await req.text();
  }

  const backendRes = await fetch(url, options);
  const body = await backendRes.text();

  const res = new NextResponse(body, {
    status: backendRes.status,
  });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}

// ==========================
// METHODS
// ==========================
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
