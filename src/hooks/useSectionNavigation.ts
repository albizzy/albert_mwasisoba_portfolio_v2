import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { scrollToTarget } from '@/lib/scroll'

// How far past a section's scroll margin it counts as the active section.
const ACTIVATION_OFFSET = 40

interface SectionNavigationOptions {
    /** Element focused after scrolling, for keyboard and screen reader users. */
    headingSelector?: string
}

/**
 * Tracks which section is in view and scrolls to sections inside
 * `containerRef`. Pass a stable (module-level) list of section ids.
 */
export function useSectionNavigation<Id extends string>(
    sectionIds: ReadonlyArray<Id>,
    { headingSelector = 'h2' }: SectionNavigationOptions = {}
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState<Id>(sectionIds[0])
    const lenis = useLenis()

    useEffect(() => {
        let frame = 0
        const updateActiveSection = () => {
            frame = 0
            let current = sectionIds[0]
            for (const id of sectionIds) {
                const section =
                    containerRef.current?.querySelector<HTMLElement>(`#${id}`)
                if (!section) continue
                const offset = parseFloat(
                    getComputedStyle(section).scrollMarginTop
                )
                if (
                    section.getBoundingClientRect().top <=
                    offset + ACTIVATION_OFFSET
                )
                    current = id
            }
            setActiveSection(current)
        }
        const requestUpdate = () => {
            if (!frame)
                frame = window.requestAnimationFrame(updateActiveSection)
        }
        requestUpdate()
        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate)
        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)
        }
    }, [sectionIds])

    const scrollToSection = (id: Id) => {
        const section = containerRef.current?.querySelector<HTMLElement>(
            `#${id}`
        )
        if (!section) return

        // Scroll without writing a hash or adding a browser history entry.
        scrollToTarget(section, {
            lenis,
            offset: -parseFloat(getComputedStyle(section).scrollMarginTop),
            remeasure: true,
            onComplete: () =>
                section
                    .querySelector<HTMLElement>(headingSelector)
                    ?.focus({ preventScroll: true }),
        })
    }

    return { containerRef, activeSection, scrollToSection }
}
