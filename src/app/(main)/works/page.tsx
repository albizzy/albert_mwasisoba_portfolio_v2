import { WorksContent } from '@/components/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Works',
    description: 'A showcase of my work and projects.',
    alternates: {
        canonical: '/works',
    },
    openGraph: {
        title: 'Works',
        description: 'A showcase of my work and projects.',
        url: '/works',
    },
}

export default function Works() {
    return <WorksContent />
}
