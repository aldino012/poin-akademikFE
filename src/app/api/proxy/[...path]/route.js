import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

function resolveBackendUrl(path) {
  // 🔥 route TANPA /api (khusus pencapaian mahasiswa)
  if (path.startsWith("mahasiswa/") && path.endsWith("/kegiatan")) {
    return `${BACKEND_URL}/${path}`;
  }

  // 🔥 DEFAULT: route pakai /api
  return `${BACKEND_URL}/api/${path}`;
}

async function proxy(req, method, params) {
  const path = params.path.join("/");
  const url = resolveBackendUrl(path);

  const headers = new Headers();

  // forward cookie
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

  if (method !== "GET" && method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      headers.set("content-type", contentType);
      options.body = await req.arrayBuffer();
    } else {
      headers.set("content-type", contentType);
      options.body = await req.text();
    }
  }

  const backendRes = await fetch(url, options);
  const body = await backendRes.arrayBuffer();

  const res = new NextResponse(body, {
    status: backendRes.status,
  });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}

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
