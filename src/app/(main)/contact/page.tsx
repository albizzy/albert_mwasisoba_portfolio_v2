import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
    CorrespondenceHero,
    CorrespondencePage,
    CorrespondencePanel,
} from '@/components/content/correspondence'
import { RotatingText } from '@/components/ui/rotating-text'
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
        <CorrespondencePage>
            <CorrespondenceHero
                eyebrow="Get in touch"
                title="Say"
                titleLabel="Say hi."
                highlight={
                    <RotatingText
                        items={greetings}
                        className={styles.greeting}
                        controlClassName={styles.greetingControl}
                        accessibleText="hi."
                        reducedText="hi."
                        controlLabel="greetings"
                        holdDuration={3.5}
                    />
                }
                lead="Open for engineering roles, contracts, and modern web collaborations."
                note={{
                    label: 'Response time',
                    text: 'Usually within 24 hours.',
                }}
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
                    <Link href={routes.schedule} className={styles.callCard}>
                        <span>
                            <small>Introductory chat</small>
                            <strong>Book a call</strong>
                        </span>
                        <ArrowUpRight aria-hidden="true" />
                    </Link>
                    {publicEmail && (
                        <p className={styles.emailNote}>
                            Prefer email?
                            <a
                                href={`mailto:${publicEmail}`}
                                className={styles.emailLink}
                            >
                                {publicEmail}
                            </a>
                        </p>
                    )}
                </aside>

                <CorrespondencePanel
                    tab="Direct message"
                    title="How can I help?"
                    titleId="contact-form-title"
                    hint="Brief notes on scope, timeline, or team fit."
                >
                    <ContactForm {...availability} publicEmail={publicEmail} />
                </CorrespondencePanel>
            </div>
        </CorrespondencePage>
    )
}
