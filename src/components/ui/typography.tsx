import React from 'react'
import { cn } from '@/lib/utils'

type Variant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'lead'
    | 'body'
    | 'caption'
    | 'small'
    | 'blockquote'
    | 'code'

type AllowedElements =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'blockquote'
    | 'code'
    | 'a'

type TypographyProps<T extends AllowedElements> = {
    variant?: Variant
    as?: T
    className?: string
    color?: string
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<T>

const variantMapping: Record<
    Variant,
    { element: AllowedElements; classes: string }
> = {
    h1: {
        element: 'h1',
        classes:
            'text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight md:tracking-tighter md:leading-tighter',
    },
    h2: {
        element: 'h2',
        classes:
            'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight md:tracking-tighter md:leading-tighter',
    },
    h3: {
        element: 'h3',
        classes:
            'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight',
    },
    h4: {
        element: 'h4',
        classes:
            'text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-semibold leading-tight',
    },
    h5: {
        element: 'h5',
        classes:
            'text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-snug',
    },
    h6: {
        element: 'h6',
        classes: 'text-lg md:text-2xl lg:text-3xl font-semibold leading-snug',
    },
    lead: {
        element: 'p',
        classes: 'text-md md:text-lg lg:text-xl font-medium leading-relaxed',
    },
    body: {
        element: 'p',
        classes: 'text-sm md:text-base font-normal leading-6',
    },
    caption: {
        element: 'span',
        classes: 'text-xs md:text-sm font-normal text-gray-500',
    },
    small: {
        element: 'span',
        classes: 'text-[10px] md:text-xs font-normal text-gray-400',
    },
    blockquote: {
        element: 'blockquote',
        classes:
            'border-l-4 border-muted/30 pl-4 text-sm md:text-base italic text-muted/70',
    },
    code: {
        element: 'code',
        classes: 'bg-muted text-foreground/80 px-1 text-xs md:text-sm rounded',
    },
}

const Typography = <T extends AllowedElements = 'p'>({
    variant = 'body',
    as,
    className,
    color,
    children,
    ...props
}: TypographyProps<T>) => {
    const { element, classes } =
        variantMapping[variant] || variantMapping['body']

    const Component: string = as || element

    return (
        <Component
            style={{
                color,
            }}
            className={cn(classes, className)}
            {...props}
        >
            {children}
        </Component>
    )
}

export { Typography }
