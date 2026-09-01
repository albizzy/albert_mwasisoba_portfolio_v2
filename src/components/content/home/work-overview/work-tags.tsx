import { cn } from '@/lib/utils'

interface WorkTagsProps {
    items: ReadonlyArray<string>
    rounded?: boolean
}

export function WorkTags({ items, rounded = false }: WorkTagsProps) {
    return (
        <div className="flex flex-row gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className={cn(
                        'work-pill w-fit bg-muted-foreground/40 p-2 text-xs text-white backdrop-blur-sm',
                        rounded ? 'rounded-full' : 'rounded-lg'
                    )}
                >
                    {item}
                </span>
            ))}
        </div>
    )
}
