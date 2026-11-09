'use client'

import { Typography } from '@/components/ui/typography'
import { Chip } from '@/components/ui/chip'
import { PageShell } from '@/components/layout'
import { works, type WorkItem } from '@/config'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState, useRef } from 'react'
import { WorkCard } from '../home/work-overview/work-card'
import { PageHeader } from '../sections'
import styles from './works.module.css'

gsap.registerPlugin(useGSAP)

const ALL_FILTER = 'All'

interface FilterGroup {
    id: string
    label: string
    select: (work: WorkItem) => ReadonlyArray<string>
}

// Each group adds a labelled row of filter chips drawn from the works
// config; a work matches when the selected value appears in any group.
const filterGroups: ReadonlyArray<FilterGroup> = [
    { id: 'services', label: 'Tools & craft', select: (work) => work.services },
    { id: 'types', label: 'Role & sector', select: (work) => work.types },
]

// A value shared by several groups is offered once, in the first group.
const offered = new Set<string>()
const filterOptions = filterGroups
    .map(({ id, label, select }) => {
        const options = Array.from(new Set(works.flatMap(select))).filter(
            (option) => !offered.has(option)
        )
        options.forEach((option) => offered.add(option))
        return { id, label, options }
    })
    .filter(({ options }) => options.length > 0)

const matchesFilter = (work: WorkItem, filter: string) =>
    filter === ALL_FILTER ||
    filterGroups.some(({ select }) => select(work).includes(filter))

export function WorksContent() {
    const [activeFilter, setActiveFilter] = useState(ALL_FILTER)
    const containerRef = useRef<HTMLDivElement>(null)

    const filteredWorks = works.filter((work) =>
        matchesFilter(work, activeFilter)
    )

    useGSAP(
        () => {
            gsap.from('.works-title', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            gsap.from('.works-filter-container', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.15,
            })
        },
        { scope: containerRef }
    )

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>('.work-card')
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    }
                )
            }
        },
        { dependencies: [activeFilter], scope: containerRef }
    )

    const renderChip = (value: string, label = value) => (
        <Chip
            key={value}
            active={activeFilter === value}
            aria-pressed={activeFilter === value}
            onClick={() => setActiveFilter(value)}
        >
            {label}
        </Chip>
    )

    return (
        <PageShell>
            <div ref={containerRef}>
                <PageHeader
                    className="works-title"
                    eyebrow="Selected archive"
                    title="Digital products engineered for clarity and scale."
                    lead="A curated index of frontend systems, design direction, and production web applications."
                />

                <div
                    className={`works-filter-container ${styles.filters}`}
                    role="group"
                    aria-label="Filter projects"
                >
                    {renderChip(ALL_FILTER, 'All projects')}
                    {filterOptions.map(({ id, label, options }) => (
                        <div
                            key={id}
                            className={styles.filterGroup}
                            role="group"
                            aria-labelledby={`works-filter-${id}`}
                        >
                            <span
                                id={`works-filter-${id}`}
                                className={styles.filterLabel}
                            >
                                {label}
                            </span>
                            <div className={styles.filterOptions}>
                                {options.map((option) => renderChip(option))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <WorkCard key={work.title} work={work} />
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <Typography className="text-editorial-muted">
                                No works found matching the selected filter.
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </PageShell>
    )
}
