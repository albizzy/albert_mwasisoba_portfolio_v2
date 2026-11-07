import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from '@/styles/correspondence.module.css'

// Page shells. Add a variant here for a new kind of correspondence page.
const pageVariants = {
    public: { as: 'div', page: undefined, inner: undefined },
    private: { as: 'main', page: styles.privatePage, inner: styles.replyShell },
} as const

export type CorrespondencePageVariant = keyof typeof pageVariants

interface CorrespondencePageProps {
    variant?: CorrespondencePageVariant
    children: ReactNode
}

export function CorrespondencePage({
    variant = 'public',
    children,
}: CorrespondencePageProps) {
    const { as: Component, page, inner } = pageVariants[variant]

    return (
        <Component className={cn(styles.page, page)}>
            <div className={cn(styles.inner, inner)}>{children}</div>
        </Component>
    )
}
