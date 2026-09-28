'use client'

import { useState } from 'react'
import { Typography } from '@/components/ui/typography'
import { RotatingText } from '@/components/ui/rotating-text'
import { siteConfig } from '@/config'
import { getIndefiniteArticle } from '@/helpers'
import styles from './hero-section.module.css'
import { Caveat } from 'next/font/google'

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

const roles = siteConfig.roles.map((role) => ({
    text: role.title,
    companion: role.suffix,
}))

export function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0)
    const currentRole = roles[roleIndex]

    return (
        <section className={styles.section} aria-label="Introduction">
            <div className={styles.content}>
                <div className={styles.composition}>
                    <Typography
                        as={'span'}
                        variant={'h4'}
                        className={`${caveat.className} text-muted-foreground mb-10`}
                    >
                        Hi,{' '}
                        <span className={'text-primary font-bold'}>
                            I&apos;m Albert.
                        </span>
                    </Typography>
                    <Typography
                        as="h1"
                        variant="h2"
                        className={`${styles.heading}`}
                    >
                        <span className={styles.intro}>
                            Engineering with{' '}
                            {getIndefiniteArticle(currentRole.text)}
                        </span>
                        <RotatingText
                            items={roles}
                            onActiveChange={setRoleIndex}
                            className={styles.roles}
                            textClassName={styles.pill}
                            companionClassName={styles.suffix}
                            controlClassName={styles.pause}
                            accessibleText={`${currentRole.text} ${currentRole.companion}`}
                            controlLabel="roles"
                        />
                    </Typography>
                </div>
            </div>
        </section>
    )
}
