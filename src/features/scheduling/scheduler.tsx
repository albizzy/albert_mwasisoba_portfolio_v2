'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MeetingType } from './types'

const CalBooking = dynamic(
    () => import('./cal-booking').then((module) => module.CalBooking),
    {
        ssr: false,
        loading: () => (
            <div
                role="status"
                className="flex min-h-96 items-center justify-center rounded-3xl border border-border text-sm text-muted-foreground"
            >
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
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10">
            <ol
                aria-label="Booking process"
                className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wider sm:text-xs"
            >
                <li
                    aria-current={!selected ? 'step' : undefined}
                    className={
                        !selected ? 'text-foreground' : 'text-muted-foreground'
                    }
                >
                    01 / Conversation
                </li>
                <li
                    aria-current={selected ? 'step' : undefined}
                    className={
                        selected ? 'text-foreground' : 'text-muted-foreground'
                    }
                >
                    02 / Date, time & details
                </li>
            </ol>
            {!selected ? (
                <>
                    <h2 className="text-center text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
                        What are we meeting about?
                    </h2>
                    <div
                        ref={choices}
                        className="grid w-full gap-4 md:grid-cols-2"
                    >
                        {meetings.map((meeting) => (
                            <button
                                key={meeting.id}
                                disabled={!meeting.calLink}
                                onClick={() => setSelected(meeting)}
                                className="group flex min-h-56 flex-col gap-6 rounded-4xl border border-border bg-background p-7 text-left transition-colors hover:border-foreground hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-50 md:p-9"
                            >
                                <span className="flex w-full flex-wrap items-center justify-between gap-4">
                                    <span className="text-xl font-medium tracking-tight">
                                        {meeting.title}
                                    </span>
                                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                                        <Clock3
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                        {meeting.duration}
                                    </span>
                                </span>
                                <span className="text-sm leading-relaxed text-muted-foreground">
                                    {meeting.description}
                                </span>
                                <span className="mt-auto flex items-center gap-2 text-xs">
                                    {meeting.calLink ? (
                                        <>
                                            Choose a time{' '}
                                            <ArrowUpRight
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </>
                                    ) : (
                                        'Booking opens soon'
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                    <p className="max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
                        {meetings.some((meeting) => meeting.calLink) ? (
                            'Choose a conversation to load the calendar. Available times are shown in your timezone, with confirmation and calendar invitations handled by Cal.com.'
                        ) : (
                            <>
                                Online booking is being prepared.{' '}
                                <Link
                                    href="/contact"
                                    className="underline underline-offset-4"
                                >
                                    Send me a message
                                </Link>{' '}
                                to arrange a conversation.
                            </>
                        )}
                    </p>
                </>
            ) : (
                <>
                    <div className="flex w-full flex-wrap items-center justify-between gap-4">
                        <h2
                            ref={heading}
                            tabIndex={-1}
                            className="text-xl font-medium tracking-tight outline-none"
                        >
                            {selected.title}{' '}
                            <span className="font-mono text-sm text-muted-foreground">
                                / {selected.duration}
                            </span>
                        </h2>
                        <Button
                            variant="ghost"
                            onClick={() => setSelected(null)}
                            className="rounded-full"
                        >
                            <ArrowLeft aria-hidden="true" />
                            Change conversation
                        </Button>
                    </div>
                    <p className="-mt-4 w-full text-sm leading-relaxed text-muted-foreground">
                        Choose a date and time, then add your details in the
                        calendar below. Your booking is complete when Cal.com
                        shows its confirmation.
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
                        className="flex items-center gap-2 text-center text-xs text-muted-foreground underline underline-offset-4"
                    >
                        Open calendar in a new tab{' '}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                </>
            )}
        </div>
    )
}
