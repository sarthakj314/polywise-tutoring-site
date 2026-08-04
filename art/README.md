# art/

Drop source figure drawings here, then run one of the importers in `tools/`.

    node tools/import-figure.mjs art/croquis-stand.svg --name stand --preview
    python3 tools/trace-figure.py  art/croquis-walk.png --name walk  --preview

Both write a ready-to-paste pose block to `tools/out/<name>.tsx.txt` plus a
preview, normalised into the same 60 × 100 rig every figure on the site uses
(feet on the floor at y96, centred on x30, height 92). Paste the block into the
`parts()` switch in `src/components/Figures.tsx`.

Only put files here that are public domain / CC0, or that Polywise has licensed.
This is a commercial site.
