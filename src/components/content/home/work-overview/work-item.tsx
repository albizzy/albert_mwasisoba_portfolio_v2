'use client'

import { memo } from 'react'
import type { WorkItem } from '@/config'
import Image from 'next/image'
import { WorkTags } from '@/components/content/home/work-overview/work-tags'
import { cn } from '@/lib/utils'
import styles from './work-overview.module.css'

export interface WorkCardProps {
    work: WorkItem
}

export const WorkPreview = memo(function WorkPreview({
    work,
    variant = 'default',
}: WorkCardProps & { variant?: 'default' | 'folder' }) {
    const isFolder = variant === 'folder'
    return (
        <div
            className={cn(
                'relative w-full overflow-hidden bg-muted contain-[layout_paint]',
                isFolder ? styles.previewFrame : 'aspect-video rounded-4xl'
            )}
        >
            <div
                data-work-image={isFolder ? '' : undefined}
                className={
                    isFolder
                        ? styles.previewImage
                        : 'work-image absolute inset-0 size-full transform-gpu transition-transform duration-700 backface-hidden group-hover:scale-105'
                }
            >
                <Image
                    src={work.image}
                    alt={work.imageAlt}
                    width={work.imageWidth}
                    height={work.imageHeight}
                    placeholder={work.imagePlaceholder}
                    sizes={
                        isFolder
                            ? '(min-width: 768px) 46vw, 90vw'
                            : '(min-width: 1280px) 576px, (min-width: 768px) 50vw, 100vw'
                    }
                    className="absolute inset-0 size-full object-cover"
                />
            </div>
            {!isFolder && (
                <>
                    <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-t from-black/20 via-transparent to-black/10" />
                    <div className="pointer-events-none absolute top-6 left-6 flex flex-row gap-2">
                        <WorkTags items={work.types} />
                        <WorkTags items={work.services} rounded />
                    </div>
                </>
            )}
        </div>
    )
})
