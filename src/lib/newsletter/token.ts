import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signed, stateless tokens for newsletter confirm/unsubscribe links.
 * Same HMAC-SHA256 + timingSafeEqual approach as src/lib/admin-auth.ts,
 * reusing ADMIN_SESSION_SECRET (no new secret env var), with a payload
 * shape that carries the email, the action the link performs, and the
 * locale the resulting page should render in.
 */

export type NewsletterTokenPurpose = "confirm" | "unsubscribe";

const TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

type TokenPayload = {
  email: string;
  purpose: NewsletterTokenPurpose;
  locale: "fr" | "en";
  expires: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function signNewsletterToken(
  email: string,
  purpose: NewsletterTokenPurpose,
  locale: "fr" | "en"
): string {
  const payload: TokenPayload = {
    email,
    purpose,
    locale,
    expires: Date.now() + TOKEN_DURATION_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyNewsletterToken(
  token: string
): { email: string; purpose: NewsletterTokenPurpose; locale: "fr" | "en" } | null {
  if (!token) return null;

  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;

    let expected: string;
    try {
      expected = sign(encoded);
    } catch {
      return null;
    }

    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Partial<TokenPayload>;

    if (typeof decoded.email !== "string" || !decoded.email) return null;
    if (decoded.purpose !== "confirm" && decoded.purpose !== "unsubscribe") return null;
    if (decoded.locale !== "fr" && decoded.locale !== "en") return null;
    if (typeof decoded.expires !== "number" || !Number.isFinite(decoded.expires)) return null;
    if (Date.now() > decoded.expires) return null;

    return { email: decoded.email, purpose: decoded.purpose, locale: decoded.locale };
  } catch {
    return null;
  }
}
