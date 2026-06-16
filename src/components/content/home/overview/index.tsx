'use client'

import { Typography } from '@/components/ui/typography'
import { Section } from '@/components/content/sections'

export function Overview() {
    return (
        <Section containerClassName={'flex flex-col items-center'}>
            <Typography
                as={'p'}
                variant={'h6'}
                className={'text-center max-w-2xl font-normal'}
            >
                I am Albert, a digital creator rooted in craft, curiosity, and
                care.
            </Typography>

            <Typography
                as={'p'}
                variant={'h6'}
                className={
                    'text-center max-w-2xl text-foreground/50 font-normal'
                }
            >
                I design <span className={'text-foreground'}>products</span>,{' '}
                <span className={'text-foreground'}>brands</span>, and{' '}
                <span className={'text-foreground'}>websites</span> that people
                love, helping businesses thrive.
            </Typography>
        </Section>
    )
}
