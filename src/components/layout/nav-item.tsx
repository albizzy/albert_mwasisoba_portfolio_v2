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
        'w-full group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl px-4 py-3'

    const transitionClass = 'transition-colors duration-200 ease-out'

    const backgroundClass =
        type === 'nav'
            ? 'bg-transparent hover:bg-white/8'
            : 'bg-transparent hover:bg-white/5'

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
            <span className="relative z-10 text-xl md:text-2xl font-normal tracking-tight text-white/85 transition-colors group-hover:text-white group-aria-[current]:font-semibold group-aria-[current]:text-(--editorial-yellow)">
                {children}
            </span>
            <span
                aria-hidden="true"
                className="size-2 rounded-full bg-(--editorial-yellow) opacity-0 scale-75 transition-all duration-200 group-hover:opacity-60 group-aria-[current]:opacity-100 group-aria-[current]:scale-100"
            />
        </Link>
    )
}
