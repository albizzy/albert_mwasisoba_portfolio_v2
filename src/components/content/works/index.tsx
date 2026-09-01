'use client'

import { Typography } from '@/components/ui/typography'
import { works } from '@/config'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { useState, useRef } from 'react'
import { WorkCard } from '../home/work-overview/work-card'
import { Section } from '../sections'

gsap.registerPlugin(useGSAP)

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
        <div ref={containerRef} className="w-full">
            <Section className="py-16 md:py-24">
                <div className="works-title flex flex-col gap-4 max-w-4xl">
                    <Typography
                        as="h1"
                        variant="h5"
                        className="font-semibold text-foreground tracking-tight leading-tight"
                    >
                        Digital design for forward-thinking businesses and
                        people.
                    </Typography>
                </div>

                <div className="works-filter-container flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={() => handleFilterSelect('All')}
                            className={cn(
                                'px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border cursor-pointer select-none',
                                activeFilter === 'All'
                                    ? 'bg-foreground text-background border-foreground shadow-md'
                                    : 'bg-muted/10 hover:bg-muted/30 text-muted-foreground hover:text-foreground border-border/40'
                            )}
                        >
                            All Projects
                        </button>

                        {allServices.map((service) => (
                            <button
                                key={service}
                                onClick={() => handleFilterSelect(service)}
                                className={cn(
                                    'px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border cursor-pointer select-none',
                                    activeFilter === service
                                        ? 'bg-foreground text-background border-foreground shadow-md'
                                        : 'bg-muted/10 hover:bg-muted/30 text-muted-foreground hover:text-foreground border-border/40'
                                )}
                            >
                                {service}
                            </button>
                        ))}

                        {allTypes.length > 0 && (
                            <div className="hidden sm:block h-4 w-px bg-border/60 mx-1" />
                        )}

                        {allTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleFilterSelect(type)}
                                className={cn(
                                    'px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border cursor-pointer select-none',
                                    activeFilter === type
                                        ? 'bg-foreground text-background border-foreground shadow-md'
                                        : 'bg-muted/10 hover:bg-muted/30 text-muted-foreground hover:text-foreground border-border/40'
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-75">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <WorkCard key={work.title} work={work} />
                        ))
                    ) : (
                        <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                            <Typography className="text-muted-foreground">
                                No works found matching the selected filter.
                            </Typography>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}
