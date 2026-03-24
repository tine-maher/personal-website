# Veza Digital — SEO, AEO & LLM Optimization Reference

Reference from [Veza Digital](https://www.vezadigital.com/) (B2B Webflow agency) for tinemaher.com implementation. Veza runs the **WAIO** (Webflow AI Optimization) framework and publishes on [AEO](https://www.vezadigital.com/post/blog-answer-engine-optimization) and [SEO vs GEO vs AEO vs LLM](https://www.vezadigital.com/post/seo-vs-geo-vs-aeo-vs-llm).

---

## 1. LLM discoverability

- **Dedicated file:** Veza serves `/llms.txt` (note: `llms.txt`, not `llm.txt`) — ~38KB semantic markdown for LLM ingestion.
- **Head signal:** In `<head>`:
  ```html
  <!-- LLM File Reference - Should be early in head -->
  <meta name="llm-file" content="/llms.txt">
  ```
- **File content:** First line states intent: *"This file is intended for LLM ingestion and summarization of Veza Digital's services and positioning."* Then long-form sections: who they are, core services, industries, company sizes, case studies, resources. Prose-style so AI can summarize and cite.

**Takeaway for tinemaher.com:** Use a single `llm.txt` (or `llms.txt`) at root; add `<meta name="llm-file" content="/llm.txt">` in head; keep content concise but semantic; optional intro line for LLM intent.

---

## 2. robots.txt and crawl budget

- **Default:** `User-agent: *` with `Disallow:` (allow all).
- **AI bots:** Explicit `Allow:` for key paths per bot:
  - `GPTBot`, `PerplexityBot`, `ClaudeBot`, `GoogleOther`
  - Allowed paths: `/about-us`, `/waio-webflow-framework`, `/case-studies`
- **Sitemap:** `Sitemap: https://www.vezadigital.com/sitemap.xml`

**Takeaway:** For a small portfolio, allow all and list sitemap. For larger sites, explicitly Allow high-value pages for AI crawlers to steer crawl budget.

---

## 3. Head architecture (meta & links)

- **Title / description:** Unique, keyword-aware; description reused for OG and Twitter.
- **Canonical:** `<link rel="canonical" href="https://www.vezadigital.com/">`
- **Open Graph:** `og:title`, `og:description`, `og:image` (AVIF), `og:type`, `og:url`, `og:site_name`, `og:locale`.
- **Twitter:** `twitter:title`, `twitter:description`, `twitter:image`, `twitter:card` (summary_large_image), `twitter:site`.
- **Technical SEO:** `robots` (index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1), `language`, `keywords`; optional `revisit-after`.
- **Brand:** `company`, `industry`, `service-area`.
- **Favicon stack:** `rel="shortcut icon"` (32px), `rel="apple-touch-icon"` (256px); `theme-color`.
- **Verification:** `google-site-verification`, `facebook-domain-verification`.

---

## 4. JSON-LD schema

- **Primary type:** `ProfessionalService` (not only Organization).
- **Fields:** `name`, `alternateName`, `description`, `url`, `logo`, `image`, `slogan`, `telephone`, `email`, `address` (PostalAddress), `foundingDate`, `founder` (Person), `keywords` (array).
- **Services:** `hasOfferCatalog` → `OfferCatalog` → `itemListElement` of `Offer` + `itemOffered` (Service) with name and description.

**Takeaway for personal brand:** Use `Person` as primary; add `knowsAbout`, `sameAs`, `alumniOf`; optionally link to an `Organization` (e.g. The Wall) with `worksFor` or `memberOf`.

---

## 5. WAIO / AEO (from Veza content)

- **Semantic HTML:** Use `<article>`, `<section>`, `<aside>`; avoid div soup so LLMs understand hierarchy.
- **Structured data:** Comprehensive schema so answer engines can extract entities and facts.
- **Front-loaded answers:** Clear, concise answers early in copy (e.g. hero, first paragraph).
- **Content freshness:** Regular updates; “last updated” or publish dates.
- **AI crawler access:** Explicit Allow in robots.txt for key pages; no blanket block of GPTBot/PerplexityBot if you want citations.
- **Performance:** Lighthouse 90+ and Core Web Vitals; AVIF for OG/Twitter images.

---

## 6. File naming

- Veza uses **llms.txt** (with “s”); common convention is **llm.txt**. Both work; pick one and point `meta name="llm-file"` at it.
