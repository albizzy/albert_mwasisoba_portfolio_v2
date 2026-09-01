'use client'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { aboutDisciplines, workingPrinciples } from '@/config'
import { type GsapRevealConfig, useGsapReveal } from '@/hooks/useGsapReveal'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Section } from '../sections'
import Link from 'next/link'

const aboutAnimations: ReadonlyArray<GsapRevealConfig> = [
    {
        target: '.about-hero-copy',
        preset: 'fade-up',
        duration: 1,
        stagger: 0.12,
        scrollTrigger: false,
    },
    {
        target: '.about-story',
        preset: 'fade-up',
        duration: 0.9,
    },
    {
        target: '.about-discipline',
        preset: 'slide-up',
        duration: 0.75,
        stagger: 0.1,
    },
    {
        target: '.about-principle',
        preset: 'fade-left',
        duration: 0.75,
        stagger: 0.12,
    },
    {
        target: '.about-cta',
        preset: 'scale-up',
        duration: 0.9,
    },
]

export function AboutContent() {
    const pageRef = useRef<HTMLDivElement>(null)

    useGsapReveal(pageRef, aboutAnimations)

    return (
        <div ref={pageRef} className="flex w-full flex-col">
            <Section
                tone="default"
                className="min-h-[calc(100dvh-6rem)] py-16 md:py-24"
                containerClassName="h-full flex-1 items-center justify-center"
                aria-labelledby="about-title"
            >
                <div className="flex max-w-5xl flex-col items-center gap-6 text-center">
                    <Typography
                        id="about-title"
                        as="h1"
                        variant="h3"
                        className="about-hero-copy font-medium text-foreground/50"
                    >
                        I connect{' '}
                        <span className="text-foreground">technology</span>,{' '}
                        <span className="text-foreground">design</span>, and{' '}
                        <span className="text-foreground">strategy</span> to
                        make useful digital products feel clear.
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="about-hero-copy max-w-2xl text-muted-foreground"
                    >
                        I&apos;m Albert, a multidisciplinary creator who enjoys
                        turning complicated ideas into systems people can
                        understand and use.
                    </Typography>
                </div>
            </Section>

            <Section aria-labelledby="about-story-title">
                <div className="about-story grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                    <Typography
                        id="about-story-title"
                        as="h2"
                        variant="h5"
                        className="font-medium"
                    >
                        One connected practice
                    </Typography>
                    <div className="flex flex-col gap-6">
                        <Typography as="p" variant="h5" className="font-normal">
                            Good digital work rarely belongs to one discipline.
                        </Typography>
                        <Typography
                            as="p"
                            variant="lead"
                            className="text-muted-foreground"
                        >
                            I move between architecture, interface thinking, and
                            visual craft so that the experience and the system
                            behind it support the same goal. The result is work
                            that is practical to build, coherent to maintain,
                            and easier for people to use.
                        </Typography>
                    </div>
                </div>
            </Section>

            <Section tone="muted" bordered aria-labelledby="disciplines-title">
                <div className="flex max-w-3xl flex-col gap-4">
                    <Typography
                        as="span"
                        variant="caption"
                        className="font-semibold uppercase tracking-[0.18em] text-foreground/60"
                    >
                        Across disciplines
                    </Typography>
                    <Typography
                        id="disciplines-title"
                        as="h2"
                        variant="h4"
                        className="font-medium"
                    >
                        Different lenses, one outcome.
                    </Typography>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                    {aboutDisciplines.map((discipline, index) => (
                        <li
                            key={discipline.title}
                            className="about-discipline flex min-h-64 flex-col justify-between rounded-4xl border border-border/60 bg-background p-6 md:p-8"
                        >
                            <Typography
                                as="span"
                                variant="caption"
                                className="font-medium text-foreground/50"
                            >
                                {String(index + 1).padStart(2, '0')}
                            </Typography>
                            <div className="flex flex-col gap-3">
                                <Typography
                                    as="h3"
                                    variant="h6"
                                    className="font-medium"
                                >
                                    {discipline.title}
                                </Typography>
                                <Typography
                                    as="p"
                                    variant="body"
                                    className="max-w-md text-muted-foreground"
                                >
                                    {discipline.description}
                                </Typography>
                            </div>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section bordered aria-labelledby="principles-title">
                <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                    <div className="flex flex-col gap-4">
                        <Typography
                            as="span"
                            variant="caption"
                            className="font-semibold uppercase tracking-[0.18em] text-foreground/60"
                        >
                            How I work
                        </Typography>
                        <Typography
                            id="principles-title"
                            as="h2"
                            variant="h4"
                            className="font-medium"
                        >
                            Clear thinking, shared early.
                        </Typography>
                    </div>

                    <ol className="flex flex-col">
                        {workingPrinciples.map((principle) => (
                            <li
                                key={principle.number}
                                className="about-principle grid gap-4 border-t border-border py-8 first:pt-0 md:grid-cols-[4rem_1fr]"
                            >
                                <Typography
                                    as="span"
                                    variant="caption"
                                    className="font-medium text-foreground/50"
                                >
                                    {principle.number}
                                </Typography>
                                <div className="flex flex-col gap-3">
                                    <Typography
                                        as="h3"
                                        variant="h6"
                                        className="font-medium"
                                    >
                                        {principle.title}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        variant="body"
                                        className="max-w-xl text-muted-foreground"
                                    >
                                        {principle.description}
                                    </Typography>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Section>

            <Section
                tone="muted"
                bordered
                containerClassName="items-center text-center"
                aria-labelledby="about-cta-title"
            >
                <div className="about-cta flex max-w-3xl flex-col items-center gap-6">
                    <Typography
                        id="about-cta-title"
                        as="h2"
                        variant="h4"
                        className="font-medium"
                    >
                        Have a complex idea that needs a clear way forward?
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="max-w-xl text-muted-foreground"
                    >
                        Let&apos;s bring the technical and creative parts into
                        one focused conversation.
                    </Typography>
                    <Button
                        asChild
                        className="h-auto rounded-full px-6 py-5 text-sm font-semibold shadow-md md:text-base"
                    >
                        <Link href="/contact">
                            Start a conversation
                            <ArrowUpRight aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </Section>
        </div>
    )
}
