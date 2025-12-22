import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔥 WAJIB (JANGAN EDGE)

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// ==========================
// PRE-FLIGHT (OPTIONS)
// ==========================
export async function OPTIONS() {
  // ⚠️ CUKUP RETURN 204
  // JANGAN set header aneh
  return new NextResponse(null, {
    status: 204,
  });
}

// ==========================
// PROXY HELPER
// ==========================
async function proxy(req, method, params) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/${path}`;

  const headers = new Headers();

  // forward cookie (INI KUNCI AUTH MOBILE)
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }

  // forward content-type
  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

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

  const response = new NextResponse(body, {
    status: backendRes.status,
  });

  // forward set-cookie
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

// ==========================
// HTTP METHODS
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
