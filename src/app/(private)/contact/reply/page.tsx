import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
    CorrespondenceHero,
    CorrespondencePage,
    CorrespondencePanel,
} from '@/components/content/correspondence'
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
        <CorrespondencePage variant="private">
            <Link href={routes.home} className={styles.backLink}>
                <ArrowLeft size={16} aria-hidden="true" />
                Back to portfolio
            </Link>
            <CorrespondenceHero
                eyebrow="Private correspondence"
                title="Direct"
                highlight="reply."
                tone="blue"
                lead="A private line to follow up and continue the conversation."
                note={{
                    label: 'Private thread',
                    text: 'Delivered directly to my inbox.',
                }}
            />
            <CorrespondencePanel
                tab="Private thread"
                tone="blue"
                label="Private reply"
            >
                <ReplyForm />
            </CorrespondencePanel>
        </CorrespondencePage>
    )
}
