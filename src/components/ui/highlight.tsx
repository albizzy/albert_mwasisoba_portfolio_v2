import type { ReactNode } from 'react'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from './highlight.module.css'

interface HighlightProps {
    tone?: EditorialTone
    className?: string
    children: ReactNode
}

/** A pill behind a word in a headline, the shape used by the home hero. */
export function Highlight({
    tone = 'ink',
    className,
    children,
}: HighlightProps) {
    return (
        <span className={cn(styles.highlight, className)} data-tone={tone}>
            {children}
        </span>
    )
}
