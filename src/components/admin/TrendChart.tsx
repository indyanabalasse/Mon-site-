"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import type { DashboardData } from "@/lib/posthog-query";

const WIDTH = 600;
const HEIGHT = 200;
const PADDING = { top: 16, right: 12, bottom: 16, left: 12 };

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function formatDay(day: string): string {
  const date = new Date(`${day}T00:00:00`);
  if (Number.isNaN(date.getTime())) return day;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function TrendChart({
  trend,
}: {
  trend: DashboardData["trend"];
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const maxValue = useMemo(
    () => Math.max(1, ...trend.map((t) => t.pageviews)),
    [trend]
  );

  const layout = useMemo(() => {
    const stepX = trend.length > 1 ? plotWidth / (trend.length - 1) : 0;
    const toXY = (value: number, i: number): [number, number] => {
      const x = PADDING.left + stepX * i;
      const y = PADDING.top + plotHeight - (value / maxValue) * plotHeight;
      return [x, y];
    };
    const pv = trend.map((t, i) => toXY(t.pageviews, i));
    const vv = trend.map((t, i) => toXY(t.visitors, i));
    const toPath = (points: [number, number][]) =>
      points
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");
    return { pv, vv, pvPath: toPath(pv), vvPath: toPath(vv), stepX };
  }, [trend, maxValue, plotWidth, plotHeight]);

  if (trend.length === 0) {
    return (
      <section>
        <h2 className="font-serif text-xl mb-1">Évolution</h2>
        <p className="text-sm text-muted">
          Pas encore assez de données pour tracer une tendance.
        </p>
      </section>
    );
  }

  function handleMove(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg || !layout.stepX) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const localX = (e.clientX - rect.left) * scaleX;
    const rawIndex = (localX - PADDING.left) / layout.stepX;
    const clamped = Math.max(0, Math.min(trend.length - 1, Math.round(rawIndex)));
    setHoverIndex(clamped);
  }

  const hovered = hoverIndex !== null ? trend[hoverIndex] : null;
  const hoverPoint = hoverIndex !== null ? layout.pv[hoverIndex] : null;
  const leftPercent = hoverPoint
    ? Math.min(88, Math.max(12, (hoverPoint[0] / WIDTH) * 100))
    : 0;

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 mb-1">
        <h2 className="font-serif text-xl">Évolution</h2>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5 bg-foreground" /> Pages vues
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 border-t-2 border-dashed border-muted" />
            Visiteurs
          </span>
        </div>
      </div>
      <p className="text-sm text-muted mb-4">
        Pages vues et visiteurs, jour après jour.
      </p>

      <div className="relative border border-border">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto block"
          onPointerMove={handleMove}
          onPointerLeave={() => setHoverIndex(null)}
          role="img"
          aria-label="Évolution des pages vues et visiteurs sur la période"
        >
          <line
            x1={PADDING.left}
            y1={PADDING.top + plotHeight}
            x2={WIDTH - PADDING.right}
            y2={PADDING.top + plotHeight}
            stroke="var(--border)"
            strokeWidth={1}
          />

          {hoverPoint && (
            <line
              x1={hoverPoint[0]}
              y1={PADDING.top}
              x2={hoverPoint[0]}
              y2={PADDING.top + plotHeight}
              stroke="var(--border)"
              strokeWidth={1}
            />
          )}

          <path
            d={layout.vvPath}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={2}
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={layout.pvPath}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {hoverIndex !== null && (
            <>
              <circle
                cx={layout.pv[hoverIndex][0]}
                cy={layout.pv[hoverIndex][1]}
                r={4}
                fill="var(--foreground)"
                stroke="var(--background)"
                strokeWidth={2}
              />
              <circle
                cx={layout.vv[hoverIndex][0]}
                cy={layout.vv[hoverIndex][1]}
                r={4}
                fill="var(--muted)"
                stroke="var(--background)"
                strokeWidth={2}
              />
            </>
          )}
        </svg>

        {hovered && hoverPoint && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 border border-border bg-background px-3 py-2 text-xs whitespace-nowrap"
            style={{ left: `${leftPercent}%` }}
          >
            <p className="text-muted mb-1">{formatDay(hovered.day)}</p>
            <p>
              <span className="font-semibold tabular-nums">
                {formatNumber(hovered.pageviews)}
              </span>{" "}
              pages vues
            </p>
            <p>
              <span className="font-semibold tabular-nums">
                {formatNumber(hovered.visitors)}
              </span>{" "}
              visiteurs
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
