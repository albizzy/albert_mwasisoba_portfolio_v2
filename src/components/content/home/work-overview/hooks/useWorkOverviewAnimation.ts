import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger)
}

const selectors = {
    cards: '.work-card',
    content: '.work-content, .work-link',
    cta: '.work-cta',
    images: '.work-image',
    pills: '.work-pill',
} as const

export function useWorkOverviewAnimation() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(selectors.cards)
            const timeline = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            })

            timeline
                .from(cards, {
                    y: 48,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.14,
                })
                .from(
                    selectors.images,
                    {
                        scale: 1.08,
                        duration: 1.1,
                        stagger: 0.14,
                    },
                    '<'
                )
                .from(
                    selectors.pills,
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.035,
                    },
                    '-=0.65'
                )
                .from(
                    selectors.content,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.65,
                        stagger: 0.08,
                    },
                    '-=0.45'
                )
                .from(
                    selectors.cta,
                    {
                        y: 18,
                        opacity: 0,
                        duration: 0.7,
                    },
                    '-=0.3'
                )
        },
        { scope: sectionRef }
    )

    return sectionRef
}
