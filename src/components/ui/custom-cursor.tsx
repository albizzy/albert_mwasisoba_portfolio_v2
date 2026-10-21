'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './custom-cursor.module.css'

type CursorState = 'default' | 'interactive' | 'text' | 'hidden'

const CURSOR_TONES = ['ink', 'yellow', 'pink', 'blue', 'green'] as const
type CursorTone = (typeof CURSOR_TONES)[number]

interface CursorTarget {
    state: CursorState
    label: string
    tone: CursorTone
}

const ACTIVE_CLASS = 'custom-cursor-active'
const DEFAULT_TONE: CursorTone = 'yellow'
const SUPPORT_QUERY = '(any-pointer: fine) and (forced-colors: none)'

const INTERACTIVE_SELECTOR = [
    'a[href]',
    'button:not(:disabled)',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]',
    '[role="menuitem"]',
    'label[for]',
    'summary',
    'select',
    '[data-cursor-label]',
].join(',')

const TEXT_SELECTOR = [
    'input:not([type="button"], [type="checkbox"], [type="color"], [type="file"], [type="hidden"], [type="image"], [type="radio"], [type="range"], [type="reset"], [type="submit"])',
    'textarea',
    '[contenteditable=""]',
    '[contenteditable="true"]',
].join(',')

const HIDDEN_SELECTOR = 'iframe, [data-cursor="none"]'

const isCursorTone = (value: string | undefined): value is CursorTone =>
    CURSOR_TONES.includes(value as CursorTone)

function resolveTarget(element: Element | null): CursorTarget {
    const fallback: CursorTarget = {
        state: 'default',
        label: '',
        tone: DEFAULT_TONE,
    }
    if (!element) return fallback
    if (element.closest(HIDDEN_SELECTOR))
        return { ...fallback, state: 'hidden' }

    const textTarget = element.closest<HTMLElement>(TEXT_SELECTOR)
    if (textTarget) {
        const isInvalid = textTarget.getAttribute('aria-invalid') === 'true'
        return {
            ...fallback,
            state: 'text',
            tone: isInvalid ? 'pink' : 'blue',
        }
    }

    const interactive = element.closest<HTMLElement>(INTERACTIVE_SELECTOR)
    if (!interactive) return fallback

    const { cursorLabel, cursorTone } = interactive.dataset
    return {
        state: 'interactive',
        label: cursorLabel?.trim() ?? '',
        tone: isCursorTone(cursorTone) ? cursorTone : DEFAULT_TONE,
    }
}

export function CustomCursor() {
    const rootRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    const labelTrackRef = useRef<HTMLDivElement>(null)
    const labelTextRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const root = rootRef.current
        const arrow = arrowRef.current
        const labelTrack = labelTrackRef.current
        const labelText = labelTextRef.current
        if (!root || !arrow || !labelTrack || !labelText) return

        const html = document.documentElement
        const support = window.matchMedia(SUPPORT_QUERY)
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        )

        // The arrow tracks the pointer 1:1; only the label trails behind.
        const setArrowX = gsap.quickSetter(arrow, 'x', 'px')
        const setArrowY = gsap.quickSetter(arrow, 'y', 'px')
        const labelX = gsap.quickTo(labelTrack, 'x', {
            duration: 0.35,
            ease: 'power3.out',
        })
        const labelY = gsap.quickTo(labelTrack, 'y', {
            duration: 0.35,
            ease: 'power3.out',
        })

        let listening = false
        let active = false
        let visible = false
        let pointerX = 0
        let pointerY = 0
        let lastTarget: EventTarget | null = null
        let scrollFrame = 0
        let current: CursorTarget = {
            state: 'default',
            label: '',
            tone: DEFAULT_TONE,
        }

        const apply = (next: CursorTarget) => {
            if (next.state !== current.state) root.dataset.state = next.state
            if (next.tone !== current.tone) root.dataset.tone = next.tone
            if (next.label !== current.label) {
                labelText.textContent = next.label
                root.dataset.hasLabel = String(Boolean(next.label))
            }
            current = next
        }

        const setVisible = (value: boolean) => {
            if (visible === value) return
            visible = value
            root.dataset.visible = String(value)
            if (!value) root.dataset.pressed = 'false'
        }

        const activate = () => {
            if (active) return
            active = true
            html.classList.add(ACTIVE_CLASS)
        }

        const deactivate = () => {
            if (!active) return
            active = false
            setVisible(false)
            html.classList.remove(ACTIVE_CLASS)
        }

        const moveTo = (x: number, y: number, snap: boolean) => {
            setArrowX(x)
            setArrowY(y)
            if (snap || reducedMotion.matches) {
                // Passing a start value equal to the end value snaps instantly.
                labelX(x, x)
                labelY(y, y)
            } else {
                labelX(x)
                labelY(y)
            }
        }

        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') {
                deactivate()
                return
            }
            activate()
            pointerX = event.clientX
            pointerY = event.clientY
            moveTo(pointerX, pointerY, !visible)
            setVisible(true)

            if (event.target !== lastTarget) {
                lastTarget = event.target
                apply(resolveTarget(event.target as Element))
            }
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') {
                deactivate()
                return
            }
            root.dataset.pressed = 'true'
        }

        const handlePointerUp = () => {
            root.dataset.pressed = 'false'
        }

        const handleLeave = () => setVisible(false)

        const handleScroll = () => {
            if (!visible || scrollFrame) return
            scrollFrame = requestAnimationFrame(() => {
                scrollFrame = 0
                const element = document.elementFromPoint(pointerX, pointerY)
                if (element !== lastTarget) {
                    lastTarget = element
                    apply(resolveTarget(element))
                }
            })
        }

        const listen = () => {
            if (listening) return
            listening = true
            window.addEventListener('pointermove', handlePointerMove, {
                passive: true,
            })
            window.addEventListener('pointerdown', handlePointerDown, {
                passive: true,
            })
            window.addEventListener('pointerup', handlePointerUp, {
                passive: true,
            })
            window.addEventListener('scroll', handleScroll, { passive: true })
            window.addEventListener('blur', handleLeave)
            html.addEventListener('mouseleave', handleLeave)
        }

        const unlisten = () => {
            if (!listening) return
            listening = false
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('blur', handleLeave)
            html.removeEventListener('mouseleave', handleLeave)
            cancelAnimationFrame(scrollFrame)
            scrollFrame = 0
            deactivate()
        }

        const syncSupport = () => (support.matches ? listen() : unlisten())

        syncSupport()
        support.addEventListener('change', syncSupport)

        return () => {
            support.removeEventListener('change', syncSupport)
            unlisten()
            gsap.killTweensOf(labelTrack)
        }
    }, [])

    return (
        <div
            ref={rootRef}
            className={styles.root}
            aria-hidden="true"
            data-visible="false"
            data-state="default"
            data-tone={DEFAULT_TONE}
            data-has-label="false"
            data-pressed="false"
        >
            <div ref={labelTrackRef} className={styles.track}>
                <span ref={labelTextRef} className={styles.label} />
            </div>
            <div ref={arrowRef} className={styles.track}>
                <svg
                    className={styles.arrow}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                >
                    <path
                        className={styles.arrowShape}
                        d="M4.5 3.2 19.6 10.4c.8.4.7 1.5-.1 1.8l-6.1 1.9c-.3.1-.5.3-.6.6l-2.2 5.9c-.3.8-1.4.8-1.7 0L3.4 4.3c-.3-.7.4-1.4 1.1-1.1Z"
                    />
                </svg>
                <svg
                    className={styles.caret}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                >
                    <path
                        className={styles.caretShape}
                        d="M8.5 4h7a1.25 1.25 0 0 1 0 2.5h-2.25v11h2.25a1.25 1.25 0 0 1 0 2.5h-7a1.25 1.25 0 0 1 0-2.5h2.25v-11H8.5a1.25 1.25 0 0 1 0-2.5Z"
                    />
                </svg>
            </div>
        </div>
    )
}
