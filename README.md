# Albert Mwasisoba — Engineering Portfolio

A portfolio of frontend engineering, UI architecture and product work. Built with Next.js 16, React 19, strict TypeScript and Tailwind CSS 4, with Unbounded typography and GSAP motion.

[Live portfolio](https://albert-mwasisoba-portfolio-v2.vercel.app/) · [Engineering case study](https://albert-mwasisoba-portfolio-v2.vercel.app/#case-studies) · [MIT licence](LICENSE)

## Run locally

Use Node.js 22 or newer and Bun. The repository includes `bun.lock`.

```sh
git clone https://github.com/albizzy/albert_mwasisoba_portfolio_v2.git
cd albert_mwasisoba_portfolio_v2
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000). Public portfolio content can be previewed without contact-service credentials. For email, spam protection, booking and resume configuration, copy `.env.example` to `.env.local` and follow the [contact and scheduling guide](docs/contact-and-scheduling.md). Never commit credentials.

```sh
bun run build
bun run start
```

## Engineering the portfolio

### Structure and type safety

- **App Router:** `src/app` owns routes, layouts and metadata. Server components compose pages; interactive features declare their client boundary.
- **Feature boundaries:** `src/features` contains contact and scheduling logic. `src/components/content` composes page sections, `src/components/layout` provides the shell, and `src/components/ui` holds shared primitives.
- **Typed primitives:** [`Button`](src/components/ui/button.tsx) uses Radix Slot for composition and Class Variance Authority for typed variants. [`tsconfig.json`](tsconfig.json) enables `strict: true`.
- **Content and presentation:** Site identity, routes, navigation, social profiles, projects and the case study live in `src/config`; complex section styling lives in adjacent CSS modules. The technical case study renders from `src/config/case-study.ts` in `src/components/content/home/case-studies`.

### Considered motion

[`RotatingText`](src/components/ui/rotating-text.tsx) shares the hero and overview animation logic through `@gsap/react`, with scoped timelines, font/resize measurements and cleanup. It supports pause/resume, reduced-motion fallbacks, off-screen playback control via `IntersectionObserver`, and document-visibility handling.

[`Featured Work`](src/components/content/home/work-overview/hooks/useWorkOverviewAnimation.ts) uses sticky folder cards only when they fit the viewport. Its image parallax is disabled for reduced motion. The case-study disclosures use native `details`/`summary`, so they work without JavaScript.

These are specific accessibility accommodations, not a claim of a completed WCAG conformance audit.

### Asset delivery and benchmarks

[`WorkPreview`](src/components/content/home/work-overview/work-item.tsx) uses `next/image`, static image imports, blur placeholders and responsive `sizes`. The preview reserves layout space; optional live iframes load near the viewport. The root layout loads Unbounded through `next/font`.

**Benchmark status:** No versioned production Lighthouse report is committed yet. Performance, Accessibility, Best Practices and SEO scores, FCP/LCP, CLS and INP are therefore **not yet recorded here**. The site does not display invented 95+ scores or a zero-CLS guarantee.

[Run a live PageSpeed Insights audit](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Falbert-mwasisoba-portfolio-v2.vercel.app%2F) against the deployed homepage. This evaluates the current deployment, which may differ from your local checkout.

To record reproducible results:

1. Audit a production build, not `next dev`. Use Chrome DevTools Lighthouse or the live PageSpeed link.
2. Capture mobile and desktop results. Record the deployed commit, URL, date, Lighthouse version and test settings with each report.
3. Save the HTML/JSON reports under `docs/benchmarks/` and add measured scores, FCP, LCP, CLS and Total Blocking Time here. Report variability across runs.
4. Treat lab scores separately from field Core Web Vitals; report field INP only when real-user data is available. Include manual keyboard and reduced-motion checks alongside automated accessibility results.

## Extending the portfolio

The codebase follows the open–closed principle: new content and variants are added as new entries or files, and the code that renders them stays unchanged.

| To add…                        | Add it in                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| A project                      | `works` in `src/config/works.ts`                                                                                          |
| A menu link or in-page section | `mainNavigation` in `src/config/navigation.ts`; `/#id` links highlight automatically                                      |
| An internal path               | `routes` in `src/config/routes.ts`; link with `routes.*`, not string literals                                             |
| A social profile               | `socialProfiles` in `src/config/social.ts` (new marks: `createBrandIcon` in `src/components/ui/brand-icons.tsx`)          |
| A page                         | A route that exports `createPageMetadata(...)` from `src/lib/metadata.ts`                                                 |
| A contact or scheduling page   | Compose `CorrespondencePage`, `CorrespondenceHero` and `CorrespondencePanel` from `src/components/content/correspondence` |
| An About section               | A component in `about/sections` and an entry in `about/about-sections.ts`                                                 |
| A contact form field           | `fieldDefinitions` in `src/features/contact/schema.ts`; validation and rendering read it                                  |
| A meeting type                 | `meetingDefinitions` in `src/features/scheduling/config.ts`, plus its environment variable                                |
| A works-archive filter         | `filterGroups` in `src/components/content/works/index.tsx`                                                                |
| A reveal animation             | A resolver in `presetResolvers` or a direction in `directionProfiles` (`src/hooks/gsap-reveal-presets.ts`)                |
| A cursor appearance            | A rule in `CURSOR_RULES` (`src/components/ui/custom-cursor.tsx`) and its styles                                           |
| A colour tone                  | The `[data-tone]` token block of the stylesheet that should support it; tone names are typed in `src/lib/tones.ts`        |

Shared behaviour has one home: fonts in `src/lib/fonts.ts`, reduced-motion checks in `src/lib/motion.ts`, smooth scrolling in `src/lib/scroll.ts` and section scroll-spy in `src/hooks/useSectionNavigation.ts`.

## Validation

```sh
bunx tsc --noEmit
bun run lint
bun run test
bun run build
```

Tests cover contact validation, server-side behaviour and the extension points above; they do not replace visual, keyboard or production performance checks.

## Licence

[MIT](LICENSE). Project names and client visuals remain the property of their respective owners.
