/**
 * Named accents of the editorial palette. Components take a `tone` prop and
 * render it as `data-tone`; globals.css turns that into the --tone,
 * --tone-soft and --tone-ink custom properties their styles read.
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
