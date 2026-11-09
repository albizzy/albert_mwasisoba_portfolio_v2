import type { ComponentType } from 'react'
import { AboutApproach } from './sections/about-approach'
import { AboutBio } from './sections/about-bio'
import { AboutWork } from './sections/about-work'

export interface AboutSectionDefinition {
    id: string
    label: string
    Content: ComponentType
}

// The section navigation and the page body both render from this list, so a
// new section is a new component plus one entry here.
export const aboutSections: ReadonlyArray<AboutSectionDefinition> = [
    { id: 'about-main-bio', label: 'Main bio', Content: AboutBio },
    { id: 'about-story', label: 'Approach', Content: AboutApproach },
    { id: 'about-work', label: 'Work', Content: AboutWork },
]

export const aboutSectionIds = aboutSections.map(({ id }) => id)
