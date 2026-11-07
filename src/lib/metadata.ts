import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export interface PageMetadataOptions extends Omit<
    Metadata,
    'title' | 'description'
> {
    title: string
    description?: string
    /** Route path. Adds the canonical URL and Open Graph data for the page. */
    path?: string
}

export function createPageMetadata({
    title,
    description,
    path,
    ...metadata
}: PageMetadataOptions): Metadata {
    const describe = description ? { description } : {}

    return {
        title,
        ...describe,
        ...(path
            ? {
                  alternates: { canonical: path },
                  openGraph: { title, ...describe, url: path },
              }
            : {}),
        ...metadata,
    }
}

export function withSiteName(title: string) {
    return `${title} — ${siteConfig.name}`
}
