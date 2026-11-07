import type { Metadata } from 'next'
import {
    CorrespondenceHero,
    CorrespondencePage,
    CorrespondencePanel,
} from '@/components/content/correspondence'
import { getMeetingTypes } from '@/features/scheduling/config'
import { Scheduler } from '@/features/scheduling/scheduler'
import { createPageMetadata, withSiteName } from '@/lib/metadata'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = createPageMetadata({
    title: withSiteName('Schedule'),
    description:
        'Book an intro chat, role screen, or project discussion with Albert Mwasisoba.',
})

export default function SchedulePage() {
    return (
        <CorrespondencePage>
            <CorrespondenceHero
                eyebrow="Book a session"
                title="Let’s"
                highlight="talk."
                tone="pink"
                titleId="schedule-title"
                lead="Grab a slot for an intro chat, role screen, or project scope."
                note={{
                    label: 'Quick sync',
                    text: '15–30 mins. Google Meet or voice.',
                }}
            />

            <CorrespondencePanel
                tab="Availability"
                tone="pink"
                title="Select a format."
                titleId="meeting-options-title"
                hint="Pick a call type to view open calendar slots."
            >
                <Scheduler meetings={getMeetingTypes()} />
            </CorrespondencePanel>
        </CorrespondencePage>
    )
}
