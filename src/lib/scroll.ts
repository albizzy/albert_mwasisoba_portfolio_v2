import type Lenis from 'lenis'
import { prefersReducedMotion } from './motion'

export interface ScrollToTargetOptions {
    lenis?: Lenis | null
    offset?: number
    onComplete?: () => void
    /** Re-measure Lenis first, e.g. after a responsive reflow. */
    remeasure?: boolean
}

/**
 * Scrolls to an element or a y position with Lenis when it is available,
 * falling back to native scrolling. Honours reduced-motion preferences.
 */
export function scrollToTarget(
    target: HTMLElement | number,
    {
        lenis,
        offset = 0,
        onComplete,
        remeasure = false,
    }: ScrollToTargetOptions = {}
) {
    const immediate = prefersReducedMotion()

    if (lenis) {
        if (remeasure) lenis.resize()
        lenis.scrollTo(target, { offset, immediate, onComplete })
        return
    }

    const top =
        typeof target === 'number'
            ? target
            : window.scrollY + target.getBoundingClientRect().top
    window.scrollTo({
        top: top + offset,
        behavior: immediate ? 'instant' : 'smooth',
    })
    onComplete?.()
}
