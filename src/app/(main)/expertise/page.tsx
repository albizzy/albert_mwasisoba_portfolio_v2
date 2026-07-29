'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { approachSteps, servicePillars, technologies } from '@/config'
import { type GsapRevealConfig, useGsapReveal } from '@/hooks/useGsapReveal'

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

export default function Expertise() {
    const pageRef = useRef<HTMLDivElement>(null)

    useGsapReveal(pageRef, expertiseAnimations)

    return (
        <div ref={pageRef} className="flex w-full flex-col">
            <Section
                className="min-h-[calc(100dvh-6rem)] py-16 md:py-24"
                containerClassName="h-full flex-1 justify-center"
                aria-labelledby="expertise-title"
            >
                <div className="flex max-w-5xl flex-col gap-6">
                    <Typography
                        id="expertise-title"
                        as="h1"
                        variant="h2"
                        className="expertise-hero-copy max-w-5xl font-medium"
                    >
                        Digital products built from the system to the surface.
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="expertise-hero-copy max-w-2xl text-muted-foreground"
                    >
                        I combine technical architecture, product thinking, and
                        visual design to create digital work that is useful,
                        expressive, and ready to grow.
                    </Typography>
                </div>
            </Section>

            <Section tone="muted" bordered aria-labelledby="services-title">
                <div className="flex max-w-3xl flex-col gap-4">
                    <Typography
                        as="span"
                        variant="caption"
                        className="font-semibold uppercase tracking-[0.18em] text-foreground/60"
                    >
                        What I do
                    </Typography>
                    <Typography
                        id="services-title"
                        as="h2"
                        variant="h4"
                        className="font-medium"
                    >
                        Three capabilities, designed to work together.
                    </Typography>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {servicePillars.map((service) => {
                        const Icon = service.icon

                        return (
                            <article
                                key={service.title}
                                className="service-card flex min-h-[32rem] flex-col items-start rounded-4xl border border-border/60 bg-background p-6 md:p-8"
                            >
                                <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
                                    <Icon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </div>
                                <div className="mt-auto flex flex-col gap-5">
                                    <div className="flex flex-col gap-3">
                                        <Typography
                                            as="h3"
                                            variant="h6"
                                            className="font-medium"
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            variant="body"
                                            className="text-muted-foreground"
                                        >
                                            {service.description}
                                        </Typography>
                                    </div>
                                    <ul
                                        className="flex flex-wrap gap-2"
                                        aria-label={`${service.title} capabilities`}
                                    >
                                        {service.capabilities.map(
                                            (capability) => (
                                                <li
                                                    key={capability}
                                                    className="rounded-full border border-border bg-muted/30 px-3 py-2 text-xs font-medium"
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
                <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                    <div className="flex flex-col gap-4">
                        <Typography
                            as="span"
                            variant="caption"
                            className="font-semibold uppercase tracking-[0.18em] text-foreground/60"
                        >
                            My approach
                        </Typography>
                        <Typography
                            id="approach-title"
                            as="h2"
                            variant="h4"
                            className="font-medium"
                        >
                            A clear path through complex work.
                        </Typography>
                        <Typography
                            as="p"
                            variant="body"
                            className="max-w-md text-muted-foreground"
                        >
                            The shape of every project changes, but the work
                            stays collaborative, iterative, and focused on
                            useful outcomes.
                        </Typography>
                    </div>

                    <ol className="flex flex-col">
                        {approachSteps.map((step) => {
                            const Icon = step.icon

                            return (
                                <li
                                    key={step.number}
                                    className="approach-step grid gap-5 border-t border-border py-8 first:pt-0 sm:grid-cols-[4rem_1fr_auto]"
                                >
                                    <Typography
                                        as="span"
                                        variant="caption"
                                        className="font-medium text-foreground/50"
                                    >
                                        {step.number}
                                    </Typography>
                                    <div className="flex flex-col gap-3">
                                        <Typography
                                            as="h3"
                                            variant="h6"
                                            className="font-medium"
                                        >
                                            {step.title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            variant="body"
                                            className="max-w-xl text-muted-foreground"
                                        >
                                            {step.description}
                                        </Typography>
                                    </div>
                                    <div className="flex size-11 items-center justify-center rounded-full bg-muted">
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

            <Section tone="muted" bordered aria-labelledby="toolkit-title">
                <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                    <div className="flex flex-col gap-4">
                        <Typography
                            as="span"
                            variant="caption"
                            className="font-semibold uppercase tracking-[0.18em] text-foreground/60"
                        >
                            Toolkit
                        </Typography>
                        <Typography
                            id="toolkit-title"
                            as="h2"
                            variant="h4"
                            className="font-medium"
                        >
                            Tools chosen for the job.
                        </Typography>
                    </div>
                    <ul className="flex flex-wrap content-start gap-3">
                        {technologies.map((technology) => (
                            <li
                                key={technology}
                                className="technology-pill rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold md:text-base"
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
                <div className="expertise-cta flex max-w-3xl flex-col items-center gap-6">
                    <Typography
                        id="expertise-cta-title"
                        as="h2"
                        variant="h4"
                        className="font-medium"
                    >
                        Need more than a polished surface?
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="max-w-xl text-muted-foreground"
                    >
                        Let&apos;s shape the product, the system, and the path
                        to delivery together.
                    </Typography>
                    <Button
                        asChild
                        className="h-auto rounded-full px-6 py-5 text-sm font-semibold shadow-md md:text-base"
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
