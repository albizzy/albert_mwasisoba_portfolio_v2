import Link from 'next/link'
import { siteConfig } from '@/config'
import { Typography } from '@/components/ui/typography'

export function AppLogo() {
    const { name } = siteConfig
    return (
        <Link href={'/'}>
            <Typography as={'span'} variant={'h6'} className={'text-center'}>
                {name}
            </Typography>
        </Link>
    )
}
