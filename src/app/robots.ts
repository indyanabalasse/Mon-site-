import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Les moteurs génératifs (ChatGPT, Claude, Perplexity, AI Overviews) sont une
// source de trafic à part entière : on les autorise explicitement plutôt que de
// s'en remettre au « Allow: / » générique, qu'une future règle restrictive
// couperait sans que personne ne s'en aperçoive.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
];

const DISALLOW = ["/admin", "/api"];

// Les images Open Graph sont servies depuis /api/og : sans cette exception plus
// spécifique, le Disallow ci-dessus les rendrait inaccessibles aux robots.
const ALLOW = ["/", "/api/og"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ALLOW,
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ALLOW,
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
