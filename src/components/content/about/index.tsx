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
                                I&apos;m Albert, a frontend engineer with an eye
                                for design. I connect technology, design, and
                                strategy to turn complicated ideas into digital
                                products that feel clear.
                            </p>
                            <div className={styles.prose}>
                                <Typography as={'p'} variant={'body'}>
                                    I work where the interface meets the system
                                    behind it: accessible React components,
                                    thoughtful design systems, and the workflows
                                    that hold a product together. From
                                    onboarding journeys to data-heavy
                                    dashboards, I care about the details that
                                    make an experience easier to use.
                                </Typography>
                                <Typography as={'p'} variant={'body'}>
                                    Good digital work rarely belongs to one
                                    discipline. I move between architecture,
                                    interface thinking, and visual craft so that
                                    the experience and the code support the same
                                    goal: something practical to build, coherent
                                    to maintain, and ready to grow.
                                </Typography>
                            </div>
                            <div
                                className={`${styles.note} ${styles.currentNote}`}
                            >
                                <Typography as={'p'} variant={'body'}>
                                    My work spans consumer products, insurance,
                                    e-commerce, and agency platforms. The common
                                    thread? Making complex workflows feel
                                    simple, with reusable components and clean
                                    architecture underneath.
                                </Typography>
                            </div>
                            <div
                                className={`${styles.note} ${styles.personalNote}`}
                            >
                                <Typography as={'p'} variant={'body'}>
                                    I also enjoy sharing useful ideas and
                                    reusable building blocks through open
                                    source, and learning by building with
                                    others. There&apos;s always a better
                                    question to ask or a small detail to get
                                    right.
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
                                    <p className={styles.annotation}>
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
                            <span>Story</span>
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
