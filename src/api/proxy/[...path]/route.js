import { NextResponse } from "next/server";

const BACKEND_URL = "https://poin-akademikbe-production.up.railway.app";

// ==========================
// HELPER: forward request
// ==========================
async function proxyRequest(req, method, params) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/${path}`;

  const headers = new Headers();

  // forward cookies (INI KUNCI MOBILE)
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }

  // forward content type
  if (req.headers.get("content-type")) {
    headers.set("content-type", req.headers.get("content-type"));
  }

  const options = {
    method,
    headers,
    credentials: "include",
  };

  // body hanya untuk non-GET
  if (method !== "GET" && method !== "HEAD") {
    options.body = await req.text();
  }

  const backendRes = await fetch(url, options);

  const resBody = await backendRes.text();

  const response = new NextResponse(resBody, {
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
