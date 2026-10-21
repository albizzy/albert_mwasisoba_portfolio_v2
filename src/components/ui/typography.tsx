import React from 'react'
import { cn } from '@/lib/utils'
import styles from './typography.module.css'

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
        classes: 'font-bold leading-tight tracking-tight md:tracking-tighter',
    },
    h2: {
        element: 'h2',
        classes:
            'font-semibold leading-tight tracking-tight md:tracking-tighter',
    },
    h3: {
        element: 'h3',
        classes: 'font-semibold leading-tight tracking-tight',
    },
    h4: {
        element: 'h4',
        classes: 'font-semibold leading-tight tracking-tight',
    },
    h5: {
        element: 'h5',
        classes: 'font-semibold leading-snug tracking-tight',
    },
    h6: {
        element: 'h6',
        classes: 'font-medium leading-snug tracking-tight',
    },
    lead: {
        element: 'p',
        classes: 'font-normal leading-relaxed tracking-[-0.015em]',
    },
    body: {
        element: 'p',
        classes: 'font-normal leading-relaxed tracking-[-0.01em]',
    },
    caption: {
        element: 'span',
        classes: 'font-medium text-muted-foreground tracking-[0.08em]',
    },
    small: {
        element: 'span',
        classes: 'font-normal text-muted-foreground leading-normal',
    },
    blockquote: {
        element: 'blockquote',
        classes:
            'border-l-4 border-border pl-4 italic font-normal text-muted-foreground leading-relaxed',
    },
    code: {
        element: 'code',
        classes:
            'bg-muted text-foreground/80 px-1.5 py-0.5 rounded font-medium',
    },
}

const Typography = <T extends AllowedElements = 'p'>({
    variant = 'body',
    as,
    className,
    color,
    style,
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
                ...style,
            }}
            className={cn(styles[variant], classes, className)}
            {...props}
        >
            {children}
        </Component>
    )
}

export { Typography }
