import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { WorkCardProps, WorkPreview } from './work-item'
import { WorkTags } from './work-tags'
import styles from './work-overview.module.css'

export function FolderWorkCard({
    work,
    index,
}: WorkCardProps & { index: number }) {
    const iconTone = index % 4 < 2 ? 'light' : 'dark'

    return (
        <article
            className={styles.card}
            data-work-card
            data-tone={index % 4}
            aria-labelledby={`featured-project-${index}`}
            style={{ '--card-index': index } as CSSProperties}
        >
            <div className={styles.tab}>
                <Image
                    src={`/images/work-overview/spark-${iconTone}.svg`}
                    width={16}
                    height={16}
                    alt=""
                />
                <span>
                    <span className={styles.tabLabel}>Project </span>
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
            <div className={styles.body}>
                <div className={styles.content}>
                    <p className={styles.meta}>
                        <span aria-hidden="true" />
                        {work.types.join(' / ')}
                    </p>
                    <Typography
                        as="h3"
                        id={`featured-project-${index}`}
                        className={styles.title}
                    >
                        {work.title}
                    </Typography>
                    <Typography as="p" className={styles.description}>
                        {work.description}
                    </Typography>
                    <Link
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        aria-label={`View ${work.title} project (opens in a new tab)`}
                    >
                        View project
                        <Image
                            src={`/images/work-overview/arrow-${iconTone}.svg`}
                            width={16}
                            height={16}
                            alt=""
                        />
                    </Link>
                    <div className={styles.tags}>
                        <WorkTags items={work.services} variant="folder" />
                    </div>
                </div>
                <div className={styles.preview}>
                    <WorkPreview work={work} variant="folder" />
                </div>
            </div>
        </article>
    )
}
