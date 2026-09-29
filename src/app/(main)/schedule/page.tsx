import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import { getMeetingTypes } from '@/features/scheduling/config'
import { Scheduler } from '@/features/scheduling/scheduler'
import styles from '@/styles/correspondence.module.css'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Schedule — Albert Mwasisoba',
    description:
        'Book an intro chat, role screen, or project discussion with Albert Mwasisoba.',
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
                                talk.
                            </span>
                        </Typography>
                        <p className={styles.lead}>
                            Grab a slot for an intro chat, role screen, or
                            project scope.
                        </p>
                    </div>
                    <div
                        className={styles.heroNote}
                        data-tone="pink"
                        aria-hidden="true"
                    >
                        <span className={cn(caveat.className)}>Quick sync</span>
                        <strong>15–30 mins. Google Meet or voice.</strong>
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
                                Pick a call type to view open calendar slots.
                            </p>
                        </div>
                        <Scheduler meetings={getMeetingTypes()} />
                    </div>
                </section>
            </div>
        </div>
    )
}
