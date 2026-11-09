import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'
import styles from './section-heading.module.css'

export interface SectionHeadingProps {
    eyebrow?: ReactNode
    title: ReactNode
    lead?: ReactNode
    /** Status tags or other small details under the lead. */
    meta?: ReactNode
    as?: 'h1' | 'h2'
    /** `page` is the large title scale; `section` the in-page one. */
    size?: 'page' | 'section'
    align?: 'center' | 'start'
    titleId?: string
    /** Accessible name for titles whose visible text animates. */
    titleLabel?: string
    /** Lets scripts move focus to the title (e.g. after in-page navigation). */
    focusable?: boolean
    className?: string
}

/** Eyebrow, title and lead: the one heading pattern used across the site. */
export function SectionHeading({
    eyebrow,
    title,
    lead,
    meta,
    as: Title = 'h2',
    size = Title === 'h1' ? 'page' : 'section',
    align = 'center',
    titleId,
    titleLabel,
    focusable = false,
    className,
}: SectionHeadingProps) {
    return (
        <header className={cn(styles.heading, className)} data-align={align}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Title
                id={titleId}
                tabIndex={focusable ? -1 : undefined}
                aria-label={titleLabel}
                className={styles.title}
                data-size={size}
            >
                {title}
            </Title>
            {lead && <p className={styles.lead}>{lead}</p>}
            {meta && <div className={styles.meta}>{meta}</div>}
        </header>
    )
}

/** The h1 heading that opens every interior page. */
export function PageHeader({
    className,
    ...props
}: Omit<SectionHeadingProps, 'as' | 'size'>) {
    return (
        <SectionHeading
            as="h1"
            size="page"
            className={cn(styles.page, className)}
            {...props}
        />
    )
}
