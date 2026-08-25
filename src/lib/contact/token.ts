import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signed, stateless tokens for the contact form's email-confirmation link.
 * Same HMAC-SHA256 + timingSafeEqual approach as newsletter tokens
 * (src/lib/newsletter/token.ts), reusing ADMIN_SESSION_SECRET. The message
 * itself travels inside the token, so nothing needs to be stored server-side
 * until the sender proves they own the address by clicking the link.
 */

const TOKEN_DURATION_MS = 1000 * 60 * 60 * 48; // 48 hours

type ContactTokenPayload = {
  name: string;
  email: string;
  message: string;
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

export function signContactToken(params: {
  name: string;
  email: string;
  message: string;
  locale: "fr" | "en";
}): string {
  const payload: ContactTokenPayload = {
    ...params,
    expires: Date.now() + TOKEN_DURATION_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyContactToken(
  token: string
): { name: string; email: string; message: string; locale: "fr" | "en" } | null {
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

    const decoded = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as Partial<ContactTokenPayload>;

    if (typeof decoded.name !== "string" || !decoded.name) return null;
    if (typeof decoded.email !== "string" || !decoded.email) return null;
    if (typeof decoded.message !== "string" || !decoded.message) return null;
    if (decoded.locale !== "fr" && decoded.locale !== "en") return null;
    if (typeof decoded.expires !== "number" || !Number.isFinite(decoded.expires)) return null;
    if (Date.now() > decoded.expires) return null;

    return {
      name: decoded.name,
      email: decoded.email,
      message: decoded.message,
      locale: decoded.locale,
    };
  } catch {
    return null;
  }
}
