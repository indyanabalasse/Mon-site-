import { getDictionary } from "@/lib/i18n";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

/**
 * Server-only client for PostHog's HogQL Query API, plus the specific
 * queries and JS-side aggregation that power the /admin dashboard.
 * Never import this from a Client Component — POSTHOG_PERSONAL_API_KEY
 * must stay on the server.
 */

const RAW_EVENT_LIMIT = 20_000;

export function isPostHogConfigured(): boolean {
  return Boolean(
    process.env.POSTHOG_PERSONAL_API_KEY &&
      process.env.POSTHOG_PROJECT_ID &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
  );
}

function getApiHost(): string {
  const ingestHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";
  // Client ingestion uses eu.i.posthog.com / us.i.posthog.com; the REST API
  // lives on the matching eu.posthog.com / us.posthog.com app host.
  return ingestHost.replace(".i.posthog.com", ".posthog.com");
}

async function runHogQL(query: string): Promise<unknown[][]> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const res = await fetch(`${getApiHost()}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`PostHog query failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as { results?: unknown[][] };
  return data.results ?? [];
}

type PathParts = {
  locale?: string;
  section?: string;
  category?: string;
  series?: string;
};

function parsePathname(pathname: string): PathParts {
  const parts = pathname.split("/").filter(Boolean);
  const [locale, section, category, series] = parts;
  return { locale, section, category, series };
}

const PAGE_LABELS_FR: Record<string, string> = {
  "": "Accueil",
  portfolio: "Portfolio",
  packaging: "Formules & Tarifs",
  about: "À propos",
  contact: "Contact",
};

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function labelForPath(parts: PathParts): string {
  const dict = getDictionary("fr");
  if (!parts.section) return PAGE_LABELS_FR[""];
  if (parts.section !== "portfolio") return PAGE_LABELS_FR[parts.section] ?? titleCase(parts.section);

  if (!parts.category) return PAGE_LABELS_FR.portfolio;
  const categoryDict = (dict.categories as Record<string, { title: string; series: Record<string, string> }>)[
    parts.category
  ];
  const categoryLabel = categoryDict?.title ?? titleCase(parts.category);
  if (!parts.series) return categoryLabel;

  const seriesLabel = categoryDict?.series?.[parts.series] ?? titleCase(parts.series);
  return `${categoryLabel} — ${seriesLabel}`;
}

export type DashboardData = {
  periodDays: number;
  overview: {
    visitors: number;
    pageviews: number;
    sessions: number;
    leads: number;
    contactStarts: number;
    instagramClicks: number;
    activationRate: number; // 0-1: share of sessions that explored a portfolio category/series
    returningVisitorRate: number; // 0-1: share of visitors active on 2+ distinct days
  };
  topContent: { label: string; category: string; series: string | null; views: number }[];
  topPaths: { label: string; sessions: number }[];
  acquisition: { label: string; sessions: number }[];
  trend: { day: string; pageviews: number; visitors: number }[];
  sampled: boolean;
};

export async function getDashboardData(periodDays: number): Promise<DashboardData> {
  const [counts, rawPageviews, eventCounts] = await Promise.all([
    runHogQL(
      `SELECT count(), count(DISTINCT person_id), count(DISTINCT properties.$session_id)
       FROM events
       WHERE event = '$pageview' AND timestamp >= now() - INTERVAL ${periodDays} DAY`
    ),
    runHogQL(
      `SELECT properties.$pathname, properties.$session_id, person_id, toDate(timestamp), properties.$referring_domain
       FROM events
       WHERE event = '$pageview' AND timestamp >= now() - INTERVAL ${periodDays} DAY
       ORDER BY properties.$session_id, timestamp
       LIMIT ${RAW_EVENT_LIMIT}`
    ),
    runHogQL(
      `SELECT event, count()
       FROM events
       WHERE event IN ('${ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED}', '${ANALYTICS_EVENTS.CONTACT_FORM_STARTED}', '${ANALYTICS_EVENTS.INSTAGRAM_CLICK}')
         AND timestamp >= now() - INTERVAL ${periodDays} DAY
       GROUP BY event`
    ),
  ]);

  const [totalPageviews, totalVisitors, totalSessions] = counts[0] ?? [0, 0, 0];

  const eventCountMap = new Map<string, number>(
    eventCounts.map(([event, c]) => [String(event), Number(c)])
  );

  type Row = { pathname: string; sessionId: string; personId: string; day: string; refDomain: string | null };
  const rows: Row[] = rawPageviews.map(([pathname, sessionId, personId, day, refDomain]) => ({
    pathname: String(pathname ?? ""),
    sessionId: String(sessionId ?? ""),
    personId: String(personId ?? ""),
    day: String(day ?? ""),
    refDomain: refDomain ? String(refDomain) : null,
  }));

  // --- Top content: which portfolio categories/series get the most views ---
  const contentCounts = new Map<string, { label: string; category: string; series: string | null; views: number }>();
  for (const row of rows) {
    const parts = parsePathname(row.pathname);
    if (parts.section !== "portfolio" || !parts.category) continue;
    const key = `${parts.category}/${parts.series ?? ""}`;
    const existing = contentCounts.get(key);
    if (existing) {
      existing.views += 1;
    } else {
      contentCounts.set(key, {
        label: labelForPath(parts),
        category: parts.category,
        series: parts.series ?? null,
        views: 1,
      });
    }
  }
  const topContent = [...contentCounts.values()].sort((a, b) => b.views - a.views).slice(0, 8);

  // --- Sessions: activation + user journeys ---
  const sessions = new Map<string, Row[]>();
  for (const row of rows) {
    if (!row.sessionId) continue;
    const list = sessions.get(row.sessionId);
    if (list) list.push(row);
    else sessions.set(row.sessionId, [row]);
  }

  let activatedSessions = 0;
  const pathSequenceCounts = new Map<string, number>();
  for (const sessionRows of sessions.values()) {
    const parsedSteps = sessionRows.map((r) => parsePathname(r.pathname));
    if (parsedSteps.some((p) => p.section === "portfolio" && p.category)) activatedSessions += 1;

    const labels: string[] = [];
    for (const parts of parsedSteps) {
      const label = labelForPath(parts);
      if (labels[labels.length - 1] !== label) labels.push(label);
    }
    if (labels.length >= 2) {
      const sequence = labels.slice(0, 5).join(" → ");
      pathSequenceCounts.set(sequence, (pathSequenceCounts.get(sequence) ?? 0) + 1);
    }
  }
  const topPaths = [...pathSequenceCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, sessionsCount]) => ({ label, sessions: sessionsCount }));

  // --- Retention: visitors active on 2+ distinct days in the period ---
  const daysByPerson = new Map<string, Set<string>>();
  for (const row of rows) {
    if (!row.personId) continue;
    const set = daysByPerson.get(row.personId);
    if (set) set.add(row.day);
    else daysByPerson.set(row.personId, new Set([row.day]));
  }
  const returningVisitors = [...daysByPerson.values()].filter((d) => d.size >= 2).length;
  const knownVisitors = daysByPerson.size || 1;

  // --- Acquisition: where sessions came from ---
  const sourceCounts = new Map<string, Set<string>>();
  for (const row of rows) {
    const isDirect = !row.refDomain || row.refDomain === "$direct";
    const domain = isDirect ? "Direct" : row.refDomain!;
    const set = sourceCounts.get(domain);
    if (set) set.add(row.sessionId);
    else sourceCounts.set(domain, new Set([row.sessionId]));
  }
  const acquisition = [...sourceCounts.entries()]
    .map(([label, sessionSet]) => ({ label, sessions: sessionSet.size }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 8);

  // --- Trend: pageviews + visitors per day ---
  const trendMap = new Map<string, { pageviews: number; visitors: Set<string> }>();
  for (const row of rows) {
    const entry = trendMap.get(row.day) ?? { pageviews: 0, visitors: new Set<string>() };
    entry.pageviews += 1;
    if (row.personId) entry.visitors.add(row.personId);
    trendMap.set(row.day, entry);
  }
  const trend = [...trendMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, v]) => ({ day, pageviews: v.pageviews, visitors: v.visitors.size }));

  const sessionCount = totalSessions ? Number(totalSessions) : sessions.size;

  return {
    periodDays,
    overview: {
      visitors: Number(totalVisitors ?? 0),
      pageviews: Number(totalPageviews ?? 0),
      sessions: sessionCount,
      leads: eventCountMap.get(ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED) ?? 0,
      contactStarts: eventCountMap.get(ANALYTICS_EVENTS.CONTACT_FORM_STARTED) ?? 0,
      instagramClicks: eventCountMap.get(ANALYTICS_EVENTS.INSTAGRAM_CLICK) ?? 0,
      activationRate: sessions.size ? activatedSessions / sessions.size : 0,
      returningVisitorRate: returningVisitors / knownVisitors,
    },
    topContent,
    topPaths,
    acquisition,
    trend,
    sampled: rows.length >= RAW_EVENT_LIMIT,
  };
}
