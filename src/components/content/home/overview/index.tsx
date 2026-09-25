'use client'

import { Goal } from 'lucide-react'
import { Section } from '@/components/content/sections'
import { RotatingSpecialties } from './rotating-specialties'
import styles from './overview.module.css'

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
                        <span className={styles.line}>I create</span>{' '}
                        <span className={styles.line}>
                            <RotatingSpecialties />
                        </span>{' '}
                        <span className={styles.line}>that people love,</span>{' '}
                        <span className={styles.outcome}>
                            helping businesses <strong>grow.</strong>
                        </span>
                    </p>

                    <div
                        className={`${styles.sticker} ${styles.strategy}`}
                        aria-hidden="true"
                    >
                        <Goal className={styles.target} />
                        <span className={styles.label}>Strategy first</span>
                    </div>
                    <div
                        className={`${styles.sticker} ${styles.meaning}`}
                        aria-hidden="true"
                    >
                        <Goal className={styles.target} />
                        <span className={styles.label}>
                            Design with meaning
                        </span>
                    </div>
                    <div
                        className={`${styles.sticker} ${styles.scale}`}
                        aria-hidden="true"
                    >
                        <span className={styles.label}>Built to scale</span>
                        <Goal className={styles.target} />
                    </div>
                </div>
            </div>
        </Section>
    )
}
