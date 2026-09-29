import { ArrowUpRight, Github, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArchitectureAccordion } from './architecture-accordion'
import styles from './case-studies.module.css'
import { Caveat } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

const repository = 'https://github.com/albizzy/albert_mwasisoba_portfolio_v2'
const source = `${repository}/blob/main`
const auditUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent('https://albert-mwasisoba-portfolio-v2.vercel.app/')}`

const technicalNotes = [
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
] as const

export function CaseStudies() {
    return (
        <section
            id="case-studies"
            aria-labelledby="case-studies-title"
            className={styles.section}
        >
            <div className={styles.dossier}>
                <div className={styles.tab}>
                    <ScanLine size={16} aria-hidden="true" />
                    Case study
                </div>
                <div className={styles.sheet}>
                    <div className={styles.context}>
                        <Typography
                            as={'p'}
                            className={cn(styles.eyebrow, caveat.className)}
                        >
                            Under the Hood
                        </Typography>
                        <h2 id="case-studies-title" tabIndex={-1}>
                            How I built
                            <br />
                            this portfolio<span className={styles.dot}>.</span>
                        </h2>
                        <p className={styles.description}>
                            Commercial client applications remain protected
                            under proprietary NDAs. This open-source repository
                            serves as a public walkthrough of my frontend
                            standards: reusable design systems, accessible
                            motion, and sub-second performance.
                        </p>
                        <ul
                            className={styles.badges}
                            aria-label="Project stack and licence"
                        >
                            <li>Next.js 16</li>
                            <li>TypeScript (Strict)</li>
                            <li>Tailwind CSS</li>
                            <li>
                                <span
                                    className={styles.statusDot}
                                    aria-hidden="true"
                                />
                                MIT / Open Source
                            </li>
                        </ul>
                        <div className={styles.actions}>
                            <Button asChild className={styles.sourceButton}>
                                <a
                                    href={repository}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github aria-hidden="true" /> View Source
                                    Code
                                    <ArrowUpRight aria-hidden="true" />
                                    <span className="sr-only">
                                        {' '}
                                        on GitHub (opens in a new tab)
                                    </span>
                                </a>
                            </Button>
                            <a
                                className={styles.auditLink}
                                href={auditUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Performance Audit{' '}
                                <ArrowUpRight size={16} aria-hidden="true" />
                                <span className="sr-only">
                                    {' '}
                                    in PageSpeed Insights (opens in a new tab)
                                </span>
                            </a>
                        </div>
                        <p className={styles.auditNote}>
                            Verified via Google PageSpeed Insights & Core Web
                            Vitals.
                        </p>
                    </div>
                    <div className={styles.notes}>
                        <div className={styles.notesHeader}>
                            <span>Architecture Breakdown</span>
                            <span className={styles.fileLabel}>01 — 03</span>
                        </div>
                        <ArchitectureAccordion notes={technicalNotes} />
                        <div className={styles.notesFooter}>
                            <span aria-hidden="true">↳</span> Direct links to
                            production code samples.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
