'use client'

import type { LucideIcon } from 'lucide-react'
import { useGsapReveal, type GsapRevealConfig } from '@/hooks'
import { PageShell } from '@/components/layout'
import { PageHeader, Section, SectionHeading } from '../sections'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NumberedList } from '@/components/ui/numbered-list'
import { Panel } from '@/components/ui/panel'
import { Tag } from '@/components/ui/tag'
import { servicePillars, approachSteps, technologies, routes } from '@/config'
import { toSequenceLabel } from '@/helpers'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import styles from './expertise.module.css'

const expertiseAnimations: ReadonlyArray<GsapRevealConfig> = [
    {
        target: '.expertise-hero > *',
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

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
    return (
        <span className={styles.stepIcon}>
            <Icon aria-hidden="true" />
        </span>
    )
}

const steps = approachSteps.map((step) => ({
    id: step.number,
    title: step.title,
    description: step.description,
    aside: <IconBadge icon={step.icon} />,
}))

export function ExpertiseContent() {
    const pageRef = useRef<HTMLDivElement>(null)

    useGsapReveal(pageRef, expertiseAnimations)

    return (
        <div ref={pageRef} className="flex w-full flex-col">
            <PageShell className={styles.hero}>
                <PageHeader
                    className="expertise-hero mb-0"
                    eyebrow="Capabilities & craft"
                    title="Digital products built from the system to the surface."
                    lead="I combine technical architecture, product thinking, and visual design to create digital work that is useful, expressive, and ready to grow."
                />
            </PageShell>

            <Section tone="paper" bordered aria-labelledby="services-title">
                <SectionHeading
                    eyebrow="What I do"
                    title="Three capabilities, designed to work together."
                    titleId="services-title"
                />

                <div className={styles.services}>
                    {servicePillars.map((service, index) => {
                        const Icon = service.icon

                        return (
                            <Card
                                as="article"
                                key={service.title}
                                className={cn('service-card', styles.service)}
                            >
                                <div className={styles.serviceTop}>
                                    <span
                                        className={styles.serviceIcon}
                                        data-tone={service.tone}
                                    >
                                        <Icon aria-hidden="true" />
                                    </span>
                                    <span className={styles.serviceNumber}>
                                        {toSequenceLabel(index)}
                                    </span>
                                </div>
                                <div className={styles.serviceCopy}>
                                    <h3 className={styles.serviceTitle}>
                                        {service.title}
                                    </h3>
                                    <p className={styles.serviceText}>
                                        {service.description}
                                    </p>
                                </div>
                                <ul
                                    className={styles.capabilities}
                                    aria-label={`${service.title} capabilities`}
                                >
                                    {service.capabilities.map((capability) => (
                                        <Tag as="li" key={capability}>
                                            {capability}
                                        </Tag>
                                    ))}
                                </ul>
                            </Card>
                        )
                    })}
                </div>
            </Section>

            <Section bordered aria-labelledby="approach-title">
                <div className={styles.split}>
                    <SectionHeading
                        align="start"
                        eyebrow="My approach"
                        title="A clear path through complex work."
                        titleId="approach-title"
                        lead="The shape of every project changes, but the work stays collaborative, iterative, and focused on useful outcomes."
                    />
                    <Panel as="div">
                        <NumberedList
                            items={steps}
                            itemClassName="approach-step"
                        />
                    </Panel>
                </div>
            </Section>

            <Section tone="paper" bordered aria-labelledby="toolkit-title">
                <div className={styles.split}>
                    <SectionHeading
                        align="start"
                        eyebrow="Toolkit"
                        title="Tools chosen for the job."
                        titleId="toolkit-title"
                    />
                    <ul className={styles.toolkit}>
                        {technologies.map((technology) => (
                            <Tag
                                as="li"
                                key={technology}
                                className="technology-pill"
                            >
                                {technology}
                            </Tag>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section bordered aria-labelledby="expertise-cta-title">
                <div className={cn('expertise-cta', styles.cta)}>
                    <SectionHeading
                        eyebrow="Next step"
                        title="Need more than a polished surface?"
                        titleId="expertise-cta-title"
                        lead="Let’s shape the product, the system, and the path to delivery together."
                    />
                    <Button asChild variant="editorialDark" size="pill">
                        <Link href={routes.contact}>
                            Discuss a project
                            <ArrowUpRight aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </Section>
        </div>
    )
}
