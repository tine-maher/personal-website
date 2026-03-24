# tinemaher.com — Ar-o1 Terminal

Sovereign AI Infrastructure Terminal. WebGL particle field + terminal UI. Deployed with [Vercel](https://vercel.com).

## Local development

```bash
pnpm install
pnpm dev
```

Runs Vite dev server at `http://localhost:5173`.

## Build

```bash
pnpm build
```

Output in `dist/`. Gzipped bundle target &lt;500kb (Three + GSAP + app).

## Deploy

Connect the repo to Vercel; set build command to `pnpm build` and output directory to `dist`.
