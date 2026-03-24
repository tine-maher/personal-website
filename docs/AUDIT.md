# Sovereign Architect — src & Boilerplate Audit

**Date:** 2025-03-14  
**Scope:** tinemaher.com codebase (Finsweet-adjacent static site)

---

## 1. Current state

- **Entry:** Single static `index.html` at project root (minimal placeholder).
- **`src/`:** Effectively empty (only `.DS_Store`). No TypeScript/JavaScript entry points, no Finsweet boilerplate source files present.
- **`tsconfig.json`:** `include: []` — nothing compiled. Target ES2020, ESNext modules, no emit.
- **No** `index.ts`, `main.ts`, or any bundled app; no build step (README: "Static site — no build step").

---

## 2. Legacy / boilerplate to remove or trim

### 2.1 Dependencies (package.json) — candidate removal

These are unused by the current static HTML and add weight; remove unless you plan to use them in a future build:

| Package | Purpose | Recommendation |
|--------|---------|----------------|
| `@barba/core` | Page transitions | Remove until SPA/transition design is decided |
| `@deck.gl/*` (core, layers, mapbox, aggregation-layers) | Map/geo viz | Remove unless map-based portfolio planned |
| `mapbox-gl` | Maps | Remove with deck.gl |
| `cannon-es` | Physics | Remove |
| `ogl` | WebGL | Remove unless 3D portfolio planned |
| `postprocessing` | 3D post-effects | Remove with Three/OGL |
| `three` + `@types/three` | 3D | Remove unless 3D work planned |
| `express`, `cors` | Server | Remove for static Vercel deploy |
| `swiper` | Carousels | Remove until needed |
| `vimeo` | Vimeo SDK | Remove until video integration needed |
| `lenis` | Smooth scroll | Keep if adding GSAP + scroll (optional) |
| `gsap` | Motion | **Keep** — required for "subtle but intentional" motion |
| `@finsweet/ts-utils` | Finsweet helpers | Keep if you introduce TS tooling; else remove |

**Keep for now:** `gsap`; optionally `@finsweet/ts-utils`, `lenis` if you add a build and use them.

### 2.2 Directories / files

| Item | Action |
|------|--------|
| `src/.DS_Store` | Delete (noise) |
| `bin/` | Empty — remove or reserve for scripts later |
| `.github/workflows/` | Keep if you use CI; else audit and remove unused workflows |

### 2.3 No index.ts / main.ts

There are no `index.ts` or `main.ts` files in the repo (only in `node_modules`). Nothing to merge; when you add a build, introduce a single entry (e.g. `src/main.ts` or `src/index.ts`) and point the bundler there.

---

## 3. What was added (this pass)

- **`public/llm.txt`** — LLM/AEO discoverability (Tine Maher, expertise, Ar-o1, The Wall).
- **`src/data/config.ts`** — Single source of truth for bio, projects, social links (for future components and possible build).

---

## 4. Next steps (from Sovereign Architect directive)

1. **Metadata & SEO:** Add semantic HTML, JSON-LD (Person/Organization), OpenGraph, Twitter Cards, canonical, favicon stack to `index.html` (or templated output).
2. **Performance:** When moving to a build (e.g. Next.js or Vite), add Image optimization, font strategy, sitemap, robots.txt.
3. **Design system:** Add `tailwind.config.ts` with a strict scale; refactor to semantic layout and no arbitrary values.
4. **Motion:** Wire GSAP from config/content; keep motion subtle and intentional.
