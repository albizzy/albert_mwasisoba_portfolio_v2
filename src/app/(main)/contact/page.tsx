import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RotatingText } from '@/components/ui/rotating-text'
import { ContactForm } from '@/features/contact/components/contact-form'
import {
    getContactAvailability,
    getPublicContactEmail,
} from '@/features/contact/server/config'
import styles from '@/styles/correspondence.module.css'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const maxDuration = 60
export const metadata: Metadata = {
    title: 'Contact — Albert Mwasisoba',
    description:
        'Get in touch with Albert Mwasisoba for frontend engineering roles, contract opportunities, and web architecture collaboration.',
}

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
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
        <div className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.hero}>
                    <div>
                        <Typography as="h1" variant="h4" aria-label="Say hi.">
                            Say{' '}
                            <span
                                className={`${styles.highlight} ${styles.highlightYellow}`}
                            >
                                <RotatingText
                                    items={greetings}
                                    className={styles.greeting}
                                    controlClassName={styles.greetingControl}
                                    accessibleText="hi."
                                    reducedText="hi."
                                    controlLabel="greetings"
                                    holdDuration={3.5}
                                />
                            </span>
                        </Typography>
                        <p className={styles.lead}>
                            Whether you’re hiring for an engineering role,
                            scoping a frontend contract, or looking to
                            collaborate on a modern web app—let’s talk.
                        </p>
                    </div>
                    <div className={styles.heroNote} aria-hidden="true">
                        <span className={cn(caveat.className)}>
                            Communication
                        </span>
                        <strong>Fast responses. Direct communication.</strong>
                    </div>
                </header>

                <div className={styles.contactGrid}>
                    <aside
                        className={styles.contactAside}
                        aria-label="Other ways to connect"
                    >
                        <div>
                            <h2 className={styles.asideTitle}>
                                Open to remote roles & engineering contracts.
                            </h2>
                            <p className={styles.asideCopy}>
                                Available for frontend development, design
                                system architecture, and agile product team
                                collaboration.
                            </p>
                        </div>
                        <Link href="/schedule" className={styles.callCard}>
                            <span>
                                <small>Introductory chat</small>
                                <strong>Book a call</strong>
                            </span>
                            <ArrowUpRight aria-hidden="true" />
                        </Link>
                        {publicEmail && (
                            <p className={styles.emailNote}>
                                Prefer direct email?
                                <a
                                    href={`mailto:${publicEmail}`}
                                    className={styles.emailLink}
                                >
                                    {publicEmail}
                                </a>
                            </p>
                        )}
                    </aside>

                    <section
                        className={styles.panelShell}
                        aria-labelledby="contact-form-title"
                    >
                        <span className={styles.panelTab}>Direct message</span>
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2
                                    id="contact-form-title"
                                    className={styles.panelTitle}
                                >
                                    How can I help?
                                </h2>
                                <p className={styles.panelHint}>
                                    Share a brief note about the team, role
                                    scope, or project timeline.
                                </p>
                            </div>
                            <ContactForm
                                {...availability}
                                publicEmail={publicEmail}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
