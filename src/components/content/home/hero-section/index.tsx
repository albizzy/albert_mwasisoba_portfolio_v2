'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Typography } from '@/components/ui/typography'
import { siteConfig } from '@/config'
import { useMobile } from '@/hooks'
import { AnimatedCharacters } from '@/components/content/home/hero-section/animated-characters'
import { useRotatingRole } from '@/components/content/home/hero-section/hooks'
import { getIndefiniteArticle } from '@/helpers'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP)
}

export function HeroSection() {
    const { roles } = siteConfig
    const { containerRef, roleIndex, rolePillRef } = useRotatingRole(
        roles.length
    )
    const isMobile = useMobile()
    const currentRole = roles[roleIndex]
    const article = getIndefiniteArticle(currentRole.title)

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden py-10 md:min-h-[50vh]"
        >
            <div className="z-10 mx-auto flex max-w-4xl flex-col items-center space-y-8 px-4 text-center">
                <div>
                    <Typography as="h1" variant="h4" className="hero-title">
                        Engineering with {article}
                    </Typography>

                    <Typography
                        as="h1"
                        variant={isMobile ? 'h5' : 'h2'}
                        className="hero-title"
                    >
                        <span
                            ref={rolePillRef}
                            className="relative mx-1 inline-flex items-center overflow-hidden whitespace-nowrap rounded-full bg-primary px-4 py-1 text-primary-foreground"
                        >
                            <AnimatedCharacters
                                text={currentRole.title}
                                className="flex"
                                characterClassName="role-char"
                            />
                        </span>{' '}
                    </Typography>

                    <Typography
                        as="span"
                        variant={isMobile ? 'h4' : 'h2'}
                        className="inline-block overflow-hidden"
                    >
                        <AnimatedCharacters
                            text={currentRole.suffix}
                            className="flex justify-center"
                            characterClassName="suffix-char"
                        />
                    </Typography>
                </div>
            </div>
        </section>
    )
}
