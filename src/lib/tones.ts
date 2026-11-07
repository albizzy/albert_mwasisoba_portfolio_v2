/**
 * Named accents of the editorial palette (the --editorial-* tokens in
 * globals.css). Components accept a subset of these as `tone` props and
 * expose it as `data-tone`; each stylesheet maps a tone to its own tokens.
 */
export const EDITORIAL_TONES = [
    'ink',
    'yellow',
    'pink',
    'blue',
    'green',
] as const

export type EditorialTone = (typeof EDITORIAL_TONES)[number]

export function isEditorialTone(value: unknown): value is EditorialTone {
    return (
        typeof value === 'string' &&
        (EDITORIAL_TONES as ReadonlyArray<string>).includes(value)
    )
}
