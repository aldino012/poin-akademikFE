import { NextResponse } from "next/server";

export const runtime = "nodejs";

// 🔥 UPDATE: Mengarah ke Backend cPanel Jagoan Hosting
const BACKEND_URL = "https://api.poin-mhs-stikom.my.id";

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

  // 🔥 URL akan menjadi: https://api.poin-mhs-stikom.my.id/api/auth/login, dsb.
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
    credentials: "include", // Penting agar cookie bisa dikirim/diterima
  };

  // ==============================
  // BODY HANDLING
  // ==============================
  if (method !== "GET" && method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      // 🔥 FILE UPLOAD
      // Kita forward content-type asli (termasuk boundary)
      headers.set("content-type", contentType);
      options.body = await req.arrayBuffer();
    } else {
      // 🔥 JSON / LOGIN / NORMAL POST
      headers.set("content-type", contentType);
      options.body = await req.text();
    }
  }

  try {
    // ==============================
    // FETCH TO BACKEND
    // ==============================
    const backendRes = await fetch(url, options);
    const body = await backendRes.arrayBuffer();

    const res = new NextResponse(body, {
      status: backendRes.status,
      statusText: backendRes.statusText,
    });

    // 🔐 forward set-cookie dari backend ke browser
    // Supaya login session tersimpan di browser user
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return NextResponse.json(
      { message: "Backend connection failed" },
      { status: 502 },
    );
  }
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
