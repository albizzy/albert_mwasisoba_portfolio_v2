import type { ReactNode } from 'react'
import { Typography } from '@/components/ui/typography'
import { caveat } from '@/lib/fonts'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from '@/styles/correspondence.module.css'

/** Tones styled by correspondence.module.css. */
export type CorrespondenceTone = Extract<
    EditorialTone,
    'yellow' | 'pink' | 'blue'
>

interface CorrespondenceHeroProps {
    eyebrow: string
    /** Words before the highlighted phrase, e.g. "Say". */
    title: string
    highlight: ReactNode
    lead: ReactNode
    note: { label: string; text: string }
    tone?: CorrespondenceTone
    titleId?: string
    /** Accessible name for the heading when the highlight animates. */
    titleLabel?: string
}

export function CorrespondenceHero({
    eyebrow,
    title,
    highlight,
    lead,
    note,
    tone = 'yellow',
    titleId,
    titleLabel,
}: CorrespondenceHeroProps) {
    return (
        <header className={styles.hero}>
            <div>
                <p className={cn(styles.eyebrow, caveat.className)}>
                    {eyebrow}
                </p>
                <Typography
                    as="h1"
                    variant="h4"
                    id={titleId}
                    className={styles.heroTitle}
                    aria-label={titleLabel}
                >
                    {title}{' '}
                    <span className={styles.highlight} data-tone={tone}>
                        {highlight}
                    </span>
                </Typography>
                <p className={styles.lead}>{lead}</p>
            </div>
            <div
                className={styles.heroNote}
                data-tone={tone}
                aria-hidden="true"
            >
                <span className={caveat.className}>{note.label}</span>
                <strong>{note.text}</strong>
            </div>
        </header>
    )
}
