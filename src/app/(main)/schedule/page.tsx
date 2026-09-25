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
            <Scheduler meetings={getMeetingTypes()} />
        </Section>
    )
}
