import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────────── */
const ICONS: Record<string, string> = {
  home:       "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  dumbbell:   "M6.5 6.5m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0 M17.5 6.5m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0 M2 8.5h4l2 7h8l2-7h4",
  list:       "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  chart:      "M22 12h-4l-3 9L9 3l-3 9H2",
  leaf:       "M17 8C8 10 5.9 16.17 3.82 20.08A2 2 0 0 0 5.62 23c5.79-1 11-3 13-11 2-8-3-9-1.62-4",
  trophy:     "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  bar3:       "M12 20V10 M18 20V4 M6 20v-4",
  star:       "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  user:       "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0",
  gear:       "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
  bell:       "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  flame:      "M12 2c0 0-5.5 6-5.5 10.5a5.5 5.5 0 0 0 11 0C17.5 8 12 2 12 2z",
  check:      "M20 6L9 17l-5-5",
  plus:       "M12 5v14 M5 12h14",
  chevR:      "M9 18l6-6-6-6",
  chevD:      "M6 9l6 6 6-6",
  arrowU:     "M12 19V5 M5 12l7-7 7 7",
  arrowD:     "M12 5v14 M19 12l-7 7-7-7",
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  target:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  timer:      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  weight:     "M12 3m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M4 21h16 M6 21V11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10 M12 5v4",
  trendUp:    "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  x:          "M18 6L6 18 M6 6l12 12",
  crown:      "M2 20h20 M5 20V9l7-7 7 7v11",
  medal:      "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  activity:   "M22 12h-4l-3 9L9 3l-3 9H2",
  edit:       "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  lock:       "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  moon:       "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  help:       "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01",
  log:        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  drop:       "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  apple:      "M12 20.94c1.5 0 4.67-1 6.16-8.06A5 5 0 0 0 17 4a5 5 0 0 0-5 5 5 5 0 0 0-5-5 5 5 0 0 0-1.16 8.88C7.33 19.94 10.5 20.94 12 20.94z",
  users:      "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0",
};

function I({ n, s = 17, c = "currentColor" }: { n: string; s?: number; c?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "block" }}>
      {ICONS[n]?.split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : "M" + seg} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────────────────────────────────────── */
function Avatar({ init, size = 36, ring = false }: { init: string; size?: number; ring?: boolean }) {
  return (
    <div className={`avatar ${ring ? "avatar-ring" : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.36, lineHeight: 1 }}>
      {init}
    </div>
  );
}

function CircProg({ val, max, size = 88, sw = 7, children }: { val: number; max: number; size?: number; sw?: number; children?: React.ReactNode }) {
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(val / max, 1);
  const cx = size / 2;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--card-3)" strokeWidth={sw} />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--accent)" strokeWidth={sw}
          strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function ProgBar({ val, max, h = 6, color = "var(--accent)", style: s }: { val: number; max: number; h?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <div className="progress-track" style={{ height: h, ...s }}>
      <div className="progress-fill" style={{ width: `${Math.min(val / max, 1) * 100}%`, height: h, background: color }} />
    </div>
  );
}

function SparkBars({ data, color = "var(--accent)", h = 36 }: { data: number[]; color?: string; h?: number }) {
  const mx = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: h }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, background: color, borderRadius: 2,
          height: `${Math.max((v / mx) * 100, 4)}%`, opacity: 0.15 + 0.85 * (v / mx) }} />
      ))}
    </div>
  );
}

/* Smooth SVG line + area chart with hover tooltip */
function LineChart({ data, labels, h = 140, color = "var(--accent)", secondary, secColor = "var(--blue)" }: {
  data: number[]; labels?: string[]; h?: number; color?: string; secondary?: number[]; secColor?: string;
}) {
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 560, pad = { t: 12, r: 12, b: labels ? 26 : 8, l: 38 };
  const iW = W - pad.l - pad.r, iH = h - pad.t - pad.b;
  const all = [...data, ...(secondary || [])];
  const mn = Math.min(...all) * 0.97, mx = Math.max(...all) * 1.02;
  const sx = (i: number) => pad.l + (i / (data.length - 1)) * iW;
  const sy = (v: number) => pad.t + (1 - (v - mn) / (mx - mn)) * iH;
  const smooth = (arr: number[]) => arr.map((v, i, a) => {
    if (i === 0) return `M${sx(i)},${sy(v)}`;
    const prev = a[i - 1], cpX = (sx(i - 1) + sx(i)) / 2;
    return `C${cpX},${sy(prev)} ${cpX},${sy(v)} ${sx(i)},${sy(v)}`;
  }).join(" ");
  const area = (arr: number[]) => `${smooth(arr)} L${sx(arr.length - 1)},${pad.t + iH} L${pad.l},${pad.t + iH}Z`;
  const yVals = [mn, (mn + mx) / 2, mx];
  const gid = "lg" + color.replace(/[^a-z]/gi, "");

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const xRel = ((e.clientX - rect.left) / rect.width) * W;
    const closest = Math.round((xRel - pad.l) / (iW / (data.length - 1)));
    const i = Math.max(0, Math.min(data.length - 1, closest));
    setHover({ i, x: sx(i), y: sy(data[i]) });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: h }}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${h}`} style={{ width: "100%", height: "100%", overflow: "visible" }}
        onMouseMove={handleMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={gid + "s"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={secColor} stopOpacity="0.14" />
            <stop offset="100%" stopColor={secColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {yVals.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} y1={sy(v)} x2={pad.l + iW} y2={sy(v)}
              stroke="var(--border)" strokeWidth={0.6} strokeDasharray="4 4" />
            <text x={pad.l - 7} y={sy(v) + 4} textAnchor="end" fontSize={9} fill="var(--text-3)">{Math.round(v)}</text>
          </g>
        ))}
        {secondary && <>
          <path d={area(secondary)} fill={`url(#${gid}s)`} />
          <path d={smooth(secondary)} fill="none" stroke={secColor} strokeWidth={1.5} opacity={0.7} />
        </>}
        <path d={area(data)} fill={`url(#${gid})`} />
        <path d={smooth(data)} fill="none" stroke={color} strokeWidth={2.2} />
        {labels && labels.map((l, i) => (
          <text key={i} x={sx(i)} y={pad.t + iH + 18} textAnchor="middle" fontSize={9} fill="var(--text-3)">{l}</text>
        ))}
        {hover && (
          <>
            <line x1={sx(hover.i)} y1={pad.t} x2={sx(hover.i)} y2={pad.t + iH}
              stroke="var(--border-3)" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={sx(hover.i)} cy={sy(data[hover.i])} r={5} fill={color} stroke="var(--bg-2)" strokeWidth={2} />
          </>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{
          left: `${(sx(hover.i) / W) * 100}%`, top: `${(sy(data[hover.i]) / h) * 100 - 22}%`,
          transform: "translate(-50%, -100%)", marginTop: -8
        }}>
          <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13 }}>{data[hover.i]}</div>
          {labels && <div style={{ color: "var(--text-3)", fontSize: 11 }}>{labels[hover.i]}</div>}
          {secondary && <div style={{ color: secColor, fontSize: 11 }}>Secondary: {secondary[hover.i]}</div>}
        </div>
      )}
    </div>
  );
}

function GroupedBars({ data, labels, h = 140 }: { data: { a: number; b: number }[]; labels: string[]; h?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 560, pad = { t: 8, r: 8, b: 24, l: 8 };
  const iH = h - pad.t - pad.b;
  const bw = 14, gap = 4, gw = bw * 2 + gap + 10;
  const mxA = Math.max(...data.map(d => d.a), 1), mxB = Math.max(...data.map(d => d.b), 1);
  const xg = (i: number) => pad.l + i * gw;

  return (
    <svg viewBox={`0 0 ${W} ${h}`} style={{ width: "100%", height: h, overflow: "visible" }}>
      {data.map((d, i) => {
        const hA = (d.a / mxA) * iH, hB = (d.b / mxB) * iH;
        const x = xg(i), isHov = hover === i;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect x={x} y={pad.t + iH - hA} width={bw} height={hA} rx={3}
              fill="var(--accent)" opacity={isHov ? 1 : 0.8} />
            <rect x={x + bw + gap} y={pad.t + iH - hB} width={bw} height={hB} rx={3}
              fill="var(--blue)" opacity={isHov ? 0.85 : 0.55} />
            <text x={x + bw + gap / 2} y={pad.t + iH + 16} textAnchor="middle" fontSize={9} fill={isHov ? "var(--text-2)" : "var(--text-3)"}>{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ segs, size = 130 }: { segs: { label: string; v: number; color: string }[]; size?: number }) {
  const [hov, setHov] = useState<number | null>(null);
  const total = segs.reduce((s, d) => s + d.v, 0);
  const cx = size / 2, r = size * 0.36, sw = size * 0.14;
  let ang = -Math.PI / 2;
  const arcs = segs.map((seg, i) => {
    const a = (seg.v / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(ang), y1 = cx + r * Math.sin(ang);
    ang += a;
    const x2 = cx + r * Math.cos(ang), y2 = cx + r * Math.sin(ang);
    return { d: `M${x1},${y1} A${r},${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x2},${y2}`, color: seg.color, a, i };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((arc) => (
        <path key={arc.i} d={arc.d} fill="none" stroke={arc.color} strokeWidth={hov === arc.i ? sw + 3 : sw}
          strokeLinecap="butt" style={{ transition: "stroke-width 0.2s" }}
          onMouseEnter={() => setHov(arc.i)} onMouseLeave={() => setHov(null)} />
      ))}
      <text x={cx} y={cx + 5} textAnchor="middle" fontSize={size * 0.16}
        fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fill="var(--text)">{total}</text>
      <text x={cx} y={cx + 18} textAnchor="middle" fontSize={size * 0.09} fill="var(--text-3)">sessions</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────────────────────────── */
function Toast({ msg, type = "success", onClose }: { msg: string; type?: "success" | "info" | "warning"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const colors: Record<string, string> = { success: "var(--accent)", info: "var(--blue)", warning: "var(--orange)" };
  const icons: Record<string, string> = { success: "check", info: "bell", warning: "zap" };
  const c = colors[type];
  return (
    <div className="toast">
      <div className="toast-icon" style={{ background: `${c}18` }}>
        <I n={icons[type]} s={16} c={c} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{msg}</div>
        <div style={{ fontSize: 11, color: "var(--text-3)" }}>Just now</div>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: 2 }}>
        <I n="x" s={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAT TILE
───────────────────────────────────────────────────────────────────────────── */
function StatTile({ icon, label, value, unit, sub, delta, spark, accent = "accent" }: {
  icon: string; label: string; value: string; unit?: string; sub?: string;
  delta?: number; spark?: number[]; accent?: string;
}) {
  const up = delta !== undefined && delta >= 0;
  const accentColor: Record<string, string> = {
    accent: "var(--accent)", blue: "var(--blue)", orange: "var(--orange)", red: "var(--red)", teal: "var(--teal)"
  };
  const c = accentColor[accent] || "var(--accent)";
  const bgMap: Record<string, string> = {
    accent: "var(--accent-bg)", blue: "var(--blue-bg)", orange: "var(--orange-bg)", red: "var(--red-bg)", teal: "var(--teal-bg)"
  };
  return (
    <div className={`stat-tile ${accent}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 33, height: 33, borderRadius: 8, background: bgMap[accent], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I n={icon} s={16} c={c} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
        </div>
        {delta !== undefined && (
          <span className={`badge ${up ? "badge-green" : "badge-red"}`}>
            <I n={up ? "arrowU" : "arrowD"} s={9} c={up ? "var(--accent)" : "var(--red)"} />
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span className="stat-value" style={{ fontSize: 30 }}>{value}</span>
            {unit && <span style={{ fontSize: 13, color: "var(--text-3)" }}>{unit}</span>}
          </div>
          {sub && <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{sub}</div>}
        </div>
        {spark && <div style={{ flex: "0 0 70px" }}><SparkBars data={spark} color={c} h={38} /></div>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────────────────────── */
function SectionHeader({ title, sub, action, onAction }: { title: string; sub?: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div>
        <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{title}</h3>
        {sub && <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>{sub}</p>}
      </div>
      {action && <button className="btn-ghost" style={{ fontSize: 12 }} onClick={onAction}>{action}</button>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: DASHBOARD
───────────────────────────────────────────────────────────────────────────── */
function Dashboard({ nav }: { nav: (p: string) => void }) {
  const barsData = [
    { a: 1, b: 4 }, { a: 0, b: 0 }, { a: 2, b: 8 },
    { a: 1, b: 5 }, { a: 2, b: 9 }, { a: 1, b: 4 }, { a: 0, b: 0 }
  ];
  const wt = [82.4, 82.0, 81.7, 81.4, 81.1, 80.8, 80.5, 80.2, 79.9, 79.7, 79.5, 79.3, 79.1, 79.0];
  const wtL = ["Sep 3","","5","","7","","9","","11","","13","","15","16"];
  const exercises = ["Pull-ups · 4×8", "Barbell Row · 4×8", "Lat Pulldown · 3×10", "Face Pulls · 3×15", "Barbell Curl · 3×10"];

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1, letterSpacing: "0.01em" }}>
            Good morning, Alex
          </h1>
          <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>
            12-day streak — you're building something real. Keep pushing. <span style={{ color: "var(--orange)" }}>🔥</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <button className="btn-icon"><I n="bell" s={16} /></button>
            <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", border: "1.5px solid var(--bg-2)" }} />
          </div>
          <div onClick={() => nav("profile")} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "7px 13px 7px 7px", cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
            <Avatar init="AJ" size={33} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>Alex Johnson</div>
              <div style={{ fontSize: 10.5, color: "var(--text-3)" }}>Pro · Level 14 · 5,640 pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="stat-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <StatTile icon="weight" label="Current Weight" value="79.0" unit="kg" sub="↓ 3.4 kg this month" delta={-3} spark={[82.4,81.8,81.2,80.5,79.9,79.5,79.0]} accent="accent" />
        <StatTile icon="dumbbell" label="Weekly Workouts" value="5" unit="/ 6" sub="Mon–Sun progress" delta={12} spark={[3,4,4,5,5,6,5]} accent="blue" />
        <StatTile icon="zap" label="Calories Burned" value="3,240" unit="kcal" sub="This week" delta={8} spark={[480,0,720,510,890,430,210]} accent="orange" />
        <StatTile icon="flame" label="Workout Streak" value="12" unit="days" sub="Personal best: 21 days" spark={[5,7,9,10,11,11,12]} accent="red" />
      </div>

      {/* Main 2-col */}
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: 16 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Weekly Activity */}
          <div className="card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <SectionHeader title="Weekly Activity" sub="Sep 9 – Sep 16, 2026" />
              <div style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--text-3)" }}>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2, display: "inline-block" }} />Workouts
                </span>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span style={{ width: 8, height: 8, background: "var(--blue)", opacity: 0.7, borderRadius: 2, display: "inline-block" }} />Calories (00s)
                </span>
              </div>
            </div>
            <GroupedBars data={barsData} labels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} h={150} />
          </div>

          {/* Weight trend */}
          <div className="card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <SectionHeader title="Weight Trend" sub="Last 14 days · −3.4 kg" />
              <span className="badge badge-green"><I n="arrowD" s={9} c="var(--accent)" />On track</span>
            </div>
            <LineChart data={wt} labels={wtL} h={140} />
          </div>

          {/* Recent Activity */}
          <div className="card" style={{ padding: "22px 24px" }}>
            <SectionHeader title="Recent Activity" action="View all →" onAction={() => nav("workout")} />
            {[
              { name: "Push Day — Chest & Shoulders", time: "Today, 7:14 AM", dur: "58 min", kcal: 420, pr: true },
              { name: "Leg Day — Quads & Glutes",     time: "Yesterday, 6:45 AM", dur: "65 min", kcal: 510, pr: false },
              { name: "Pull Day — Back & Biceps",     time: "Sep 14, 7:02 AM",   dur: "52 min", kcal: 380, pr: true },
              { name: "Core & Conditioning",          time: "Sep 12, 6:55 AM",   dur: "40 min", kcal: 290, pr: false },
            ].map((a, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I n="zap" s={16} c="var(--accent)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                    {a.pr && <span className="pr-badge">PR</span>}
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>{a.time}</span>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{a.dur}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>{a.kcal} kcal</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Today's workout */}
          <div className="card-accent" style={{ padding: "20px" }}>
            <SectionHeader title="Today's Workout" />
            <div className="card-inset" style={{ padding: "14px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Pull Day — Back &amp; Biceps</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
                    <span style={{ fontSize: 11, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 4 }}><I n="timer" s={11} c="var(--text-3)" />55–65 min</span>
                    <span style={{ fontSize: 11, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 4 }}><I n="zap" s={11} c="var(--text-3)" />~420 kcal</span>
                  </div>
                </div>
                <span className="badge badge-green">Scheduled</span>
              </div>
              <div className="divider" style={{ margin: "10px 0" }} />
              {exercises.map((ex, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0",
                  borderBottom: i < exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? "var(--accent)" : "var(--border-3)", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: i === 0 ? "var(--text)" : "var(--text-2)" }}>{ex}</span>
                  {i === 0 && <span className="pr-badge" style={{ marginLeft: "auto" }}>Next PR?</span>}
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-3)", marginBottom: 5 }}>
                  <span>Session progress</span><span>0 / 5</span>
                </div>
                <ProgBar val={0} max={5} h={5} />
              </div>
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => nav("workout")}>
              <I n="zap" s={15} c="#060608" /> Start Workout
            </button>
          </div>

          {/* Goal progress */}
          <div className="card" style={{ padding: "20px" }}>
            <SectionHeader title="Goal Progress" />
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              <CircProg val={79.0} max={75} size={88} sw={7}>
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: 17, color: "var(--text)", lineHeight: 1 }}>79.0</span>
                <span style={{ fontSize: 10, color: "var(--text-3)", marginTop: 1 }}>kg</span>
              </CircProg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>Weight Goal</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 10 }}>Target 75.0 kg · 4.0 kg left</div>
                {[
                  { l: "Progress", v: 56, c: "var(--accent)" },
                  { l: "Monthly workouts", v: 70, c: "var(--blue)" },
                ].map((g, i) => (
                  <div key={i} style={{ marginBottom: i === 0 ? 8 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-3)", marginBottom: 4 }}>
                      <span>{g.l}</span><span style={{ color: g.c, fontWeight: 600 }}>{g.v}%</span>
                    </div>
                    <ProgBar val={g.v} max={100} h={5} color={g.c} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { l: "Body Fat", v: "18.2%", t: "15%", pct: 55 },
                { l: "Muscle Mass", v: "38.4 kg", t: "42 kg", pct: 72 },
              ].map((g, i) => (
                <div key={i} className="card-inset" style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{g.l}</div>
                  <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 7 }}>{g.v}</div>
                  <ProgBar val={g.pct} max={100} h={4} />
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 4 }}>Target: {g.t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly challenges */}
          <div className="card" style={{ padding: "20px" }}>
            <SectionHeader title="Weekly Challenges" />
            {[
              { ico: "🏋️", l: "5 Workouts",       v: 4,    max: 5,    c: "var(--accent)" },
              { ico: "🔥", l: "Burn 3,500 kcal",  v: 3240, max: 3500, c: "var(--orange)" },
              { ico: "📅", l: "7-Day Consistency", v: 4,    max: 7,    c: "var(--blue)" },
            ].map((ch, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12.5, color: "var(--text-2)", display: "flex", alignItems: "center", gap: 7 }}>
                    {ch.ico} {ch.l}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>
                    {ch.v}/{ch.max}
                  </span>
                </div>
                <ProgBar val={ch.v} max={ch.max} h={6} color={ch.c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: WORKOUT
───────────────────────────────────────────────────────────────────────────── */
type SetRow = { weight: string; reps: string; done: boolean };

const EX_DATA = [
  { name: "Pull-ups", muscle: "Back · Biceps", pr: true,  rec: "BW+20 kg × 6" },
  { name: "Barbell Row", muscle: "Back · Rear Delts", pr: false, rec: "85 kg × 6" },
  { name: "Lat Pulldown", muscle: "Lats · Biceps", pr: false, rec: "60 kg × 10" },
  { name: "Face Pulls", muscle: "Rear Delts", pr: false, rec: "17.5 kg × 15" },
  { name: "Barbell Curl", muscle: "Biceps", pr: true,  rec: "30 kg × 8" },
];

const INIT_SETS: SetRow[][] = [
  [{ weight: "BW", reps: "8", done: false }, { weight: "BW", reps: "8", done: false }, { weight: "BW+10", reps: "6", done: false }, { weight: "BW+10", reps: "6", done: false }],
  [{ weight: "80", reps: "8", done: false }, { weight: "80", reps: "8", done: false }, { weight: "82.5", reps: "6", done: false }, { weight: "82.5", reps: "6", done: false }],
  [{ weight: "55", reps: "10", done: false }, { weight: "55", reps: "10", done: false }, { weight: "55", reps: "8", done: false }],
  [{ weight: "15", reps: "15", done: false }, { weight: "15", reps: "15", done: false }, { weight: "15", reps: "12", done: false }],
  [{ weight: "27.5", reps: "10", done: false }, { weight: "27.5", reps: "8", done: false }, { weight: "30", reps: "8", done: false }],
];

function WorkoutPage({ toast }: { toast: (m: string) => void }) {
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [sets, setSets] = useState<SetRow[][]>(INIT_SETS.map(e => e.map(s => ({ ...s }))));
  const [rest, setRest] = useState<number | null>(null);
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [started]);

  useEffect(() => {
    if (rest === null) return;
    restRef.current = setInterval(() => setRest(r => r! <= 1 ? null : r! - 1), 1000);
    return () => { if (restRef.current) clearInterval(restRef.current); };
  }, [rest]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const total = sets.flat().length;
  const done = sets.flat().filter(s => s.done).length;

  const toggleSet = (ei: number, si: number) => {
    setSets(prev => {
      const n = prev.map(e => e.map(s => ({ ...s })));
      const wasDone = n[ei][si].done;
      n[ei][si].done = !wasDone;
      if (!wasDone) { setRest(90); toast("Set complete! Rest 90 seconds"); }
      return n;
    });
  };

  const updateSet = (ei: number, si: number, field: keyof SetRow, val: string) => {
    setSets(prev => { const n = prev.map(e => e.map(s => ({ ...s }))); (n[ei][si] as any)[field] = val; return n; });
  };

  const addSet = (ei: number) => {
    setSets(prev => {
      const n = prev.map(e => e.map(s => ({ ...s })));
      const last = n[ei][n[ei].length - 1];
      n[ei].push({ ...last, done: false });
      return n;
    });
  };

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Pull Day</h1>
          <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Back · Biceps · Rear Delts</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {rest !== null && (
            <div style={{ background: "var(--orange-bg)", border: "1px solid rgba(255,154,60,0.25)", borderRadius: 10, padding: "9px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <I n="timer" s={15} c="var(--orange)" />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 600, color: "var(--orange)" }}>{fmt(rest)}</span>
              <span style={{ fontSize: 11, color: "var(--text-3)" }}>rest</span>
            </div>
          )}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            {started && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} className="pulse-anim" />}
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 600, color: "var(--text)" }}>{fmt(elapsed)}</span>
          </div>
          {!started
            ? <button className="btn-primary" onClick={() => { setStarted(true); toast("Workout started! Let's go 💪"); }}>
                <I n="zap" s={15} c="#060608" /> Start
              </button>
            : <button className="btn-danger" onClick={() => toast("Workout saved — great session!")}>
                <I n="check" s={14} c="var(--red)" /> Finish
              </button>
          }
        </div>
      </div>

      {/* Progress bar */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: "var(--text-2)" }}>{done} of {total} sets</span>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>~{Math.round((elapsed / 3600) * 420)} kcal burned</span>
          </div>
          <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>
            {Math.round((done / total) * 100)}%
          </span>
        </div>
        <ProgBar val={done} max={total} h={8} />
      </div>

      {/* Exercises */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {EX_DATA.map((ex, ei) => {
          const exSets = sets[ei];
          const exDone = exSets.filter(s => s.done).length;
          const allDone = exDone === exSets.length;
          const open = expanded === ei;
          return (
            <div key={ei} className={`exercise-card ${allDone ? "done" : ""}`}>
              <div onClick={() => setExpanded(open ? null : ei)}
                style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 18px", cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: allDone ? "var(--accent-bg-2)" : "var(--card)", border: `1px solid ${allDone ? "rgba(184,242,40,0.3)" : "var(--border)"}`,
                  fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: 15,
                  color: allDone ? "var(--accent)" : "var(--text-3)" }}>
                  {allDone ? <I n="check" s={17} c="var(--accent)" /> : ei + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{ex.name}</span>
                    {ex.pr && <span className="pr-badge">PR Alert</span>}
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>{ex.muscle}</span>
                </div>
                <div style={{ textAlign: "right", marginRight: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", fontFamily: "JetBrains Mono, monospace" }}>{exDone}/{exSets.length} sets</div>
                  <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 1 }}>Best: {ex.rec}</div>
                </div>
                <I n={open ? "chevD" : "chevR"} s={15} c="var(--text-3)" />
              </div>

              {open && (
                <div style={{ borderTop: "1px solid var(--border)", padding: "14px 18px", background: "var(--bg-3)" }}>
                  {/* Column headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "30px 1fr 1fr 80px 36px", gap: 8, marginBottom: 8, padding: "0 2px" }}>
                    {["SET", "WEIGHT", "REPS", "VOLUME", ""].map((h, hi) => (
                      <span key={hi} style={{ fontSize: 9.5, color: "var(--text-4)", fontWeight: 600, letterSpacing: "0.1em", textAlign: hi === 0 ? "center" : "left" }}>{h}</span>
                    ))}
                  </div>
                  {exSets.map((s, si) => {
                    const vol = s.weight === "BW" || s.weight.startsWith("BW") ? "—" : `${(parseFloat(s.weight || "0") * parseInt(s.reps || "0")).toFixed(0)} kg`;
                    return (
                      <div key={si} style={{ display: "grid", gridTemplateColumns: "30px 1fr 1fr 80px 36px", gap: 8, marginBottom: 6, alignItems: "center" }}>
                        <span style={{ textAlign: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: s.done ? "var(--accent)" : "var(--text-3)", fontWeight: 600 }}>{si + 1}</span>
                        <input className="input" style={{ height: 34, padding: "0 10px", borderColor: s.done ? "rgba(184,242,40,0.3)" : undefined }}
                          value={s.weight} onChange={e => updateSet(ei, si, "weight", e.target.value)} />
                        <input className="input" style={{ height: 34, padding: "0 10px", borderColor: s.done ? "rgba(184,242,40,0.3)" : undefined }}
                          value={s.reps} onChange={e => updateSet(ei, si, "reps", e.target.value)} />
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, color: "var(--text-3)", paddingLeft: 8 }}>{vol}</span>
                        <button onClick={() => toggleSet(ei, si)} style={{ width: 34, height: 34, borderRadius: 7, border: `1.5px solid ${s.done ? "var(--accent)" : "var(--border-3)"}`,
                          background: s.done ? "var(--accent-bg-2)" : "transparent", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                          {s.done && <I n="check" s={14} c="var(--accent)" />}
                        </button>
                      </div>
                    );
                  })}
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 13px" }} onClick={() => addSet(ei)}>
                      <I n="plus" s={13} /> Add Set
                    </button>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 13px" }} onClick={() => { setRest(90); toast("Rest timer started"); }}>
                      <I n="timer" s={13} /> Rest 90s
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="btn-ghost" style={{ alignSelf: "flex-start" }} onClick={() => toast("Exercise search coming soon")}>
        <I n="plus" s={15} /> Add Exercise
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: PROGRESS
───────────────────────────────────────────────────────────────────────────── */
function ProgressPage() {
  const [tab, setTab] = useState("weight");
  const months = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"];
  const wt = [83.2,82.8,82.4,82.1,81.8,81.4,81.0,80.6,80.2,79.9,79.5,79.0];
  const bench = [80,82.5,82.5,85,87.5,87.5,90,90,92.5,95,95,97.5];
  const squat = [100,102.5,105,105,107.5,110,112.5,115,115,117.5,120,122.5];
  const deadlift = [130,135,135,140,140,145,147.5,150,152.5,155,157.5,160];
  const freq = [{a:14,b:0},{a:16,b:0},{a:18,b:0},{a:15,b:0},{a:21,b:0},{a:19,b:0}].map(d => ({ a: d.a, b: Math.round(d.a * 480) }));
  const mDist = [
    { label: "Back",      v: 24, color: "var(--blue)" },
    { label: "Legs",      v: 22, color: "var(--purple)" },
    { label: "Chest",     v: 18, color: "var(--accent)" },
    { label: "Shoulders", v: 14, color: "var(--teal)" },
    { label: "Arms",      v: 12, color: "var(--orange)" },
    { label: "Core",      v: 10, color: "var(--text-3)" },
  ];
  const prs = [
    { ex: "Bench Press",       w: "97.5 kg", r: 5,  d: "Sep 12" },
    { ex: "Back Squat",        w: "122.5 kg",r: 3,  d: "Sep 10" },
    { ex: "Deadlift",          w: "160 kg",  r: 1,  d: "Sep 8"  },
    { ex: "Pull-ups",          w: "BW+20 kg",r: 6,  d: "Sep 15" },
    { ex: "OHP",               w: "62.5 kg", r: 5,  d: "Sep 11" },
    { ex: "Barbell Row",       w: "85 kg",   r: 6,  d: "Sep 9"  },
    { ex: "Incline Press",     w: "80 kg",   r: 6,  d: "Sep 7"  },
    { ex: "Romanian Deadlift", w: "120 kg",  r: 8,  d: "Sep 6"  },
    { ex: "Leg Press",         w: "200 kg",  r: 10, d: "Sep 4"  },
  ];

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Progress Analytics</h1>
        <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Tracking since Jan 2026 · 148 sessions logged</p>
      </div>

      <div className="tab-bar">
        {[["weight","Weight"],["strength","Strength"],["body","Body Comp"],["records","Records"]].map(([k,l]) => (
          <button key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "weight" && (
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
          <div className="card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <SectionHeader title="Weight Progress" sub="12-month view" />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 28, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>−4.2 kg</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>total since May 2026</div>
              </div>
            </div>
            <LineChart data={wt} labels={months} h={190} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { l: "Start Weight",   v: "83.2 kg",    s: "May 2026",     hi: false },
              { l: "Current Weight", v: "79.0 kg",    s: "Today",        hi: true  },
              { l: "Target Weight",  v: "75.0 kg",    s: "Est. Dec 2026",hi: false },
              { l: "Weekly Rate",    v: "−0.22 kg",   s: "Healthy pace", hi: false },
              { l: "BMI",            v: "23.8",       s: "Normal range", hi: false },
              { l: "Est. Body Fat",  v: "18.2%",      s: "→ Target 15%", hi: false },
            ].map((s, i) => (
              <div key={i} className={s.hi ? "card-accent" : "card-inset"} style={{ padding: "13px 15px" }}>
                <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{s.l}</div>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 20, fontWeight: 800, color: s.hi ? "var(--accent)" : "var(--text)" }}>{s.v}</div>
                <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 2 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "strength" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "Bench Press", data: bench, color: "var(--accent)", gain: "+17.5 kg" },
            { name: "Back Squat",  data: squat,  color: "var(--blue)",   gain: "+22.5 kg" },
            { name: "Deadlift",    data: deadlift,color:"var(--purple)", gain: "+30 kg" },
          ].map((lift, i) => (
            <div key={i} className="card" style={{ padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <SectionHeader title={lift.name} sub="1RM progression · 12 months" />
                <span className="badge badge-green"><I n="trendUp" s={10} c="var(--accent)" />{lift.gain} in 12 months</span>
              </div>
              <LineChart data={lift.data} labels={months} h={130} color={lift.color} />
            </div>
          ))}
        </div>
      )}

      {tab === "body" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="card" style={{ padding: "22px 24px" }}>
              <SectionHeader title="Muscle Group Distribution" sub="Training volume by group" />
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <DonutChart segs={mDist} size={144} />
                <div style={{ flex: 1 }}>
                  {mDist.map((m, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 3, background: m.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12.5, color: "var(--text-2)" }}>{m.label}</span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{m.v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: "22px 24px" }}>
              <SectionHeader title="Body Measurements" sub="vs. May 2026 baseline" />
              {[
                { l: "Chest",        c: "101 cm", ch: "+2 cm" },
                { l: "Waist",        c: "84 cm",  ch: "−3 cm" },
                { l: "Hips",         c: "97 cm",  ch: "−1.5 cm" },
                { l: "Thighs",       c: "58 cm",  ch: "+1.5 cm" },
                { l: "Arms (flexed)",c: "37 cm",  ch: "+2.5 cm" },
                { l: "Calves",       c: "38 cm",  ch: "+1 cm" },
              ].map((m, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: 13, color: "var(--text-2)" }}>{m.l}</span>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{m.c}</span>
                    <span className={`badge ${m.ch.startsWith("+") ? "badge-green" : "badge-red"}`} style={{ fontSize: 10 }}>{m.ch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <SectionHeader title="Monthly Workout Frequency" sub="Sessions per month · 2026" />
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-3)" }}>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}><span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2, display: "inline-block" }} />Sessions</span>
              </div>
            </div>
            <GroupedBars data={freq.map(d => ({ a: d.a, b: Math.round(d.a * 0.8) }))} labels={months.slice(0, 6)} h={130} />
          </div>
        </div>
      )}

      {tab === "records" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="three-col">
            {prs.map((pr, i) => (
              <div key={i} className="card-accent card-interactive" style={{ padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <I n="trophy" s={16} c="var(--accent)" />
                  </div>
                  <span style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>{pr.d}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 4 }}>{pr.ex}</div>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 26, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{pr.w}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>× {pr.r} reps</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: NUTRITION
───────────────────────────────────────────────────────────────────────────── */
const FOODS = [
  { name: "Overnight Oats", meal: "Breakfast", cal: 380, p: 24, c: 52, f: 9, time: "7:15 AM" },
  { name: "Greek Yogurt + Berries", meal: "Breakfast", cal: 180, p: 16, c: 22, f: 3, time: "7:15 AM" },
  { name: "Grilled Chicken Breast", meal: "Lunch", cal: 280, p: 52, c: 0, f: 6, time: "12:30 PM" },
  { name: "Brown Rice (150g)", meal: "Lunch", cal: 165, p: 4, c: 35, f: 1, time: "12:30 PM" },
  { name: "Mixed Salad + Olive Oil", meal: "Lunch", cal: 140, p: 3, c: 8, f: 11, time: "12:30 PM" },
  { name: "Whey Protein Shake", meal: "Pre-workout", cal: 130, p: 25, c: 5, f: 2, time: "5:30 PM" },
  { name: "Banana", meal: "Pre-workout", cal: 90, p: 1, c: 23, f: 0, time: "5:30 PM" },
  { name: "Salmon Fillet (180g)", meal: "Dinner", cal: 340, p: 40, c: 0, f: 18, time: "8:00 PM" },
  { name: "Sweet Potato (200g)", meal: "Dinner", cal: 180, p: 3, c: 41, f: 0, time: "8:00 PM" },
  { name: "Steamed Broccoli", meal: "Dinner", cal: 55, p: 4, c: 11, f: 0, time: "8:00 PM" },
];

function NutritionPage({ toast }: { toast: (m: string) => void }) {
  const [mealTab, setMealTab] = useState("all");
  const totals = FOODS.reduce((a, f) => ({ cal: a.cal + f.cal, p: a.p + f.p, c: a.c + f.c, f: a.f + f.f }), { cal: 0, p: 0, c: 0, f: 0 });
  const goals = { cal: 2400, p: 180, c: 240, f: 65 };
  const filtered = mealTab === "all" ? FOODS : FOODS.filter(f => f.meal.toLowerCase().replace("-", "") === mealTab);
  const meals = ["Breakfast","Lunch","Pre-workout","Dinner"];
  const macroColors = { p: "var(--blue)", c: "var(--accent)", f: "var(--orange)" };

  const calHist = [1820, 2100, 2380, 2180, 2450, 2290, 1940];
  const calLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Nutrition</h1>
        <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Wednesday, September 16, 2026 · Cutting phase</p>
      </div>

      {/* Macro summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }} className="stat-grid-4">
        <div className="card-accent" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 10.5, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Calories</div>
          <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 28, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{totals.cal}</div>
          <div style={{ fontSize: 11, color: "var(--text-3)", margin: "5px 0 8px" }}>of {goals.cal} kcal</div>
          <ProgBar val={totals.cal} max={goals.cal} h={6} />
          <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 5 }}>{goals.cal - totals.cal} kcal remaining</div>
        </div>
        {(["p","c","f"] as const).map((macro) => {
          const labels: Record<string, string> = { p: "Protein", c: "Carbs", f: "Fat" };
          const units: Record<string, string> = { p: "g", c: "g", f: "g" };
          const colors: Record<string, string> = { p: "var(--blue)", c: "var(--accent)", f: "var(--orange)" };
          const v = totals[macro], g = goals[macro];
          return (
            <div key={macro} className="card" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 10.5, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{labels[macro]}</div>
              <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 28, fontWeight: 900, color: colors[macro], lineHeight: 1 }}>{v}<span style={{ fontSize: 14, marginLeft: 2, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>{units[macro]}</span></div>
              <div style={{ fontSize: 11, color: "var(--text-3)", margin: "5px 0 8px" }}>of {g}{units[macro]}</div>
              <ProgBar val={v} max={g} h={6} color={colors[macro]} />
              <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 5 }}>{Math.round((v / g) * 100)}% of goal</div>
            </div>
          );
        })}
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        {/* Food log */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <SectionHeader title="Food Log" sub="September 16, 2026" />
            <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => toast("Add food — search feature coming soon")}>
              <I n="plus" s={13} c="#060608" /> Add Food
            </button>
          </div>

          <div className="tab-bar" style={{ marginBottom: 16 }}>
            {[["all","All"],["breakfast","Breakfast"],["lunch","Lunch"],["pre-workout","Pre-WO"],["dinner","Dinner"]].map(([k,l]) => (
              <button key={k} className={`tab ${mealTab === k ? "active" : ""}`} onClick={() => setMealTab(k)}>{l}</button>
            ))}
          </div>

          {(mealTab === "all" ? meals : [mealTab.charAt(0).toUpperCase() + mealTab.slice(1)]).map(meal => {
            const mFoods = FOODS.filter(f => f.meal === meal);
            if (!mFoods.length) return null;
            const mTot = mFoods.reduce((a, f) => ({ cal: a.cal + f.cal, p: a.p + f.p }), { cal: 0, p: 0 });
            return (
              <div key={meal} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{meal}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>{mTot.cal} kcal · {mTot.p}g protein</div>
                </div>
                {mFoods.map((food, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
                    borderBottom: fi < mFoods.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--blue-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <I n="apple" s={15} c="var(--blue)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</div>
                      <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ fontSize: 10.5, color: "var(--blue)" }}>{food.p}g P</span>
                        <span style={{ fontSize: 10.5, color: "var(--accent)" }}>{food.c}g C</span>
                        <span style={{ fontSize: 10.5, color: "var(--orange)" }}>{food.f}g F</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", fontFamily: "JetBrains Mono, monospace" }}>{food.cal}</div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>kcal</div>
                    </div>
                    <button className="btn-icon" style={{ width: 28, height: 28 }} onClick={() => toast("Entry removed")}>
                      <I n="x" s={12} />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Macro ring */}
          <div className="card" style={{ padding: "20px" }}>
            <SectionHeader title="Macro Split" sub="Today's distribution" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <DonutChart segs={[
                { label: "Protein", v: totals.p * 4, color: "var(--blue)" },
                { label: "Carbs",   v: totals.c * 4, color: "var(--accent)" },
                { label: "Fat",     v: totals.f * 9, color: "var(--orange)" },
              ]} size={120} />
              <div style={{ flex: 1 }}>
                {[
                  { l: "Protein", v: totals.p, cal: totals.p * 4, color: "var(--blue)" },
                  { l: "Carbs",   v: totals.c, cal: totals.c * 4, color: "var(--accent)" },
                  { l: "Fat",     v: totals.f, cal: totals.f * 9, color: "var(--orange)" },
                ].map((m, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 }}>
                      <span style={{ color: "var(--text-2)" }}>{m.l}</span>
                      <span style={{ color: m.color, fontWeight: 600 }}>{m.v}g</span>
                    </div>
                    <ProgBar val={m.v} max={(m.l === "Protein" ? goals.p : m.l === "Carbs" ? goals.c : goals.f)} h={5} color={m.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly calories chart */}
          <div className="card" style={{ padding: "20px" }}>
            <SectionHeader title="Weekly Calories" sub="vs. 2,400 kcal goal" />
            <div style={{ height: 100 }}>
              <LineChart data={calHist} labels={calLabels} h={100} color="var(--accent)" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span style={{ fontSize: 11, color: "var(--text-3)" }}>Avg this week</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                {Math.round(calHist.reduce((a, v) => a + v, 0) / calHist.length)} kcal
              </span>
            </div>
          </div>

          {/* Water intake */}
          <div className="card" style={{ padding: "20px" }}>
            <SectionHeader title="Hydration" sub="Daily water target" />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <CircProg val={2.4} max={3.5} size={72} sw={7}>
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--teal)" }}>2.4</span>
              </CircProg>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>2.4 L consumed</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>of 3.5 L goal</div>
                <div style={{ fontSize: 11, color: "var(--teal)", marginTop: 4 }}>+1.1 L to go</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} style={{ width: 26, height: 34, borderRadius: 6,
                  background: i < 10 ? "var(--teal-bg)" : "var(--card-3)",
                  border: `1px solid ${i < 10 ? "rgba(45,212,191,0.25)" : "var(--border)"}`,
                  display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "3px 0" }}>
                  <I n="drop" s={12} c={i < 10 ? "var(--teal)" : "var(--text-4)"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: EXERCISES
───────────────────────────────────────────────────────────────────────────── */
const ALL_EXERCISES = [
  { name: "Bench Press",         muscle: "Chest",     type: "Compound", eq: "Barbell",    diff: "Intermediate" },
  { name: "Pull-ups",            muscle: "Back",      type: "Compound", eq: "Bodyweight", diff: "Intermediate" },
  { name: "Back Squat",          muscle: "Legs",      type: "Compound", eq: "Barbell",    diff: "Advanced" },
  { name: "Deadlift",            muscle: "Full Body", type: "Compound", eq: "Barbell",    diff: "Advanced" },
  { name: "Overhead Press",      muscle: "Shoulders", type: "Compound", eq: "Barbell",    diff: "Intermediate" },
  { name: "Dumbbell Curl",       muscle: "Biceps",    type: "Isolation",eq: "Dumbbell",   diff: "Beginner" },
  { name: "Tricep Pushdown",     muscle: "Triceps",   type: "Isolation",eq: "Cable",      diff: "Beginner" },
  { name: "Leg Press",           muscle: "Legs",      type: "Compound", eq: "Machine",    diff: "Beginner" },
  { name: "Romanian Deadlift",   muscle: "Hamstrings",type: "Compound", eq: "Barbell",    diff: "Intermediate" },
  { name: "Incline Bench Press", muscle: "Chest",     type: "Compound", eq: "Barbell",    diff: "Intermediate" },
  { name: "Lat Pulldown",        muscle: "Back",      type: "Compound", eq: "Cable",      diff: "Beginner" },
  { name: "Face Pulls",          muscle: "Shoulders", type: "Isolation",eq: "Cable",      diff: "Beginner" },
  { name: "Bulgarian Split Squat",muscle:"Legs",      type: "Compound", eq: "Dumbbell",   diff: "Intermediate" },
  { name: "Cable Row",           muscle: "Back",      type: "Compound", eq: "Cable",      diff: "Beginner" },
  { name: "Leg Curl",            muscle: "Hamstrings",type: "Isolation",eq: "Machine",    diff: "Beginner" },
  { name: "Calf Raises",         muscle: "Calves",    type: "Isolation",eq: "Machine",    diff: "Beginner" },
];

function ExercisesPage({ toast }: { toast: (m: string) => void }) {
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [type, setType] = useState("all");
  const muscles = ["all", "Chest", "Back", "Legs", "Shoulders", "Biceps", "Triceps", "Hamstrings", "Full Body", "Calves"];
  const diffColors: Record<string, string> = { Beginner: "var(--teal)", Intermediate: "var(--blue)", Advanced: "var(--orange)" };
  const diffBadge: Record<string, string> = { Beginner: "badge-teal", Intermediate: "badge-blue", Advanced: "badge-orange" };

  const filtered = ALL_EXERCISES.filter(e =>
    (muscle === "all" || e.muscle === muscle) &&
    (type === "all" || e.type === type) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.muscle.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Exercise Library</h1>
        <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Browse and manage your exercise database</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "0 0 280px" }}>
          <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
            <I n="list" s={14} c="var(--text-3)" />
          </div>
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Search exercises…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tab-bar">
          {[["all","All Types"],["Compound","Compound"],["Isolation","Isolation"]].map(([k,l]) => (
            <button key={k} className={`tab ${type === k ? "active" : ""}`} onClick={() => setType(k)}>{l}</button>
          ))}
        </div>
        <select className="select" value={muscle} onChange={e => setMuscle(e.target.value)} style={{ padding: "8px 12px" }}>
          {muscles.map(m => <option key={m} value={m}>{m === "all" ? "All Muscles" : m}</option>)}
        </select>
        <button className="btn-primary" style={{ marginLeft: "auto" }} onClick={() => toast("Custom exercise creation coming soon")}>
          <I n="plus" s={14} c="#060608" /> New Exercise
        </button>
      </div>

      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{filtered.length} exercises found</div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="three-col">
        {filtered.map((ex, i) => (
          <div key={i} className="card card-interactive" style={{ padding: "18px" }} onClick={() => toast(`${ex.name} — full guide coming soon`)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I n="dumbbell" s={18} c="var(--accent)" />
              </div>
              <span className={`badge ${diffBadge[ex.diff]}`}>{ex.diff}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{ex.name}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>{ex.muscle}</span>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>{ex.type}</span>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>{ex.eq}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: LEADERBOARD
───────────────────────────────────────────────────────────────────────────── */
const LB = [
  { rank:1, name:"Marcus Chen",     handle:"@marcusfit",   lv:22, pts:8420, kcal:24800, str:31, init:"MC", badge:"👑" },
  { rank:2, name:"Priya Sharma",    handle:"@priyalifts",  lv:19, pts:7850, kcal:21200, str:24, init:"PS", badge:"🥈" },
  { rank:3, name:"Daniel Osei",     handle:"@danosei",     lv:18, pts:7340, kcal:19700, str:19, init:"DO", badge:"🥉" },
  { rank:4, name:"Sofia Lindqvist", handle:"@sofialift",   lv:17, pts:6890, kcal:18400, str:15, init:"SL", badge:null },
  { rank:5, name:"Alex Johnson",    handle:"@alexj",       lv:14, pts:5640, kcal:14200, str:12, init:"AJ", badge:null, me:true },
  { rank:6, name:"Jordan Kim",      handle:"@jordanlifts", lv:13, pts:5100, kcal:12800, str:8,  init:"JK", badge:null },
  { rank:7, name:"Tobias Weber",    handle:"@tobiasweb",   lv:12, pts:4820, kcal:11900, str:6,  init:"TW", badge:null },
  { rank:8, name:"Aisha Patel",     handle:"@aishafit",    lv:11, pts:4350, kcal:10600, str:5,  init:"AP", badge:null },
];

function LeaderboardPage() {
  const [scope, setScope] = useState("friends");
  const [period, setPeriod] = useState("weekly");
  const me = LB.find(u => u.me)!;

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Leaderboard</h1>
          <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Week 37 · Sep 9–Sep 16, 2026</p>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
          {[{ l: "Your Rank", v: "#5", c: "var(--accent)" }, { l: "Points", v: "5,640" }, { l: "Streak", v: "12d 🔥" }].map((s, i) => (
            <div key={i} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10.5, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.l}</div>
              <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 22, fontWeight: 800, color: s.c || "var(--text)", lineHeight: 1, marginTop: 3 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="tab-bar">
          {[["friends","Friends"],["global","Global"],["gym","My Gym"]].map(([k,l]) => (
            <button key={k} className={`tab ${scope === k ? "active" : ""}`} onClick={() => setScope(k)}>{l}</button>
          ))}
        </div>
        <div className="tab-bar">
          {[["weekly","Weekly"],["monthly","Monthly"],["alltime","All Time"]].map(([k,l]) => (
            <button key={k} className={`tab ${period === k ? "active" : ""}`} onClick={() => setPeriod(k)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {([LB[1], LB[0], LB[2]] as typeof LB).map((u, pi) => {
          const rank = pi === 0 ? 2 : pi === 1 ? 1 : 3;
          const sz = [84, 96, 78][pi];
          const topPad = ["12px", "0", "20px"][pi];
          const isGold = rank === 1;
          return (
            <div key={rank} className="card" style={{ padding: "26px 20px 22px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: topPad,
              borderColor: isGold ? "rgba(184,242,40,0.25)" : undefined }}>
              {isGold && (
                <>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(184,242,40,0.07) 0%, transparent 100%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
                </>
              )}
              <div style={{ fontSize: 30, marginBottom: 10 }}>{u.badge}</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <Avatar init={u.init} size={sz} ring={isGold} />
              </div>
              <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{u.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 14 }}>Lv.{u.lv} · {u.handle}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 22, fontWeight: 900, color: isGold ? "var(--accent)" : "var(--text)", lineHeight: 1 }}>{u.pts.toLocaleString()}</div>
                  <div style={{ fontSize: 9.5, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>pts</div>
                </div>
                <div style={{ width: 1, background: "var(--border)" }} />
                <div>
                  <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 22, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>{u.str}d</div>
                  <div style={{ fontSize: 9.5, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>streak</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "46px 1fr 80px 100px 90px 80px", gap: 12, padding: "10px 18px", borderBottom: "1px solid var(--border)" }}>
          {["Rank","Athlete","Level","Points","Calories","Streak"].map((h, i) => (
            <span key={i} style={{ fontSize: 9.5, fontWeight: 600, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: i === 0 ? "center" : "left" }}>{h}</span>
          ))}
        </div>
        {LB.slice(3).map((u, i, arr) => (
          <div key={u.rank} className={`lb-row ${u.me ? "me" : ""}`}
            style={{ gridTemplateColumns: "46px 1fr 80px 100px 90px 80px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ textAlign: "center", fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 800, color: u.me ? "var(--accent)" : "var(--text-3)" }}>#{u.rank}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Avatar init={u.init} size={36} ring={u.me} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: u.me ? "var(--accent)" : "var(--text)", display: "flex", alignItems: "center", gap: 7 }}>
                  {u.name}
                  {u.me && <span style={{ fontSize: 10, background: "var(--accent-bg-2)", color: "var(--accent)", border: "1px solid rgba(184,242,40,0.25)", padding: "1px 6px", borderRadius: 4, fontFamily: "Inter, sans-serif", fontWeight: 700 }}>YOU</span>}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>{u.handle}</div>
              </div>
            </div>
            <div><span className="badge badge-purple" style={{ fontSize: 10.5 }}>Lv.{u.lv}</span></div>
            <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 800, color: u.me ? "var(--accent)" : "var(--text)" }}>{u.pts.toLocaleString()}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-2)", fontFamily: "JetBrains Mono, monospace" }}>{(u.kcal / 1000).toFixed(1)}k</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--text-2)" }}>🔥 {u.str}d</div>
          </div>
        ))}
      </div>

      {/* Your competition */}
      <div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Your Competition</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {LB.slice(3, 6).map(u => (
            <div key={u.rank} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px",
              background: u.me ? "var(--accent-bg)" : "var(--card)",
              border: `1px solid ${u.me ? "rgba(184,242,40,0.22)" : "var(--border)"}`,
              borderRadius: "var(--radius)", transition: "border-color 0.15s" }}>
              <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 18, fontWeight: 900, color: u.me ? "var(--accent)" : "var(--text-3)", width: 36, textAlign: "center" }}>#{u.rank}</div>
              <Avatar init={u.init} size={40} ring={u.me} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: u.me ? "var(--accent)" : "var(--text)" }}>
                  {u.name} {u.me && <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>(you)</span>}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Level {u.lv}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 20, fontWeight: 800, color: u.me ? "var(--accent)" : "var(--text)" }}>{u.pts.toLocaleString()} <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 400, color: "var(--text-3)" }}>pts</span></div>
                {!u.me && (
                  <div style={{ fontSize: 11, marginTop: 2 }}>
                    {u.rank < me.rank
                      ? <span style={{ color: "var(--red)" }}>+{(u.pts - me.pts).toLocaleString()} ahead</span>
                      : <span style={{ color: "var(--accent)" }}>−{(me.pts - u.pts).toLocaleString()} behind</span>
                    }
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: ACHIEVEMENTS
───────────────────────────────────────────────────────────────────────────── */
const BADGES = [
  { icon:"🔥", label:"7 Day Streak",      desc:"Train 7 consecutive days",     earned:true,  color:"var(--red)",    cat:"Streaks" },
  { icon:"⚡", label:"First PR",           desc:"Set your first personal record",earned:true,  color:"var(--accent)", cat:"Milestones" },
  { icon:"🔥", label:"30 Day Streak",      desc:"Train 30 consecutive days",    earned:false, color:"var(--red)",    cat:"Streaks" },
  { icon:"🏆", label:"100 Workouts",       desc:"Complete 100 total workouts",  earned:false, color:"var(--orange)", cat:"Milestones" },
  { icon:"💪", label:"10K Calories",       desc:"Burn 10,000 total calories",   earned:true,  color:"var(--orange)", cat:"Milestones" },
  { icon:"🎯", label:"Goal Crusher",       desc:"Hit 3 weekly goals in a row",  earned:true,  color:"var(--blue)",   cat:"Goals" },
  { icon:"👑", label:"Top 10 Rank",        desc:"Reach top 10 on leaderboard",  earned:true,  color:"var(--purple)", cat:"Competitive" },
  { icon:"🌙", label:"Early Bird × 20",    desc:"Work out before 7 AM, 20 times",earned:true, color:"var(--blue)",  cat:"Habits" },
  { icon:"🦵", label:"Leg Day Hero",       desc:"Complete 30 leg workouts",     earned:false, color:"var(--purple)", cat:"Milestones" },
  { icon:"🏋️", label:"1,000 kg Volume",   desc:"Lift 1,000 kg in one session", earned:false, color:"var(--teal)",   cat:"Performance" },
  { icon:"📅", label:"Monthly Perfect",   desc:"Train every planned day in a month",earned:false,color:"var(--accent)",cat:"Habits"},
  { icon:"🎖️", label:"Elite Tier",        desc:"Reach Level 20",               earned:false, color:"var(--orange)", cat:"Competitive" },
];

function AchievementsPage() {
  const [cat, setCat] = useState("all");
  const cats = ["all","Milestones","Streaks","Goals","Habits","Competitive","Performance"];
  const filtered = cat === "all" ? BADGES : BADGES.filter(b => b.cat === cat);
  const earned = BADGES.filter(b => b.earned).length;

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Achievements</h1>
          <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>
            {earned} of {BADGES.length} unlocked · Keep grinding for the rest
          </p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 30, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{earned}/{BADGES.length}</div>
            <div style={{ fontSize: 11, color: "var(--text-3)" }}>Unlocked</div>
          </div>
          <CircProg val={earned} max={BADGES.length} size={72} sw={6}>
            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--accent)" }}>{Math.round((earned/BADGES.length)*100)}%</span>
          </CircProg>
        </div>
      </div>

      <div className="tab-bar">
        {cats.map(c => (
          <button key={c} className={`tab ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }} className="three-col">
        {filtered.map((b, i) => (
          <div key={i} className={`achievement ${b.earned ? "earned" : "locked"}`}>
            <div className="achievement-icon" style={{ background: b.earned ? `${b.color}1a` : "var(--card-3)" }}>
              {b.earned ? <span style={{ fontSize: 20 }}>{b.icon}</span> : <I n="lock" s={16} c="var(--text-4)" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{b.label}</span>
                <span className="badge badge-gray" style={{ fontSize: 9, padding: "1px 5px" }}>{b.cat}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.desc}</div>
            </div>
            {b.earned && <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color, flexShrink: 0, boxShadow: `0 0 8px ${b.color}` }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: PROFILE
───────────────────────────────────────────────────────────────────────────── */
function ProfilePage() {
  const stats = [
    { icon: "zap",      l: "Total Workouts",    v: "148" },
    { icon: "timer",    l: "Total Time",         v: "148h 32m" },
    { icon: "weight",   l: "Total Volume",       v: "284,500 kg" },
    { icon: "activity", l: "Avg Session",        v: "60 min" },
    { icon: "flame",    l: "Calories Burned",    v: "68,400 kcal" },
    { icon: "trophy",   l: "Personal Records",   v: "32 PRs" },
  ];

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Profile hero */}
      <div className="card-accent" style={{ padding: "28px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(184,242,40,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <Avatar init="AJ" size={96} ring />
            <div style={{ position: "absolute", bottom: 2, right: 2, width: 26, height: 26, borderRadius: "50%", background: "var(--card-2)", border: "2px solid var(--border-3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <I n="edit" s={12} c="var(--text-2)" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontSize: 30, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Alex Johnson</h2>
                <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 4 }}>@alexj · Member since January 2026</div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="badge badge-green">Intermediate</span>
                  <span className="badge badge-purple">Level 14</span>
                  <span className="streak-badge">🔥 12 Day Streak</span>
                  <span className="badge badge-blue">Rank #5</span>
                  <span className="badge badge-orange">Cutting Phase</span>
                </div>
              </div>
              <button className="btn-ghost">Edit Profile</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 20 }}>
              {[
                { l: "Height",   v: "182 cm" },
                { l: "Weight",   v: "79.0 kg" },
                { l: "Goal",     v: "Fat Loss" },
                { l: "XP",       v: "14,240" },
                { l: "Workouts", v: "148" },
              ].map((s, i) => (
                <div key={i} className="card-inset" style={{ padding: "11px 13px" }}>
                  <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Workout stats */}
        <div className="card" style={{ padding: "22px" }}>
          <SectionHeader title="Workout Statistics" />
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
              borderBottom: i < stats.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I n={s.icon} s={15} c="var(--accent)" />
              </div>
              <span style={{ flex: 1, fontSize: 13, color: "var(--text-2)" }}>{s.l}</span>
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{s.v}</span>
            </div>
          ))}
        </div>

        {/* XP + PRs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: "22px" }}>
            <SectionHeader title="Level Progress" sub="14,240 / 15,000 XP" />
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 14 }}>
              <CircProg val={14240} max={15000} size={84} sw={7}>
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text)", lineHeight: 1 }}>14</span>
                <span style={{ fontSize: 10, color: "var(--text-3)" }}>Lv.</span>
              </CircProg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 8 }}>760 XP to Level 15</div>
                <ProgBar val={14240} max={15000} h={7} />
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {[{ l: "Workout", v: "+50" }, { l: "PR", v: "+200" }, { l: "Daily", v: "+25" }].map((x, i) => (
                    <div key={i} className="card-inset" style={{ flex: 1, textAlign: "center", padding: "7px 6px" }}>
                      <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{x.v} XP</div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>{x.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "22px" }}>
            <SectionHeader title="Top Personal Records" />
            {[
              { ex: "Deadlift",      w: "160 kg",   r: 1 },
              { ex: "Back Squat",    w: "122.5 kg",  r: 3 },
              { ex: "Bench Press",   w: "97.5 kg",   r: 5 },
              { ex: "OHP",           w: "62.5 kg",   r: 5 },
              { ex: "Pull-ups",      w: "BW+20 kg",  r: 6 },
            ].map((pr, i, arr) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div>
                  <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>{pr.ex}</div>
                  <div style={{ fontSize: 10.5, color: "var(--text-3)" }}>× {pr.r} reps</div>
                </div>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--accent)" }}>{pr.w}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement preview */}
      <div className="card" style={{ padding: "22px" }}>
        <SectionHeader title="Recent Achievements" sub={`${BADGES.filter(b => b.earned).length} of ${BADGES.length} unlocked`} action="View all →" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {BADGES.filter(b => b.earned).slice(0, 6).map((b, i) => (
            <div key={i} className="achievement earned">
              <div className="achievement-icon" style={{ background: `${b.color}1a` }}>
                <span style={{ fontSize: 20 }}>{b.icon}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text)" }}>{b.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE: SETTINGS
───────────────────────────────────────────────────────────────────────────── */
function SettingsPage() {
  const [toggles, setToggles] = useState({ notifications: true, streak: true, sounds: false, publicProfile: true, sync: true });
  const toggle = (k: keyof typeof toggles) => setToggles(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>Settings</h1>
        <p style={{ color: "var(--text-3)", marginTop: 5, fontSize: 14 }}>Manage your account and preferences</p>
      </div>

      {[
        {
          title: "Account", icon: "user", items: [
            { l: "Display Name", sub: "Alex Johnson", type: "text" },
            { l: "Email", sub: "alex.johnson@email.com", type: "text" },
            { l: "Username", sub: "@alexj", type: "text" },
            { l: "Password", sub: "Last changed 3 months ago", type: "action" },
          ] as SettingItem[]
        },
        {
          title: "Goals", icon: "target", items: [
            { l: "Primary Goal", sub: "Fat Loss", type: "select" },
            { l: "Weekly Workout Target", sub: "6 sessions/week", type: "select" },
            { l: "Calorie Target", sub: "2,400 kcal/day", type: "text" },
            { l: "Protein Target", sub: "180 g/day", type: "text" },
          ] as SettingItem[]
        },
        {
          title: "Notifications", icon: "bell", items: [
            { l: "Workout Reminders", sub: "Daily at 6:30 AM", type: "toggle", k: "notifications" },
            { l: "Streak Alerts", sub: "Warn before streak breaks", type: "toggle", k: "streak" },
            { l: "Sound Effects", sub: "Timer and completion sounds", type: "toggle", k: "sounds" },
          ] as SettingItem[]
        },
        {
          title: "Privacy", icon: "shield", items: [
            { l: "Public Profile", sub: "Others can view your stats", type: "toggle", k: "publicProfile" },
            { l: "Leaderboard Visibility", sub: "Appear in global rankings", type: "toggle", k: "sync" },
          ] as SettingItem[]
        },
      ].map((section, si) => (
        <div key={si} className="card" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I n={section.icon} s={16} c="var(--accent)" />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{section.title}</h3>
          </div>
          {section.items.map((item, ii) => (
            <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0", borderBottom: ii < section.items.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)" }}>{item.l}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 2 }}>{item.sub}</div>
              </div>
              {item.type === "toggle" && item.k && (
                <button className={`toggle ${toggles[item.k as keyof typeof toggles] ? "on" : ""}`}
                  onClick={() => toggle(item.k as keyof typeof toggles)} />
              )}
              {item.type === "text" && (
                <button className="btn-ghost" style={{ fontSize: 12 }}>Edit</button>
              )}
              {item.type === "select" && (
                <button className="btn-ghost" style={{ fontSize: 12 }}>Change</button>
              )}
              {item.type === "action" && (
                <button className="btn-ghost" style={{ fontSize: 12 }}>Update</button>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="card" style={{ padding: "22px 24px", borderColor: "rgba(255,82,82,0.15)" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--red)", marginBottom: 16 }}>Danger Zone</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-danger">Export Data</button>
          <button className="btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────────────────────────────────────── */
const NAV = [
  { id: "dashboard",    label: "Dashboard",    icon: "home",    group: "main" },
  { id: "workout",      label: "Workout",      icon: "dumbbell",group: "main" },
  { id: "exercises",    label: "Exercises",    icon: "list",    group: "main" },
  { id: "progress",     label: "Progress",     icon: "chart",   group: "track" },
  { id: "nutrition",    label: "Nutrition",    icon: "leaf",    group: "track" },
  { id: "leaderboard",  label: "Leaderboard",  icon: "bar3",    group: "social" },
  { id: "achievements", label: "Achievements", icon: "star",    group: "social" },
  { id: "profile",      label: "Profile",      icon: "user",    group: "account" },
  { id: "settings",     label: "Settings",     icon: "gear",    group: "account" },
];

const GROUP_LABELS: Record<string, string> = {
  main: "Training", track: "Tracking", social: "Community", account: "Account"
};

function Sidebar({ active, onNav }: { active: string; onNav: (p: string) => void }) {
  let lastGroup = "";
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "4px 8px 22px" }}>
        <div className="logo-mark"><I n="zap" s={18} c="#060608" /></div>
        <span className="logo-label" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: "0.03em", color: "var(--text)" }}>FitTrack</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {NAV.map(item => {
          const showLabel = item.group !== lastGroup;
          if (showLabel) lastGroup = item.group;
          return (
            <div key={item.id}>
              {showLabel && <div className="nav-section-label">{GROUP_LABELS[item.group]}</div>}
              <button className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => onNav(item.id)}>
                <I n={item.icon} s={16} c={active === item.id ? "var(--accent)" : "var(--text-3)"} />
                <span className="nav-label">{item.label}</span>
                {item.id === "workout" && active !== "workout" && <span className="nav-badge">1</span>}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="divider" style={{ margin: "14px 0" }} />

      {/* User */}
      <div className="user-row" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 8px", borderRadius: "var(--radius-xs)", transition: "background 0.15s" }}
        onClick={() => onNav("profile")}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--card-2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
        <Avatar init="AJ" size={34} />
        <div className="user-text" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Alex Johnson</div>
          <div style={{ fontSize: 10.5, color: "var(--text-3)" }}>Lv.14 · 5,640 pts</div>
        </div>
        <I n="chevR" s={13} c="var(--text-3)" />
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */
interface ToastEntry { id: number; msg: string; type?: "success" | "info" | "warning"; }
interface SettingItem { l: string; sub: string; type: string; k?: string; }

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const toastId = useRef(0);

  const nav = useCallback((p: string) => setPage(p), []);
  const toast = useCallback((msg: string, type: "success" | "info" | "warning" = "success") => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);

  const pages: Record<string, React.ReactElement> = {
    dashboard:    <Dashboard nav={nav} />,
    workout:      <WorkoutPage toast={toast} />,
    exercises:    <ExercisesPage toast={toast} />,
    progress:     <ProgressPage />,
    nutrition:    <NutritionPage toast={toast} />,
    leaderboard:  <LeaderboardPage />,
    achievements: <AchievementsPage />,
    profile:      <ProfilePage />,
    settings:     <SettingsPage />,
  };

  return (
    <div className="app-shell">
      <Sidebar active={page} onNav={nav} />
      <main className="main-content" key={page}>
        {pages[page] || pages.dashboard}
        <div style={{ height: 48 }} />
      </main>
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 10, zIndex: 1000 }}>
        {toasts.map(t => (
          <Toast key={t.id} msg={t.msg} type={t.type} onClose={() => dismissToast(t.id)} />
        ))}
      </div>
    </div>
  );
}
