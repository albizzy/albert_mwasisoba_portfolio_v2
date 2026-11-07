import { WorksContent } from '@/components/content'
import type { Metadata } from 'next'
import { routes } from '@/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Works',
    description: 'A showcase of my work and projects.',
    path: routes.works,
})

export default function Works() {
    return <WorksContent />
}
