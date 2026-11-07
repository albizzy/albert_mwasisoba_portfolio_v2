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

/** How a direction shapes each effect. Add a direction by adding a profile. */
interface DirectionProfile {
    offset: (distance: number) => gsap.TweenVars
    transformOrigin: string
    clipPath: string
    rotation: (amount: number) => gsap.TweenVars
    skew: (amount: number) => gsap.TweenVars
}

const directionProfiles: Record<RevealDirection, DirectionProfile> = {
    up: {
        offset: (distance) => ({ y: distance }),
        transformOrigin: 'center bottom',
        clipPath: 'inset(100% 0 0 0)',
        rotation: (amount) => ({ rotationX: -amount }),
        skew: (amount) => ({ skewY: -amount }),
    },
    down: {
        offset: (distance) => ({ y: -distance }),
        transformOrigin: 'center top',
        clipPath: 'inset(0 0 100% 0)',
        rotation: (amount) => ({ rotationX: amount }),
        skew: (amount) => ({ skewY: amount }),
    },
    left: {
        offset: (distance) => ({ x: distance }),
        transformOrigin: 'right center',
        clipPath: 'inset(0 100% 0 0)',
        rotation: (amount) => ({ rotationY: -amount }),
        skew: (amount) => ({ skewX: amount }),
    },
    right: {
        offset: (distance) => ({ x: -distance }),
        transformOrigin: 'left center',
        clipPath: 'inset(0 0 0 100%)',
        rotation: (amount) => ({ rotationY: amount }),
        skew: (amount) => ({ skewX: -amount }),
    },
    center: {
        offset: () => ({}),
        transformOrigin: 'center center',
        clipPath: 'inset(50% 50% 50% 50%)',
        rotation: (amount) => ({ rotation: -amount }),
        skew: (amount) => ({ skewX: amount }),
    },
}

/** Builds an effect's starting state. Add an effect by adding a resolver. */
type PresetResolver = (
    profile: DirectionProfile,
    distance: number,
    direction: RevealDirection
) => gsap.TweenVars

const presetResolvers: Record<RevealEffect, PresetResolver> = {
    fade: (profile, distance) => ({
        autoAlpha: 0,
        ...profile.offset(distance),
    }),
    slide: (profile, distance, direction) => ({
        ...profile.offset(distance),
        ...(direction === 'center' ? { scale: 0.96 } : {}),
    }),
    scale: (profile) => ({
        scale: 0.88,
        transformOrigin: profile.transformOrigin,
    }),
    skew: (profile, distance) => ({
        ...profile.offset(distance * 0.75),
        ...profile.skew(7),
        transformOrigin: profile.transformOrigin,
    }),
    clip: (profile) => ({
        clipPath: profile.clipPath,
    }),
    rotate: (profile, distance) => ({
        ...profile.offset(distance * 0.4),
        ...profile.rotation(10),
        transformOrigin: profile.transformOrigin,
        transformPerspective: 800,
    }),
    blur: (profile, distance) => ({
        autoAlpha: 0,
        filter: 'blur(14px)',
        ...profile.offset(distance * 0.5),
    }),
    flip: (profile) => ({
        autoAlpha: 0,
        ...profile.rotation(75),
        transformOrigin: profile.transformOrigin,
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
    const resolvedDirection = presetDirection ?? direction
    const profile =
        directionProfiles[resolvedDirection] ?? directionProfiles.center

    return presetResolvers[effect](
        profile,
        Math.abs(distance),
        resolvedDirection
    )
}
