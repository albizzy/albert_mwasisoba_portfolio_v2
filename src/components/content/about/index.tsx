'use client'

import { PageShell } from '@/components/layout'
import { PageHeader } from '@/components/content/sections'
import { Chip } from '@/components/ui/chip'
import { Panel } from '@/components/ui/panel'
import { useSectionNavigation } from '@/hooks'
import { aboutSectionIds, aboutSections } from './about-sections'
import styles from './about.module.css'

export function AboutContent() {
    const { containerRef, activeSection, scrollToSection } =
        useSectionNavigation(aboutSectionIds)

    return (
        <PageShell>
            <PageHeader eyebrow="Meet Albert" title="Frontend engineer" />

            <div ref={containerRef} className={styles.layout}>
                <nav className={styles.navigation} aria-label="About sections">
                    {aboutSections.map(({ id, label }) => (
                        <Chip
                            key={id}
                            active={activeSection === id}
                            aria-controls={id}
                            aria-current={
                                activeSection === id ? 'location' : undefined
                            }
                            onClick={() => scrollToSection(id)}
                        >
                            {label}
                        </Chip>
                    ))}
                </nav>

                <div className={styles.content}>
                    {aboutSections.map(({ id, label, Content }) => (
                        <Panel
                            key={id}
                            id={id}
                            aria-labelledby={`${id}-title`}
                            className={styles.section}
                            tab={
                                <h2 id={`${id}-title`} tabIndex={-1}>
                                    {label}
                                </h2>
                            }
                        >
                            <Content />
                        </Panel>
                    ))}
                </div>
            </div>
        </PageShell>
    )
}
