'use client'

import { useRef } from 'react'
import { Section } from '@/components/content/sections'
import { works } from '@/config'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function WorkOverview() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>('.work-card')

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            })

            tl.from(cards, {
                y: 48,
                opacity: 0,
                duration: 0.9,
                stagger: 0.14,
            })
                .from(
                    '.work-image',
                    {
                        scale: 1.08,
                        duration: 1.1,
                        stagger: 0.14,
                    },
                    '<'
                )
                .from(
                    '.work-pill',
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.035,
                    },
                    '-=0.65'
                )
                .from(
                    '.work-content, .work-link',
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.65,
                        stagger: 0.08,
                    },
                    '-=0.45'
                )
                .from(
                    '.work-cta',
                    {
                        y: 18,
                        opacity: 0,
                        duration: 0.7,
                    },
                    '-=0.3'
                )
        },
        { scope: sectionRef }
    )

    return (
        <Section ref={sectionRef} className={'flex flex-col gap-12'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {works.map((work, index) => (
                    <div
                        key={index}
                        className="work-card rounded-2xl flex flex-col gap-4"
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
                                    'work-image absolute w-full h-full object-cover'
                                }
                            />
                            <div className="absolute top-6 left-6 flex flex-row gap-2">
                                <div className={'flex flex-row gap-2'}>
                                    {work.types.map((type, typeIndex) => (
                                        <div
                                            key={typeIndex}
                                            className={
                                                'work-pill w-fit bg-muted-foreground/40 p-2 rounded-lg text-xs text-white backdrop-blur-sm'
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
                                                    'work-pill w-fit bg-muted-foreground/40 p-2 rounded-full text-xs text-white backdrop-blur-sm'
                                                }
                                            >
                                                <span>{service}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="work-content flex flex-col gap-2">
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
                        <div className="work-link flex items-center gap-2">
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
            <div
                className={
                    'work-cta flex flex-row w-full items-center justify-center'
                }
            >
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
