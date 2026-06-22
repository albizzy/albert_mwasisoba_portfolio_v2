import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'
import './globals.css'
import { SmoothScrolling, ThemeProvider } from '@/providers'
import React from 'react'
import { siteConfig } from '@/config'

const unboundedSans = Unbounded({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    metadataBase: new URL('https://albert-mwasisoba-portfolio-v2.vercel.app'),
    title: 'Albert Mwasisoba — Consultant & Engineer',
    description:
        'Engineering Scalable Systems for Modern Business. Specializing in frontend, design, and AI integration.',
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
        title: 'Albert Mwasisoba — Consultant & Engineer',
        description:
            'Engineering Scalable Systems for Modern Business. Specializing in frontend, design, and AI integration.',
        url: 'https://albert-mwasisoba-portfolio-v2.vercel.app/',
        siteName: 'Albert Mwasisoba',
        images: [
            {
                url: '/albert+og_image.png',
                width: 1200,
                height: 630,
                alt: 'Albert Mwasisoba — Consultant & Engineer',
            },
        ],
        locale: 'en_US',
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
        <html lang="en">
            <body className={`${unboundedSans.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={theme?.colorScheme}
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <SmoothScrolling>{children}</SmoothScrolling>
                </ThemeProvider>
            </body>
        </html>
    )
}
