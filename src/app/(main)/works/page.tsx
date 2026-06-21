'use client'

import { useRef, useState } from 'react'
import { Section } from '@/components/content/sections'
import { Typography } from '@/components/ui/typography'
import { works } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Works() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-[300px]">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <div
                                key={work.title}
                                className="work-card group flex flex-col gap-4"
                            >
                                {/* Image Wrapper */}
                                <div className="relative overflow-hidden rounded-4xl aspect-video w-full bg-muted/20">
                                    <Image
                                        src={work.image}
                                        alt={work.imageAlt}
                                        width={work.imageWidth}
                                        height={work.imageHeight}
                                        className="work-image absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        placeholder={work.imagePlaceholder}
                                    />
                                    <div className="absolute top-6 left-6 flex flex-row gap-2">
                                        <div className="flex flex-row gap-2">
                                            {work.types.map(
                                                (type, typeIndex) => (
                                                    <div
                                                        key={typeIndex}
                                                        className="work-pill w-fit bg-black/40 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-medium text-white backdrop-blur-md"
                                                    >
                                                        <span>{type}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            {work.services.map(
                                                (service, serviceIndex) => (
                                                    <div
                                                        key={serviceIndex}
                                                        className="work-pill w-fit bg-black/40 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium text-white backdrop-blur-md"
                                                    >
                                                        <span>{service}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="work-content flex flex-col gap-2">
                                    <Typography
                                        as="h3"
                                        variant="h6"
                                        className="font-medium text-foreground"
                                    >
                                        {work.title}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        variant="body"
                                        className="text-muted-foreground"
                                        color=""
                                    >
                                        {work.description}
                                    </Typography>
                                </div>

                                <div className="work-link flex items-center gap-2 mt-auto">
                                    <Typography
                                        as="p"
                                        variant="body"
                                        className="text-muted-foreground"
                                    >
                                        <Link
                                            href={work.link}
                                            target="_blank"
                                            className="text-foreground hover:underline font-medium inline-flex items-center gap-1 group/btn"
                                        >
                                            View project
                                            <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
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
