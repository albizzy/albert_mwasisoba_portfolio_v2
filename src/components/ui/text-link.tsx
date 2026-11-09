import type { ComponentProps } from 'react'
import Link from 'next/link'
import type { EditorialTone } from '@/lib/tones'
import { cn } from '@/lib/utils'
import styles from './text-link.module.css'

type TextLinkProps = ComponentProps<typeof Link> & {
    /** `inline` sits in running text; `action` is an uppercase call to action. */
    variant?: 'inline' | 'action'
    /** Underline accent for inline links (yellow by default). */
    tone?: EditorialTone
    /** Opens in a new tab and says so to assistive technology. */
    external?: boolean
}

export function TextLink({
    variant = 'inline',
    tone,
    external = false,
    className,
    children,
    ...props
}: TextLinkProps) {
    return (
        <Link
            className={cn(styles.link, className)}
            data-variant={variant}
            data-tone={tone}
            {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            {...props}
        >
            {children}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
        </Link>
    )
}
