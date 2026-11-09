import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './panel.module.css'

type PanelProps = Omit<ComponentPropsWithoutRef<'section'>, 'title'> & {
    as?: 'section' | 'div' | 'article'
    /** Folder tab above the sheet. Pass a heading element to make it one. */
    tab?: ReactNode
    title?: ReactNode
    titleId?: string
    hint?: ReactNode
    bodyClassName?: string
}

/**
 * The site's primary container: a bordered sheet, optionally filed under a
 * folder tab, as on the home page's case study.
 */
export function Panel({
    as: Component = 'section',
    tab,
    title,
    titleId,
    hint,
    className,
    bodyClassName,
    children,
    ...props
}: PanelProps) {
    const labelledBy =
        props['aria-label'] || props['aria-labelledby']
            ? props['aria-labelledby']
            : title
              ? titleId
              : undefined

    return (
        <Component
            className={cn(styles.panel, className)}
            {...props}
            aria-labelledby={labelledBy}
        >
            {tab && <div className={styles.tab}>{tab}</div>}
            <div className={cn(styles.sheet, bodyClassName)}>
                {title && (
                    <div className={styles.header}>
                        <h2 id={titleId} className={styles.title}>
                            {title}
                        </h2>
                        {hint && <p className={styles.hint}>{hint}</p>}
                    </div>
                )}
                {children}
            </div>
        </Component>
    )
}
