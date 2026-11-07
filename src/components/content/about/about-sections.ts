import type { ComponentType } from 'react'
import type { EditorialTone } from '@/lib/tones'
import { AboutApproach } from './sections/about-approach'
import { AboutBio } from './sections/about-bio'
import { AboutWork } from './sections/about-work'

export type AboutSectionTone = Extract<
    EditorialTone,
    'yellow' | 'pink' | 'blue'
>

export interface AboutSectionDefinition {
    id: string
    label: string
    /** Tab icon file name in /public/images/about. */
    icon: string
    tone: AboutSectionTone
    Content: ComponentType
}

// The tab navigation and the page body both render from this list, so a new
// section is a new component plus one entry here.
export const aboutSections: ReadonlyArray<AboutSectionDefinition> = [
    {
        id: 'about-main-bio',
        label: 'Main bio',
        icon: 'bio',
        tone: 'yellow',
        Content: AboutBio,
    },
    {
        id: 'about-story',
        label: 'Approach',
        icon: 'story',
        tone: 'pink',
        Content: AboutApproach,
    },
    {
        id: 'about-work',
        label: 'Work',
        icon: 'work',
        tone: 'blue',
        Content: AboutWork,
    },
]

export const aboutSectionIds = aboutSections.map(({ id }) => id)
