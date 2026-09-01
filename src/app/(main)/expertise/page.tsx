import { ExpertiseContent } from '@/components/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Expertise',
    description: 'How I solve complex architectural and business challenges.',
    alternates: {
        canonical: '/expertise',
    },
    openGraph: {
        title: 'Expertise',
        description:
            'How I solve complex architectural and business challenges.',
        url: '/expertise',
    },
}

export default function Expertise() {
    return <ExpertiseContent />
}
