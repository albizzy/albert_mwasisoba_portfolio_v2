'use client'

import { Caveat } from 'next/font/google'
import { Typography } from '@/components/ui/typography'
import { works } from '@/config'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState, useRef } from 'react'
import { WorkCard } from '../home/work-overview/work-card'
import { Section } from '../sections'

gsap.registerPlugin(useGSAP)

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

export function WorksContent() {
    const [activeFilter, setActiveFilter] = useState('All')
    const containerRef = useRef<HTMLDivElement>(null)

    const allServices = Array.from(new Set(works.flatMap((w) => w.services)))
    const allTypes = Array.from(new Set(works.flatMap((w) => w.types)))

    const handleFilterSelect = (filter: string) => {
        setActiveFilter(filter)
    }

    const filteredWorks = works.filter((work) => {
        if (activeFilter === 'All') return true
        return (
            work.services.includes(activeFilter) ||
            work.types.includes(activeFilter)
        )
    })

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
        <div ref={containerRef} className="w-full text-(--editorial-ink)">
            <Section className="py-16 md:py-24">
                <div className="works-title flex flex-col gap-3 max-w-4xl">
                    <p
                        className={cn(
                            caveat.className,
                            'text-2xl md:text-3xl font-semibold text-(--editorial-muted)'
                        )}
                    >
                        Selected archive
                    </p>
                    <Typography
                        as="h1"
                        variant="h2"
                        className="font-semibold text-(--editorial-ink) tracking-tight leading-[1.08]"
                    >
                        Digital products engineered for clarity and scale.
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="mt-2 max-w-2xl text-(--editorial-muted)"
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
                        <button
                            type="button"
                            onClick={() => handleFilterSelect('All')}
                            aria-pressed={activeFilter === 'All'}
                            className={cn(
                                'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 border-1.5 cursor-pointer select-none',
                                activeFilter === 'All'
                                    ? 'bg-(--editorial-ink) text-white border-(--editorial-ink) shadow-[3px_3px_0_var(--editorial-yellow)]'
                                    : 'bg-(--editorial-paper) hover:bg-(--editorial-surface) text-(--editorial-muted) hover:text-(--editorial-ink) border-(--editorial-line)'
                            )}
                        >
                            All Projects
                        </button>

                        {allServices.map((service) => (
                            <button
                                key={service}
                                type="button"
                                onClick={() => handleFilterSelect(service)}
                                aria-pressed={activeFilter === service}
                                className={cn(
                                    'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 border-1.5 cursor-pointer select-none',
                                    activeFilter === service
                                        ? 'bg-(--editorial-ink) text-white border-(--editorial-ink) shadow-[3px_3px_0_var(--editorial-yellow)]'
                                        : 'bg-(--editorial-paper) hover:bg-(--editorial-surface) text-(--editorial-muted) hover:text-(--editorial-ink) border-(--editorial-line)'
                                )}
                            >
                                {service}
                            </button>
                        ))}

                        {allTypes.length > 0 && (
                            <div className="hidden sm:block h-5 w-px bg-(--editorial-line) mx-1" />
                        )}

                        {allTypes.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handleFilterSelect(type)}
                                aria-pressed={activeFilter === type}
                                className={cn(
                                    'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 border-1.5 cursor-pointer select-none',
                                    activeFilter === type
                                        ? 'bg-(--editorial-ink) text-white border-(--editorial-ink) shadow-[3px_3px_0_var(--editorial-yellow)]'
                                        : 'bg-(--editorial-paper) hover:bg-(--editorial-surface) text-(--editorial-muted) hover:text-(--editorial-ink) border-(--editorial-line)'
                                )}
                            >
                                {type}
                            </button>
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
                            <Typography className="text-(--editorial-muted)">
                                No works found matching the selected filter.
                            </Typography>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}
