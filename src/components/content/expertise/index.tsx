'use client'

import { Caveat } from 'next/font/google'
import { useGsapReveal, type GsapRevealConfig } from '@/hooks'
import { Section } from '../sections'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { servicePillars, approachSteps, technologies } from '@/config'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

const pillarTones = [
    'var(--editorial-yellow)',
    'var(--editorial-blue)',
    'var(--editorial-green)',
] as const

const expertiseAnimations: ReadonlyArray<GsapRevealConfig> = [
    {
        target: '.expertise-hero-copy',
        preset: 'fade-up',
        duration: 1,
        stagger: 0.12,
        scrollTrigger: false,
    },
    {
        target: '.service-card',
        preset: 'skew-up',
        duration: 0.8,
        stagger: 0.12,
    },
    {
        target: '.approach-step',
        preset: 'slide-left',
        duration: 0.8,
        stagger: 0.12,
    },
    {
        target: '.technology-pill',
        preset: 'fade-up',
        distance: 18,
        duration: 0.55,
        stagger: 0.045,
    },
    {
        target: '.expertise-cta',
        preset: 'clip-up',
        duration: 0.9,
    },
]

export function ExpertiseContent() {
    const pageRef = useRef<HTMLDivElement>(null)

    useGsapReveal(pageRef, expertiseAnimations)

    return (
        <div
            ref={pageRef}
            className="flex w-full flex-col text-(--editorial-ink)"
        >
            <Section
                className="py-16 md:py-24"
                aria-labelledby="expertise-title"
            >
                <div className="flex max-w-4xl flex-col gap-4">
                    <p
                        className={cn(
                            caveat.className,
                            'expertise-hero-copy text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                        )}
                    >
                        Capabilities &amp; craft
                    </p>
                    <Typography
                        id="expertise-title"
                        as="h1"
                        variant="h2"
                        className="expertise-hero-copy max-w-4xl font-semibold tracking-tight leading-[1.08] text-(--editorial-ink)"
                    >
                        Digital products built from the system to the surface.
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="expertise-hero-copy mt-2 max-w-2xl text-(--editorial-muted)"
                    >
                        I combine technical architecture, product thinking, and
                        visual design to create digital work that is useful,
                        expressive, and ready to grow.
                    </Typography>
                </div>
            </Section>

            <Section
                bordered
                className="bg-(--editorial-paper)"
                aria-labelledby="services-title"
            >
                <div className="flex max-w-3xl flex-col gap-2">
                    <p
                        className={cn(
                            caveat.className,
                            'text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                        )}
                    >
                        What I do
                    </p>
                    <Typography
                        id="services-title"
                        as="h2"
                        variant="h3"
                        className="font-semibold text-(--editorial-ink)"
                    >
                        Three capabilities, designed to work together.
                    </Typography>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {servicePillars.map((service, index) => {
                        const Icon = service.icon
                        const accentColor =
                            pillarTones[index % pillarTones.length]

                        return (
                            <article
                                key={service.title}
                                style={{
                                    boxShadow: `6px 6px 0 ${accentColor}`,
                                }}
                                className="service-card flex flex-col justify-between gap-10 rounded-[28px] border-2 border-(--editorial-ink) bg-(--editorial-surface) p-6 md:p-8"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        style={{ backgroundColor: accentColor }}
                                        className={cn(
                                            'flex size-12 items-center justify-center rounded-full border-2 border-(--editorial-ink)',
                                            index === 0
                                                ? 'text-(--editorial-ink)'
                                                : 'text-white'
                                        )}
                                    >
                                        <Icon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </div>
                                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-(--editorial-muted)">
                                        0{index + 1}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-3">
                                        <Typography
                                            as="h3"
                                            variant="h5"
                                            className="font-semibold text-(--editorial-ink)"
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            variant="body"
                                            className="text-(--editorial-muted) leading-relaxed"
                                        >
                                            {service.description}
                                        </Typography>
                                    </div>
                                    <ul
                                        className="flex flex-wrap gap-2 pt-2 border-t border-(--editorial-line)"
                                        aria-label={`${service.title} capabilities`}
                                    >
                                        {service.capabilities.map(
                                            (capability) => (
                                                <li
                                                    key={capability}
                                                    className="rounded-[5px_10px_5px_5px] border border-(--editorial-line) bg-(--editorial-paper) px-2.5 py-1 text-xs font-medium uppercase tracking-[0.06em] text-(--editorial-ink)"
                                                >
                                                    {capability}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </Section>

            <Section bordered aria-labelledby="approach-title">
                <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
                    <div className="flex flex-col gap-3">
                        <p
                            className={cn(
                                caveat.className,
                                'text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                            )}
                        >
                            My approach
                        </p>
                        <Typography
                            id="approach-title"
                            as="h2"
                            variant="h3"
                            className="font-semibold text-(--editorial-ink)"
                        >
                            A clear path through complex work.
                        </Typography>
                        <Typography
                            as="p"
                            variant="body"
                            className="mt-1 max-w-md text-(--editorial-muted) leading-relaxed"
                        >
                            The shape of every project changes, but the work
                            stays collaborative, iterative, and focused on
                            useful outcomes.
                        </Typography>
                    </div>

                    <ol className="flex flex-col rounded-[28px] border-2 border-(--editorial-ink) bg-(--editorial-paper) p-6 md:p-8 shadow-[8px_8px_0_var(--editorial-line)]">
                        {approachSteps.map((step) => {
                            const Icon = step.icon

                            return (
                                <li
                                    key={step.number}
                                    className="approach-step grid gap-4 border-t border-(--editorial-line) py-7 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_1fr_auto]"
                                >
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-(--editorial-green) pt-1">
                                        {step.number}
                                    </span>
                                    <div className="flex flex-col gap-2">
                                        <Typography
                                            as="h3"
                                            variant="h6"
                                            className="font-semibold text-(--editorial-ink)"
                                        >
                                            {step.title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            variant="body"
                                            className="max-w-xl text-(--editorial-muted) leading-relaxed"
                                        >
                                            {step.description}
                                        </Typography>
                                    </div>
                                    <div className="flex size-11 items-center justify-center rounded-full border border-(--editorial-line) bg-(--editorial-surface) text-(--editorial-ink)">
                                        <Icon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </Section>

            <Section
                bordered
                className="bg-(--editorial-paper)"
                aria-labelledby="toolkit-title"
            >
                <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
                    <div className="flex flex-col gap-2">
                        <p
                            className={cn(
                                caveat.className,
                                'text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                            )}
                        >
                            Toolkit
                        </p>
                        <Typography
                            id="toolkit-title"
                            as="h2"
                            variant="h3"
                            className="font-semibold text-(--editorial-ink)"
                        >
                            Tools chosen for the job.
                        </Typography>
                    </div>
                    <ul className="flex flex-wrap content-start gap-3">
                        {technologies.map((technology) => (
                            <li
                                key={technology}
                                className="technology-pill rounded-full border-1.5 border-(--editorial-ink) bg-(--editorial-surface) px-4 py-2.5 text-xs md:text-sm font-medium uppercase tracking-[0.08em] text-(--editorial-ink) shadow-[3px_3px_0_var(--editorial-line)]"
                            >
                                {technology}
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section
                bordered
                containerClassName="items-center text-center"
                aria-labelledby="expertise-cta-title"
            >
                <div className="expertise-cta flex max-w-3xl flex-col items-center gap-5">
                    <p
                        className={cn(
                            caveat.className,
                            'text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                        )}
                    >
                        Next step
                    </p>
                    <Typography
                        id="expertise-cta-title"
                        as="h2"
                        variant="h3"
                        className="font-semibold text-(--editorial-ink)"
                    >
                        Need more than a polished surface?
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="max-w-xl text-(--editorial-muted)"
                    >
                        Let&apos;s shape the product, the system, and the path
                        to delivery together.
                    </Typography>
                    <Button
                        asChild
                        className="mt-2 min-h-14 h-auto rounded-full border-2 border-(--editorial-ink) bg-(--editorial-ink) px-7 py-3.5 text-sm font-semibold text-white shadow-[4px_4px_0_var(--editorial-yellow)] transition-all duration-200 hover:bg-(--editorial-ink) hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--editorial-yellow)]"
                    >
                        <Link href="/contact">
                            Discuss a project
                            <ArrowUpRight aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </Section>
        </div>
    )
}
