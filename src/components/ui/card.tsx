import type { ComponentPropsWithoutRef } from 'react'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from './card.module.css'

type CardProps = ComponentPropsWithoutRef<'div'> & {
    as?: 'div' | 'article' | 'aside'
    /** `outline` for content cards, `soft` for tinted callouts. */
    variant?: 'outline' | 'soft'
    tone?: EditorialTone
    /** Lifts on hover with a tone shadow, for cards that act as links. */
    interactive?: boolean
}

export function Card({
    as: Component = 'div',
    variant = 'outline',
    tone,
    interactive = false,
    className,
    ...props
}: CardProps) {
    return (
        <Component
            className={cn(styles.card, className)}
            data-variant={variant}
            data-tone={tone}
            data-interactive={interactive || undefined}
            {...props}
        />
    )
}
