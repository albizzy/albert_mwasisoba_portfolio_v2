import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'

export const aboutSections = [
    { id: 'about-main-bio', label: 'Main bio', icon: 'bio', tone: 'yellow' },
    { id: 'about-story', label: 'Approach', icon: 'story', tone: 'pink' },
    { id: 'about-work', label: 'Work', icon: 'work', tone: 'blue' },
] as const

type AboutSectionId = (typeof aboutSections)[number]['id']

export function useAboutNavigation() {
    const pageRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState<AboutSectionId>(
        aboutSections[0].id
    )
    const lenis = useLenis()

    useEffect(() => {
        let frame = 0
        const updateActiveSection = () => {
            frame = 0
            let current: AboutSectionId = aboutSections[0].id
            for (const { id } of aboutSections) {
                const section = pageRef.current?.querySelector<HTMLElement>(
                    `#${id}`
                )
                if (!section) continue
                const offset = parseFloat(
                    getComputedStyle(section).scrollMarginTop
                )
                if (section.getBoundingClientRect().top <= offset + 40)
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
    }, [])

    const scrollToSection = (id: AboutSectionId) => {
        const section = pageRef.current?.querySelector<HTMLElement>(`#${id}`)
        if (!section) return
        const offset = -parseFloat(getComputedStyle(section).scrollMarginTop)
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        const focusHeading = () =>
            section
                .querySelector<HTMLElement>('h2')
                ?.focus({ preventScroll: true })

        // Scroll without writing a hash or adding a browser history entry.
        if (lenis) {
            // Sync native scroll anchoring and dimensions after responsive reflow.
            lenis.resize()
            lenis.scrollTo(section, {
                offset,
                immediate: reducedMotion,
                onComplete: focusHeading,
            })
        } else {
            window.scrollTo({
                top:
                    window.scrollY +
                    section.getBoundingClientRect().top +
                    offset,
                behavior: reducedMotion ? 'instant' : 'smooth',
            })
            focusHeading()
        }
    }

    return { pageRef, activeSection, scrollToSection }
}
