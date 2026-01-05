import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_BASE_URL = process.env.VITA_BACKEND_URL ?? "http://localhost:3000";

function buildUpstreamUrl(req: NextRequest, pathParts: string[]): string {
  const url = new URL(req.url);
  const path = pathParts.map(encodeURIComponent).join("/");
  const upstream = new URL(`${BACKEND_BASE_URL}/${path}`);
  upstream.search = url.search;
  return upstream.toString();
}

function filterHeaders(headers: Headers): HeadersInit {
  const out: Record<string, string> = {};
  const allow = new Set([
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-request-id",
  ]);

  headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (allow.has(k)) out[key] = value;
  });

  return out;
}

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const upstreamUrl = buildUpstreamUrl(req, path);

  const method = req.method.toUpperCase();
  const init: RequestInit = {
    method,
    headers: filterHeaders(req.headers),
    // @ts-expect-error - NextRequest uses web fetch; duplex required by some runtimes when sending a body
    duplex: "half",
  };

  if (method !== "GET" && method !== "HEAD") {
    const body = await req.arrayBuffer();
    init.body = body.byteLength ? body : undefined;
  }

  const upstreamRes = await fetch(upstreamUrl, init);
  const resBody = await upstreamRes.arrayBuffer();

  const resHeaders = new Headers();
  const contentType = upstreamRes.headers.get("content-type");
  if (contentType) resHeaders.set("content-type", contentType);

  return new Response(resBody, { status: upstreamRes.status, headers: resHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
