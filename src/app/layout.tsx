import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'
import './globals.css'
import { SmoothScrolling, ThemeProvider } from '@/providers'
import React from 'react'
import { siteConfig } from '@/config'
import { CustomCursor } from '@/components/ui/custom-cursor'

// Defined here rather than in lib/fonts: importing a module shared with pages
// would change how CSS chunks are ordered relative to globals.css.
const unbounded = Unbounded({
    subsets: ['latin'],
})

const siteTitle = `${siteConfig.name} — ${siteConfig.tagline}`

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: siteTitle,
    description: siteConfig.description,
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            {
                url: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },

    manifest: '/site.webmanifest',
    openGraph: {
        title: siteTitle,
        description: siteConfig.description,
        url: `${siteConfig.url}/`,
        siteName: siteConfig.name,
        images: [
            {
                ...siteConfig.ogImage,
                alt: siteTitle,
            },
        ],
        locale: siteConfig.locale,
        type: 'website',
    },
}

const { defaultValues } = siteConfig
const { theme } = defaultValues

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${unbounded.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={theme?.colorScheme}
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <SmoothScrolling>{children}</SmoothScrolling>
                    <CustomCursor />
                </ThemeProvider>
            </body>
        </html>
    )
}
