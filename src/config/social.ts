import type { BrandIconName } from '@/components/ui/brand-icons'

export interface SocialProfile {
    label: string
    href: string
    icon: BrandIconName
}

// Add a profile here; header and footer links render from this list.
export const socialProfiles: ReadonlyArray<SocialProfile> = [
    {
        label: 'GitHub',
        href: 'https://github.com/albizzy',
        icon: 'github',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/albertmwasisoba',
        icon: 'linkedin',
    },
]
