'use client'

import { type RefObject, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export interface FloatingSkillMotion {
    floatX: number
    floatY: number
    floatRotate: number
    duration: number
    delay: number
    parallaxDepth: number
}

export function useFloatingSkills(
    sectionRef: RefObject<HTMLElement | null>,
    motions: ReadonlyArray<FloatingSkillMotion>
) {
    const inViewRef = useRef(true)

    useGSAP(
        () => {
            const section = sectionRef.current
            if (!section) return

            const media = gsap.matchMedia()

            media.add(
                {
                    isDesktop:
                        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
                    isMobile:
                        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
                },
                (context) => {
                    const { isMobile } = context.conditions ?? {}
                    const amplitudeScale = isMobile ? 0.45 : 1

                    const bubbles = Array.from(
                        section.querySelectorAll<HTMLElement>(
                            '[data-skill-bubble]'
                        )
                    )
                    const floaters = Array.from(
                        section.querySelectorAll<HTMLElement>(
                            '[data-skill-float]'
                        )
                    )

                    if (!bubbles.length || !floaters.length) return

                    const introTween = gsap.fromTo(
                        bubbles,
                        {
                            autoAlpha: 0,
                            scale: 0.82,
                            y: 16,
                        },
                        {
                            autoAlpha: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.65,
                            stagger: 0.09,
                            ease: 'back.out(2)',
                            clearProps: 'scale',
                        }
                    )

                    const floatTweens = floaters.map((floater, index) => {
                        const motion = motions[index] ?? {
                            floatX: 4,
                            floatY: -8,
                            floatRotate: 2,
                            duration: 3,
                            delay: index * 0.2,
                            parallaxDepth: 16,
                        }

                        return gsap.to(floater, {
                            x: motion.floatX * amplitudeScale,
                            y: motion.floatY * amplitudeScale,
                            rotation: motion.floatRotate * amplitudeScale,
                            duration: motion.duration,
                            delay: motion.delay,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                        })
                    })

                    const syncPlayback = () => {
                        const shouldPause =
                            !inViewRef.current || document.hidden
                        floatTweens.forEach((tween) =>
                            tween.paused(shouldPause)
                        )
                    }

                    const observer = new IntersectionObserver(([entry]) => {
                        inViewRef.current = entry.isIntersecting
                        syncPlayback()
                    })
                    observer.observe(section)
                    document.addEventListener('visibilitychange', syncPlayback)

                    const canHover = window.matchMedia(
                        '(hover: hover) and (pointer: fine)'
                    ).matches

                    let cleanupPointer: (() => void) | undefined

                    if (canHover && !isMobile) {
                        const xToList = bubbles.map((bubble) =>
                            gsap.quickTo(bubble, 'x', {
                                duration: 0.65,
                                ease: 'power3.out',
                            })
                        )
                        const yToList = bubbles.map((bubble) =>
                            gsap.quickTo(bubble, 'y', {
                                duration: 0.65,
                                ease: 'power3.out',
                            })
                        )

                        const handlePointerMove = (event: PointerEvent) => {
                            if (!inViewRef.current) return
                            const rect = section.getBoundingClientRect()
                            const relX =
                                (event.clientX - rect.left) / rect.width - 0.5
                            const relY =
                                (event.clientY - rect.top) / rect.height - 0.5

                            bubbles.forEach((_, index) => {
                                const depth =
                                    motions[index]?.parallaxDepth ?? 16
                                const direction = index % 2 === 0 ? 1 : -0.85
                                xToList[index](relX * depth * direction)
                                yToList[index](relY * depth * direction)
                            })
                        }

                        const handlePointerLeave = () => {
                            bubbles.forEach((_, index) => {
                                xToList[index](0)
                                yToList[index](0)
                            })
                        }

                        section.addEventListener(
                            'pointermove',
                            handlePointerMove,
                            {
                                passive: true,
                            }
                        )
                        section.addEventListener(
                            'pointerleave',
                            handlePointerLeave,
                            { passive: true }
                        )

                        cleanupPointer = () => {
                            section.removeEventListener(
                                'pointermove',
                                handlePointerMove
                            )
                            section.removeEventListener(
                                'pointerleave',
                                handlePointerLeave
                            )
                        }
                    }

                    return () => {
                        introTween.kill()
                        floatTweens.forEach((tween) => tween.kill())
                        observer.disconnect()
                        document.removeEventListener(
                            'visibilitychange',
                            syncPlayback
                        )
                        cleanupPointer?.()
                    }
                }
            )

            return () => media.revert()
        },
        { scope: sectionRef }
    )
}
