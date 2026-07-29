'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { Typography } from '@/components/ui/typography'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { expertiseData } from '@/components/content/home/expertise-overview/expertise-data'

gsap.registerPlugin(ScrollTrigger)

export function ExpertiseOverview() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
    const sectionRef = useRef<HTMLElement>(null)
    const stepsOuterRef = useRef<HTMLDivElement>(null)
    const stepsInnerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const { problemVsSolution, completionSteps } = expertiseData

    useGSAP(
        () => {
            const inner = stepsInnerRef.current
            const outer = stepsOuterRef.current
            if (!inner || !outer) return

            gsap.to(inner, {
                y: () => {
                    const amount =
                        inner.scrollHeight - (outer.clientHeight - 48)
                    return amount > 0 ? -amount : 0
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                },
            })
        },
        { scope: sectionRef }
    )

    useGSAP(
        () => {
            if (selectedIdx === null) {
                const allElements = containerRef.current?.querySelectorAll(
                    '.chat-subtitle, .problem-item, .solution-bubble, .chat-footer'
                )
                if (allElements) {
                    gsap.killTweensOf(allElements)
                    gsap.set(allElements, { clearProps: 'all' })
                }
                if (containerRef.current) {
                    gsap.killTweensOf(containerRef.current)
                    gsap.set(containerRef.current, { clearProps: 'height' })
                }
                setIsTransitioning(false)
                return
            }

            setIsTransitioning(true)

            const container = containerRef.current
            const initialHeight = container
                ? container.getBoundingClientRect().height
                : 'auto'

            if (container) {
                gsap.set(container, { height: initialHeight })
            }

            const subtitle =
                containerRef.current?.querySelector('.chat-subtitle')
            const otherProblems = containerRef.current?.querySelectorAll(
                `.problem-item:not(.problem-item-${selectedIdx})`
            )
            const clickedProblem = containerRef.current?.querySelector(
                `.problem-item-${selectedIdx}`
            )
            const solutionBubbles =
                containerRef.current?.querySelectorAll('.solution-bubble')
            const footer = containerRef.current?.querySelector('.chat-footer')

            const tl = gsap.timeline({
                onComplete: () => {
                    setIsTransitioning(false)
                },
                onReverseComplete: () => {
                    setSelectedIdx(null)
                    setIsTransitioning(false)
                },
            })

            timelineRef.current = tl

            const startWidth = clickedProblem
                ? clickedProblem.getBoundingClientRect().width
                : '100%'

            let endWidth: number | string = 'auto'
            if (clickedProblem) {
                const originalStyle = clickedProblem.getAttribute('style') || ''
                clickedProblem.setAttribute(
                    'style',
                    originalStyle +
                        '; width: fit-content; max-width: 85%; align-self: flex-start;'
                )
                endWidth = clickedProblem.getBoundingClientRect().width
                clickedProblem.setAttribute('style', originalStyle)
            }

            tl.to([subtitle, otherProblems], {
                opacity: 0,
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0,
                gap: 0,
                duration: 0,
                ease: 'power3.out',
                display: 'none',
            })

            if (clickedProblem) {
                gsap.set(clickedProblem, {
                    alignSelf: 'flex-start',
                    maxWidth: '85%',
                    width: startWidth,
                })

                tl.to(
                    clickedProblem,
                    {
                        width: endWidth,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => {
                            gsap.set(clickedProblem, { width: 'fit-content' })
                        },
                    },
                    '<'
                )
            }

            if (solutionBubbles && solutionBubbles.length > 0) {
                solutionBubbles.forEach((bubble) => {
                    tl.to(
                        bubble,
                        {
                            opacity: 1,
                            y: 0,
                            display: 'block',
                            duration: 0.6,
                            ease: 'power3.out',
                        },
                        `+=1.0`
                    )
                })
            }

            if (footer) {
                tl.to(
                    footer,
                    {
                        opacity: 1,
                        y: 0,
                        display: 'flex',
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '+=0.4'
                )
            }
        },
        { scope: containerRef, dependencies: [selectedIdx] }
    )

    const handleSelect = (index: number) => {
        if (isTransitioning || selectedIdx !== null) return
        setSelectedIdx(index)
    }

    const handleGoBack = () => {
        if (timelineRef.current) {
            timelineRef.current.kill()
            timelineRef.current = null
        }
        setSelectedIdx(null)
        setIsTransitioning(false)
    }

    return (
        <Section ref={sectionRef} withDefaultContainer={false}>
            <Container className={'flex flex-col'}>
                <div className={'w-full grid grid-cols-1 md:grid-cols-2 gap-8'}>
                    <div className={'flex items-center justify-center'}>
                        <div
                            ref={stepsOuterRef}
                            className={
                                'size-96 rounded-4xl bg-muted px-6 py-6 relative overflow-hidden'
                            }
                        >
                            <div
                                ref={stepsInnerRef}
                                className="flex flex-col items-center gap-4 w-full"
                            >
                                {completionSteps.map((step) => (
                                    <div
                                        key={step.title}
                                        className={`rounded-full w-fit px-6 py-4 flex flex-row items-center ${step.background} gap-2`}
                                    >
                                        <step.icon />
                                        <Typography as={'span'}>
                                            {step.title}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={''}>
                        <div
                            ref={containerRef}
                            className={cn(
                                'bg-accent rounded-3xl p-8 md:p-12 flex flex-col gap-8 md:gap-12 relative overflow-hidden',
                                selectedIdx === null &&
                                    'transition-all duration-300'
                            )}
                        >
                            <Typography
                                as={'h2'}
                                variant={'h5'}
                                className={
                                    'text-center max-w-sm mx-auto font-medium'
                                }
                            >
                                How can I help you?
                            </Typography>
                            <div
                                className={
                                    'flex flex-col gap-6 flex-1 justify-end'
                                }
                            >
                                <Typography
                                    as={'span'}
                                    variant={'small'}
                                    className={'chat-subtitle ml-6'}
                                >
                                    Choose what fits your needs
                                </Typography>
                                <div
                                    className={
                                        'flex flex-col gap-4 items-stretch w-full'
                                    }
                                >
                                    {problemVsSolution.map((item, index) => {
                                        const isSelected = selectedIdx === index
                                        const isAnySelected =
                                            selectedIdx !== null

                                        return (
                                            <button
                                                key={item.problem}
                                                type="button"
                                                onClick={() =>
                                                    handleSelect(index)
                                                }
                                                disabled={
                                                    isAnySelected && !isSelected
                                                }
                                                className={cn(
                                                    'problem-item text-left',
                                                    `problem-item-${index}`,
                                                    'bg-background p-4 md:p-6 rounded-3xl cursor-pointer w-fit',
                                                    selectedIdx === null &&
                                                        'transition-all duration-500',
                                                    isSelected
                                                        ? 'w-full shadow-xs border border-border/50 text-foreground cursor-default pointer-events-none'
                                                        : 'hover:bg-background/50 hover:text-foreground/50',
                                                    isAnySelected && !isSelected
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                )}
                                            >
                                                <Typography
                                                    as={'h3'}
                                                    variant={'body'}
                                                    className={'font-semibold'}
                                                >
                                                    {item.problem}
                                                </Typography>
                                            </button>
                                        )
                                    })}
                                </div>

                                {selectedIdx !== null && (
                                    <div className="solutions-list flex flex-col gap-4 w-full">
                                        {problemVsSolution[
                                            selectedIdx
                                        ].solutions.map((solution, sIdx) => (
                                            <div
                                                key={`${solution}-${sIdx}`}
                                                className="solution-bubble self-end w-fit max-w-[85%] text-white p-4 md:p-6 rounded-3xl opacity-0 translate-y-4 hidden"
                                                style={{
                                                    backgroundColor:
                                                        'var(--chart-2)',
                                                }}
                                            >
                                                <Typography
                                                    as="p"
                                                    variant="body"
                                                    className="font-medium"
                                                >
                                                    {solution}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {selectedIdx !== null && (
                                    <div className="chat-footer w-full items-center justify-between mt-6 opacity-0 translate-y-4 hidden">
                                        <button
                                            onClick={handleGoBack}
                                            className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-foreground hover:opacity-75 transition-opacity cursor-pointer"
                                        >
                                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                            Go back
                                        </button>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="rounded-full px-6 py-5 h-auto text-sm md:text-base font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform"
                                        >
                                            <Link href="/contact">
                                                Let&apos;s work together
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className={'mt-20 flex flex-col items-center gap-4'}>
                <Typography
                    as={'p'}
                    variant={'h6'}
                    className={'text-center font-normal max-w-2xl'}
                >
                    I connect people, business, and technology through clear
                    digital work.
                </Typography>

                <Button
                    asChild
                    variant="default"
                    className="rounded-full px-6 py-5 h-auto text-sm md:text-base font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                    <Link href="/expertise">My expertise</Link>
                </Button>
            </div>
        </Section>
    )
}
