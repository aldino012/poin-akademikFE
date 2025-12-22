import { NextResponse } from "next/server";

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// ==========================
// HELPER: proxy request
// ==========================
async function proxyRequest(req, method, params) {
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

  // body untuk non-GET
  if (method !== "GET" && method !== "HEAD") {
    options.body = await req.text();
  }

  const backendRes = await fetch(url, options);
  const body = await backendRes.text();

  const response = new NextResponse(body, {
    status: backendRes.status,
  });

  // forward set-cookie dari backend ke browser
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

// ==========================
// HTTP METHODS
// ==========================
export async function OPTIONS() {
  // 🔥 INI WAJIB agar browser mau lanjut POST
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function GET(req, ctx) {
  return proxyRequest(req, "GET", ctx.params);
}

export async function POST(req, ctx) {
  return proxyRequest(req, "POST", ctx.params);
}

export async function PUT(req, ctx) {
  return proxyRequest(req, "PUT", ctx.params);
}

export async function PATCH(req, ctx) {
  return proxyRequest(req, "PATCH", ctx.params);
}

export async function DELETE(req, ctx) {
  return proxyRequest(req, "DELETE", ctx.params);
}
