#!/usr/bin/env python3
"""
trace-figure — turn a raster line drawing (PNG/JPG) into a Polywise pose.

    python3 tools/trace-figure.py art/croquis.png --name stand --preview

Most good croquis and editorial figure drawings are raster, not vector. This
reads one, finds the centre line of every stroke, and re-emits it as smooth
path data in the shared 60 x 100 rig — same output shape as the SVG importer,
so both roads end in the same place.

Steps: binarise (Otsu, auto-polarity) -> skeletonise -> walk the skeleton into
polylines at junctions -> prune spurs -> simplify (Ramer-Douglas-Peucker) ->
Catmull-Rom smoothing -> fit to the rig.
"""

import argparse
import os
import sys

import numpy as np
from PIL import Image
from skimage.filters import threshold_otsu
from skimage.morphology import skeletonize, remove_small_objects

NB = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def load_binary(path, long_side=1400):
    im = Image.open(path).convert("L")
    scale = long_side / max(im.size)
    if scale < 1:
        im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
    a = np.asarray(im, dtype=float) / 255.0
    t = threshold_otsu(a)
    ink = a < t                       # assume dark ink on light paper
    if ink.mean() > 0.5:              # ...unless the drawing is light on dark
        ink = ~ink
    ink = remove_small_objects(ink, 24)
    return ink


def walk(skel):
    """Break a skeleton into polylines, splitting at junctions."""
    h, w = skel.shape
    pts = {(y, x) for y, x in zip(*np.nonzero(skel))}

    def nbrs(p):
        y, x = p
        return [(y + dy, x + dx) for dy, dx in NB if (y + dy, x + dx) in pts]

    deg = {p: len(nbrs(p)) for p in pts}
    nodes = {p for p in pts if deg[p] != 2}
    used = set()
    lines = []

    def trace(start, first):
        line = [start, first]
        used.add(frozenset((start, first)))
        cur, prev = first, start
        while deg.get(cur, 0) == 2:
            nxt = [n for n in nbrs(cur) if n != prev]
            if not nxt:
                break
            prev, cur = cur, nxt[0]
            edge = frozenset((prev, cur))
            if edge in used:
                break
            used.add(edge)
            line.append(cur)
        return line

    for n in nodes:
        for m in nbrs(n):
            if frozenset((n, m)) in used:
                continue
            lines.append(trace(n, m))

    # anything left is a closed loop with no endpoints
    for p in pts:
        if deg.get(p, 0) == 2 and not any(frozenset((p, m)) in used for m in nbrs(p)):
            line = trace(p, nbrs(p)[0])
            if len(line) > 6:
                lines.append(line + [line[0]])

    return [[(x, y) for y, x in ln] for ln in lines]


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    (ax, ay), (bx, by) = pts[0], pts[-1]
    dx, dy = bx - ax, by - ay
    den = (dx * dx + dy * dy) ** 0.5 or 1.0
    d = [abs(dy * px - dx * py + bx * ay - by * ax) / den for px, py in pts[1:-1]]
    if not d or max(d) <= eps:
        return [pts[0], pts[-1]]
    i = d.index(max(d)) + 1
    return rdp(pts[: i + 1], eps)[:-1] + rdp(pts[i:], eps)


def smooth(pts, closed=False):
    r = lambda n: round(n, 1)
    if len(pts) < 2:
        return ""
    get = lambda i: pts[max(0, min(i, len(pts) - 1))]
    d = f"M {r(pts[0][0])} {r(pts[0][1])}"
    for i in range(len(pts) - 1):
        p0, p1, p2, p3 = get(i - 1), get(i), get(i + 1), get(i + 2)
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C {r(c1[0])} {r(c1[1])}, {r(c2[0])} {r(c2[1])}, {r(p2[0])} {r(p2[1])}"
    return d + (" Z" if closed else "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("--name", default="imported")
    ap.add_argument("--height", type=float, default=92.0, help="figure height in the rig")
    ap.add_argument("--tol", type=float, default=0.35, help="simplification, rig units")
    ap.add_argument("--min-len", type=int, default=14, help="drop shorter fragments (px)")
    ap.add_argument("--preview", action="store_true")
    args = ap.parse_args()

    ink = load_binary(args.image)
    skel = skeletonize(ink)
    lines = [ln for ln in walk(skel) if len(ln) >= args.min_len]
    if not lines:
        sys.exit("no strokes found — try a cleaner scan, or raise contrast")

    xs = [p[0] for ln in lines for p in ln]
    ys = [p[1] for ln in lines for p in ln]
    k = args.height / max(max(ys) - min(ys), 1)
    cx = (min(xs) + max(xs)) / 2
    ymax = max(ys)
    fit = lambda p: (30 + (p[0] - cx) * k, 96 - (ymax - p[1]) * k)

    paths = []
    for ln in lines:
        pts = [fit(p) for p in ln]
        closed = (pts[0][0] - pts[-1][0]) ** 2 + (pts[0][1] - pts[-1][1]) ** 2 < 0.4
        d = smooth(rdp(pts, args.tol), closed)
        if d:
            paths.append(d)

    os.makedirs("tools/out", exist_ok=True)
    tsx = (
        f'    case "{args.name}":\n      return {{\n        back: [],\n        front: [\n'
        + "\n".join(f'          {{ d: "{d}" }},' for d in paths)
        + "\n        ],\n        headNode: null,\n      };"
    )
    open(f"tools/out/{args.name}.tsx.txt", "w").write(tsx)
    print(f"{args.image} -> {len(paths)} strokes -> tools/out/{args.name}.tsx.txt")

    if args.preview:
        body = "\n".join(f'    <path d="{d}"/>' for d in paths)
        svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 100" width="240" height="400">\n'
            '  <rect width="60" height="100" fill="#08080a"/>\n'
            '  <g fill="none" stroke="#efeae1" stroke-width="1.4" stroke-linecap="round" '
            'stroke-linejoin="round">\n' + body + "\n  </g>\n</svg>"
        )
        open(f"tools/out/{args.name}.preview.svg", "w").write(svg)
        print(f"preview -> tools/out/{args.name}.preview.svg")


if __name__ == "__main__":
    main()
