import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './frame.module.css'

interface FrameProps {
    className?: string
    children: ReactNode
}

/** A bordered picture frame taped at the top corners, as on project previews. */
export function Frame({ className, children }: FrameProps) {
    return (
        <div className={cn(styles.frame, className)}>
            <div className={styles.inner}>{children}</div>
        </div>
    )
}
