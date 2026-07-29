import type gsap from 'gsap'

export type RevealEffect =
    | 'fade'
    | 'slide'
    | 'scale'
    | 'skew'
    | 'clip'
    | 'rotate'
    | 'blur'
    | 'flip'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'center'

export type RevealPreset = RevealEffect | `${RevealEffect}-${RevealDirection}`

type PresetResolver = (
    direction: RevealDirection,
    distance: number
) => gsap.TweenVars

const getOffset = (
    direction: RevealDirection,
    distance: number
): gsap.TweenVars => {
    switch (direction) {
        case 'up':
            return { y: distance }
        case 'down':
            return { y: -distance }
        case 'left':
            return { x: distance }
        case 'right':
            return { x: -distance }
        default:
            return {}
    }
}

const getTransformOrigin = (direction: RevealDirection) => {
    switch (direction) {
        case 'up':
            return 'center bottom'
        case 'down':
            return 'center top'
        case 'left':
            return 'right center'
        case 'right':
            return 'left center'
        default:
            return 'center center'
    }
}

const getClipPath = (direction: RevealDirection) => {
    switch (direction) {
        case 'up':
            return 'inset(100% 0 0 0)'
        case 'down':
            return 'inset(0 0 100% 0)'
        case 'left':
            return 'inset(0 100% 0 0)'
        case 'right':
            return 'inset(0 0 0 100%)'
        default:
            return 'inset(50% 50% 50% 50%)'
    }
}

const getAxisRotation = (
    direction: RevealDirection,
    amount: number
): gsap.TweenVars => {
    switch (direction) {
        case 'up':
            return { rotationX: -amount }
        case 'down':
            return { rotationX: amount }
        case 'left':
            return { rotationY: -amount }
        case 'right':
            return { rotationY: amount }
        default:
            return { rotation: -amount }
    }
}

const getSkew = (
    direction: RevealDirection,
    amount: number
): gsap.TweenVars => {
    switch (direction) {
        case 'up':
            return { skewY: -amount }
        case 'down':
            return { skewY: amount }
        case 'left':
            return { skewX: amount }
        case 'right':
            return { skewX: -amount }
        default:
            return { skewX: amount }
    }
}

const presetResolvers: Record<RevealEffect, PresetResolver> = {
    fade: (direction, distance) => ({
        autoAlpha: 0,
        ...getOffset(direction, distance),
    }),
    slide: (direction, distance) => ({
        ...getOffset(direction, distance),
        ...(direction === 'center' ? { scale: 0.96 } : {}),
    }),
    scale: (direction) => ({
        scale: 0.88,
        transformOrigin: getTransformOrigin(direction),
    }),
    skew: (direction, distance) => ({
        ...getOffset(direction, distance * 0.75),
        ...getSkew(direction, 7),
        transformOrigin: getTransformOrigin(direction),
    }),
    clip: (direction) => ({
        clipPath: getClipPath(direction),
    }),
    rotate: (direction, distance) => ({
        ...getOffset(direction, distance * 0.4),
        ...getAxisRotation(direction, 10),
        transformOrigin: getTransformOrigin(direction),
        transformPerspective: 800,
    }),
    blur: (direction, distance) => ({
        autoAlpha: 0,
        filter: 'blur(14px)',
        ...getOffset(direction, distance * 0.5),
    }),
    flip: (direction) => ({
        autoAlpha: 0,
        ...getAxisRotation(direction, 75),
        transformOrigin: getTransformOrigin(direction),
        transformPerspective: 1000,
    }),
}

export function getRevealPresetVars(
    preset: RevealPreset = 'fade-up',
    direction: RevealDirection = 'up',
    distance = 32
): gsap.TweenVars {
    const [effect, presetDirection] = preset.split('-') as [
        RevealEffect,
        RevealDirection?,
    ]

    return presetResolvers[effect](
        presetDirection ?? direction,
        Math.abs(distance)
    )
}
