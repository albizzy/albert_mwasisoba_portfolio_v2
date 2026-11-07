'use client'

import { memo } from 'react'
import type { WorkItem } from '@/config'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './work-overview.module.css'

export interface WorkCardProps {
    work: WorkItem
}

// Presentation per card style. Add a variant here to support a new card.
const previewVariants = {
    default: {
        frame: 'aspect-video rounded-2xl border-2 border-editorial-ink',
        image: 'work-image absolute inset-0 size-full transform-gpu transition-transform duration-700 backface-hidden group-hover:scale-105',
        /** Opts the image into useWorkOverviewAnimation's parallax. */
        parallax: false,
        loading: 'lazy',
        sizes: '(min-width: 1280px) 576px, (min-width: 768px) 50vw, 100vw',
    },
    folder: {
        frame: styles.previewFrame,
        image: styles.previewImage,
        parallax: true,
        loading: 'eager',
        sizes: '(min-width: 768px) 46vw, 90vw',
    },
} as const

export type WorkPreviewVariant = keyof typeof previewVariants

export const WorkPreview = memo(function WorkPreview({
    work,
    variant = 'default',
}: WorkCardProps & { variant?: WorkPreviewVariant }) {
    const preview = previewVariants[variant]

    return (
        <div
            className={cn(
                'relative w-full overflow-hidden bg-editorial-paper contain-[layout_paint]',
                preview.frame
            )}
        >
            <div
                data-work-image={preview.parallax ? '' : undefined}
                className={preview.image}
            >
                <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    priority={work.imagePriority}
                    loading={work.imagePriority ? undefined : preview.loading}
                    decoding="async"
                    placeholder={work.imagePlaceholder}
                    sizes={preview.sizes}
                    className="object-cover"
                />
            </div>
        </div>
    )
})
