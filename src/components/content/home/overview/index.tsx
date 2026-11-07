'use client'

import { Goal } from 'lucide-react'
import { Section } from '@/components/content/sections'
import { RotatingSpecialties } from './rotating-specialties'
import styles from './overview.module.css'

// Decorative stickers around the statement. Add one with a placement class
// in overview.module.css and an entry here.
const stickers = [
    { label: 'Clean architecture', placement: styles.strategy, icon: 'start' },
    { label: 'Design-system driven', placement: styles.meaning, icon: 'start' },
    { label: 'Built for speed', placement: styles.scale, icon: 'end' },
] as const

export function Overview() {
    return (
        <Section
            id="overview"
            aria-labelledby="overview-title"
            className={`${styles.section}`}
            containerClassName={styles.content}
        >
            <h2 className="sr-only" id="overview-title">
                About my work
            </h2>
            <div className={styles.statement}>
                <div className={styles.composition}>
                    <p className={styles.copy}>
                        <span className={styles.line}>I engineer</span>{' '}
                        <span className={styles.line}>
                            <RotatingSpecialties />
                        </span>{' '}
                        <span className={styles.line}>with clean code,</span>{' '}
                        <span className={styles.outcome}>
                            optimized for <strong>scale</strong>
                        </span>
                    </p>

                    {stickers.map(({ label, placement, icon }) => (
                        <div
                            key={label}
                            className={`${styles.sticker} ${placement}`}
                            aria-hidden="true"
                        >
                            {icon === 'start' && (
                                <Goal className={styles.target} />
                            )}
                            <span className={styles.label}>{label}</span>
                            {icon === 'end' && (
                                <Goal className={styles.target} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
