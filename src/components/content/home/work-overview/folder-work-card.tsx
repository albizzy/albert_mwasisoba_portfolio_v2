import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { cycle, toSequenceLabel } from '@/helpers'
import type { EditorialTone } from '@/lib/tones'
import { WorkCardProps, WorkPreview } from './work-item'
import { WorkTags } from './work-tags'
import styles from './work-overview.module.css'
import { cn } from '@/lib/utils'

interface FolderTone {
    tone: EditorialTone
    /** Variant of the spark and arrow artwork that reads on this folder. */
    icons: 'light' | 'dark'
    cursorTone: EditorialTone
}

// Cards cycle through these folder colours. Add a tone here plus a matching
// `.card[data-tone]` rule in work-overview.module.css.
const FOLDER_TONES: ReadonlyArray<FolderTone> = [
    { tone: 'blue', icons: 'light', cursorTone: 'yellow' },
    { tone: 'ink', icons: 'light', cursorTone: 'yellow' },
    { tone: 'yellow', icons: 'dark', cursorTone: 'ink' },
    { tone: 'pink', icons: 'dark', cursorTone: 'ink' },
]

export function FolderWorkCard({
    work,
    index,
}: WorkCardProps & { index: number }) {
    const { tone, icons, cursorTone } = cycle(FOLDER_TONES, index)

    return (
        <article
            className={styles.card}
            data-work-card
            data-tone={tone}
            aria-labelledby={`featured-project-${index}`}
            style={{ '--card-index': index } as CSSProperties}
        >
            <div className={styles.tab}>
                <Image
                    src={`/images/work-overview/spark-${icons}.svg`}
                    width={16}
                    height={16}
                    alt=""
                />
                <span>
                    <span className={cn(styles.tabLabel)}>Project </span>
                    {toSequenceLabel(index)}
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
                        data-cursor-label="Visit site"
                        data-cursor-tone={cursorTone}
                    >
                        View project
                        <Image
                            src={`/images/work-overview/arrow-${icons}.svg`}
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
