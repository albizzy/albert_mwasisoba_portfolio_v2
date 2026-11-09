import type { ComponentPropsWithoutRef } from 'react'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from './tag.module.css'

type TagProps = ComponentPropsWithoutRef<'span'> & {
    as?: 'span' | 'li'
    /** `outline` for metadata, `solid` to fill the tag with its tone. */
    variant?: 'outline' | 'solid'
    tone?: EditorialTone
    /** Leads with a status dot in the tone colour (green by default). */
    dot?: boolean
}

/** Small uppercase label for metadata: stacks, roles, status. */
export function Tag({
    as: Component = 'span',
    variant = 'outline',
    tone,
    dot = false,
    className,
    children,
    ...props
}: TagProps) {
    return (
        <Component
            className={cn(styles.tag, className)}
            data-variant={variant}
            data-tone={tone}
            {...props}
        >
            {dot && <span className={styles.dot} aria-hidden="true" />}
            {children}
        </Component>
    )
}
