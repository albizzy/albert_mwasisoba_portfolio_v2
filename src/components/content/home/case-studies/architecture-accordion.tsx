'use client'

import { useId, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight, Plus } from 'lucide-react'
import styles from './case-studies.module.css'

gsap.registerPlugin(useGSAP)

interface ArchitectureNote {
    title: string
    summary: string
    description: string
    href: string
    link: string
}

export function ArchitectureAccordion({
    notes,
}: {
    notes: readonly ArchitectureNote[]
}) {
    const id = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const panelsRef = useRef<(HTMLDivElement | null)[]>([])
    const bodiesRef = useRef<(HTMLDivElement | null)[]>([])
    const togglesRef = useRef<(SVGSVGElement | null)[]>([])
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const activeRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const { contextSafe } = useGSAP({ scope: rootRef })

    const selectNote = (nextIndex: number) => {
        const previousIndex = activeRef.current
        if (nextIndex === previousIndex) return

        const previousPanel = panelsRef.current[previousIndex]
        const nextPanel = panelsRef.current[nextIndex]
        const nextBody = bodiesRef.current[nextIndex]
        const previousToggle = togglesRef.current[previousIndex]
        const nextToggle = togglesRef.current[nextIndex]
        if (
            !previousPanel ||
            !nextPanel ||
            !nextBody ||
            !previousToggle ||
            !nextToggle
        ) {
            return
        }

        timelineRef.current?.kill()
        gsap.killTweensOf(
            [
                ...panelsRef.current,
                ...bodiesRef.current,
                ...togglesRef.current,
            ].filter(
                (element): element is HTMLDivElement | SVGSVGElement =>
                    element !== null
            )
        )

        panelsRef.current.forEach((panel, index) => {
            if (panel && index !== previousIndex && index !== nextIndex) {
                gsap.set(panel, { height: 0 })
                if (togglesRef.current[index]) {
                    gsap.set(togglesRef.current[index], { rotation: 0 })
                }
            }
        })

        const previousHeight = previousPanel.getBoundingClientRect().height
        const nextHeight = nextPanel.getBoundingClientRect().height
        activeRef.current = nextIndex
        setActiveIndex(nextIndex)

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(previousPanel, { height: 0 })
            gsap.set(nextPanel, { height: 'auto' })
            gsap.set(previousToggle, { rotation: 0 })
            gsap.set(nextToggle, { rotation: 45 })
            gsap.set(nextBody, { clearProps: 'opacity,visibility,transform' })
            return
        }

        gsap.set(previousPanel, { height: previousHeight })
        gsap.set(nextPanel, { height: nextHeight })
        gsap.set(previousToggle, { rotation: 45 })
        gsap.set(nextToggle, { rotation: 0 })
        gsap.set(nextBody, { autoAlpha: 0, y: 8 })

        timelineRef.current = gsap
            .timeline()
            .to(
                previousPanel,
                { height: 0, duration: 0.3, ease: 'power2.inOut' },
                0
            )
            .to(
                nextPanel,
                { height: 'auto', duration: 0.36, ease: 'power2.inOut' },
                0
            )
            .to(previousToggle, { rotation: 0, duration: 0.25 }, 0)
            .to(nextToggle, { rotation: 45, duration: 0.25 }, 0)
            .to(nextBody, { autoAlpha: 1, y: 0, duration: 0.26 }, 0.08)
    }

    return (
        <div ref={rootRef}>
            {notes.map((note, index) => {
                const isActive = activeIndex === index
                const triggerId = `${id}-trigger-${index}`
                const panelId = `${id}-panel-${index}`

                return (
                    <div
                        key={note.title}
                        className={styles.note}
                        data-active={isActive}
                    >
                        <h3 className={styles.noteHeadingContainer}>
                            <button
                                id={triggerId}
                                type="button"
                                className={styles.noteTrigger}
                                aria-expanded={isActive}
                                aria-controls={panelId}
                                onClick={() =>
                                    contextSafe(() => selectNote(index))()
                                }
                            >
                                <span
                                    className={styles.number}
                                    aria-hidden="true"
                                >
                                    0{index + 1}
                                </span>
                                <span className={styles.noteHeading}>
                                    <span className={styles.noteTitle}>
                                        {note.title}
                                    </span>
                                    <span className={styles.noteSummary}>
                                        {note.summary}
                                    </span>
                                </span>
                                <Plus
                                    ref={(element) => {
                                        togglesRef.current[index] = element
                                    }}
                                    className={styles.toggle}
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            ref={(element) => {
                                panelsRef.current[index] = element
                            }}
                            className={styles.notePanel}
                            role="region"
                            aria-labelledby={triggerId}
                            aria-hidden={!isActive}
                            inert={!isActive}
                            style={{ height: index === 0 ? 'auto' : 0 }}
                        >
                            <div
                                ref={(element) => {
                                    bodiesRef.current[index] = element
                                }}
                                className={styles.noteBody}
                            >
                                <p>{note.description}</p>
                                <a
                                    href={note.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {note.link}{' '}
                                    <ArrowUpRight
                                        size={14}
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                        {' '}
                                        (opens in a new tab)
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
