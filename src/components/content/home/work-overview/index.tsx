import { Section } from '@/components/content/sections'
import SyncwhiteVisual from '@/assets/images/works/syncwhite_visual.png'
import KiraVisual from '@/assets/images/works/kira_visual.png'
import AutobimaVisual from '@/assets/images/works/autobima_visual.png'
import SweetDoctorVisual from '@/assets/images/works/sweet_doctor_visual.png'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const works = [
    {
        title: 'Sweet Doctor',
        types: ['Web', 'Mobile'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: 'https://syncwhite.com',
        image: SyncwhiteVisual,
        imageAlt: 'Sweet Doctor',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Kira',
        types: ['Web'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: 'https://kira.co.tz',
        image: KiraVisual,
        imageAlt: 'Sweet Doctor',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Autobima',
        types: ['Web', 'App'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: 'https://autobima.co.tz',
        image: AutobimaVisual,
        imageAlt: 'Sweet Doctor',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
]

export function WorkOverview() {
    return (
        <Section>
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
        </Section>
    )
}
