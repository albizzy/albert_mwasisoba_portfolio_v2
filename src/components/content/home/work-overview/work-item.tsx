'use client'

import { memo, useEffect, useRef, type SyntheticEvent } from 'react'
import type { WorkItem } from '@/config'
import Image from 'next/image'
import { WorkTags } from '@/components/content/home/work-overview/work-tags'

const PREVIEW_ROOT_MARGIN = '320px 0px'

function revealIframe(event: SyntheticEvent<HTMLIFrameElement>) {
    const iframe = event.currentTarget

    if (iframe.hasAttribute('src')) {
        iframe.dataset.loaded = 'true'
    }
}

function useLazyIframe(previewUrl: string, enabled: boolean) {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const iframe = iframeRef.current

        if (!enabled || !iframe) {
            return
        }

        const loadPreview = () => {
            if (iframe.getAttribute('src') !== previewUrl) {
                iframe.dataset.loaded = 'false'
                iframe.setAttribute('src', previewUrl)
            }
        }

        if (!('IntersectionObserver' in window)) {
            loadPreview()
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    loadPreview()
                    observer.disconnect()
                }
            },
            { rootMargin: PREVIEW_ROOT_MARGIN }
        )

        observer.observe(iframe)

        return () => observer.disconnect()
    }, [enabled, previewUrl])

    return iframeRef
}

export interface WorkCardProps {
    work: WorkItem
}

export const WorkPreview = memo(function WorkPreview({ work }: WorkCardProps) {
    const previewUrl = work.previewUrl ?? work.link
    const previewScale = work.previewScale ?? 0.2
    const previewSize = `${100 / previewScale}%`
    const showLivePreview = work.previewMode !== 'image'
    const iframeRef = useLazyIframe(previewUrl, showLivePreview)

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-4xl bg-muted contain-[layout_paint]">
            <div className="work-image absolute inset-0 size-full transform-gpu transition-transform duration-700 backface-hidden group-hover:scale-105">
                <Image
                    src={work.image}
                    alt={work.imageAlt}
                    width={work.imageWidth}
                    height={work.imageHeight}
                    placeholder={work.imagePlaceholder}
                    sizes="(min-width: 1280px) 576px, (min-width: 768px) 50vw, 100vw"
                    className="absolute inset-0 size-full object-cover"
                />
                {showLivePreview && (
                    <iframe
                        ref={iframeRef}
                        data-src={previewUrl}
                        onLoad={revealIframe}
                        title={`${work.title} live website preview`}
                        loading="lazy"
                        sandbox="allow-same-origin allow-scripts"
                        referrerPolicy="strict-origin-when-cross-origin"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 origin-top-left border-0 opacity-0 transition-opacity duration-500 data-[loaded=true]:opacity-100"
                        style={{
                            width: previewSize,
                            height: previewSize,
                            transform: `scale(${previewScale})`,
                        }}
                    />
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-t from-black/20 via-transparent to-black/10" />
            <div className="pointer-events-none absolute top-6 left-6 flex flex-row gap-2">
                <WorkTags items={work.types} />
                <WorkTags items={work.services} rounded />
            </div>
        </div>
    )
})
