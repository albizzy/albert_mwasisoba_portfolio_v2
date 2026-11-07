import type { ReactNode } from 'react'
import styles from '@/styles/correspondence.module.css'
import type { CorrespondenceTone } from './correspondence-hero'

interface CorrespondencePanelProps {
    tab: string
    tone?: CorrespondenceTone
    title?: string
    titleId?: string
    hint?: string
    /** Accessible name for panels without a visible title. */
    label?: string
    children: ReactNode
}

export function CorrespondencePanel({
    tab,
    tone = 'yellow',
    title,
    titleId,
    hint,
    label,
    children,
}: CorrespondencePanelProps) {
    return (
        <section
            className={styles.panelShell}
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : label}
        >
            <span className={styles.panelTab}>{tab}</span>
            <div className={styles.panel} data-tone={tone}>
                {title && (
                    <div className={styles.panelHeader}>
                        <h2 id={titleId} className={styles.panelTitle}>
                            {title}
                        </h2>
                        {hint && <p className={styles.panelHint}>{hint}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    )
}
