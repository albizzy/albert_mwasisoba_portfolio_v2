'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Pause, Play } from 'lucide-react'
import { works } from '@/config/works'
import { AnimatedCharacters } from '../hero-section/animated-characters'
import styles from './overview.module.css'

gsap.registerPlugin(useGSAP)

const specialtyLabels: Record<string, string> = {
    'Frontend Engineering': 'web apps',
    'UI/UX': 'interfaces',
    'Design Systems': 'UI systems',
    'B2B SaaS': 'SaaS tools',
    'E-Commerce': 'stores',
}

const workServices = new Set(
    works.flatMap((work) => [...work.services, ...work.types])
)

const specialties = Object.entries(specialtyLabels)
    .filter(([service]) => workServices.has(service))
    .map(([, label]) => label)

const activeSpecialties =
    specialties.length >= 2
        ? specialties
        : [
              'web applications',
              'user interfaces',
              'design systems',
              'SaaS platforms',
          ]

const specialtyList = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
}).format(activeSpecialties)

export function RotatingSpecialties() {
    const containerRef = useRef<HTMLSpanElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const inViewRef = useRef(false)
    const pausedRef = useRef(false)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        pausedRef.current = paused
        timelineRef.current?.paused(
            paused || !inViewRef.current || document.hidden
        )
    }, [paused])

    useGSAP(
        () => {
            const container = containerRef.current
            if (!container || activeSpecialties.length < 2) return
            const media = gsap.matchMedia()

            media.add('(prefers-reduced-motion: no-preference)', () => {
                const wordStack =
                    container.querySelector<HTMLElement>('[data-word-stack]')
                const words = Array.from(
                    container.querySelectorAll<HTMLElement>('[data-specialty]')
                )
                if (!wordStack || !words.length) return

                let activeIndex = 0
                gsap.set(wordStack, { width: words[0].offsetWidth })

                const timeline = gsap.timeline({
                    repeat: -1,
                    repeatRefresh: true,
                    paused: true,
                })
                timelineRef.current = timeline

                words.forEach((word, index) => {
                    const characters = word.querySelectorAll(
                        'span[aria-hidden="true"]'
                    )
                    timeline
                        .call(() => {
                            activeIndex = index
                            gsap.set(word, { autoAlpha: 1 })
                        })
                        .to(wordStack, {
                            width: () => word.offsetWidth,
                            duration: 0.5,
                            ease: 'power3.out',
                        })
                        .fromTo(
                            characters,
                            { y: 20, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                stagger: 0.04,
                                ease: 'back.out(2.5)',
                                duration: 0.4,
                            },
                            '<'
                        )
                        .to({}, { duration: 3 })
                        .to(characters, {
                            y: 20,
                            opacity: 0,
                            stagger: 0.01,
                            ease: 'back.in(1.5)',
                            duration: 0.3,
                        })
                        .set(word, { autoAlpha: 0 })
                })

                const syncPlayback = () => {
                    timeline.paused(
                        pausedRef.current ||
                            !inViewRef.current ||
                            document.hidden
                    )
                }
                const observer = new IntersectionObserver(([entry]) => {
                    inViewRef.current = entry.isIntersecting
                    syncPlayback()
                })
                observer.observe(container)
                document.addEventListener('visibilitychange', syncPlayback)

                const syncWidth = () => {
                    timeline.invalidate()
                    gsap.set(wordStack, {
                        width: words[activeIndex].offsetWidth,
                    })
                }
                let disposed = false
                window.addEventListener('resize', syncWidth)
                void document.fonts.ready.then(() => {
                    if (!disposed) syncWidth()
                })

                return () => {
                    disposed = true
                    observer.disconnect()
                    document.removeEventListener(
                        'visibilitychange',
                        syncPlayback
                    )
                    window.removeEventListener('resize', syncWidth)
                    timelineRef.current = null
                }
            })

            return () => media.revert()
        },
        { scope: containerRef }
    )

    return (
        <span ref={containerRef} className={styles.rotator}>
            <span className="sr-only">{specialtyList}</span>
            <strong
                className={`${styles.highlight} ${styles.animatedHighlight}`}
                aria-hidden="true"
            >
                <span className={styles.handleStart} />
                <span className={styles.wordStack} data-word-stack>
                    {activeSpecialties.map((specialty) => (
                        <span
                            className={styles.word}
                            data-specialty={specialty}
                            key={specialty}
                        >
                            <AnimatedCharacters
                                text={specialty}
                                className={styles.characters}
                                characterClassName={styles.character}
                            />
                        </span>
                    ))}
                </span>
                <span className={styles.handleEnd} />
            </strong>
            <span className={styles.reducedTerms} aria-hidden="true">
                {specialtyList}
            </span>
            {activeSpecialties.length > 1 && (
                <button
                    className={styles.pause}
                    type="button"
                    aria-label={
                        paused
                            ? 'Resume rotating specialties'
                            : 'Pause rotating specialties'
                    }
                    onClick={() => setPaused((value) => !value)}
                >
                    {paused ? (
                        <Play aria-hidden="true" />
                    ) : (
                        <Pause aria-hidden="true" />
                    )}
                </button>
            )}
        </span>
    )
}
