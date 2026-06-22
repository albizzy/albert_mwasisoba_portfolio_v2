import Link from 'next/link'
import { siteConfig } from '@/config'
import AlbertMascot from '@/assets/images/albert_mascot.svg'
import Image from 'next/image'

export function AppLogo() {
    const { name } = siteConfig
    return (
        <Link href={'/'} className={'relative size-16'}>
            <Image
                src={AlbertMascot}
                alt={'mascot logo'}
                fill
                className={
                    'absolute inset-0 object-center w-full h-full object-cover'
                }
            />
            <span className={'sr-only'}>{name}</span>
        </Link>
    )
}
