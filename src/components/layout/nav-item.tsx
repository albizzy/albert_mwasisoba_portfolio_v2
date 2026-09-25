'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { isActive } from '@/helpers'

export type NavItemProps = React.ComponentProps<typeof Link> & {
    type?: 'nav' | 'footer'
}

export function NavItem({
    children,
    type = 'nav',
    href,
    className,
    ...rest
}: NavItemProps) {
    const pathname = usePathname()
    const active = isActive(pathname, href.toString())

    const baseClass =
        'w-fit group relative flex items-center gap-2 overflow-hidden rounded-4xl p-4'

    const transitionClass =
        'transition-colors duration-300 ease-in-out hover:text-neutral'

    const backgroundClass =
        type === 'nav'
            ? 'bg-transparent hover:bg-accent/20'
            : 'bg-transparent hover:bg-accent/5'

    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
                baseClass,
                transitionClass,
                backgroundClass,
                className
            )}
            {...rest}
        >
            <span className="w-full relative z-10 text-2xl md:text-3xl font-normal tracking-tight">
                {children}
            </span>
        </Link>
    )
}
