import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TextLink } from '@/components/ui/text-link'
import { WorkCardProps, WorkPreview } from './work-item'
import { WorkTags } from './work-tags'
import styles from './work-card.module.css'

export function WorkCard({ work }: WorkCardProps) {
    return (
        <Card as="article" interactive className="group work-card">
            <WorkPreview work={work} />

            <div className={styles.content}>
                <p className={styles.meta}>
                    <span aria-hidden="true" />
                    {work.types.join(' / ')}
                </p>
                <h2 className={styles.title}>{work.title}</h2>
                <p className={styles.description}>{work.description}</p>
            </div>

            <WorkTags items={work.services} />

            <div className={styles.footer}>
                <TextLink
                    href={work.link}
                    variant="action"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${work.title} project (opens in a new tab)`}
                    data-cursor-label="Visit site"
                    data-cursor-tone="yellow"
                >
                    View project
                    <ArrowUpRight aria-hidden="true" />
                </TextLink>
            </div>
        </Card>
    )
}
