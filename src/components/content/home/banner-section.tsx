import BannerImage from '@/assets/images/banner.png'
import Image from 'next/image'

export function BannerSection() {
    return (
        <section
            className={
                'w-full h-100 md:h-240 bg-foreground relative overflow-hidden'
            }
        >
            <Image
                src={BannerImage}
                alt={'banner'}
                width={1000}
                height={1000}
                className={'absolute w-full h-full object-cover'}
            />
        </section>
    )
}
