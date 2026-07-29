'use client'

import Link from 'next/link'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { works } from '@/config'
import { useWorkOverviewAnimation } from './hooks'
import { WorkCard } from './work-card'

export function WorkOverview() {
    const sectionRef = useWorkOverviewAnimation()

    return (
        <Section ref={sectionRef} className="flex flex-col gap-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {works.map((work) => (
                    <WorkCard key={work.title} work={work} />
                ))}
            </div>

            <div className="work-cta flex w-full flex-row items-center justify-center">
                <Button
                    asChild
                    variant="default"
                    className="h-auto cursor-pointer rounded-full px-6 py-5 text-sm font-semibold shadow-md transition-transform hover:scale-105 md:text-base"
                >
                    <Link href="/works">View all projects</Link>
                </Button>
            </div>
        </Section>
    )
}
