'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { isActive } from '@/helpers'

export type NavItemProps = {
    type?: 'nav' | 'footer'
    href: string
    children: React.ReactNode
    className?: string
}

export function NavItem({ children, ...props }: NavItemProps) {
    const { type = 'nav', href, className } = props
    const pathname = usePathname()
    const active = isActive(pathname, href)

    const baseClass =
        'group relative flex items-center gap-2 overflow-hidden rounded-md px-4 py-2'

    const transitionClass =
        'transition-colors duration-300 ease-in-out hover:text-accent-foreground'
    const colorClass = active
        ? 'text-accent-foreground'
        : 'text-muted-foreground'

    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(baseClass, transitionClass, colorClass, className)}
        >
            {type === 'nav' && (
                <span
                    className={cn(
                        'absolute inset-0 -z-10 bg-accent transition-transform duration-50 ease-out',
                        active
                            ? 'translate-x-0'
                            : '-translate-x-[101%] group-hover:translate-x-0'
                    )}
                />
            )}

            <span className="w-full relative z-10 font-semibold">
                {children}
            </span>
        </Link>
    )
}
