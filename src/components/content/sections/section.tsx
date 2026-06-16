'use client'

import { ElementType, ReactNode } from 'react'
import { Container } from '@/components/layout'
import { cn } from '@/lib/utils'

type Tone = 'default' | 'muted' | 'accent' | 'dark'

const toneClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    accent: 'bg-accent/30',
    dark: 'bg-foreground',
}

interface SectionProps {
    tone?: Tone
    bordered?: boolean
    className?: string
    withDefaultContainer?: boolean
    containerClassName?: string
    children: ReactNode
    id?: string
    as?: ElementType
}
export function Section(props: SectionProps) {
    const {
        tone = 'default',
        bordered = false,
        className,
        withDefaultContainer = true,
        containerClassName,
        children,
        id,
        as: Component = 'section',
    } = props
    return (
        <Component
            id={id}
            className={cn(
                'w-full relative overflow-hidden py-20 md:py-28',
                toneClasses[tone],
                bordered && 'border-t border-border',
                className
            )}
        >
            {withDefaultContainer ? (
                <Container
                    className={cn(
                        'flex flex-col gap-12 md:gap-16',
                        containerClassName
                    )}
                >
                    {children}
                </Container>
            ) : (
                <div>{children}</div>
            )}
        </Component>
    )
}
