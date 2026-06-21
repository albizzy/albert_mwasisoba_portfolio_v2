'use client'

import { useRef, useState } from 'react'
import { Typography } from '@/components/ui/typography'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { siteConfig } from '@/config'

gsap.registerPlugin(useGSAP)

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)
    const prevWidthRef = useRef<number>(0)
    const [index, setIndex] = useState(0)
    const [isInitial, setIsInitial] = useState(true)
    const { roles } = siteConfig

    const currentRole = roles[index]
    const article = /^[aeiou]/i.test(currentRole) ? 'an' : 'a'

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => setIsInitial(false),
            })

            tl.from('.hero-title', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
            }).from(
                '.hero-desc-static',
                { y: 20, opacity: 0, duration: 0.8 },
                '-=0.6'
            )
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

            gsap.fromTo(
                '.role-char',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.04,
                    ease: 'back.out(2.5)',
                    duration: 0.4,
                    onComplete: () => {
                        gsap.delayedCall(3, () => {
                            gsap.to('.role-char', {
                                y: 20,
                                opacity: 0,
                                stagger: 0.01,
                                ease: 'back.in(1.5)',
                                duration: 0.3,
                                onComplete: () => {
                                    if (spanRef.current) {
                                        prevWidthRef.current =
                                            spanRef.current.getBoundingClientRect().width
                                    }
                                    setIndex(
                                        (prev) => (prev + 1) % roles.length
                                    )
                                },
                            })
                        })
                    },
                }
            )
        },
        { dependencies: [index, isInitial], scope: containerRef }
    )

    return (
        <section
            ref={containerRef}
            className="relative w-full h-fit  md:min-h-[60vh] flex flex-col justify-center items-center py-10 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4 space-y-8 z-10">
                <div className="-space-y-1">
                    <Typography as="h1" variant="h4" className={'hero-title'}>
                        Engineering with a
                    </Typography>

                    <Typography as="h1" variant="h2" className={'hero-title'}>
                        Designer's Eye
                    </Typography>
                </div>

                <Typography
                    as={'p'}
                    variant={'h6'}
                    className="hero-desc-static max-w-2xl leading-relaxed"
                >
                    I am {article}{' '}
                    <span
                        ref={spanRef}
                        className="text-span relative inline-flex items-center px-4 py-1 mx-1 bg-primary rounded-full text-primary-foreground overflow-hidden whitespace-nowrap"
                    >
                        <span className="flex">
                            {currentRole.split('').map((char, i) => (
                                <span
                                    key={`${currentRole}-${i}`}
                                    className="role-char inline-block whitespace-pre"
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    </span>{' '}
                    dedicated to building high-stakes digital systems.
                </Typography>
            </div>
        </section>
    )
}
