'use client'

import { Section } from '@/components/content/sections'
import { works } from '@/config'
import { useWorkOverviewAnimation } from './hooks'
import { FolderWorkCard } from './folder-work-card'
import styles from './work-overview.module.css'

import { Caveat } from 'next/font/google'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

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
                <Typography
                    as={'p'}
                    variant={'h5'}
                    className={cn(styles.eyebrow, caveat.className)}
                >
                    Selected projects
                </Typography>
                <h2 id="featured-work-title" tabIndex={-1}>
                    Featured work
                </h2>
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
