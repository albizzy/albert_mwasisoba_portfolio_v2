import { Tag } from '@/components/ui/tag'
import styles from './work-overview.module.css'

interface WorkTagsProps {
    items: ReadonlyArray<string>
    /** `folder` inverts the tags for the home page's coloured folders. */
    variant?: 'default' | 'folder'
}

export function WorkTags({ items, variant = 'default' }: WorkTagsProps) {
    return (
        <div className="flex flex-row flex-wrap gap-2">
            {items.map((item) =>
                variant === 'folder' ? (
                    <span key={item} className={styles.tag}>
                        {item}
                    </span>
                ) : (
                    <Tag key={item}>{item}</Tag>
                )
            )}
        </div>
    )
}
