'use client'

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNavigation, siteConfig } from '@/config'
import { AppLogo } from '@/components/layout/app-logo'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Instagram, Linkedin, Plus } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function subscribeToScroll(onChange: () => void) {
    window.addEventListener('scroll', onChange, { passive: true })
    return () => window.removeEventListener('scroll', onChange)
}

const getScrolledSnapshot = () => window.scrollY > 0
const getServerScrolledSnapshot = () => false

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
    const iconRef = useRef<HTMLButtonElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)
    const hasScrolled = useSyncExternalStore(
        subscribeToScroll,
        getScrolledSnapshot,
        getServerScrolledSnapshot
    )

    const pathname = usePathname()
    const isHome = pathname === '/'
    const isScrolled = !isHome && hasScrolled

    const { defaultValues } = siteConfig
    const { header } = defaultValues

    const { contextSafe } = useGSAP({ scope: containerRef })

    const getDynamicLabel = () => {
        if (isHome) return 'Menu'
        const segment = pathname.split('/').filter(Boolean)[0]
        if (!segment) return 'Menu'
        return segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    const dynamicLabel = getDynamicLabel()

    const handleMouseEnter = () => {
        contextSafe(() => {
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
        })()
    }

    const handleMouseLeave = () => {
        contextSafe(() => {
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
        })()
    }

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
                iconRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

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
                    'w-full max-w-7xl mx-auto flex flex-row justify-between items-center px-4 sm:px-6 lg:px-8'
                }
            >
                <AppLogo />
                <div
                    ref={containerRef}
                    className={
                        'relative flex flex-row gap-2 sm:gap-4 items-center'
                    }
                >
                    <Button
                        asChild
                        className="h-auto rounded-full px-4 py-3 text-xs sm:px-6 sm:py-4"
                    >
                        <Link href="/schedule" onClick={closeMenu}>
                            Book a call
                        </Link>
                    </Button>
                    <span
                        ref={menuRef}
                        style={
                            isHome
                                ? { transform: 'translateY(-10px)', opacity: 0 }
                                : { transform: 'translateX(0px)', opacity: 1 }
                        }
                        className={'hidden sm:inline-block pointer-events-none'}
                    >
                        <Typography as={'span'} variant={'lead'}>
                            {dynamicLabel}
                        </Typography>
                    </span>
                    <button
                        ref={iconRef}
                        type="button"
                        aria-label={
                            isOpen ? 'Close navigation' : 'Open navigation'
                        }
                        aria-expanded={isOpen}
                        aria-controls="main-navigation"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={toggleMenu}
                        className={`rounded-full p-4 size-16 flex items-center justify-center cursor-pointer z-50 transition-colors duration-300 relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${
                            isOpen
                                ? 'bg-white/10 text-white'
                                : 'bg-muted text-foreground'
                        }`}
                    >
                        <Plus size={32} strokeWidth={'3'} />
                    </button>

                    <div
                        ref={overlayRef}
                        id="main-navigation"
                        role="navigation"
                        aria-label="Main navigation"
                        inert={!isOpen}
                        data-lenis-prevent
                        style={{ display: 'none' }}
                        className={
                            'absolute -top-2 -right-2 w-[min(320px,calc(100vw-2rem))] md:w-95 max-h-[calc(100dvh-2rem)] overflow-y-auto bg-black text-white rounded-[2.5rem] p-8 pt-24 pb-6 z-40 shadow-2xl flex flex-col justify-between gap-8'
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
