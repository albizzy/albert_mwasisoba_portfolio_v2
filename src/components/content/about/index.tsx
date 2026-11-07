'use client'

import Image from 'next/image'
import { Section } from '@/components/content/sections'
import { useSectionNavigation } from '@/hooks'
import { aboutSectionIds, aboutSections } from './about-sections'
import styles from './about.module.css'
import { cn } from '@/lib/utils'

export function AboutContent() {
    const { containerRef, activeSection, scrollToSection } =
        useSectionNavigation(aboutSectionIds)

    return (
        <div ref={containerRef} className={cn(styles.page)}>
            <nav className={styles.navigation} aria-label="About sections">
                {aboutSections.map(({ id, label, icon, tone }) => (
                    <button
                        key={id}
                        type="button"
                        className={styles.tab}
                        data-tone={tone}
                        aria-controls={id}
                        aria-current={
                            activeSection === id ? 'location' : undefined
                        }
                        onClick={() => scrollToSection(id)}
                    >
                        <Image
                            src={`/images/about/${icon}.svg`}
                            alt=""
                            width={14}
                            height={14}
                        />
                        {label}
                    </button>
                ))}
            </nav>

            <div className={styles.content}>
                {aboutSections.map(({ id, label, tone, Content }) => (
                    <Section
                        key={id}
                        id={id}
                        aria-labelledby={`${id}-title`}
                        tone="transparent"
                        withDefaultContainer={false}
                        className={styles.section}
                        data-tone={tone}
                    >
                        <h2
                            id={`${id}-title`}
                            tabIndex={-1}
                            className={styles.sectionLabel}
                        >
                            {label}
                        </h2>
                        <Content />
                    </Section>
                ))}
            </div>
        </div>
    )
}
