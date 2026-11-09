import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageShell } from '@/components/layout'
import { PageHeader } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { Highlight } from '@/components/ui/highlight'
import { Panel } from '@/components/ui/panel'
import { RotatingText } from '@/components/ui/rotating-text'
import { Tag } from '@/components/ui/tag'
import { TextLink } from '@/components/ui/text-link'
import { routes } from '@/config'
import { ContactForm } from '@/features/contact/components/contact-form'
import {
    getContactAvailability,
    getPublicContactEmail,
} from '@/features/contact/server/config'
import { createPageMetadata, withSiteName } from '@/lib/metadata'
import styles from '@/styles/correspondence.module.css'

export const dynamic = 'force-dynamic'
export const maxDuration = 60
export const metadata: Metadata = createPageMetadata({
    title: withSiteName('Contact'),
    description:
        'Get in touch with Albert Mwasisoba for frontend engineering roles, contracts, and technical collaboration.',
})

const greetings = [
    { text: 'hi.' },
    { text: 'mambo.' },
    { text: 'hola.' },
    { text: 'salut.' },
    { text: 'ciao.' },
    { text: 'olá.' },
]

export default function ContactPage() {
    const availability = getContactAvailability()
    const publicEmail = getPublicContactEmail()

    return (
        <PageShell>
            <PageHeader
                eyebrow="Get in touch"
                titleLabel="Say hi."
                title={
                    <>
                        Say{' '}
                        <Highlight tone="yellow">
                            <RotatingText
                                items={greetings}
                                className={styles.greeting}
                                controlClassName={styles.greetingControl}
                                accessibleText="hi."
                                reducedText="hi."
                                controlLabel="greetings"
                                holdDuration={3.5}
                            />
                        </Highlight>
                    </>
                }
                lead="Open for engineering roles, contracts, and modern web collaborations."
                meta={<Tag dot>Usually replies within 24 hours</Tag>}
            />

            <div className={styles.contactGrid}>
                <aside
                    className={styles.contactAside}
                    aria-label="Other ways to connect"
                >
                    <div>
                        <h2 className={styles.asideTitle}>
                            Open to roles & contracts.
                        </h2>
                        <p className={styles.asideCopy}>
                            Frontend engineering, design systems, and product
                            delivery.
                        </p>
                    </div>
                    <Button asChild variant="editorial" size="pill">
                        <Link href={routes.schedule}>
                            Book a call <ArrowUpRight aria-hidden="true" />
                        </Link>
                    </Button>
                    {publicEmail && (
                        <p className={styles.emailNote}>
                            Prefer email?{' '}
                            <TextLink
                                href={`mailto:${publicEmail}`}
                                tone="pink"
                            >
                                {publicEmail}
                            </TextLink>
                        </p>
                    )}
                </aside>

                <Panel
                    tab="Direct message"
                    title="How can I help?"
                    titleId="contact-form-title"
                    hint="Brief notes on scope, timeline, or team fit."
                >
                    <ContactForm {...availability} publicEmail={publicEmail} />
                </Panel>
            </div>
        </PageShell>
    )
}
