import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import { getMeetingTypes } from '@/features/scheduling/config'
import { Scheduler } from '@/features/scheduling/scheduler'
import styles from '@/styles/correspondence.module.css'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Schedule a Call — Albert Mwasisoba',
    description:
        'Book an introductory chat, role screening, or technical discussion with Albert Mwasisoba.',
}

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

export default function SchedulePage() {
    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.hero}>
                    <div>
                        <Typography
                            as={'h1'}
                            variant={'h4'}
                            id="schedule-title"
                        >
                            Let’s{' '}
                            <span
                                className={`${styles.highlight} ${styles.highlightPink}`}
                            >
                                connect.
                            </span>
                        </Typography>
                        <p className={styles.lead}>
                            Whether you’re scheduling an introductory recruiter
                            screen, discussing a frontend role, or scoping a
                            technical project—pick a slot that works for you.
                        </p>
                    </div>
                    <div
                        className={styles.heroNote}
                        data-tone="pink"
                        aria-hidden="true"
                    >
                        <span className={cn(caveat.className)}>
                            Direct & focused
                        </span>
                        <strong>
                            A quick chat to discuss fit, scope, and technical
                            alignment.
                        </strong>
                    </div>
                </header>

                <section
                    className={styles.panelShell}
                    aria-labelledby="meeting-options-title"
                >
                    <span className={styles.panelTab}>Availability</span>
                    <div className={`${styles.panel} ${styles.panelPink}`}>
                        <div className={styles.panelHeader}>
                            <h2
                                id="meeting-options-title"
                                className={styles.panelTitle}
                            >
                                Select a format.
                            </h2>
                            <p className={styles.panelHint}>
                                Choose a call type below to view live calendar
                                availability and book directly.
                            </p>
                        </div>
                        <Scheduler meetings={getMeetingTypes()} />
                    </div>
                </section>
            </div>
        </div>
    )
}
