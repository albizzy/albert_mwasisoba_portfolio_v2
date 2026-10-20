'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
}

export function SmoothScrolling({ children }: { children: ReactNode }) {
    const lenisRef = useRef<LenisRef>(null)

    useLenis(ScrollTrigger.update)

    useEffect(() => {
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(update)
        }
    }, [])

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                autoRaf: false,
            }}
        >
            {children}
        </ReactLenis>
    )
}
