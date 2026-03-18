'use client'

import { useRef } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const problems = [
    {
        title: 'Slow, Unresponsive Apps',
        description:
            'Legacy codebases and unoptimized assets drive users away. I re-architect frontends to deliver sub-second load times and 60fps interactions.',
        icon: '⚡',
    },
    {
        title: 'Poor User Experience',
        description:
            'Confusing flows and disconnected designs hurt conversion. I bridge the gap between abstract requirements and intuitive, accessible interfaces.',
        icon: '🎨',
    },
    {
        title: 'Weak Brand Presence',
        description:
            'Generic templates and outdated designs fail to build trust. I craft premium, bespoke digital experiences that align with your business caliber.',
        icon: '✨',
    },
    {
        title: 'No AI Leverage',
        description:
            'Falling behind in the AI race means lost efficiency. I integrate LLMs and AI workflows directly into your products, turning hype into ROI.',
        icon: '🤖',
    },
]

export function ProblemsSection() {
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

            tl.from('.problem-header', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }).from(
                '.problem-card',
                {
                    y: 50,
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
            id="solutions"
            ref={containerRef}
            className="w-full py-24 md:py-32 relative bg-accent/20"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="problem-header mb-16 max-w-2xl">
                    <Typography
                        as="h2"
                        variant="h2"
                        className="font-bold tracking-tight mb-4"
                    >
                        Solving the hard problems.
                    </Typography>
                    <Typography
                        as="p"
                        variant="h6"
                        className="text-muted-foreground font-normal"
                    >
                        Great products are built by eliminating friction. I
                        partner with founders to tackle technical debt, design
                        flaws, and integration challenges.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="problem-card glass rounded-2xl p-8 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                {problem.icon}
                            </div>
                            <Typography
                                as="h3"
                                variant="h4"
                                className="font-semibold"
                            >
                                {problem.title}
                            </Typography>
                            <Typography
                                as="p"
                                className="text-muted-foreground leading-relaxed"
                            >
                                {problem.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
