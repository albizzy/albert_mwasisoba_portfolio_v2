'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedCharacters } from './animated-characters'
import styles from './rotating-text.module.css'

gsap.registerPlugin(useGSAP)

export interface RotatingTextItem {
    text: string
    companion?: string
}
interface RotatingTextProps {
    items: readonly RotatingTextItem[]
    className?: string
    textClassName?: string
    companionClassName?: string
    controlClassName?: string
    reducedClassName?: string
    decoration?: ReactNode
    accessibleText?: string
    reducedText?: string
    controlLabel?: string
    holdDuration?: number
    onActiveChange?: (index: number) => void
}

export function RotatingText({
    items,
    className,
    textClassName,
    companionClassName,
    controlClassName,
    reducedClassName,
    decoration,
    accessibleText,
    reducedText,
    controlLabel = 'text',
    holdDuration = 3,
    onActiveChange,
}: RotatingTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const inViewRef = useRef(false)
    const pausedRef = useRef(false)
    const onChangeRef = useRef(onActiveChange)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        onChangeRef.current = onActiveChange
    }, [onActiveChange])
    useEffect(() => {
        pausedRef.current = paused
        timelineRef.current?.paused(
            paused || !inViewRef.current || document.hidden
        )
    }, [paused])

    useGSAP(
        () => {
            const container = containerRef.current
            if (!container || items.length < 2) return
            const media = gsap.matchMedia()
            media.add('(prefers-reduced-motion: no-preference)', () => {
                const stacks = Array.from(
                    container.querySelectorAll<HTMLElement>('[data-word-stack]')
                )
                const lanes = stacks.map((stack) =>
                    Array.from(
                        stack.querySelectorAll<HTMLElement>(
                            '[data-rotating-word]'
                        )
                    )
                )
                let activeIndex = 0
                stacks.forEach((stack, lane) =>
                    gsap.set(stack, { width: lanes[lane][0].offsetWidth })
                )
                const timeline = gsap.timeline({
                    repeat: -1,
                    repeatRefresh: true,
                    paused: true,
                })
                timelineRef.current = timeline
                items.forEach((_, index) => {
                    const words = lanes.map((lane) => lane[index])
                    const characters = words.flatMap((word) =>
                        Array.from(word.querySelectorAll('[data-character]'))
                    )
                    const label = `item-${index}`
                    timeline.addLabel(label).call(
                        () => {
                            activeIndex = index
                            onChangeRef.current?.(index)
                        },
                        [],
                        label
                    )
                    timeline.set(words, { autoAlpha: 1 }, label)
                    stacks.forEach((stack, lane) => {
                        timeline.to(
                            stack,
                            {
                                width: () => lanes[lane][index].offsetWidth,
                                duration: 0.5,
                                ease: 'power3.out',
                            },
                            label
                        )
                    })
                    timeline
                        .fromTo(
                            characters,
                            { yPercent: 25, opacity: 0 },
                            {
                                yPercent: 0,
                                opacity: 1,
                                stagger: { each: 0.025, from: 'start' },
                                ease: 'back.out(2.5)',
                                duration: 0.4,
                            },
                            label
                        )
                        .to({}, { duration: holdDuration })
                        .to(characters, {
                            yPercent: 25,
                            opacity: 0,
                            stagger: 0.01,
                            ease: 'back.in(1.5)',
                            duration: 0.3,
                        })
                        .set(words, { autoAlpha: 0 })
                })
                const syncPlayback = () =>
                    timeline.paused(
                        pausedRef.current ||
                            !inViewRef.current ||
                            document.hidden
                    )
                const observer = new IntersectionObserver(([entry]) => {
                    inViewRef.current = entry.isIntersecting
                    syncPlayback()
                })
                observer.observe(container)
                document.addEventListener('visibilitychange', syncPlayback)
                const syncWidth = () => {
                    timeline.invalidate()
                    stacks.forEach((stack, lane) =>
                        gsap.set(stack, {
                            width: lanes[lane][activeIndex].offsetWidth,
                        })
                    )
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
                    stacks.forEach((stack) =>
                        stack.style.removeProperty('width')
                    )
                    lanes.flat().forEach((word) => {
                        word.removeAttribute('style')
                        word.querySelectorAll('[data-character]').forEach(
                            (character) => character.removeAttribute('style')
                        )
                    })
                    timelineRef.current = null
                    onChangeRef.current?.(0)
                }
            })
            return () => media.revert()
        },
        {
            scope: containerRef,
            dependencies: [items, holdDuration],
            revertOnUpdate: true,
        }
    )

    if (!items.length) return null
    const renderStack = (companion = false) => (
        <span className={styles.stack} data-word-stack>
            {items.map((item, index) => (
                <span
                    className={styles.word}
                    data-rotating-word
                    key={`${item.text}-${index}`}
                >
                    <AnimatedCharacters
                        text={(companion ? item.companion : item.text) ?? ''}
                    />
                </span>
            ))}
        </span>
    )
    return (
        <span
            ref={containerRef}
            className={cn(
                styles.root,
                reducedText && styles.hasReduced,
                className
            )}
        >
            <span className="sr-only">
                {accessibleText ??
                    items
                        .map((item) =>
                            [item.text, item.companion]
                                .filter(Boolean)
                                .join(' ')
                        )
                        .join(', ')}
            </span>
            <span
                className={cn(styles.animated, textClassName)}
                aria-hidden="true"
            >
                {decoration}
                {renderStack()}
            </span>
            {items.some((item) => item.companion) && (
                <span
                    className={cn(styles.animated, companionClassName)}
                    aria-hidden="true"
                >
                    {renderStack(true)}
                </span>
            )}
            {reducedText && (
                <span
                    className={cn(styles.reduced, reducedClassName)}
                    aria-hidden="true"
                >
                    {reducedText}
                </span>
            )}
            {items.length > 1 && (
                <button
                    type="button"
                    className={cn(styles.control, controlClassName)}
                    aria-label={`${paused ? 'Resume' : 'Pause'} rotating ${controlLabel}`}
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
