import type { Metadata } from 'next'
import { Section } from '@/components/content/sections'
import { Typography } from '@/components/ui/typography'
import { getMeetingTypes } from '@/features/scheduling/config'
import { Scheduler } from '@/features/scheduling/scheduler'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Book a call — Albert Mwasisoba',
    description:
        'Schedule an introduction or a focused working session with Albert Mwasisoba.',
}

export default function SchedulePage() {
    return (
        <Section
            className="min-h-[calc(100dvh-6rem)] pt-14 md:pt-20"
            containerClassName="items-center"
            aria-labelledby="schedule-title"
        >
            <div className="flex flex-col items-center gap-5 text-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Make time for a good idea
                </span>
                <Typography
                    id="schedule-title"
                    as="h1"
                    variant="h1"
                    className="text-4xl font-medium sm:text-6xl lg:text-8xl"
                >
                    Schedule<span className="text-muted-foreground">.</span>
                </Typography>
            </div>
            <Scheduler meetings={getMeetingTypes()} />
        </Section>
    )
}
