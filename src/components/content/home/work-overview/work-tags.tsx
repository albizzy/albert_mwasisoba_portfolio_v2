import { cn } from '@/lib/utils'
import styles from './work-overview.module.css'

// Tag styling per card style. Add a variant here to support a new card.
const tagVariants = {
    default: (rounded: boolean) =>
        cn(
            'work-pill inline-flex w-fit items-center border border-editorial-line bg-editorial-surface px-2.5 py-1 text-xs font-medium uppercase tracking-[0.08em] text-editorial-ink',
            rounded ? 'rounded-full' : 'rounded-editorial-tag'
        ),
    folder: () => styles.tag,
} satisfies Record<string, (rounded: boolean) => string>

interface WorkTagsProps {
    items: ReadonlyArray<string>
    rounded?: boolean
    variant?: keyof typeof tagVariants
}

export function WorkTags({
    items,
    rounded = false,
    variant = 'default',
}: WorkTagsProps) {
    const tagClassName = tagVariants[variant](rounded)

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className={tagClassName}>
                    {item}
                </span>
            ))}
        </div>
    )
}
