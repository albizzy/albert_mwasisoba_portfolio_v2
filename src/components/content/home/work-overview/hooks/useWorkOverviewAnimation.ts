import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger)
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

            // Let tall cards scroll normally instead of trapping content below the fold.
            const updateStack = () => {
                const top = parseFloat(
                    getComputedStyle(section).getPropertyValue('--stack-top')
                )
                section.dataset.stackEnabled = String(
                    cards.every(
                        (card) =>
                            card.offsetHeight <= window.innerHeight - top - 16
                    )
                )
            }
            const observer = new ResizeObserver(updateStack)
            cards.forEach((card) => observer.observe(card))
            window.addEventListener('resize', updateStack)
            updateStack()

            media.add('(prefers-reduced-motion: no-preference)', () => {
                cards.forEach((card) => {
                    const image = card.querySelector('[data-work-image]')
                    if (!image) return

                    // Animate only the image; the folder edges keep their exact alignment.
                    gsap.fromTo(
                        image,
                        { yPercent: -3 },
                        {
                            yPercent: 3,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: () =>
                                    `+=${window.innerHeight + card.offsetHeight}`,
                                scrub: true,
                                invalidateOnRefresh: true,
                            },
                        }
                    )
                })
            })

            return () => {
                observer.disconnect()
                window.removeEventListener('resize', updateStack)
                media.revert()
                delete section.dataset.stackEnabled
            }
        },
        { scope: sectionRef }
    )

    return sectionRef
}
