import Image from 'next/image'
import { workingPrinciples } from '@/config'
import { caveat } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import styles from '../about.module.css'

export function AboutApproach() {
    return (
        <div className={`${styles.panel} ${styles.storyPanel}`}>
            <ol className={styles.principles}>
                {workingPrinciples.map((principle) => (
                    <li key={principle.number} className={styles.principleRow}>
                        <article
                            className={`${styles.note} ${styles.principleNote}`}
                        >
                            <h3>{principle.title}</h3>
                            <p>{principle.description}</p>
                        </article>
                        <p className={cn(styles.annotation, caveat.className)}>
                            <Image
                                src="/images/about/annotation-arrow.svg"
                                alt=""
                                width={48}
                                height={24}
                            />
                            <span>{principle.annotation}</span>
                        </p>
                    </li>
                ))}
            </ol>
            <div
                className={`${styles.nameSticker} ${styles.storySticker}`}
                aria-hidden="true"
            >
                <Image
                    src="/images/about/cursor.svg"
                    alt=""
                    width={32}
                    height={32}
                />
                <span>Principles</span>
            </div>
        </div>
    )
}
