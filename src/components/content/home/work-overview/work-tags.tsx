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
                                  'work-pill inline-flex w-fit items-center border border-(--editorial-line) bg-(--editorial-surface) px-2.5 py-1 text-xs font-medium uppercase tracking-[0.08em] text-(--editorial-ink)',
                                  rounded
                                      ? 'rounded-full'
                                      : 'rounded-[5px_10px_5px_5px]'
                              )
                    }
                >
                    {item}
                </span>
            ))}
        </div>
    )
}
