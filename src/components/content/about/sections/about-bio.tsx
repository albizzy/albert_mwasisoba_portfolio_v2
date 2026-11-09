import Image from 'next/image'
import Portrait from '@/assets/images/bizzy_scribble.png'
import { Card } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Frame } from '@/components/ui/frame'
import styles from '../about.module.css'

export function AboutBio() {
    return (
        <div className={styles.bio}>
            <div>
                <div className={styles.prose}>
                    <p>
                        I specialize in building performant, accessible web
                        applications using{' '}
                        <strong>TypeScript, React, Next.js</strong>, and modern
                        CSS systems. My focus sits at the seam between
                        engineering and product: architecting modular design
                        systems, managing complex client state, and ensuring
                        smooth, sub-second user flows.
                    </p>
                    <p>
                        Whether engineering data-dense SaaS dashboards or
                        consumer-facing storefronts, I write strict, predictable
                        code built for long-term maintainability, zero layout
                        shifts, and full WCAG AA accessibility.
                    </p>
                </div>
                <Card variant="soft" tone="yellow" className={styles.callout}>
                    <p className={styles.calloutLabel}>Remote collaboration</p>
                    <p>
                        Experienced in asynchronous, cross-functional agile
                        teams. Disciplined with written documentation, proactive
                        communication, and flexible overlap across distributed
                        time zones.
                    </p>
                </Card>
            </div>
            <figure className={styles.portrait}>
                <Frame className={styles.portraitFrame}>
                    <Image
                        src={Portrait}
                        alt="Illustrated portrait of Albert Mwasisoba"
                        className={styles.portraitImage}
                        sizes="192px"
                        priority
                    />
                </Frame>
                <Eyebrow as="figcaption" className={styles.caption}>
                    Yup, that&apos;s me!
                </Eyebrow>
            </figure>
        </div>
    )
}
