'use client'

import { memo } from 'react'
import type { WorkItem } from '@/config'
import Image from 'next/image'
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
                'relative w-full overflow-hidden bg-(--editorial-paper) contain-[layout_paint]',
                isFolder
                    ? styles.previewFrame
                    : 'aspect-video rounded-2xl border-2 border-(--editorial-ink)'
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
                    fill
                    priority={work.imagePriority}
                    loading={
                        work.imagePriority
                            ? undefined
                            : isFolder
                              ? 'eager'
                              : 'lazy'
                    }
                    decoding="async"
                    placeholder={work.imagePlaceholder}
                    sizes={
                        isFolder
                            ? '(min-width: 768px) 46vw, 90vw'
                            : '(min-width: 1280px) 576px, (min-width: 768px) 50vw, 100vw'
                    }
                    className="object-cover"
                />
            </div>
        </div>
    )
})
