import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './page-shell.module.css'

interface PageShellProps {
    /** Use `main` for routes rendered outside the main layout. */
    as?: 'div' | 'main'
    /** `narrow` for single-column reading pages. */
    width?: 'wide' | 'narrow'
    /** Fill the viewport, for standalone pages without header and footer. */
    fullHeight?: boolean
    className?: string
    children: ReactNode
}

/** Outer frame of every interior page: one gutter, one top offset. */
export function PageShell({
    as: Component = 'div',
    width = 'wide',
    fullHeight = false,
    className,
    children,
}: PageShellProps) {
    return (
        <Component
            className={cn(styles.shell, className)}
            data-full-height={fullHeight || undefined}
        >
            <div className={styles.inner} data-width={width}>
                {children}
            </div>
        </Component>
    )
}
