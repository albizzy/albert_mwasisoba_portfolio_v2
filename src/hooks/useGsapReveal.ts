'use client'

import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    getRevealPresetVars,
    type RevealDirection,
    type RevealPreset,
} from './gsap-reveal-presets'

export type {
    RevealDirection,
    RevealEffect,
    RevealPreset,
} from './gsap-reveal-presets'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export interface RevealScrollTriggerOptions {
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    once?: boolean
    toggleActions?: string
}

export interface GsapRevealConfig {
    target: string
    preset?: RevealPreset
    direction?: RevealDirection
    distance?: number
    from?: gsap.TweenVars
    duration?: number
    delay?: number
    ease?: gsap.TweenVars['ease']
    stagger?: gsap.TweenVars['stagger']
    scrollTrigger?: false | RevealScrollTriggerOptions
}

export function useGsapReveal<T extends HTMLElement>(
    scope: RefObject<T | null>,
    animations: ReadonlyArray<GsapRevealConfig>
) {
    useGSAP(
        () => {
            if (
                typeof window === 'undefined' ||
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ) {
                return
            }

            animations.forEach((animation) => {
                const targets = gsap.utils.toArray<HTMLElement>(
                    animation.target,
                    scope.current
                )

                if (targets.length === 0) return

                const scrollOptions =
                    animation.scrollTrigger === false
                        ? undefined
                        : animation.scrollTrigger

                const trigger =
                    typeof scrollOptions?.trigger === 'string'
                        ? gsap.utils.toArray<HTMLElement>(
                              scrollOptions.trigger,
                              scope.current
                          )[0]
                        : scrollOptions?.trigger
                const presetVars = getRevealPresetVars(
                    animation.preset,
                    animation.direction,
                    animation.distance
                )

                gsap.from(targets, {
                    ...presetVars,
                    ...animation.from,
                    duration: animation.duration ?? 0.8,
                    delay: animation.delay ?? 0,
                    ease: animation.ease ?? 'power3.out',
                    stagger: animation.stagger,
                    scrollTrigger:
                        animation.scrollTrigger === false
                            ? undefined
                            : {
                                  trigger: trigger ?? targets[0],
                                  start: scrollOptions?.start ?? 'top 82%',
                                  end: scrollOptions?.end,
                                  scrub: scrollOptions?.scrub,
                                  once: scrollOptions?.once ?? true,
                                  toggleActions:
                                      scrollOptions?.toggleActions ??
                                      'play none none none',
                                  invalidateOnRefresh: true,
                              },
                })
            })
        },
        { scope }
    )
}
