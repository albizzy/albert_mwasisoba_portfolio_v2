import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export function useCompletionStepsScroll() {
    const sectionRef = useRef<HTMLElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            const viewport = viewportRef.current
            const list = listRef.current

            if (!viewport || !list) return

            gsap.to(list, {
                y: () => {
                    const overflow =
                        list.scrollHeight - (viewport.clientHeight - 48)
                    return overflow > 0 ? -overflow : 0
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            })
        },
        { scope: sectionRef }
    )

    return {
        listRef,
        sectionRef,
        viewportRef,
    }
}
