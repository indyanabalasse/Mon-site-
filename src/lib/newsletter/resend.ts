/**
 * Raw-fetch wrappers around the Resend REST API for the newsletter feature.
 * Follows the exact fetch pattern already used in src/app/api/contact/route.ts
 * (no "resend" npm package, no other new dependency).
 *
 * There is no database in this project: the Resend "audience" (an object under
 * Resend's newer /segments endpoints, which is what the older /audiences concept
 * is called in the current API) IS the subscriber storage. We look it up by name
 * on demand instead of requiring a stored id, so no new env var is needed beyond
 * RESEND_API_KEY (already present in .env.local).
 */

const RESEND_API_BASE = "https://api.resend.com";
const AUDIENCE_NAME = "INDYANASTUDIO Newsletter";

// Resend's shared onboarding@resend.dev sender can only deliver to the account
// owner's own address, so real subscribers get a 403 until a domain is verified
// at resend.com/domains. Once it is, setting NEWSLETTER_FROM (e.g.
// "Indyana Balasse <hello@indyanabalasse.com>") switches every send over
// without a code change.
const FROM_ADDRESS = process.env.NEWSLETTER_FROM || "Indyana Balasse <onboarding@resend.dev>";

function getApiKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return key;
}

async function resendFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${RESEND_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  return res;
}

async function throwOnError(res: Response, context: string): Promise<void> {
  if (res.ok) return;
  const detail = await res.text().catch(() => "");
  throw new Error(`Resend ${context} failed: ${res.status} ${detail}`);
}

type ResendSegment = { id: string; name: string; created_at?: string };
type ResendSegmentList = { object: "list"; has_more: boolean; data: ResendSegment[] };
type ResendContact = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
  unsubscribed?: boolean;
};
type ResendContactList = { object: "list"; has_more: boolean; data: ResendContact[] };

/**
 * Finds the "INDYANASTUDIO Newsletter" audience by name, creating it if it
 * doesn't exist yet. Called on demand by every function below instead of
 * requiring a stored audience id.
 */
export async function getOrCreateAudienceId(): Promise<string> {
  const listRes = await resendFetch("/segments", { method: "GET" });
  await throwOnError(listRes, "list audiences");
  const list = (await listRes.json()) as ResendSegmentList;

  const existing = list.data.find((segment) => segment.name === AUDIENCE_NAME);
  if (existing) return existing.id;

  const createRes = await resendFetch("/segments", {
    method: "POST",
    body: JSON.stringify({ name: AUDIENCE_NAME }),
  });
  await throwOnError(createRes, "create audience");
  const created = (await createRes.json()) as { id: string };
  return created.id;
}

/**
 * Adds (or reactivates) a contact in the audience with a confirmed,
 * subscribed status. Called only after the person has clicked the
 * confirmation link, per GDPR double opt-in.
 */
export async function addConfirmedContact(email: string): Promise<void> {
  const audienceId = await getOrCreateAudienceId();

  const createRes = await resendFetch("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: audienceId }],
    }),
  });

  if (createRes.ok) return;

  // The contact may already exist from a previous signup/unsubscribe cycle.
  // Re-confirming should be idempotent: reactivate it and make sure it's
  // still in the audience, instead of failing on a duplicate-email error.
  if (createRes.status === 409) {
    const encodedEmail = encodeURIComponent(email);

    const updateRes = await resendFetch(`/contacts/${encodedEmail}`, {
      method: "PATCH",
      body: JSON.stringify({ unsubscribed: false }),
    });
    await throwOnError(updateRes, "reactivate contact");

    const segmentRes = await resendFetch(`/contacts/${encodedEmail}/segments/${audienceId}`, {
      method: "POST",
    });
    await throwOnError(segmentRes, "add contact to audience");
    return;
  }

  await throwOnError(createRes, "add contact");
}

/**
 * Removes a contact from Resend entirely. Used for unsubscribe: since the
 * audience is the only place subscribers are stored, deleting the contact
 * is enough to stop all future sends to them.
 */
export async function removeContact(email: string): Promise<void> {
  const encodedEmail = encodeURIComponent(email);
  const res = await resendFetch(`/contacts/${encodedEmail}`, { method: "DELETE" });
  // Already gone is a success from the caller's point of view (idempotent unsubscribe).
  if (res.status === 404) return;
  await throwOnError(res, "remove contact");
}

/** Lists every contact currently in the newsletter audience. */
export async function listContacts(): Promise<{ id: string; email: string; createdAt: string }[]> {
  const audienceId = await getOrCreateAudienceId();
  const res = await resendFetch(`/segments/${audienceId}/contacts`, { method: "GET" });
  await throwOnError(res, "list contacts");
  const list = (await res.json()) as ResendContactList;
  return list.data.map((contact) => ({
    id: contact.id,
    email: contact.email,
    createdAt: contact.created_at,
  }));
}

/** Sends a single one-off email (confirm / unsubscribed notice), not a broadcast. */
export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await resendFetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [params.to],
      subject: params.subject,
      html: params.html,
    }),
  });
  await throwOnError(res, "send transactional email");
}

/** Creates and immediately sends a broadcast to every contact in the audience. */
export async function sendBroadcastToAudience(params: { subject: string; html: string }): Promise<void> {
  const audienceId = await getOrCreateAudienceId();
  const res = await resendFetch("/broadcasts", {
    method: "POST",
    body: JSON.stringify({
      segment_id: audienceId,
      from: FROM_ADDRESS,
      subject: params.subject,
      html: params.html,
      send: true,
    }),
  });
  await throwOnError(res, "send broadcast");
}
