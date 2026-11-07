import { siteConfig } from './site'

export interface ArchitectureNote {
    title: string
    summary: string
    description: string
    href: string
    link: string
}

export interface CaseStudyBadge {
    label: string
    /** Prefixes the badge with a live status dot. */
    status?: boolean
}

const source = `${siteConfig.repository}/blob/main`
const auditTarget = 'https://albertmwasisoba.vercel.app/'

export const caseStudy = {
    repository: siteConfig.repository,
    auditUrl: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(auditTarget)}`,
    stack: [
        { label: 'Next.js 16' },
        { label: 'TypeScript (Strict)' },
        { label: 'Tailwind CSS' },
        { label: 'MIT / Open Source', status: true },
    ] satisfies ReadonlyArray<CaseStudyBadge>,
    notes: [
        {
            title: 'Modular Design System & Strict Typing',
            summary: 'Next.js App Router · Strict TypeScript · CVA',
            description:
                'Structured with clear separation across route layers, feature modules, and UI primitives. Leverages Radix UI Slot patterns and Class Variance Authority (CVA) for type-safe variant scaling and zero-runtime prop collisions.',
            href: `${source}/src/components/ui/button.tsx`,
            link: 'Inspect UI primitive architecture',
        },
        {
            title: 'Accessible Animation & Performance Budget',
            summary: 'GSAP · WCAG 2.1 AA · prefers-reduced-motion',
            description:
                'Hardware-accelerated GSAP timelines paired with explicit prefers-reduced-motion fallbacks and manual pause controls. Uses IntersectionObserver and tab visibility listeners to halt off-screen rendering.',
            href: `${source}/src/components/ui/rotating-text.tsx`,
            link: 'Inspect motion & a11y implementation',
        },
        {
            title: 'Core Web Vitals & Zero Layout Shift',
            summary: 'next/image · Responsive Breakpoints · 0 CLS',
            description:
                'Optimized asset pipeline utilizing static imports, blur placeholders, and responsive srcset attributes. Enforced aspect-ratio bounding boxes eliminate Cumulative Layout Shift (CLS) during hydration.',
            href: `${source}/src/components/content/home/work-overview/work-item.tsx`,
            link: 'Inspect asset optimization patterns',
        },
    ] satisfies ReadonlyArray<ArchitectureNote>,
}
