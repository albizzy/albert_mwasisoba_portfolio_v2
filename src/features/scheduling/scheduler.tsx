'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChipLabel } from '@/components/ui/chip'
import { TextLink } from '@/components/ui/text-link'
import { routes } from '@/config/routes'
import { cycle, toSequenceLabel } from '@/helpers'
import type { EditorialTone } from '@/lib/tones'
import styles from '@/styles/correspondence.module.css'
import type { MeetingType } from './types'

// Meeting cards cycle through these tones.
const MEETING_TONES = [
    'yellow',
    'pink',
] as const satisfies ReadonlyArray<EditorialTone>

const BOOKING_STEPS = ['Conversation', 'Date, time & details'] as const

const CalBooking = dynamic(
    () => import('./cal-booking').then((module) => module.CalBooking),
    {
        ssr: false,
        loading: () => (
            <div role="status" className={styles.calendarLoading}>
                Loading live availability…
            </div>
        ),
    }
)

export function Scheduler({ meetings }: { meetings: MeetingType[] }) {
    const [selected, setSelected] = useState<MeetingType | null>(null)
    const heading = useRef<HTMLHeadingElement>(null)
    const previousSelection = useRef(false)
    const choices = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selected) heading.current?.focus()
        else if (previousSelection.current)
            choices.current
                ?.querySelector<HTMLButtonElement>('button:not(:disabled)')
                ?.focus()
        previousSelection.current = Boolean(selected)
    }, [selected])

    return (
        <div>
            <ol aria-label="Booking process" className={styles.steps}>
                {BOOKING_STEPS.map((step, index) => {
                    const current = index === (selected ? 1 : 0)
                    return (
                        <li
                            key={step}
                            aria-current={current ? 'step' : undefined}
                        >
                            <ChipLabel active={current}>
                                {toSequenceLabel(index)} / {step}
                            </ChipLabel>
                        </li>
                    )
                })}
            </ol>

            {!selected ? (
                <>
                    <div ref={choices} className={styles.meetingGrid}>
                        {meetings.map((meeting, index) => (
                            <button
                                key={meeting.id}
                                type="button"
                                disabled={!meeting.calLink}
                                onClick={() => setSelected(meeting)}
                                className={styles.meetingCard}
                                data-tone={cycle(MEETING_TONES, index)}
                            >
                                <span className={styles.meetingTop}>
                                    <span className={styles.meetingIndex}>
                                        Conversation / {toSequenceLabel(index)}
                                    </span>
                                    <ArrowUpRight
                                        className={styles.meetingArrow}
                                        aria-hidden="true"
                                    />
                                </span>
                                <span>
                                    <span className={styles.meetingTitle}>
                                        {meeting.title}
                                    </span>
                                    <span className={styles.meetingDescription}>
                                        {meeting.description}
                                    </span>
                                </span>
                                <span className={styles.meetingBottom}>
                                    <span className={styles.duration}>
                                        <Clock3 size={16} aria-hidden="true" />
                                        {meeting.duration}
                                    </span>
                                    <span className={styles.meetingIndex}>
                                        {meeting.calLink
                                            ? 'Choose this call'
                                            : 'Unavailable'}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                    <p className={styles.scheduleFootnote}>
                        {meetings.some((meeting) => meeting.calLink) ? (
                            'Available times are shown in your timezone. Cal.com handles the confirmation and calendar invitation.'
                        ) : (
                            <>
                                Online booking is being prepared.{' '}
                                <TextLink href={routes.contact} tone="blue">
                                    Send me a message
                                </TextLink>{' '}
                                to arrange a conversation.
                            </>
                        )}
                    </p>
                </>
            ) : (
                <>
                    <div className={styles.calendarHeader}>
                        <h2
                            ref={heading}
                            tabIndex={-1}
                            className={styles.calendarTitle}
                        >
                            {selected.title}{' '}
                            <span className={styles.calendarDuration}>
                                / {selected.duration}
                            </span>
                        </h2>
                        <Button
                            variant="editorialOutline"
                            size="pill-sm"
                            onClick={() => setSelected(null)}
                        >
                            <ArrowLeft aria-hidden="true" />
                            Change conversation
                        </Button>
                    </div>
                    <p className={styles.calendarHint}>
                        Choose a date and time, then add your details below.
                        Your booking is complete when Cal.com shows its
                        confirmation.
                    </p>
                    <CalBooking
                        key={selected.id}
                        namespace={`portfolio-${selected.id}`}
                        calLink={selected.calLink!}
                    />
                    <TextLink
                        href={`https://cal.com/${selected.calLink}`}
                        variant="action"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.externalLink}
                    >
                        Open calendar in a new tab
                        <ArrowUpRight aria-hidden="true" />
                    </TextLink>
                </>
            )}
        </div>
    )
}
