import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  INSTAGRAM_URL,
  SITE_URL,
} from "@/lib/site";

/**
 * Renders a complete, standalone newsletter email HTML document.
 * Table-based layout with inline styles only (no <style> blocks, no
 * Tailwind classes) since most email clients strip external/head CSS.
 * Mirrors the site's monochrome, bordered, uppercase-microlabel look
 * with email-safe font fallbacks.
 */

const SERIF_STACK = "Georgia, 'Times New Roman', serif";
const SANS_STACK = "Helvetica, Arial, sans-serif";

const COLOR_BACKGROUND = "#ffffff";
const COLOR_FOREGROUND = "#171717";
const COLOR_BORDER = "#e5e5e5";
const COLOR_MUTED = "#6b6b6b";

const CONTENT_WIDTH = 560;

export function renderNewsletterEmail(params: {
  locale: "fr" | "en";
  preheader?: string;
  /** Small uppercase label above the heading, e.g. the series' category. */
  kicker?: string;
  heading: string;
  /** Absolute URL to a hero image shown above the text, e.g. a series cover. */
  imageUrl?: string;
  imageAlt?: string;
  bodyHtml?: string;
  ctaLabel?: string;
  ctaHref?: string;
  unsubscribeUrl?: string;
}): string {
  const {
    locale,
    preheader,
    kicker,
    heading,
    imageUrl,
    imageAlt,
    bodyHtml,
    ctaLabel,
    ctaHref,
    unsubscribeUrl,
  } = params;
  const showCta = Boolean(ctaLabel && ctaHref);
  const role = locale === "fr" ? "Photographe" : "Photographer";

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLOR_BACKGROUND}; font-family:${SANS_STACK};">
    ${
      preheader
        ? `<div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(
            preheader
          )}</div>`
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR_BACKGROUND};">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="${CONTENT_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${CONTENT_WIDTH}px; max-width:${CONTENT_WIDTH}px;">
            <tr>
              <td style="padding-bottom:32px; text-align:center;">
                <a
                  href="${SITE_URL}"
                  style="font-family:${SERIF_STACK}; font-size:24px; color:${COLOR_FOREGROUND}; text-decoration:none;"
                >Indyana Balasse</a>
              </td>
            </tr>
            ${
              imageUrl
                ? `<tr>
              <td style="padding-bottom:32px;">
                <a href="${escapeAttribute(ctaHref ?? SITE_URL)}" style="text-decoration:none;">
                  <img
                    src="${escapeAttribute(imageUrl)}"
                    alt="${escapeAttribute(imageAlt ?? heading)}"
                    width="${CONTENT_WIDTH}"
                    style="display:block; width:100%; max-width:${CONTENT_WIDTH}px; height:auto; border:0; outline:none; text-decoration:none;"
                  />
                </a>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="border-top:1px solid ${COLOR_BORDER}; padding-top:32px;">
                ${
                  kicker
                    ? `<p style="margin:0 0 10px 0; font-family:${SANS_STACK}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLOR_MUTED};">${escapeHtml(
                        kicker
                      )}</p>`
                    : ""
                }
                <h1 style="margin:0; font-family:${SERIF_STACK}; font-weight:400; font-size:28px; line-height:1.3; color:${COLOR_FOREGROUND};">
                  ${escapeHtml(heading)}
                </h1>
                ${
                  bodyHtml
                    ? `<div style="margin-top:20px; font-family:${SANS_STACK}; font-size:15px; line-height:1.7; color:${COLOR_FOREGROUND};">
                  ${bodyHtml}
                </div>`
                    : ""
                }
              </td>
            </tr>
            ${
              showCta
                ? `<tr>
              <td style="padding:32px 0 8px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border:1px solid ${COLOR_FOREGROUND};">
                      <a
                        href="${escapeAttribute(ctaHref!)}"
                        style="display:inline-block; padding:14px 28px; font-family:${SANS_STACK}; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:${COLOR_FOREGROUND}; text-decoration:none;"
                      >${escapeHtml(ctaLabel!)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding-top:40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border-top:1px solid ${COLOR_BORDER}; padding-top:32px;">
                      <p style="margin:0 0 6px 0; font-family:${SERIF_STACK}; font-size:18px; line-height:1.4; color:${COLOR_FOREGROUND};">
                        Indyana Balasse
                      </p>
                      <p style="margin:0 0 12px 0; font-family:${SANS_STACK}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLOR_MUTED};">
                        ${role}
                      </p>
                      <p style="margin:0; font-family:${SANS_STACK}; font-size:13px; line-height:1.8; color:${COLOR_MUTED};">
                        <a href="mailto:${CONTACT_EMAIL}" style="color:${COLOR_MUTED}; text-decoration:underline;">${CONTACT_EMAIL}</a>
                        <br />
                        <a href="tel:${CONTACT_PHONE_HREF}" style="color:${COLOR_MUTED}; text-decoration:underline;">${CONTACT_PHONE_DISPLAY}</a>
                        &nbsp;&middot;&nbsp;
                        <a href="${INSTAGRAM_URL}" style="color:${COLOR_MUTED}; text-decoration:underline;">Instagram</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              unsubscribeUrl
                ? `<tr>
              <td style="padding-top:24px; text-align:center;">
                <p style="margin:0; font-family:${SANS_STACK}; font-size:11px; color:${COLOR_MUTED};">
                  <a href="${escapeAttribute(unsubscribeUrl)}" style="color:${COLOR_MUTED}; text-decoration:underline;">${
                    locale === "fr" ? "Se désabonner" : "Unsubscribe"
                  }</a>
                </p>
              </td>
            </tr>`
                : ""
            }
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
