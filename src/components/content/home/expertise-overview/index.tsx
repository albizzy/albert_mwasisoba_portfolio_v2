'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { CompletionSteps } from './completion-steps'
import { expertiseData } from './expertise-data'
import { useCompletionStepsScroll } from './hooks'
import { ProblemSolutionChat } from './problem-solution-chat'

export function ExpertiseOverview() {
    const { listRef, sectionRef, viewportRef } = useCompletionStepsScroll()
    const { completionSteps, problemVsSolution } = expertiseData

    return (
        <Section ref={sectionRef} withDefaultContainer={false}>
            <Container className="flex flex-col">
                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                    <CompletionSteps
                        steps={completionSteps}
                        viewportRef={viewportRef}
                        listRef={listRef}
                    />
                    <ProblemSolutionChat items={problemVsSolution} />
                </div>
            </Container>

            <div className="mt-20 flex flex-col items-center gap-5 px-4">
                <Typography
                    as="p"
                    variant="h5"
                    className="max-w-2xl text-center font-semibold text-(--editorial-ink)"
                >
                    I connect people, business, and technology through clear
                    digital work.
                </Typography>

                <Button
                    asChild
                    variant="default"
                    className="min-h-14 h-auto cursor-pointer rounded-full border-2 border-(--editorial-ink) bg-(--editorial-ink) px-7 py-3.5 text-sm font-semibold text-white shadow-[4px_4px_0_var(--editorial-yellow)] transition-all duration-200 hover:bg-(--editorial-ink) hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--editorial-yellow)]"
                >
                    <Link href="/expertise">
                        My expertise <ArrowUpRight aria-hidden="true" />
                    </Link>
                </Button>
            </div>
        </Section>
    )
}
