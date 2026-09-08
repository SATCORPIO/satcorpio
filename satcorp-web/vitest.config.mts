import { defineConfig } from "vitest/config";

/**
 * Unit tests only, deliberately. Next's own testing guide is explicit that
 * Vitest cannot render `async` Server Components   nothing in this project
 * needs a DOM here, so there is no jsdom environment to configure either.
 * `lib/pulse-schema.ts`'s `normaliseHandle` and `lib/delivery.ts`'s pure
 * helpers are exactly the kind of logic this is for: cheaper to test than to
 * re-reason about on every change (phase guide §0.3).
 *
 * `.mts` rather than `.ts`, so the config can use ESM `import` without
 * setting `"type": "module"` in `package.json`   a change with a much wider
 * blast radius across a Next.js project than this file warrants.
 *
 * Playwright is the next tool this project needs   the doctrine checks and
 * the reservation form's real submit path (phase guide §0.5, §A3)   and is
 * not set up yet. Flagged rather than rushed.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
