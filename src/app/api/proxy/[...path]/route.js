import { NextResponse } from "next/server";

export const runtime = "nodejs";

// =============================================================
// BACKEND URL
// =============================================================
const BACKEND_URL = process.env.BACKEND_BASE_URL;

console.log("🔎 BACKEND_URL =", BACKEND_URL);

if (!BACKEND_URL) {
  throw new Error(
    "❌ BACKEND_BASE_URL belum diset. Pastikan ada di .env.local / .env.production",
  );
}

// =============================================================
// CORS PREFLIGHT
// =============================================================
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// =============================================================
// PROXY CORE
// =============================================================
async function proxy(req, method, ctx) {
  // 🔥 WAJIB AWAIT
  const { path } = await ctx.params;
  const joinedPath = path.join("/");

  const url = `${BACKEND_URL}/api/${joinedPath}`;

  const headers = new Headers();

  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const contentType = req.headers.get("content-type") || "";

  const options = {
    method,
    headers,
    credentials: "include",
  };

  if (method !== "GET" && method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      headers.set("content-type", contentType);
      options.body = await req.arrayBuffer();
    } else {
      headers.set("content-type", contentType);
      options.body = await req.text();
    }
  }

  try {
    const backendRes = await fetch(url, options);
    const body = await backendRes.arrayBuffer();

    const res = new NextResponse(body, {
      status: backendRes.status,
      statusText: backendRes.statusText,
    });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);

    return res;
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return NextResponse.json(
      { message: "Backend connection failed" },
      { status: 502 },
    );
  }
}

// =============================================================
// HTTP METHODS
// =============================================================
export async function GET(req, ctx) {
  return proxy(req, "GET", ctx);
}
export async function POST(req, ctx) {
  return proxy(req, "POST", ctx);
}
export async function PUT(req, ctx) {
  return proxy(req, "PUT", ctx);
}
export async function PATCH(req, ctx) {
  return proxy(req, "PATCH", ctx);
}
export async function DELETE(req, ctx) {
  return proxy(req, "DELETE", ctx);
}
