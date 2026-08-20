import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { sendBroadcastToAudience } from "@/lib/newsletter/resend";
import { renderNewsletterEmail } from "@/lib/newsletter/template";

// Resend broadcasts send one HTML body to every contact in the audience, so
// there's no single request-scoped locale to sign a per-recipient unsubscribe
// token for. Resend's Broadcast API instead auto-replaces the merge tag
// {{{RESEND_UNSUBSCRIBE_URL}}} with each recipient's own working unsubscribe
// link when the email is sent through an audience/segment, so we embed that
// tag instead of building a URL ourselves (confirmed via Resend's Broadcast
// API + "handle unsubscribes" docs, both of which show this exact tag used
// directly in the html body).
const UNSUBSCRIBE_MERGE_TAG = "{{{RESEND_UNSUBSCRIBE_URL}}}";

// The audience mixes fr/en subscribers and a broadcast has only one body, so
// the campaign is composed in the site's default locale.
const BROADCAST_LOCALE = "fr";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const store = await cookies();
  if (!isAdminSessionValid(store)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (
    !body ||
    !isNonEmptyString(body.subject) ||
    !isNonEmptyString(body.heading) ||
    !isNonEmptyString(body.bodyHtml)
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const ctaLabel = isNonEmptyString(body.ctaLabel) ? body.ctaLabel : undefined;
  const ctaHref = isNonEmptyString(body.ctaHref) ? body.ctaHref : undefined;

  const html = renderNewsletterEmail({
    locale: BROADCAST_LOCALE,
    heading: body.heading,
    bodyHtml: body.bodyHtml,
    ctaLabel: ctaLabel && ctaHref ? ctaLabel : undefined,
    ctaHref: ctaLabel && ctaHref ? ctaHref : undefined,
    unsubscribeUrl: UNSUBSCRIBE_MERGE_TAG,
  });

  try {
    await sendBroadcastToAudience({ subject: body.subject, html });
  } catch (error) {
    console.error("Admin newsletter: failed to send broadcast", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
