import type { ReactNode } from 'react'
import { toSequenceLabel } from '@/helpers'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from './numbered-list.module.css'

export interface NumberedListItem {
    id: string
    title: ReactNode
    description?: ReactNode
    /** Muted footnote under the description. */
    meta?: ReactNode
    /** Right-hand slot: an icon or a tag. */
    aside?: ReactNode
    /** Makes the whole row an external link. */
    href?: string
    cursorLabel?: string
    cursorTone?: EditorialTone
}

interface NumberedListProps {
    items: ReadonlyArray<NumberedListItem>
    className?: string
    itemClassName?: string
}

/** Hairline-divided rows led by 01, 02, 03 — steps, principles, projects. */
export function NumberedList({
    items,
    className,
    itemClassName,
}: NumberedListProps) {
    return (
        <ol className={cn(styles.list, className)}>
            {items.map((item, index) => (
                <li
                    key={item.id}
                    className={cn(styles.item, itemClassName)}
                    data-linked={item.href ? '' : undefined}
                >
                    <span className={styles.number} aria-hidden="true">
                        {toSequenceLabel(index)}
                    </span>
                    <div className={styles.body}>
                        <h3 className={styles.title}>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                    data-cursor-label={item.cursorLabel}
                                    data-cursor-tone={item.cursorTone}
                                >
                                    {item.title}
                                    <span className="sr-only">
                                        {' '}
                                        (opens in a new tab)
                                    </span>
                                </a>
                            ) : (
                                item.title
                            )}
                        </h3>
                        {item.description && (
                            <p className={styles.description}>
                                {item.description}
                            </p>
                        )}
                        {item.meta && (
                            <p className={styles.meta}>{item.meta}</p>
                        )}
                    </div>
                    {item.aside && (
                        <div className={styles.aside}>{item.aside}</div>
                    )}
                </li>
            ))}
        </ol>
    )
}
