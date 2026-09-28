'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import styles from '@/styles/correspondence.module.css'
import type { MeetingType } from './types'

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
                <li
                    aria-current={!selected ? 'step' : undefined}
                    className={cn(styles.step, !selected && styles.stepActive)}
                >
                    01 / Conversation
                </li>
                <li
                    aria-current={selected ? 'step' : undefined}
                    className={cn(styles.step, selected && styles.stepActive)}
                >
                    02 / Date, time &amp; details
                </li>
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
                                data-tone={index % 2 === 1 ? 'pink' : 'yellow'}
                            >
                                <span className={styles.meetingTop}>
                                    <span className={styles.meetingIndex}>
                                        Conversation /{' '}
                                        {String(index + 1).padStart(2, '0')}
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
                                <Link href="/contact">Send me a message</Link>{' '}
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
                            variant="outline"
                            onClick={() => setSelected(null)}
                            className={styles.secondaryButton}
                        >
                            <ArrowLeft aria-hidden="true" />
                            Change conversation
                        </Button>
                    </div>
                    <p className={styles.panelHint}>
                        Choose a date and time, then add your details below.
                        Your booking is complete when Cal.com shows its
                        confirmation.
                    </p>
                    <CalBooking
                        key={selected.id}
                        namespace={`portfolio-${selected.id}`}
                        calLink={selected.calLink!}
                    />
                    <a
                        href={`https://cal.com/${selected.calLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.externalLink}
                    >
                        Open calendar in a new tab
                        <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                </>
            )}
        </div>
    )
}
