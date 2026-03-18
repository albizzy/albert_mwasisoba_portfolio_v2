'use client'

import { useRef } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const partners = [
    {
        title: 'Funded Startups',
        description:
            'You have product-market fit but your initial offshore build is buckling under scale. You need a robust architecture to handle the next phase of growth.',
    },
    {
        title: 'Enterprise Teams',
        description:
            'Your internal tools or legacy systems are slowing down your workforce. You need modern, responsive interfaces that connect to complex backends.',
    },
    {
        title: 'Design Agencies',
        description:
            'You have beautiful Figma files but need an engineering partner who can execute them with pixel-perfection and high performance.',
    },
]

export function WhoIWorkWithSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    toggleActions: 'play none none none',
                },
            })

            tl.from('.who-header', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }).from(
                '.who-card',
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                },
                '-=0.4'
            )
        },
        { scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="w-full py-24 md:py-32 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="who-header mb-16 text-center max-w-3xl mx-auto">
                    <Typography
                        as="h2"
                        variant="h2"
                        className="font-bold tracking-tight mb-4"
                    >
                        Who I Work With.
                    </Typography>
                    <Typography
                        as="p"
                        variant="h6"
                        className="text-muted-foreground font-normal"
                    >
                        I partner with teams who value quality, clear
                        communication, and engineering excellence over cheap,
                        rushed code.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="who-card glass rounded-2xl p-8 border border-border/50 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                        >
                            <Typography
                                as="h3"
                                variant="h5"
                                className="font-semibold mb-4 text-foreground"
                            >
                                {partner.title}
                            </Typography>
                            <Typography
                                as="p"
                                className="text-muted-foreground leading-relaxed"
                            >
                                {partner.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
