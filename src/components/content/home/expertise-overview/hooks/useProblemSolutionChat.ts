import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP)
}

const selectors = {
    all: '.chat-subtitle, .problem-item, .solution-bubble, .chat-footer',
    footer: '.chat-footer',
    problem: (index: number) => `.problem-item-${index}`,
    otherProblems: (index: number) =>
        `.problem-item:not(.problem-item-${index})`,
    solutions: '.solution-bubble',
    subtitle: '.chat-subtitle',
} as const

function getFitContentWidth(element: HTMLElement) {
    const originalStyle = element.style.cssText

    gsap.set(element, {
        alignSelf: 'flex-start',
        maxWidth: '85%',
        width: 'fit-content',
    })

    const width = element.getBoundingClientRect().width
    element.style.cssText = originalStyle

    return width
}

export function useProblemSolutionChat() {
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useGSAP(
        () => {
            const container = containerRef.current

            if (!container) return

            if (selectedIndex === null) {
                const animatedElements =
                    container.querySelectorAll<HTMLElement>(selectors.all)

                gsap.killTweensOf(animatedElements)
                gsap.set(animatedElements, { clearProps: 'all' })
                gsap.killTweensOf(container)
                gsap.set(container, { clearProps: 'height' })
                setIsTransitioning(false)
                return
            }

            setIsTransitioning(true)
            gsap.set(container, {
                height: container.getBoundingClientRect().height,
            })

            const subtitle = container.querySelector<HTMLElement>(
                selectors.subtitle
            )
            const otherProblems = Array.from(
                container.querySelectorAll<HTMLElement>(
                    selectors.otherProblems(selectedIndex)
                )
            )
            const selectedProblem = container.querySelector<HTMLElement>(
                selectors.problem(selectedIndex)
            )
            const solutions = container.querySelectorAll<HTMLElement>(
                selectors.solutions
            )
            const footer = container.querySelector<HTMLElement>(
                selectors.footer
            )
            const elementsToHide = [
                ...(subtitle ? [subtitle] : []),
                ...otherProblems,
            ]
            const timeline = gsap.timeline({
                onComplete: () => setIsTransitioning(false),
            })

            timelineRef.current = timeline

            timeline.to(elementsToHide, {
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

            if (selectedProblem) {
                const startWidth = selectedProblem.getBoundingClientRect().width
                const endWidth = getFitContentWidth(selectedProblem)

                gsap.set(selectedProblem, {
                    alignSelf: 'flex-start',
                    maxWidth: '85%',
                    width: startWidth,
                })

                timeline.to(
                    selectedProblem,
                    {
                        width: endWidth,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => {
                            gsap.set(selectedProblem, {
                                width: 'fit-content',
                            })
                        },
                    },
                    '<'
                )
            }

            solutions.forEach((solution) => {
                timeline.to(
                    solution,
                    {
                        opacity: 1,
                        y: 0,
                        display: 'block',
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '+=1'
                )
            })

            if (footer) {
                timeline.to(
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
        {
            dependencies: [selectedIndex],
            scope: containerRef,
        }
    )

    const selectProblem = (index: number) => {
        if (isTransitioning || selectedIndex !== null) return
        setSelectedIndex(index)
    }

    const resetChat = () => {
        timelineRef.current?.kill()
        timelineRef.current = null
        setSelectedIndex(null)
        setIsTransitioning(false)
    }

    return {
        containerRef,
        resetChat,
        selectProblem,
        selectedIndex,
    }
}
