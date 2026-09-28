'use client'

import Image from 'next/image'
import { Caveat } from 'next/font/google'
import Portrait from '@/assets/images/bizzy_scribble.png'
import { workingPrinciples, works } from '@/config'
import { Section } from '@/components/content/sections'
import { aboutSections, useAboutNavigation } from './hooks/useAboutNavigation'
import styles from './about.module.css'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

const annotations = [
    'context before code.',
    'make it feel obvious.',
    'better together.',
]

export function AboutContent() {
    const { pageRef, activeSection, scrollToSection } = useAboutNavigation()

    return (
        <div ref={pageRef} className={cn(styles.page)}>
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
                <Section
                    id="about-main-bio"
                    aria-labelledby="about-bio-title"
                    tone="transparent"
                    withDefaultContainer={false}
                    className={styles.section}
                    data-tone="yellow"
                >
                    <h2
                        id="about-bio-title"
                        tabIndex={-1}
                        className={styles.sectionLabel}
                    >
                        Main bio
                    </h2>
                    <div className={`${styles.panel} ${styles.bioPanel}`}>
                        <div className={styles.bioCopy}>
                            <p
                                className={cn(
                                    styles.introduction,
                                    caveat.className
                                )}
                            >
                                Frontend engineer bridging scalable architecture
                                and design precision.
                            </p>
                            <div className={styles.prose}>
                                <Typography as={'p'} variant={'body'}>
                                    I specialize in building performant,
                                    accessible web applications using{' '}
                                    <strong>TypeScript, React, Next.js</strong>,
                                    and modern CSS systems. My focus sits at the
                                    seam between engineering and product:
                                    architecting modular design systems,
                                    managing complex client state, and ensuring
                                    smooth, sub-second user flows.
                                </Typography>
                                <Typography as={'p'} variant={'body'}>
                                    Whether engineering data-dense SaaS
                                    dashboards or consumer-facing storefronts, I
                                    write strict, predictable code built for
                                    long-term maintainability, zero layout
                                    shifts, and full WCAG AA accessibility.
                                </Typography>
                            </div>
                            <div
                                className={`${styles.note} ${styles.currentNote}`}
                            >
                                <Typography as={'p'} variant={'body'}>
                                    <strong>Remote Collaboration:</strong>{' '}
                                    Experienced in asynchronous,
                                    cross-functional agile teams. Disciplined
                                    with written documentation, proactive
                                    communication, and flexible overlap across
                                    distributed time zones.
                                </Typography>
                            </div>
                        </div>
                        <aside
                            className={styles.portrait}
                            aria-label="Meet Albert"
                        >
                            <figure className={styles.photo}>
                                <Image
                                    src={Portrait}
                                    alt="Illustrated portrait of Albert Mwasisoba"
                                    className={styles.portraitImage}
                                    sizes="160px"
                                    priority
                                />
                                <figcaption className={cn(caveat.className)}>
                                    Yup, that&apos;s me!
                                </figcaption>
                            </figure>
                            <div className={styles.nameSticker}>
                                <Image
                                    src="/images/about/cursor.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                                <span>Albert</span>
                            </div>
                        </aside>
                    </div>
                </Section>

                <Section
                    id="about-story"
                    aria-labelledby="about-story-title"
                    tone="transparent"
                    withDefaultContainer={false}
                    className={styles.section}
                    data-tone="pink"
                >
                    <h2
                        id="about-story-title"
                        tabIndex={-1}
                        className={styles.sectionLabel}
                    >
                        Approach
                    </h2>
                    <div className={`${styles.panel} ${styles.storyPanel}`}>
                        <ol className={styles.principles}>
                            {workingPrinciples.map((principle, index) => (
                                <li
                                    key={principle.number}
                                    className={styles.principleRow}
                                >
                                    <article
                                        className={`${styles.note} ${styles.principleNote}`}
                                    >
                                        <h3>{principle.title}</h3>
                                        <p>{principle.description}</p>
                                    </article>
                                    <p
                                        className={cn(
                                            styles.annotation,
                                            caveat.className
                                        )}
                                    >
                                        <Image
                                            src="/images/about/annotation-arrow.svg"
                                            alt=""
                                            width={48}
                                            height={24}
                                        />
                                        <span>{annotations[index]}</span>
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <div
                            className={`${styles.nameSticker} ${styles.storySticker}`}
                            aria-hidden="true"
                        >
                            <Image
                                src="/images/about/cursor.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                            <span>Principles</span>
                        </div>
                    </div>
                </Section>

                <Section
                    id="about-work"
                    aria-labelledby="about-work-title"
                    tone="transparent"
                    withDefaultContainer={false}
                    className={styles.section}
                    data-tone="blue"
                >
                    <h2
                        id="about-work-title"
                        tabIndex={-1}
                        className={styles.sectionLabel}
                    >
                        Work
                    </h2>
                    <div className={styles.panel}>
                        <ul className={styles.workList}>
                            {works.map((work) => (
                                <li key={work.title}>
                                    <a
                                        className={styles.workLink}
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className={styles.workName}>
                                            {work.title}
                                        </span>
                                        <span className={styles.workRole}>
                                            {work.types[0]}
                                        </span>
                                        <span className={styles.workTag}>
                                            {work.types[1]}{' '}
                                            <span aria-hidden="true">↗</span>
                                        </span>
                                        <span className="sr-only">
                                            {' '}
                                            (opens in a new tab)
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Section>
            </div>
        </div>
    )
}
