'use client'

import { Section, SectionHeading } from '@/components/content/sections'
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
            <SectionHeading
                className={styles.heading}
                eyebrow="Selected projects"
                title="Featured work"
                titleId="featured-work-title"
                size="page"
                focusable
            />
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
