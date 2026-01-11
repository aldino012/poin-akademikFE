import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// ==============================
// CORS PREFLIGHT
// ==============================
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// ==============================
// PROXY CORE
// ==============================
async function proxy(req, method, params) {
  const path = params.path.join("/");

  // 🔥 KUNCI UTAMA: SELALU /api
  const url = `${BACKEND_URL}/api/${path}`;

  const headers = new Headers();

  // 🔐 forward cookie (login session)
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }

  const contentType = req.headers.get("content-type") || "";

  const options = {
    method,
    headers,
    credentials: "include",
  };

  // ==============================
  // BODY HANDLING
  // ==============================
  if (method !== "GET" && method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      // 🔥 PENTING: jangan set content-type sendiri untuk multipart
      // biarkan fetch otomatis set boundary
      options.body = req.body; // pakai body asli request
    } else {
      headers.set("content-type", contentType);
      options.body = await req.text();
    }
  }

  // ==============================
  // FETCH TO BACKEND
  // ==============================
  const backendRes = await fetch(url, options);
  const body = await backendRes.arrayBuffer();

  const res = new NextResponse(body, {
    status: backendRes.status,
  });

  // 🔐 forward set-cookie dari backend
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}

// ==============================
// HTTP METHODS
// ==============================
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
