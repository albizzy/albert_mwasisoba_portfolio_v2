import type { Metadata } from 'next'
import { AboutContent } from '@/components/content/about'

export const metadata: Metadata = {
    title: 'About',
    description: 'How I solve complex architectural and business challenges.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About',
        description:
            'How I solve complex architectural and business challenges.',
        url: '/about',
    },
}

export default function About() {
    return <AboutContent />
}
