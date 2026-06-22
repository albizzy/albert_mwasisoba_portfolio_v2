'use client'

import { useRef, useState } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { siteConfig } from '@/config'
import { useMobile } from '@/hooks'

gsap.registerPlugin(useGSAP)

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)
    const prevWidthRef = useRef<number>(0)
    const [index, setIndex] = useState(0)
    const [isInitial, setIsInitial] = useState(true)
    const isMobile = useMobile()
    const { roles } = siteConfig

    const currentRole = roles[index]
    const article = /^[aeiou]/i.test(currentRole.title) ? 'an' : 'a'

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => setIsInitial(false),
            })

            const initialTl = tl.from('.hero-title', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
            })

            if (containerRef.current?.querySelector('.hero-desc-static')) {
                initialTl.from(
                    '.hero-desc-static',
                    { y: 20, opacity: 0, duration: 0.8 },
                    '-=0.6'
                )
            }
        },
        { scope: containerRef }
    )

    useGSAP(
        () => {
            if (isInitial) return

            if (spanRef.current && prevWidthRef.current > 0) {
                const newWidth = spanRef.current.getBoundingClientRect().width

                gsap.fromTo(
                    spanRef.current,
                    { width: prevWidthRef.current },
                    {
                        width: newWidth,
                        duration: 0.5,
                        ease: 'power3.out',
                        clearProps: 'width',
                    }
                )
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(3, () => {
                        const exitTl = gsap.timeline({
                            onComplete: () => {
                                if (spanRef.current) {
                                    prevWidthRef.current =
                                        spanRef.current.getBoundingClientRect().width
                                }
                                setIndex((prev) => (prev + 1) % roles.length)
                            },
                        })

                        exitTl.to('.role-char', {
                            y: 20,
                            opacity: 0,
                            stagger: 0.01,
                            ease: 'back.in(1.5)',
                            duration: 0.3,
                        })

                        exitTl.to(
                            '.suffix-char',
                            {
                                y: 20,
                                opacity: 0,
                                stagger: 0.01,
                                ease: 'back.in(1.5)',
                                duration: 0.3,
                            },
                            '<'
                        )
                    })
                },
            })

            tl.fromTo(
                '.role-char',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.04,
                    ease: 'back.out(2.5)',
                    duration: 0.4,
                }
            )

            tl.fromTo(
                '.suffix-char',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.04,
                    ease: 'back.out(2.5)',
                    duration: 0.4,
                },
                '-=0.2'
            )
        },
        { dependencies: [index, isInitial], scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[60vh]  md:min-h-[50vh] flex flex-col justify-center items-center py-10 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4 space-y-8 z-10">
                <div>
                    <Typography as="h1" variant="h4" className={'hero-title'}>
                        Engineering with {article}
                    </Typography>

                    <Typography
                        as="h1"
                        variant={isMobile ? 'h5' : 'h2'}
                        className={'hero-title'}
                    >
                        <span
                            ref={spanRef}
                            className="text-span relative inline-flex items-center px-4 py-1 mx-1 bg-primary rounded-full text-primary-foreground overflow-hidden whitespace-nowrap"
                        >
                            <span className="flex">
                                {currentRole.title.split('').map((char, i) => (
                                    <span
                                        key={`${currentRole.title}-${i}`}
                                        className="role-char inline-block whitespace-pre"
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        </span>{' '}
                    </Typography>
                    <Typography
                        as="span"
                        variant={isMobile ? 'h4' : 'h2'}
                        className="inline-block overflow-hidden"
                    >
                        <span className="flex justify-center">
                            {currentRole.suffix.split('').map((char, i) => (
                                <span
                                    key={`${currentRole.suffix}-${i}`}
                                    className="suffix-char inline-block whitespace-pre"
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    </Typography>
                </div>
            </div>
        </section>
    )
}
