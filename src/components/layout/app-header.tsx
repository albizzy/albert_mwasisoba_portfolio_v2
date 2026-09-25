'use client'

import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { mainNavigation, siteConfig } from '@/config'
import { AppLogo } from '@/components/layout/app-logo'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Linkedin, Github, Plus } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { NavItem } from './nav-item'

gsap.registerPlugin(useGSAP)

function subscribeToScroll(onChange: () => void) {
    window.addEventListener('scroll', onChange, { passive: true })
    return () => window.removeEventListener('scroll', onChange)
}

const getScrolledSnapshot = () => window.scrollY > 0
const getServerScrolledSnapshot = () => false

export function AppHeader() {
    const headerRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLSpanElement>(null)
    const iconRef = useRef<HTMLButtonElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [currentHash, setCurrentHash] = useState('')
    const hasScrolled = useSyncExternalStore(
        subscribeToScroll,
        getScrolledSnapshot,
        getServerScrolledSnapshot
    )

    const pathname = usePathname()
    const lenis = useLenis()
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

    const scrollToSection = useCallback(
        (hash: string) => {
            let id: string
            try {
                id = decodeURIComponent(hash.slice(1))
            } catch {
                return false
            }

            const target = document.getElementById(id)
            if (!target) return false

            const offset = -(headerRef.current?.offsetHeight ?? 96)
            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
            const focusHeading = () => {
                target.querySelector<HTMLElement>('h1, h2, h3')?.focus({
                    preventScroll: true,
                })
            }

            if (lenis) {
                lenis.scrollTo(target, {
                    offset,
                    immediate: reducedMotion,
                    onComplete: focusHeading,
                })
            } else {
                window.scrollTo({
                    top:
                        window.scrollY +
                        target.getBoundingClientRect().top +
                        offset,
                    behavior: reducedMotion ? 'instant' : 'smooth',
                })
                focusHeading()
            }

            return true
        },
        [lenis]
    )

    useEffect(() => {
        let frame = 0
        const syncHash = () => {
            window.cancelAnimationFrame(frame)
            const hash = window.location.hash
            setCurrentHash(hash)
            if (!lenis || !hash) return

            let attempts = 0
            const scrollWhenReady = () => {
                if (scrollToSection(hash) || attempts++ >= 20) return
                frame = window.requestAnimationFrame(scrollWhenReady)
            }
            frame = window.requestAnimationFrame(scrollWhenReady)
        }

        syncHash()
        window.addEventListener('hashchange', syncHash)
        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener('hashchange', syncHash)
        }
    }, [pathname, lenis, scrollToSection])

    const handleNavigationClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return
        }

        closeMenu()
        const destination = new URL(href, window.location.href)
        if (
            destination.origin !== window.location.origin ||
            destination.pathname !== window.location.pathname
        ) {
            return
        }

        if (!destination.hash) {
            event.preventDefault()
            if (window.location.hash) {
                window.history.pushState(null, '', destination)
            }
            setCurrentHash('')
            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
            if (lenis) {
                lenis.scrollTo(0, { immediate: reducedMotion })
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: reducedMotion ? 'instant' : 'smooth',
                })
            }
            return
        }

        let targetId: string
        try {
            targetId = decodeURIComponent(destination.hash.slice(1))
        } catch {
            return
        }
        if (!document.getElementById(targetId)) {
            return
        }

        event.preventDefault()
        if (window.location.hash !== destination.hash) {
            window.history.pushState(null, '', destination)
        }
        setCurrentHash(destination.hash)
        scrollToSection(destination.hash)
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
            ref={headerRef}
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
                            'absolute -top-2 -right-2 w-[min(320px,calc(100vw-2rem))] md:w-95 max-h-[calc(100dvh-2rem)] overflow-y-auto bg-black text-white rounded-[2.5rem] p-8 pt-24 pb-6 z-40 shadow-2xl flex flex-col justify-between gap-2'
                        }
                    >
                        <div className="flex flex-col gap-0 text-left pl-2">
                            <NavItem
                                href="/"
                                aria-current={
                                    isHome && currentHash !== '#featured-work'
                                        ? 'page'
                                        : undefined
                                }
                                onClick={(event) =>
                                    handleNavigationClick(event, '/')
                                }
                            >
                                Home
                            </NavItem>
                            {mainNavigation &&
                                mainNavigation.map((navigationItem, index) => (
                                    <NavItem
                                        key={index}
                                        href={navigationItem.href}
                                        scroll={
                                            navigationItem.href.includes('#')
                                                ? false
                                                : undefined
                                        }
                                        {...(navigationItem.href ===
                                        '/#featured-work'
                                            ? {
                                                  'aria-current':
                                                      isHome &&
                                                      currentHash ===
                                                          '#featured-work'
                                                          ? 'location'
                                                          : undefined,
                                              }
                                            : {})}
                                        onClick={(event) =>
                                            handleNavigationClick(
                                                event,
                                                navigationItem.href
                                            )
                                        }
                                    >
                                        {navigationItem.labelKey}
                                    </NavItem>
                                ))}
                        </div>

                        <div className="flex flex-col gap-4 pl-4">
                            <Button
                                asChild
                                className="h-auto rounded-full px-4 py-6"
                            >
                                <Link href="/schedule" onClick={closeMenu}>
                                    Book a call
                                </Link>
                            </Button>

                            <div className="flex flex-row justify-between gap-4 text-neutral-500 pr-2 pb-2">
                                <div className="flex flex-col gap-2.5">
                                    <Link
                                        href="/playground"
                                        onClick={closeMenu}
                                        className="text-base text-neutral-500 hover:text-neutral-300 transition-colors w-fit"
                                    >
                                        Playground
                                    </Link>
                                </div>

                                <div className="flex flex-row gap-4">
                                    <Link
                                        href="https://github.com/albizzy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-white transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Github className="size-6 stroke-[1.5]" />
                                    </Link>
                                    <Link
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-white transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="size-6 stroke-[1.5]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
