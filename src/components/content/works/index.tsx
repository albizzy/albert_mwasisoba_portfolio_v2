'use client'

import { Typography } from '@/components/ui/typography'
import { works, type WorkItem } from '@/config'
import { caveat } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Fragment, useState, useRef } from 'react'
import { WorkCard } from '../home/work-overview/work-card'
import { Section } from '../sections'
import { FilterChip } from './filter-chip'

gsap.registerPlugin(useGSAP)

const ALL_FILTER = 'All'

interface FilterGroup {
    id: string
    select: (work: WorkItem) => ReadonlyArray<string>
}

// Each group adds a row of filter chips drawn from the works config, and a
// work matches when the selected value appears in any group.
const filterGroups: ReadonlyArray<FilterGroup> = [
    { id: 'services', select: (work) => work.services },
    { id: 'types', select: (work) => work.types },
]

const filterOptions = filterGroups.map(({ id, select }) => ({
    id,
    options: Array.from(new Set(works.flatMap(select))),
}))

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

    return (
        <div ref={containerRef} className="w-full text-editorial-ink">
            <Section className="py-16 md:py-24">
                <div className="works-title flex flex-col gap-3 max-w-4xl">
                    <p
                        className={cn(
                            caveat.className,
                            'text-2xl md:text-3xl font-semibold text-editorial-muted'
                        )}
                    >
                        Selected archive
                    </p>
                    <Typography
                        as="h1"
                        variant="h2"
                        className="font-semibold text-editorial-ink tracking-tight leading-[1.08]"
                    >
                        Digital products engineered for clarity and scale.
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="mt-2 max-w-2xl text-editorial-muted"
                    >
                        A curated index of frontend systems, design direction,
                        and production web applications.
                    </Typography>
                </div>

                <div className="works-filter-container flex flex-col gap-4">
                    <div
                        className="flex flex-wrap gap-2.5 items-center"
                        role="group"
                        aria-label="Filter projects"
                    >
                        <FilterChip
                            label="All Projects"
                            active={activeFilter === ALL_FILTER}
                            onSelect={() => setActiveFilter(ALL_FILTER)}
                        />

                        {filterOptions.map(({ id, options }, groupIndex) => (
                            <Fragment key={id}>
                                {groupIndex > 0 && options.length > 0 && (
                                    <div className="hidden sm:block h-5 w-px bg-editorial-line mx-1" />
                                )}
                                {options.map((option) => (
                                    <FilterChip
                                        key={option}
                                        label={option}
                                        active={activeFilter === option}
                                        onSelect={() => setActiveFilter(option)}
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 min-h-75">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <WorkCard key={work.title} work={work} />
                        ))
                    ) : (
                        <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                            <Typography className="text-editorial-muted">
                                No works found matching the selected filter.
                            </Typography>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}
