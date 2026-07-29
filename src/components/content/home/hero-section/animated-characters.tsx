interface AnimatedCharactersProps {
    text: string
    className?: string
    characterClassName: string
}

export function AnimatedCharacters({
    text,
    className,
    characterClassName,
}: AnimatedCharactersProps) {
    return (
        <span aria-label={text} className={className}>
            {text.split('').map((character, index) => (
                <span
                    key={`${text}-${index}`}
                    aria-hidden="true"
                    className={`${characterClassName} inline-block whitespace-pre`}
                >
                    {character}
                </span>
            ))}
        </span>
    )
}
