'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { Typography } from '@/components/ui/typography'
import { Section } from '@/components/content/sections'
import { Button } from '@/components/ui/button'
import {
    Check,
    CheckCheck,
    ChevronLeft,
    CircleDashedIcon,
    Clipboard,
    Ellipsis,
    Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const problemVsSolution = [
    {
        problem: 'Our product needs to be more intuitive',
        solutions: [
            'I suggest to start with an UX audit to identify opportunities where I could improve your product',
            'From there, I can translate these insights into a functional and easy-to-use product',
        ],
    },
    {
        problem: 'We need a consistent look and feel across our products',
        solutions: [
            'I can create a design system to ensure visual and functional consistency',
            'This helps strengthen your brand and improve usability across platforms',
        ],
    },
    {
        problem: 'Our product needs a new UX/UI design',
        solutions: [
            'I can redesign your product to make it intuitive and easy to use, prioritizing user needs and business goals',
            'It would not only look great but create an enjoyable experience for your users',
        ],
    },
    {
        problem: 'Our brand needs to reflect who we are',
        solutions: [
            'I create cohesive and flexible brand identities that capture the essence of your business',
            'This helps you connect with your audience and create a strong, recognizable presence',
        ],
    },
    {
        problem: 'We need compelling visuals to bring our brand to life',
        solutions: [
            'I specialize in designing engaging visuals that take your brand to the next level',
            'This could include marketing materials and social content, static or animated, tailored to your goals',
        ],
    },
    {
        problem: 'We need a new website',
        solutions: [
            'I design websites that truly resonate with your audience and seamlessly represent your brand',
            'Each website we craft is designed to elevate your digital presence and drive meaningful business growth',
        ],
    },
]

const completionSteps = [
    {
        icon: CircleDashedIcon,
        title: 'Open',
        background: 'bg-indigo-100',
    },
    {
        icon: Ellipsis,
        title: 'In progress',
        background: 'bg-blue-100',
    },
    {
        icon: Check,
        title: 'Solved',
        background: 'bg-green-100',
    },
    {
        icon: Clipboard,
        title: 'In quotation',
        background: 'bg-yellow-100',
    },
    {
        icon: Wallet,
        title: 'Invoiced',
        background: 'bg-orange-100',
    },
    {
        icon: CheckCheck,
        title: 'Closed',
        background: 'bg-teal-100',
    },
]

export function ExpertiseOverview() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    // @ts-ignore
    const timelineRef = useRef<gsap.Timeline | null>(null)

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
                solutionBubbles.forEach((bubble, idx) => {
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
        <Section withDefaultContainer={false}>
            <Container className={'flex flex-col'}>
                <div className={'w-full grid grid-cols-1 md:grid-cols-2 gap-8'}>
                    <div className={'flex items-center justify-center'}>
                        <div
                            className={
                                'size-96 rounded-4xl bg-muted flex flex-col  items-center gap-4 px-6 pt-6 relative overflow-hidden'
                            }
                        >
                            {completionSteps.map((step, index) => (
                                <div
                                    key={index}
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
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    handleSelect(index)
                                                }
                                                className={cn(
                                                    'problem-item',
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
                                            </div>
                                        )
                                    })}
                                </div>

                                {selectedIdx !== null && (
                                    <div className="solutions-list flex flex-col gap-4 w-full">
                                        {problemVsSolution[
                                            selectedIdx
                                        ].solutions.map((solution, sIdx) => (
                                            <div
                                                key={sIdx}
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
                                                Let's work together
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
                    We’re the creative link between people, business, and
                    technology.
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
