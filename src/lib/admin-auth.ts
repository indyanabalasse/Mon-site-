import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "indyana_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

/** Accepts the object returned by `await cookies()` in Server Components / Route Handlers. */
export function isAdminSessionValid(cookieStore: { get(name: string): { value: string } | undefined }): boolean {
  return verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // Lengths must match for timingSafeEqual; a length mismatch already means "wrong password".
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
