import BannerImage from '@/assets/images/banner.png'
import Image from 'next/image'

export function BannerSection() {
    return (
        <section
            aria-label="Project showcase banner"
            className="bg-background relative h-100 w-full overflow-hidden md:h-240"
        >
            <Image
                src={BannerImage}
                alt="Collage of selected design and frontend engineering projects"
                fill
                priority
                placeholder="blur"
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
            />
        </section>
    )
}
