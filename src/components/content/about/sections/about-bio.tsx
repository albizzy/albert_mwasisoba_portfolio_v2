import Image from 'next/image'
import Portrait from '@/assets/images/bizzy_scribble.png'
import { Typography } from '@/components/ui/typography'
import { caveat } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import styles from '../about.module.css'

export function AboutBio() {
    return (
        <div className={`${styles.panel} ${styles.bioPanel}`}>
            <div className={styles.bioCopy}>
                <p className={cn(styles.introduction, caveat.className)}>
                    Frontend engineer bridging scalable architecture and design
                    precision.
                </p>
                <div className={styles.prose}>
                    <Typography as={'p'} variant={'body'}>
                        I specialize in building performant, accessible web
                        applications using{' '}
                        <strong>TypeScript, React, Next.js</strong>, and modern
                        CSS systems. My focus sits at the seam between
                        engineering and product: architecting modular design
                        systems, managing complex client state, and ensuring
                        smooth, sub-second user flows.
                    </Typography>
                    <Typography as={'p'} variant={'body'}>
                        Whether engineering data-dense SaaS dashboards or
                        consumer-facing storefronts, I write strict, predictable
                        code built for long-term maintainability, zero layout
                        shifts, and full WCAG AA accessibility.
                    </Typography>
                </div>
                <div className={`${styles.note} ${styles.currentNote}`}>
                    <Typography as={'p'} variant={'body'}>
                        <strong>Remote Collaboration:</strong> Experienced in
                        asynchronous, cross-functional agile teams. Disciplined
                        with written documentation, proactive communication, and
                        flexible overlap across distributed time zones.
                    </Typography>
                </div>
            </div>
            <aside className={styles.portrait} aria-label="Meet Albert">
                <figure className={styles.photo}>
                    <Image
                        src={Portrait}
                        alt="Illustrated portrait of Albert Mwasisoba"
                        className={styles.portraitImage}
                        sizes="160px"
                        priority
                    />
                    <figcaption className={cn(caveat.className)}>
                        Yup, that&apos;s me!
                    </figcaption>
                </figure>
                <div className={styles.nameSticker}>
                    <Image
                        src="/images/about/cursor.svg"
                        alt=""
                        width={32}
                        height={32}
                    />
                    <span>Albert</span>
                </div>
            </aside>
        </div>
    )
}
