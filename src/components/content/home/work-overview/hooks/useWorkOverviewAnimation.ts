import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
}

export function useWorkOverviewAnimation() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const section = sectionRef.current
            if (!section) return

            const cards = Array.from(
                section.querySelectorAll<HTMLElement>('[data-work-card]')
            )
            const media = gsap.matchMedia()

            let lastTallest = 0
            const updateStack = () => {
                const tallest = Math.max(
                    0,
                    ...cards.map((card) => card.offsetHeight)
                )
                if (Math.abs(tallest - lastTallest) > 1) {
                    lastTallest = tallest
                    section.style.setProperty(
                        '--stack-card-height',
                        `${tallest}px`
                    )
                }
            }
            const observer = new ResizeObserver(updateStack)
            cards.forEach((card) => observer.observe(card))
            window.addEventListener('resize', updateStack, { passive: true })
            updateStack()

            media.add('(prefers-reduced-motion: no-preference)', () => {
                cards.forEach((card) => {
                    const image =
                        card.querySelector<HTMLElement>('[data-work-image]')
                    if (!image) return

                    gsap.set(image, { yPercent: -3, force3D: true })

                    gsap.fromTo(
                        image,
                        { yPercent: -3 },
                        {
                            yPercent: 3,
                            force3D: true,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: () =>
                                    `+=${window.innerHeight + card.offsetHeight}`,
                                scrub: true,
                            },
                        }
                    )
                })
            })

            return () => {
                observer.disconnect()
                window.removeEventListener('resize', updateStack)
                media.revert()
                section.style.removeProperty('--stack-card-height')
            }
        },
        { scope: sectionRef }
    )

    return sectionRef
}
