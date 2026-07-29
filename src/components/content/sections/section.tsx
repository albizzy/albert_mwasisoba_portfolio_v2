'use client'

import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Container } from '@/components/layout'
import { cn } from '@/lib/utils'

const toneClasses = {
    default: 'bg-section-default text-section-default-foreground',
    muted: 'bg-section-muted text-section-muted-foreground',
    accent: 'bg-section-accent text-section-accent-foreground',
    primary: 'bg-section-primary text-section-primary-foreground',
    secondary: 'bg-section-secondary text-section-secondary-foreground',
    card: 'bg-section-card text-section-card-foreground',
    dark: 'bg-section-dark text-section-dark-foreground',
    transparent: 'bg-transparent text-foreground',
} as const

export type SectionTone = keyof typeof toneClasses

export interface CustomSectionTone {
    backgroundColor?: CSSProperties['backgroundColor']
    foregroundColor?: CSSProperties['color']
    className?: string
}

export interface SectionBackgroundImage {
    src: ImageProps['src']
    alt?: string
    className?: string
    sizes?: string
    priority?: boolean
    quality?: number
}

export interface SectionOverlay {
    color?: CSSProperties['backgroundColor']
    opacity?: CSSProperties['opacity']
    className?: string
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    tone?: SectionTone | CustomSectionTone
    bordered?: boolean
    withDefaultContainer?: boolean
    containerClassName?: string
    backgroundImage?: SectionBackgroundImage
    overlay?: boolean | string | SectionOverlay
    as?: ElementType
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    function Section(props, ref) {
        const {
            tone = 'default',
            bordered = false,
            className,
            withDefaultContainer = true,
            containerClassName,
            children,
            backgroundImage,
            overlay,
            as: Component = 'section',
            style,
            ...rest
        } = props

        const isCustomTone = typeof tone === 'object'
        const toneClassName = isCustomTone ? tone.className : toneClasses[tone]
        const toneStyle: CSSProperties | undefined = isCustomTone
            ? {
                  backgroundColor: tone.backgroundColor,
                  color: tone.foregroundColor,
              }
            : undefined
        const overlayOptions = typeof overlay === 'object' ? overlay : undefined
        const overlayClassName =
            typeof overlay === 'string' ? overlay : overlayOptions?.className
        const hasBackgroundLayers = Boolean(backgroundImage || overlay)
        const content = withDefaultContainer ? (
            <Container
                className={cn(
                    'relative z-10 flex flex-col gap-12 md:gap-16',
                    containerClassName
                )}
            >
                {children}
            </Container>
        ) : hasBackgroundLayers ? (
            <div className="relative z-10">{children}</div>
        ) : (
            children
        )

        return (
            <Component
                ref={ref}
                className={cn(
                    'relative isolate w-full overflow-hidden py-20 md:py-28',
                    toneClassName,
                    bordered && 'border-t border-border',
                    className
                )}
                style={{ ...toneStyle, ...style }}
                {...rest}
            >
                {backgroundImage && (
                    <Image
                        src={backgroundImage.src}
                        alt={backgroundImage.alt ?? ''}
                        fill
                        sizes={backgroundImage.sizes ?? '100vw'}
                        priority={backgroundImage.priority}
                        quality={backgroundImage.quality}
                        aria-hidden={backgroundImage.alt ? undefined : 'true'}
                        className={cn(
                            'pointer-events-none absolute inset-0 z-0 size-full object-cover',
                            backgroundImage.className
                        )}
                    />
                )}
                {overlay && (
                    <div
                        aria-hidden="true"
                        className={cn(
                            'pointer-events-none absolute inset-0 z-0',
                            !overlayClassName && 'bg-section-overlay',
                            overlayClassName
                        )}
                        style={{
                            backgroundColor: overlayOptions?.color,
                            opacity: overlayOptions?.opacity,
                        }}
                    />
                )}
                {content}
            </Component>
        )
    }
)
