'use client'

import { Section } from '@/components/content/sections'
import { works } from '@/config'
import { useWorkOverviewAnimation } from './hooks'
import { FolderWorkCard } from './folder-work-card'
import styles from './work-overview.module.css'

export function WorkOverview() {
    const sectionRef = useWorkOverviewAnimation()

    return (
        <Section
            ref={sectionRef}
            id="featured-work"
            aria-labelledby="featured-work-title"
            withDefaultContainer={false}
            className={`${styles.section} overflow-visible`}
        >
            <div className={styles.heading}>
                <p className={styles.eyebrow}>Selected projects</p>
                <h2 id="featured-work-title">Featured work</h2>
            </div>
            <div className={styles.stack} data-work-stack>
                {works.map((work, index) => (
                    <FolderWorkCard
                        key={work.title}
                        work={work}
                        index={index}
                    />
                ))}
            </div>
        </Section>
    )
}
