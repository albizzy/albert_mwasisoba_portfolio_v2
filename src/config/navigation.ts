import { Briefcase, FileText, LayoutGrid, LucideIcon, Send } from 'lucide-react'

export type MainNavLink = {
    labelKey: string
    href: string
    description?: string
    icon?: LucideIcon
}

export const mainNavigation: ReadonlyArray<MainNavLink> = [
    {
        labelKey: 'About',
        href: '/about',
        description:
            'How I solve complex architectural and business challenges.',
        icon: LayoutGrid,
    },
    {
        labelKey: 'Works',
        href: '/works',
        description:
            'Deep dives into my technical specializations and systems.',
        icon: Briefcase,
    },
    {
        labelKey: 'Expertise',
        href: '/expertise',
        description: 'Technical writing and thought leadership on modern web.',
        icon: FileText,
    },
    {
        labelKey: 'Contact',
        href: '/contact',
        description: 'Book a discovery call or start a project inquiry.',
        icon: Send,
    },
] as const
