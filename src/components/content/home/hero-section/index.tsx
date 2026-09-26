'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { RotatingText } from '@/components/ui/rotating-text'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config'
import { getIndefiniteArticle } from '@/helpers'
import styles from './hero-section.module.css'

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
                    <Typography as="h1" variant="h2" className={styles.heading}>
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
                <Typography
                    as="p"
                    variant="body"
                    className={styles.description}
                >
                    Specializing in{' '}
                    <span className="font-semibold text-foreground">
                        TypeScript
                    </span>
                    ,{' '}
                    <span className="font-semibold text-foreground">React</span>
                    , and{' '}
                    <span className="font-semibold text-foreground">
                        Next.js
                    </span>
                </Typography>
                <Button asChild variant="default" className={styles.contact}>
                    <Link href="/contact">Contact Me</Link>
                </Button>
            </div>
        </section>
    )
}
