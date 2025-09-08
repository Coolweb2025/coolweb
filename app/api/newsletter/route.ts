import { NextResponse } from "next/server";

const PHP_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://bpieczka.smallhost.pl/coolweb/api/index.php/";

function buildUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  return PHP_API_BASE.replace(/\/$/, "") + path;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email : "";

    const res = await fetch(buildUrl("/newsletter"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const text = await res.text();
    type ApiResp = { status?: string; message?: string; error?: string };
    let payload: ApiResp;

    try {
      const parsed = JSON.parse(text) as unknown;
      if (parsed && typeof parsed === "object") {
        const obj = parsed as Record<string, unknown>;
        payload = {
          status: typeof obj.status === "string" ? obj.status : undefined,
          message: typeof obj.message === "string" ? obj.message : undefined,
          error: typeof obj.error === "string" ? obj.error : undefined,
        };
        if (!payload.status && !payload.message && !payload.error) {
          payload = { error: text || "Upstream error" };
        }
      } else {
        payload = { error: text || "Upstream error" };
      }
    } catch {
      payload = { error: text || "Upstream error" };
    }

    return NextResponse.json(payload, { status: res.status });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
