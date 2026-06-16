'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation' // 1. Import usePathname
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import ArtworkImage from '@/assets/images/bizzy_scribble.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AppFooter() {
    const pathname = usePathname()
    const sectionRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            if (!sectionRef.current || !boxRef.current) return

            ScrollTrigger.refresh()

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1,
                },
            })

            tl.fromTo(
                boxRef.current,
                {
                    width: '120px',
                    height: '60px',
                    borderRadius: '100px',
                },
                {
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px 0px 0px 0px',
                    marginBottom: '0px',
                    ease: 'none',
                }
            )

            if (contentRef.current) {
                tl.fromTo(
                    contentRef.current,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out',
                    },
                    '-=0.4'
                )
            }
        },
        { scope: sectionRef, dependencies: [pathname] }
    )

    return (
        <section
            ref={sectionRef}
            className="w-full relative h-dvh bg-background"
        >
            <div className="sticky top-0 h-full w-full flex items-start justify-center overflow-hidden">
                <div
                    ref={boxRef}
                    className="footer-box bg-foreground text-white flex flex-col items-center justify-between relative overflow-hidden"
                    style={{
                        width: '120px',
                        height: '60px',
                        borderRadius: '100px',
                    }}
                >
                    <div
                        ref={contentRef}
                        className="footer-content w-full h-full flex flex-col justify-between items-center opacity-0 px-4 md:px-12 py-8"
                    >
                        <div className="flex flex-col items-center gap-6 py-6 flex-1 justify-center max-w-xl mx-auto w-full">
                            <div className="relative overflow-hidden size-64 md:size-80 shrink-0">
                                <Image
                                    src={ArtworkImage}
                                    alt="artwork"
                                    fill
                                    className="object-cover dark:invert"
                                />
                            </div>
                            <Typography
                                as="h3"
                                variant="h5"
                                className="font-normal text-white text-center px-4 leading-relaxed"
                            >
                                Ready to move forward? Let’s work together!
                            </Typography>
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full px-8 py-6 h-auto text-sm md:text-base font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform bg-white text-black border-none hover:bg-white/90"
                            >
                                <Link href="/contact">Contact me</Link>
                            </Button>
                        </div>

                        <div className="w-full text-center pt-6 text-xs text-white/40 border-t border-white/10">
                            © {new Date().getFullYear()} Albert Mwasisoba. All
                            rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
