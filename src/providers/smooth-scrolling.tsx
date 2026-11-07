'use client'

import { ReactNode, useEffect, useMemo, useRef } from 'react'
import type { LenisOptions } from 'lenis'
import { ReactLenis, type LenisRef, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
}

const DEFAULT_LENIS_OPTIONS: LenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothWheel: true,
}

interface SmoothScrollingProps {
    children: ReactNode
    /** Overrides for the default Lenis options. */
    options?: LenisOptions
}

export function SmoothScrolling({ children, options }: SmoothScrollingProps) {
    const lenisRef = useRef<LenisRef>(null)
    // GSAP's ticker drives Lenis below, so Lenis never runs its own RAF loop.
    const lenisOptions = useMemo(
        () => ({ ...DEFAULT_LENIS_OPTIONS, ...options, autoRaf: false }),
        [options]
    )

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
        <ReactLenis ref={lenisRef} root options={lenisOptions}>
            {children}
        </ReactLenis>
    )
}
