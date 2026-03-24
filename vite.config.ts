import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        articleTrust: resolve(
          __dirname,
          "articles/why-you-should-not-trust-ai-companies-and-llms/index.html"
        ),
        articlePrivacy: resolve(
          __dirname,
          "articles/ai-regulatory-frameworks-and-data-privacy/index.html"
        ),
        articleEthicalEnterprise: resolve(
          __dirname,
          "articles/enterprise-ai-ethical-integration-and-system-ownership/index.html"
        ),
        articleMckinsey: resolve(
          __dirname,
          "articles/mckinsey-just-dropped-their-2025-ai-report/index.html"
        ),
        articleAro: resolve(
          __dirname,
          "articles/autonomous-revenue-orchestration/index.html"
        ),
        articleKlarna: resolve(
          __dirname,
          "articles/when-ai-integration-fails-klarna-reverses-ai-push/index.html"
        ),
        articleLocalAi: resolve(
          __dirname,
          "articles/start-owning-your-data-with-local-ai/index.html"
        ),
      },
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
