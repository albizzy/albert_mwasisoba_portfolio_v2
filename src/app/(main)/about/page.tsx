import type { Metadata } from 'next'
import { AboutContent } from '@/components/content/about'
import { routes } from '@/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
    title: 'About',
    description: 'How I solve complex architectural and business challenges.',
    path: routes.about,
})

export default function About() {
    return <AboutContent />
}
