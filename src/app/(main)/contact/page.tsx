import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ContactForm } from '@/features/contact/components/contact-form'
import {
    getContactAvailability,
    getPublicContactEmail,
} from '@/features/contact/server/config'

export const dynamic = 'force-dynamic'
export const maxDuration = 60
export const metadata: Metadata = {
    title: 'Contact — Albert Mwasisoba',
    description:
        'Have a project in mind? Talk to Albert about software architecture, design, and your next digital product.',
}

export default function ContactPage() {
    const availability = getContactAvailability()
    const publicEmail = getPublicContactEmail()
    return (
        <>
            <Section
                className="pb-12 pt-14 md:pb-16 md:pt-20"
                containerClassName="items-center text-center"
                aria-labelledby="contact-title"
            >
                <div className="flex max-w-5xl flex-col items-center gap-6">
                    <Typography
                        id="contact-title"
                        as="h1"
                        variant="h3"
                        className="font-medium"
                    >
                        Let’s work together
                        <span className="text-muted-foreground">!</span>
                    </Typography>
                    <Typography
                        as="p"
                        variant="lead"
                        className="max-w-2xl text-muted-foreground"
                    >
                        An idea, a challenge, or something worth building
                        together. I’d love to hear about it.
                    </Typography>
                </div>
            </Section>
            <Section
                className="pt-4 md:pt-6"
                aria-labelledby="contact-form-title"
            >
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
                    {/*<h2
                        id="contact-form-title"
                        className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
                    >
                        Tell me what you’re building
                    </h2>*/}
                    <ContactForm {...availability} publicEmail={publicEmail} />
                    {publicEmail && (
                        <p className="text-center text-sm leading-loose text-muted-foreground">
                            Or reach me directly{' '}
                            <a
                                href={`mailto:${publicEmail}`}
                                className="break-all text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
                            >
                                {publicEmail}
                            </a>
                        </p>
                    )}
                </div>
            </Section>
            <Section tone="muted" bordered aria-labelledby="contact-call-title">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="max-w-2xl space-y-4">
                        <Typography
                            id="contact-call-title"
                            as="h2"
                            variant="h5"
                            className="font-medium"
                        >
                            Prefer a conversation?
                        </Typography>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Find a time that works for you, and let’s make a
                            start.
                        </p>
                    </div>
                    <Button asChild className="h-auto rounded-full px-7 py-5">
                        <Link href="/schedule">
                            Book a call <ArrowUpRight aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </Section>
        </>
    )
}
