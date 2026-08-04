/* ------------------------------------------------------------------
   Contour drawing helpers.

   A limb is a spine (a few joint points) plus a width at each joint.
   We offset the spine to both sides, smooth each side with Catmull-Rom,
   and close the ends with round caps — which gives a tapered, drawn
   outline instead of a stick.
   ------------------------------------------------------------------ */

export type Pt = [number, number];

function norm(dx: number, dy: number): Pt {
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
}

/** Perpendicular offsets of a spine, one side per call (side = 1 | -1). */
function offset(pts: Pt[], widths: number[], side: number): Pt[] {
  return pts.map((p, i) => {
    const prev = pts[i - 1] ?? p;
    const next = pts[i + 1] ?? p;
    const [dx, dy] = norm(next[0] - prev[0], next[1] - prev[1]);
    const w = (widths[i] ?? widths[widths.length - 1]) / 2;
    return [p[0] - dy * w * side, p[1] + dx * w * side] as Pt;
  });
}

/** Catmull-Rom through the points, emitted as cubic beziers. */
function through(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${r(c1[0])} ${r(c1[1])}, ${r(c2[0])} ${r(c2[1])}, ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

const r = (n: number) => Math.round(n * 10) / 10;

/**
 * Closed outline around a spine — the shape of an arm, a leg, a torso.
 * Caps are round by default (a hand, a foot); pass "flat" where the part
 * disappears under another one (a shoulder under a torso, a hip under a leg)
 * so no bulge pokes out from behind it.
 */
export function limb(
  pts: Pt[],
  widths: number[],
  caps: { start?: "round" | "flat"; end?: "round" | "flat" } = {}
): string {
  const a = offset(pts, widths, 1);
  const b = offset(pts, widths, -1).reverse();
  const wEnd = (widths[widths.length - 1] ?? 4) / 2;
  const wStart = (widths[0] ?? 4) / 2;
  const capEnd =
    caps.end === "flat"
      ? ` L ${r(b[0][0])} ${r(b[0][1])}`
      : ` A ${r(wEnd)} ${r(wEnd)} 0 0 1 ${r(b[0][0])} ${r(b[0][1])}`;
  const capStart =
    caps.start === "flat"
      ? ` L ${r(a[0][0])} ${r(a[0][1])}`
      : ` A ${r(wStart)} ${r(wStart)} 0 0 1 ${r(a[0][0])} ${r(a[0][1])}`;
  return `M ${r(a[0][0])} ${r(a[0][1])}` + through(a) + capEnd + through(b) + capStart + " Z";
}

/** An open contour — a fold line, a hem, a strand of hair. */
export function stroke(pts: Pt[]): string {
  return `M ${r(pts[0][0])} ${r(pts[0][1])}` + through(pts);
}
