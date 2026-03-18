'use client'

import { useRef } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const steps = [
    {
        number: '01',
        title: 'Discovery & Diagnosis',
        description:
            'We start by unpacking your business goals and current technical debt. I map out the exact bottlenecks preventing your product from scaling or converting.',
    },
    {
        number: '02',
        title: 'Architectural Design',
        description:
            'I design a robust, future-proof architecture tailored to your unique constraints. This includes selecting the right stack, planning AI integrations, and defining the UI/UX system.',
    },
    {
        number: '03',
        title: 'Precision Execution',
        description:
            'Development begins with a focus on performance and pixel-perfect implementation. I ship features incrementally, ensuring continuous alignment with your vision.',
    },
    {
        number: '04',
        title: 'Optimization & Handoff',
        description:
            'Before handoff, I rigorously optimize for load times, accessibility, and SEO. Your team receives clean, fully documented code and robust deployment pipelines.',
    },
]

export function HowIWorkSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none none',
                },
            })

            tl.from('.how-header', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
                .from(
                    '.step-item',
                    {
                        opacity: 0,
                        x: -30,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                )
                .from(
                    '.step-line',
                    {
                        scaleY: 0,
                        transformOrigin: 'top',
                        duration: 1,
                        ease: 'power3.out',
                    },
                    '-=1'
                )
        },
        { scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="w-full py-24 md:py-32 relative overflow-hidden"
        >
            <div className="max-w-4xl mx-auto px-6">
                <div className="how-header mb-16 text-center">
                    <Typography
                        as="h2"
                        variant="h2"
                        className="font-bold tracking-tight mb-4"
                    >
                        How I Work.
                    </Typography>
                    <Typography
                        as="p"
                        variant="h6"
                        className="text-muted-foreground font-normal max-w-2xl mx-auto"
                    >
                        A systematic approach to solving complex problems, from
                        initial diagnosis to pixel-perfect delivery.
                    </Typography>
                </div>

                <div className="relative border-l border-primary/20 pl-8 md:pl-12 ml-4 md:ml-0 space-y-12">
                    <div className="step-line absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary/50 to-transparent"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="step-item relative">
                            <span className="absolute -left-[45px] md:-left-[60px] top-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center text-sm md:text-base font-bold z-10 glass">
                                {step.number}
                            </span>
                            <div className="glass rounded-2xl p-6 hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
                                <Typography
                                    as="h3"
                                    variant="h5"
                                    className="font-semibold mb-3"
                                >
                                    {step.title}
                                </Typography>
                                <Typography
                                    as="p"
                                    className="text-muted-foreground leading-relaxed"
                                >
                                    {step.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
