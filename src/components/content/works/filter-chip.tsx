import { cn } from '@/lib/utils'

const chipClassName =
    'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 border-[1.5px] cursor-pointer select-none'

const chipStateClassNames = {
    active: 'bg-editorial-ink text-white border-editorial-ink shadow-[3px_3px_0_var(--editorial-yellow)]',
    idle: 'bg-editorial-paper hover:bg-editorial-surface text-editorial-muted hover:text-editorial-ink border-editorial-line',
} as const

interface FilterChipProps {
    label: string
    active: boolean
    onSelect: () => void
}

export function FilterChip({ label, active, onSelect }: FilterChipProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={active}
            className={cn(
                chipClassName,
                chipStateClassNames[active ? 'active' : 'idle']
            )}
        >
            {label}
        </button>
    )
}
