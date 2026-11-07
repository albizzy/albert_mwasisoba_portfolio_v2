import { ExpertiseContent } from '@/components/content'
import type { Metadata } from 'next'
import { routes } from '@/config'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Expertise',
    description: 'How I solve complex architectural and business challenges.',
    path: routes.expertise,
})

export default function Expertise() {
    return <ExpertiseContent />
}
