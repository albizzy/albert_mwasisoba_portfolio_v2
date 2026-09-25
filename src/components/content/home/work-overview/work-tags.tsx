import { cn } from '@/lib/utils'
import styles from './work-overview.module.css'

interface WorkTagsProps {
    items: ReadonlyArray<string>
    rounded?: boolean
    variant?: 'default' | 'folder'
}

export function WorkTags({
    items,
    rounded = false,
    variant = 'default',
}: WorkTagsProps) {
    return (
        <div className="flex flex-row flex-wrap gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className={
                        variant === 'folder'
                            ? styles.tag
                            : cn(
                                  'work-pill w-fit bg-muted-foreground/40 p-2 text-xs text-white backdrop-blur-sm',
                                  rounded ? 'rounded-full' : 'rounded-lg'
                              )
                    }
                >
                    {item}
                </span>
            ))}
        </div>
    )
}
