import { NextResponse } from "next/server";

// ⚠️ WAJIB: Node runtime (bukan Edge)
export const runtime = "nodejs";

// URL backend Railway (TANPA /api di akhir)
const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// =================================================
// OPTIONS (PRE-FLIGHT)
// =================================================
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// =================================================
// PROXY HANDLER (AMAN UNTUK UPLOAD FILE)
// =================================================
async function proxy(req, method, params) {
  // contoh: /api/proxy/mahasiswa/import-excel
  // path = mahasiswa/import-excel
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  const headers = new Headers();

  // 🔥 PENTING: forward cookie auth saja
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }

  const options = {
    method,
    headers,
    credentials: "include",
  };

  // 🔥 KUNCI UTAMA: gunakan arrayBuffer untuk multipart
  if (method !== "GET" && method !== "HEAD") {
    options.body = await req.arrayBuffer();
  }

  // Request ke backend
  const backendRes = await fetch(url, options);

  // 🔥 balikan body sebagai binary juga
  const body = await backendRes.arrayBuffer();

  const res = new NextResponse(body, {
    status: backendRes.status,
  });

  // Forward set-cookie jika ada
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}

// =================================================
// HTTP METHODS
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
