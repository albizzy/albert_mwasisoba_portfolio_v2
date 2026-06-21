import Link from 'next/link'
import { siteConfig } from '@/config'
import { Typography } from '@/components/ui/typography'

export function AppLogo() {
    const { name } = siteConfig
    return (
        <Link
            href={'/'}
            className={'bg-background px-6 py-4 rounded-full shadow-md'}
        >
            <Typography
                as={'span'}
                variant={'h6'}
                className={'text-center text-primary-background'}
            >
                {name}
            </Typography>
        </Link>
    )
}
