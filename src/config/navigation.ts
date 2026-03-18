import { Briefcase, FileText, LayoutGrid, LucideIcon, Send } from 'lucide-react'

export type MainNavLink = {
    labelKey: string
    href: string
    description?: string
    icon?: LucideIcon
}

export const mainNavigation: ReadonlyArray<MainNavLink> = [
    {
        labelKey: 'Solutions',
        href: '/solutions',
        description:
            'How I solve complex architectural and business challenges.',
        icon: LayoutGrid,
    },
    {
        labelKey: 'Expertise',
        href: '/expertise',
        description:
            'Deep dives into my technical specializations and systems.',
        icon: Briefcase,
    },
    {
        labelKey: 'Insights',
        href: '/insights',
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
