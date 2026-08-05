import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getDashboardData, isPostHogConfigured } from "@/lib/posthog-query";

const ALLOWED_DAYS = new Set([7, 30, 90]);

export async function GET(request: NextRequest) {
  const store = await cookies();
  if (!isAdminSessionValid(store)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const requested = Number(request.nextUrl.searchParams.get("days"));
  const days = ALLOWED_DAYS.has(requested) ? requested : 30;

  if (!isPostHogConfigured()) {
    return NextResponse.json({ configured: false });
  }

  try {
    const data = await getDashboardData(days);
    return NextResponse.json({ configured: true, data });
  } catch (error) {
    console.error("Admin dashboard: stats query failed", error);
    return NextResponse.json({
      configured: true,
      error: "Impossible de récupérer les statistiques pour le moment.",
    });
  }
}
