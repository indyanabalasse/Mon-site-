import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  if (!verifyPassword(body.password)) {
    return NextResponse.json({ ok: false, error: "invalid_password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
