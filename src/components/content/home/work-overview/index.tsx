import { Section } from '@/components/content/sections'
import SyncwhiteVisual from '@/assets/images/works/syncwhite_visual.png'
import KiraVisual from '@/assets/images/works/kira_visual.png'
import AutobimaVisual from '@/assets/images/works/autobima_visual.png'
import SweetDoctorVisual from '@/assets/images/works/sweet_doctor_visual.png'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const works = [
    {
        title: 'Sweet Doctor',
        types: ['Web', 'App'],
        services: ['Logo', 'Brand', 'Website'],
        description:
            'Sweet doctor is a dating platform connecting people with their perfect match.',
        link: 'https://sweet.doctor',
        image: SweetDoctorVisual,
        imageAlt: 'Sweet Doctor',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
        imagePriority: true,
        imageClassName: '',
    },
    {
        title: 'Syncwhite',
        types: ['Web'],
        services: ['Logo', 'Brand'],
        description:
            'Syncwhite is a software company based in Dar es Salaam, Tanzania. Building serious solutions since 2021',
        link: 'https://syncwhite.com',
        image: SyncwhiteVisual,
        imageAlt: 'Syncwhite',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Kira',
        types: ['Web'],
        services: ['Logo', 'Brand', 'Product'],
        description:
            'Kira is a cosmetics company based Dar es Salaam. They create high quality, natural hair products.',
        link: 'https://kira.co.tz',
        image: KiraVisual,
        imageAlt: 'Kira',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Autobima',
        types: ['Web', 'App'],
        services: ['Logo', 'Brand', 'Website'],
        description:
            'Autobima is a automotive company based in Dar es Salaam, Tanzania. Dealing with providing efficient and convenient claim settlement from the Garages to the Financiers',
        link: 'https://autobima.co.tz',
        image: AutobimaVisual,
        imageAlt: 'Autobima',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
]

export function WorkOverview() {
    return (
        <Section className={'flex flex-col gap-12'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {works.map((work, index) => (
                    <div
                        key={index}
                        className="rounded-2xl flex flex-col gap-4"
                    >
                        <div
                            className={
                                'relative overflow-hidden rounded-4xl aspect-video w-full'
                            }
                        >
                            <Image
                                src={work.image}
                                alt={work.imageAlt}
                                width={work.imageWidth}
                                height={work.imageHeight}
                                className={
                                    'absolute w-full h-full object-cover'
                                }
                            />
                            <div className="absolute top-6 left-6 flex flex-row gap-2">
                                <div className={'flex flex-row gap-2'}>
                                    {work.types.map((type, typeIndex) => (
                                        <div
                                            key={typeIndex}
                                            className={
                                                'w-fit bg-muted-foreground/40 p-2 rounded-lg text-xs text-white backdrop-blur-sm'
                                            }
                                        >
                                            <span>{type}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={'flex flex-row gap-2'}>
                                    {work.services.map(
                                        (service, serviceIndex) => (
                                            <div
                                                key={serviceIndex}
                                                className={
                                                    'w-fit bg-muted-foreground/40 p-2 rounded-full text-xs text-white backdrop-blur-sm'
                                                }
                                            >
                                                <span>{service}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Typography
                                as={'h3'}
                                variant={'h6'}
                                className="font-medium"
                            >
                                {work.title}
                            </Typography>
                            <Typography
                                as={'p'}
                                variant={'body'}
                                className="text-muted-foreground"
                            >
                                {work.description}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Typography
                                as={'p'}
                                variant={'body'}
                                className="text-muted-foreground"
                            >
                                <Link
                                    href={work.link}
                                    target="_blank"
                                    className="text-foreground hover:underline"
                                >
                                    View project
                                </Link>
                            </Typography>
                            <ArrowUpRight />
                        </div>
                    </div>
                ))}
            </div>
            <div className={'flex flex-row w-full items-center justify-center'}>
                <Button
                    asChild
                    variant="default"
                    className="rounded-full px-6 py-5 h-auto text-sm md:text-base font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                    <Link href="/works">View all projects</Link>
                </Button>
            </div>
        </Section>
    )
}
