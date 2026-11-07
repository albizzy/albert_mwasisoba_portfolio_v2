import { Briefcase, LayoutGrid, LucideIcon, Send } from 'lucide-react'
import { routes } from './routes'

export type MainNavLink = {
    labelKey: string
    href: string
    description?: string
    icon?: LucideIcon
}

// The header menu renders these in order. Section links ('/#id') are
// highlighted while their section is targeted; no header changes needed.
export const mainNavigation: ReadonlyArray<MainNavLink> = [
    {
        labelKey: 'Home',
        href: routes.home,
    },
    {
        labelKey: 'About',
        href: routes.about,
        description:
            'How I solve complex architectural and business challenges.',
        icon: LayoutGrid,
    },
    {
        labelKey: 'Works',
        href: routes.featuredWork,
        description: 'Selected projects and the work behind them.',
        icon: Briefcase,
    },
    // {
    //     labelKey: 'Expertise',
    //     href: '/expertise',
    //     description: 'Technical writing and thought leadership on modern web.',
    //     icon: FileText,
    // },
    {
        labelKey: 'Contact',
        href: routes.contact,
        description: 'Book a discovery call or start a project inquiry.',
        icon: Send,
    },
] as const
