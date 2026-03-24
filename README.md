# tinemaher.com — Terminal

Personal Terminal. Deployed with [Vercel](https://vercel.com).

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
