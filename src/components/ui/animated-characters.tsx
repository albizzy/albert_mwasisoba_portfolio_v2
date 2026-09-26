import { cn } from '@/lib/utils'

interface AnimatedCharactersProps {
    text: string
    className?: string
    characterClassName?: string
}

export function AnimatedCharacters({
    text,
    className,
    characterClassName,
}: AnimatedCharactersProps) {
    return (
        <span aria-label={text} className={className}>
            {Array.from(text).map((character, index) => (
                <span
                    key={`${text}-${index}`}
                    data-character
                    aria-hidden="true"
                    className={cn(
                        'inline-block whitespace-pre',
                        characterClassName
                    )}
                >
                    {character}
                </span>
            ))}
        </span>
    )
}
