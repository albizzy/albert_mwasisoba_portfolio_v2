import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const selectors = {
    title: '.hero-title',
    roleCharacter: '.role-char',
    suffixCharacter: '.suffix-char',
} as const

const timing = {
    roleHold: 3,
    roleEnter: 0.4,
    roleExit: 0.3,
    width: 0.5,
} as const

export function useRotatingRole(roleCount: number) {
    const containerRef = useRef<HTMLElement>(null)
    const rolePillRef = useRef<HTMLSpanElement>(null)
    const previousRoleWidthRef = useRef(0)
    const [roleIndex, setRoleIndex] = useState(0)
    const [isReady, setIsReady] = useState(false)

    useGSAP(
        () => {
            gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => setIsReady(true),
            }).from(selectors.title, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
            })
        },
        { scope: containerRef }
    )

    useGSAP(
        () => {
            if (!isReady) return

            const rolePill = rolePillRef.current

            if (rolePill && previousRoleWidthRef.current > 0) {
                gsap.fromTo(
                    rolePill,
                    { width: previousRoleWidthRef.current },
                    {
                        width: rolePill.getBoundingClientRect().width,
                        duration: timing.width,
                        ease: 'power3.out',
                        clearProps: 'width',
                    }
                )
            }

            const timeline = gsap.timeline()

            timeline
                .fromTo(
                    selectors.roleCharacter,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.04,
                        ease: 'back.out(2.5)',
                        duration: timing.roleEnter,
                    }
                )
                .fromTo(
                    selectors.suffixCharacter,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.04,
                        ease: 'back.out(2.5)',
                        duration: timing.roleEnter,
                    },
                    '-=0.2'
                )

            if (roleCount <= 1) return

            timeline
                .to({}, { duration: timing.roleHold })
                .to(selectors.roleCharacter, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.01,
                    ease: 'back.in(1.5)',
                    duration: timing.roleExit,
                })
                .to(
                    selectors.suffixCharacter,
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.01,
                        ease: 'back.in(1.5)',
                        duration: timing.roleExit,
                    },
                    '<'
                )
                .call(() => {
                    if (rolePillRef.current) {
                        previousRoleWidthRef.current =
                            rolePillRef.current.getBoundingClientRect().width
                    }

                    setRoleIndex(
                        (currentIndex) => (currentIndex + 1) % roleCount
                    )
                })
        },
        {
            dependencies: [isReady, roleCount, roleIndex],
            scope: containerRef,
        }
    )

    return {
        containerRef,
        roleIndex,
        rolePillRef,
    }
}
