'use client'

import type { ComponentType, SVGProps } from 'react'
import {
    FigmaBrandIcon,
    NextjsBrandIcon,
    TailwindCssBrandIcon,
    TypescriptBrandIcon,
} from '@/components/ui/brand-icons'
import type { FloatingSkillMotion } from './hooks'
import styles from './hero-section.module.css'

export interface HeroSkillBubble {
    id: string
    label: string
    tone: 'yellow' | 'blue' | 'green' | 'pink'
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    icon: ComponentType<SVGProps<SVGSVGElement>>
    motion: FloatingSkillMotion
}

export const HERO_SKILL_BUBBLES: ReadonlyArray<HeroSkillBubble> = [
    {
        id: 'nextjs',
        label: 'Next.js',
        tone: 'yellow',
        position: 'top-left',
        icon: NextjsBrandIcon,
        motion: {
            floatX: 5,
            floatY: -9,
            floatRotate: -2.4,
            duration: 2.9,
            delay: 0,
            parallaxDepth: 18,
        },
    },
    {
        id: 'typescript',
        label: 'TypeScript',
        tone: 'blue',
        position: 'top-right',
        icon: TypescriptBrandIcon,
        motion: {
            floatX: -5,
            floatY: 8,
            floatRotate: 2.2,
            duration: 3.3,
            delay: 0.35,
            parallaxDepth: 22,
        },
    },
    {
        id: 'tailwindcss',
        label: 'Tailwind CSS',
        tone: 'green',
        position: 'bottom-left',
        icon: TailwindCssBrandIcon,
        motion: {
            floatX: 6,
            floatY: 8,
            floatRotate: 2.6,
            duration: 3.1,
            delay: 0.2,
            parallaxDepth: 20,
        },
    },
    {
        id: 'figma',
        label: 'Figma',
        tone: 'pink',
        position: 'bottom-right',
        icon: FigmaBrandIcon,
        motion: {
            floatX: -4,
            floatY: -8,
            floatRotate: -2.5,
            duration: 3.5,
            delay: 0.5,
            parallaxDepth: 16,
        },
    },
]

export const HERO_SKILL_MOTIONS: ReadonlyArray<FloatingSkillMotion> =
    HERO_SKILL_BUBBLES.map((skill) => skill.motion)

export function SkillBubbles() {
    return (
        <ul className={styles.skills} aria-label="Core skills">
            {HERO_SKILL_BUBBLES.map(
                ({ id, label, tone, position, icon: Icon }) => (
                    <li
                        key={id}
                        className={styles.skillBubble}
                        data-skill-bubble
                        data-tone={tone}
                        data-position={position}
                    >
                        <span className={styles.skillFloat} data-skill-float>
                            <span className={styles.skillSticker}>
                                <span
                                    className={styles.skillIcon}
                                    aria-hidden="true"
                                >
                                    <Icon />
                                </span>
                                <span className={styles.skillLabel}>
                                    {label}
                                </span>
                            </span>
                        </span>
                    </li>
                )
            )}
        </ul>
    )
}
