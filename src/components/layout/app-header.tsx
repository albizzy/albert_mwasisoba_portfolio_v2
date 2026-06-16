'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNavigation, siteConfig } from '@/config'
import { AppLogo } from '@/components/layout/app-logo'
import { Typography } from '@/components/ui/typography'
import { Instagram, Linkedin, Plus } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        {...props}
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M6 7h2.5a1.75 1.75 0 0 1 0 3.5H6" />
        <path d="M6 10.5h3a1.75 1.75 0 0 1 0 3.5H6" />
        <path d="M6 7v7" />
        <path d="M13.5 12h4.5a2.25 2.25 0 0 0-4.5 0v0.5a2.25 2.25 0 0 0 4.5 0" />
        <path d="M14.5 8h2.5" />
    </svg>
)

export function AppHeader() {
    const containerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLSpanElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const pathname = usePathname()
    const isHome = pathname === '/'

    const { defaultValues } = siteConfig
    const { header } = defaultValues

    const { contextSafe } = useGSAP({ scope: containerRef })

    useEffect(() => {
        if (isHome) {
            setIsScrolled(false)
            return
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [pathname, isHome])

    const getDynamicLabel = () => {
        if (isHome) return 'Menu'
        const segment = pathname.split('/').filter(Boolean)[0]
        if (!segment) return 'Menu'
        return segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    const dynamicLabel = getDynamicLabel()

    const handleMouseEnter = contextSafe(() => {
        if (isOpen) return
        if (isHome) {
            gsap.to(menuRef.current, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
            })
        } else {
            if (isScrolled) {
                gsap.to(menuRef.current, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                })
            }
        }
    })

    const handleMouseLeave = contextSafe(() => {
        if (isOpen) return
        if (isHome) {
            gsap.to(menuRef.current, {
                x: 0,
                y: -10,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.inOut',
            })
        } else {
            if (isScrolled) {
                gsap.to(menuRef.current, {
                    x: 15,
                    y: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.inOut',
                })
            }
        }
    })

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const isFirstRender = useRef(true)

    useGSAP(
        () => {
            if (isFirstRender.current) {
                isFirstRender.current = false
                return
            }

            if (isOpen) {
                gsap.to(menuRef.current, {
                    x: isHome ? 0 : 15,
                    y: isHome ? -10 : 0,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power3.inOut',
                })

                gsap.set(overlayRef.current, { display: 'flex' })
                gsap.fromTo(
                    overlayRef.current,
                    {
                        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
                        opacity: 0,
                    },
                    {
                        clipPath: 'circle(150% at calc(100% - 40px) 40px)',
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power4.out',
                    }
                )

                gsap.to(iconRef.current, {
                    rotate: 45,
                    duration: 0.4,
                    ease: 'power3.out',
                })
            } else {
                if (isHome) {
                    gsap.to(menuRef.current, {
                        x: 0,
                        y: -10,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power3.inOut',
                    })
                } else {
                    if (isScrolled) {
                        gsap.to(menuRef.current, {
                            x: 15,
                            y: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power3.inOut',
                        })
                    } else {
                        gsap.to(menuRef.current, {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power3.out',
                        })
                    }
                }

                gsap.to(overlayRef.current, {
                    clipPath: 'circle(0% at calc(100% - 40px) 40px)',
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        gsap.set(overlayRef.current, { display: 'none' })
                    },
                })

                gsap.to(iconRef.current, {
                    rotate: 0,
                    duration: 0.3,
                    ease: 'power3.inOut',
                })
            }
        },
        { dependencies: [isOpen, isHome, isScrolled], scope: containerRef }
    )

    return (
        <header
            className={`w-full ${header?.height} flex flex-row items-center fixed top-0 left-0 z-50`}
        >
            <div
                className={
                    'w-full max-w-7xl mx-auto flex flex-row justify-between items-center px-6 md:px-0'
                }
            >
                <div
                    className={'bg-background px-6 py-4 rounded-full shadow-md'}
                >
                    <AppLogo />
                </div>
                <div
                    ref={containerRef}
                    className={'relative flex flex-row gap-4 items-center'}
                >
                    <span
                        ref={menuRef}
                        style={
                            isHome
                                ? { transform: 'translateY(-10px)', opacity: 0 }
                                : { transform: 'translateX(0px)', opacity: 1 }
                        }
                        className={'inline-block pointer-events-none'}
                    >
                        <Typography as={'span'} variant={'lead'}>
                            {dynamicLabel}
                        </Typography>
                    </span>
                    <div
                        ref={iconRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={toggleMenu}
                        className={`rounded-full p-4 size-16 flex items-center justify-center cursor-pointer z-50 transition-colors duration-300 relative ${
                            isOpen
                                ? 'bg-white/10 text-white'
                                : 'bg-muted text-foreground'
                        }`}
                    >
                        <Plus size={32} strokeWidth={'3'} />
                    </div>

                    <div
                        ref={overlayRef}
                        style={{ display: 'none' }}
                        className={
                            'absolute -top-2 -right-2 w-[320px] md:w-95 bg-black text-white rounded-[2.5rem] p-8 pt-24 pb-6 z-40 shadow-2xl flex flex-col justify-between'
                        }
                    >
                        <div className="flex flex-col gap-5 text-left pl-2">
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="text-4xl md:text-5xl font-semibold tracking-tight text-white hover:text-neutral-400 transition-all duration-300 hover:translate-x-2 block w-fit"
                            >
                                Home
                            </Link>
                            {mainNavigation &&
                                mainNavigation.map((navigationItem, index) => (
                                    <Link
                                        key={index}
                                        href={navigationItem.href}
                                        onClick={closeMenu}
                                        className="text-4xl md:text-5xl font-semibold tracking-tight text-white hover:text-neutral-400 transition-all duration-300 hover:translate-x-2 block w-fit"
                                    >
                                        {navigationItem.labelKey}
                                    </Link>
                                ))}
                        </div>

                        <div className="flex flex-col gap-8 pl-2">
                            <div className="flex flex-col gap-2.5">
                                <Link
                                    href="/playground"
                                    onClick={closeMenu}
                                    className="text-base text-neutral-500 hover:text-neutral-300 transition-colors w-fit"
                                >
                                    Playground
                                </Link>
                                <Link
                                    href="/shop"
                                    onClick={closeMenu}
                                    className="text-base text-neutral-500 hover:text-neutral-300 transition-colors w-fit"
                                >
                                    Shop
                                </Link>
                                <Link
                                    href="/newsletter"
                                    onClick={closeMenu}
                                    className="text-base text-neutral-500 hover:text-neutral-300 transition-colors w-fit"
                                >
                                    Newsletter
                                </Link>
                            </div>

                            <div className="flex flex-row justify-end gap-4 text-neutral-500 pr-2 pb-2">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="size-6 stroke-[1.5]" />
                                </a>
                                <a
                                    href="https://behance.net"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="Behance"
                                >
                                    <BehanceIcon className="size-6 stroke-[1.5]" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="size-6 stroke-[1.5]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
