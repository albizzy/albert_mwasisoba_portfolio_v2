import type { ComponentPropsWithoutRef } from 'react'
import { caveat } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import styles from './eyebrow.module.css'

type EyebrowProps = ComponentPropsWithoutRef<'p'> & {
    as?: 'p' | 'span' | 'figcaption'
}

/** The handwritten line that introduces a heading or captions an image. */
export function Eyebrow({
    as: Component = 'p',
    className,
    ...props
}: EyebrowProps) {
    return (
        <Component
            className={cn(styles.eyebrow, caveat.className, className)}
            {...props}
        />
    )
}
