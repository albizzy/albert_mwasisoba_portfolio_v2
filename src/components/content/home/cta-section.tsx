'use client'

import { useRef } from 'react'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function CtaSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
            })

            tl.from('.cta-content', {
                y: 50,
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
        },
        { scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="w-full py-24 md:py-32 relative flex justify-center items-center px-6"
        >
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 -z-10" />

            <div className="cta-content glass-dark w-full max-w-5xl rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-primary/20 bg-card">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                    <Typography
                        as="h2"
                        variant="h2"
                        className="font-bold tracking-tight mb-6"
                    >
                        Ready to scale your next project?
                    </Typography>
                    <Typography
                        as="p"
                        variant="h6"
                        className="text-muted-foreground mb-10"
                    >
                        Whether you need a full architectural overhaul, a
                        high-performance frontend, or custom AI integrations,
                        let's discuss how I can help.
                    </Typography>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Button
                            size="lg"
                            className="rounded-full h-14 px-10 text-lg shadow-xl"
                            asChild
                        >
                            <Link href="/contact">Book a Discovery Call</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
