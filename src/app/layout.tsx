import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'
import './globals.css'
import { SmoothScrolling, ThemeProvider } from '@/providers'
import React from 'react'

const unboundedSans = Unbounded({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Albert Mwasisoba — Consultant & Engineer',
    description:
        'Engineering Scalable Systems for Modern Business. Specializing in frontend, design, and AI integration.',
}

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
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SmoothScrolling>{children}</SmoothScrolling>
                </ThemeProvider>
            </body>
        </html>
    )
}
