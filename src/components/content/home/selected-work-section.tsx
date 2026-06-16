'use client'

import { useRef } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const caseStudies = [
    {
        title: 'Streaming Latency Optimization',
        outcome: 'Reduced video start times by 60% for a major media platform.',
        metrics: [
            'Sub-second TTI',
            '40% increase in watch time',
            'SSR Integration',
        ],
        tags: ['Next.js', 'Video Streaming', 'Performance'],
    },
    {
        title: 'Fintech Dashboard Overhaul',
        outcome:
            'Unified 3 legacy systems into a single high-performance dashboard.',
        metrics: [
            'Zero downtime migration',
            '90+ Lighthouse Score',
            'Real-time WebSockets',
        ],
        tags: ['React', 'Data Visualization', 'Architecture'],
    },
    {
        title: 'AI Workflow Automation Interface',
        outcome:
            'Designed and built the frontend for a proprietary LLM routing tool.',
        metrics: [
            '$200k+ saved in OPEX',
            'Accessible UI',
            'Streaming Responses',
        ],
        tags: ['AI Integration', 'UX Design', 'TypeScript'],
    },
]

export function SelectedWorkSection() {
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

            tl.from('.work-header', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }).from(
                '.work-card',
                {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                },
                '-=0.4'
            )
        },
        { scope: containerRef }
    )

    return (
        <section ref={containerRef} className="w-full py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="work-header mb-16 max-w-2xl">
                    <Typography
                        as="h2"
                        variant="h2"
                        className="font-bold tracking-tight mb-4"
                    >
                        Selected Outcomes.
                    </Typography>
                    <Typography
                        as="p"
                        variant="h6"
                        className="text-muted-foreground font-normal"
                    >
                        I don't just write code; I deliver business value. Here
                        are some critical challenges I've solved for recent
                        clients.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                    {caseStudies.map((work, index) => (
                        <div
                            key={index}
                            className="work-card glass rounded-2xl p-8 flex flex-col justify-between hover:border-primary/50 transition-colors duration-300"
                        >
                            <div className="mb-8">
                                <Typography
                                    as="h3"
                                    variant="h5"
                                    className="font-semibold mb-4"
                                >
                                    {work.title}
                                </Typography>
                                <Typography
                                    as="p"
                                    className="text-muted-foreground text-lg italic mb-6"
                                >
                                    "{work.outcome}"
                                </Typography>

                                <ul className="space-y-2 mb-6">
                                    {work.metrics.map((metric, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center text-sm font-medium text-foreground"
                                        >
                                            <span className="text-primary mr-2">
                                                ✓
                                            </span>{' '}
                                            {metric}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {work.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
