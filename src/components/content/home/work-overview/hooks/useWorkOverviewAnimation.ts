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

            const updateStack = () => {
                const tallest = Math.max(
                    ...cards.map((card) => card.offsetHeight)
                )
                section.style.setProperty('--stack-card-height', `${tallest}px`)
                section.dataset.stackEnabled = 'true'
            }
            const observer = new ResizeObserver(updateStack)
            cards.forEach((card) => observer.observe(card))
            window.addEventListener('resize', updateStack)
            updateStack()

            media.add('(prefers-reduced-motion: no-preference)', () => {
                cards.forEach((card) => {
                    const image = card.querySelector('[data-work-image]')
                    if (!image) return

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
                section.style.removeProperty('--stack-card-height')
            }
        },
        { scope: sectionRef }
    )

    return sectionRef
}
