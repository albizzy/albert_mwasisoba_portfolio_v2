'use client'

import Link from 'next/link'
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

            <div className="mt-20 flex flex-col items-center gap-4">
                <Typography
                    as="p"
                    variant="h6"
                    className="max-w-2xl text-center font-normal"
                >
                    I connect people, business, and technology through clear
                    digital work.
                </Typography>

                <Button
                    asChild
                    variant="default"
                    className="h-auto cursor-pointer rounded-full px-6 py-5 text-sm font-semibold shadow-md transition-transform hover:scale-105 md:text-base"
                >
                    <Link href="/expertise">My expertise</Link>
                </Button>
            </div>
        </Section>
    )
}
