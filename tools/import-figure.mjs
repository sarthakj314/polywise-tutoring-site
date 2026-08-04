/* ------------------------------------------------------------------
   import-figure — turn any SVG line drawing into a Polywise pose.

   Usage:
     node tools/import-figure.mjs art/croquis-stand.svg --name stand
     node tools/import-figure.mjs art/*.svg --preview

   What it does, in order:
     1. renders the file in headless Chromium so every transform, group,
        <use>, primitive shape and arc is resolved by the browser itself
     2. samples each shape along its own length (SVGGeometryElement), so
        curves, arcs and polygons all come through the same door
     3. simplifies the point list (Ramer–Douglas–Peucker) and re-fits it
        with the same Catmull-Rom smoothing the rest of the site uses
     4. normalises the result into the shared 60 × 100 rig — feet on the
        floor at y96, centred on x30 — and prints a ready-to-paste pose

   The output is plain path data. Nothing about the original file's
   colours, stroke weights or fills survives, which is the point: every
   figure on the site has to read as one hand.
   ------------------------------------------------------------------ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";
import { chromium } from "/home/claude/.npm-global/lib/node_modules/playwright/index.mjs";

const args = process.argv.slice(2);
const FLAGS_WITH_VALUES = new Set(["name", "tol", "height"]);
const files = args.filter((a, i) => {
  if (a.startsWith("--")) return false;
  const prev = args[i - 1];
  return !(prev?.startsWith("--") && FLAGS_WITH_VALUES.has(prev.slice(2)));
});
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1] ?? true;
};

const NAME = flag("name", "imported");
const TOL = Number(flag("tol", 0.32)); // simplification, in rig units
const HEIGHT = Number(flag("height", 92)); // figure height inside the rig
const PREVIEW = args.includes("--preview");

const r = (n) => Math.round(n * 10) / 10;

/* ---------- geometry ---------- */

function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  let idx = 0;
  let max = 0;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const den = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / den;
    if (d > max) {
      max = d;
      idx = i;
    }
  }
  if (max <= eps) return [pts[0], pts[pts.length - 1]];
  return [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)];
}

/** Catmull-Rom through the points — same curve maths as src/lib/draw.ts. */
function smooth(pts, closed) {
  if (pts.length < 2) return "";
  const at = (i) => pts[(i + pts.length) % pts.length];
  const get = (i) => (closed ? at(i) : pts[Math.min(Math.max(i, 0), pts.length - 1)]);
  let d = `M ${r(pts[0][0])} ${r(pts[0][1])}`;
  const last = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${r(c1[0])} ${r(c1[1])}, ${r(c2[0])} ${r(c2[1])}, ${r(p2[0])} ${r(p2[1])}`;
  }
  return closed ? d + " Z" : d;
}

/* ---------- extraction ---------- */

async function extract(page, svgText) {
  await page.setContent(
    `<!doctype html><html><body style="margin:0">${svgText}</body></html>`,
    { waitUntil: "load" }
  );
  return page.evaluate(() => {
    const svg = document.querySelector("svg");
    if (!svg) return { error: "no <svg> element found" };
    const root = svg.getScreenCTM();
    const shapes = [...svg.querySelectorAll("path,line,polyline,polygon,circle,ellipse,rect")];
    const out = [];
    for (const el of shapes) {
      if (typeof el.getTotalLength !== "function") continue;
      const len = el.getTotalLength();
      if (!len || len < 0.5) continue;
      const ctm = el.getScreenCTM();
      if (!ctm) continue;
      const m = root.inverse().multiply(ctm);
      const step = Math.max(0.4, len / 900);
      const pts = [];
      for (let d = 0; d <= len; d += step) {
        const p = el.getPointAtLength(d).matrixTransform(m);
        pts.push([p.x, p.y]);
      }
      const a = pts[0];
      const b = pts[pts.length - 1];
      const closed =
        Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.4 ||
        ["polygon", "circle", "ellipse", "rect"].includes(el.tagName.toLowerCase());
      const style = getComputedStyle(el);
      out.push({
        pts,
        closed,
        filled: style.fill !== "none" && style.fill !== "rgba(0, 0, 0, 0)",
        stroked: style.stroke !== "none",
        area: Math.abs(el.getBBox().width * el.getBBox().height),
      });
    }
    return { shapes: out };
  });
}

/* ---------- normalise into the 60 × 100 rig ---------- */

function fit(shapes) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  shapes.forEach((s) =>
    s.pts.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    })
  );
  const h = maxY - minY || 1;
  const k = HEIGHT / h;
  const cx = (minX + maxX) / 2;
  return shapes.map((s) => ({
    ...s,
    pts: s.pts.map(([x, y]) => [30 + (x - cx) * k, 96 - (maxY - y) * k]),
  }));
}

/* ---------- run ---------- */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });

for (const file of files) {
  const svgText = readFileSync(file, "utf8");
  const res = await extract(page, svgText);
  if (res.error) {
    console.error(`${file}: ${res.error}`);
    continue;
  }

  const fitted = fit(res.shapes);
  const paths = fitted
    .map((s) => ({ d: smooth(rdp(s.pts, TOL), s.closed), filled: s.filled, area: s.area }))
    .filter((p) => p.d);

  const poseName = files.length > 1 ? basename(file).replace(/\.svg$/i, "") : NAME;
  const tsx = `    case "${poseName}":
      return {
        back: [],
        front: [
${paths.map((p) => `          { d: "${p.d}" },`).join("\n")}
        ],
        headNode: null,
      };`;

  mkdirSync("tools/out", { recursive: true });
  writeFileSync(`tools/out/${poseName}.tsx.txt`, tsx);

  console.log(
    `${file} → ${paths.length} contours, ${tsx.length} chars → tools/out/${poseName}.tsx.txt`
  );

  if (PREVIEW) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 100" width="240" height="400">
  <rect width="60" height="100" fill="#08080a"/>
  <g fill="none" stroke="#efeae1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
${paths.map((p) => `    <path d="${p.d}"/>`).join("\n")}
  </g>
</svg>`;
    writeFileSync(`tools/out/${poseName}.preview.svg`, svg);
    await page.setContent(`<body style="margin:0;background:#08080a">${svg}</body>`);
    await page.screenshot({ path: `tools/out/${poseName}.preview.png`, clip: { x: 0, y: 0, width: 240, height: 400 } });
  }
}

await browser.close();
