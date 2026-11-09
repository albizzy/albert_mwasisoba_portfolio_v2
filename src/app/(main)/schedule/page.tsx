import type { Metadata } from 'next'
import { PageShell } from '@/components/layout'
import { PageHeader } from '@/components/content/sections'
import { Highlight } from '@/components/ui/highlight'
import { Panel } from '@/components/ui/panel'
import { Tag } from '@/components/ui/tag'
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
        <PageShell>
            <PageHeader
                eyebrow="Book a session"
                titleId="schedule-title"
                title={
                    <>
                        Let’s <Highlight tone="pink">talk.</Highlight>
                    </>
                }
                lead="Grab a slot for an intro chat, role screen, or project scope."
                meta={<Tag dot>15–30 mins · Google Meet or voice</Tag>}
            />

            <Panel
                tab="Availability"
                title="Select a format."
                titleId="meeting-options-title"
                hint="Pick a call type to view open calendar slots."
            >
                <Scheduler meetings={getMeetingTypes()} />
            </Panel>
        </PageShell>
    )
}
