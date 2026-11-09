import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { PageShell } from '@/components/layout'
import { PageHeader } from '@/components/content/sections'
import { Highlight } from '@/components/ui/highlight'
import { Panel } from '@/components/ui/panel'
import { Tag } from '@/components/ui/tag'
import { TextLink } from '@/components/ui/text-link'
import { routes } from '@/config'
import { ReplyForm } from '@/features/contact/components/reply-form'
import { createPageMetadata, withSiteName } from '@/lib/metadata'
import styles from '@/styles/correspondence.module.css'

export const maxDuration = 60
export const metadata: Metadata = createPageMetadata({
    title: withSiteName('Private Reply'),
    robots: { index: false, follow: false, noarchive: true },
    referrer: 'no-referrer',
})

export default function ReplyPage() {
    return (
        <PageShell as="main" width="narrow" fullHeight>
            <TextLink
                href={routes.home}
                variant="action"
                className={styles.backLink}
            >
                <ArrowLeft aria-hidden="true" />
                Back to portfolio
            </TextLink>
            <PageHeader
                eyebrow="Private correspondence"
                title={
                    <>
                        Direct <Highlight tone="blue">reply.</Highlight>
                    </>
                }
                lead="A private line to follow up and continue the conversation."
                meta={<Tag dot>Delivered directly to my inbox</Tag>}
            />
            <Panel tab="Private thread" aria-label="Private reply">
                <ReplyForm />
            </Panel>
        </PageShell>
    )
}
